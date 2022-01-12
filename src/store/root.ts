import { makeObservable, autorun, action, computed, observable } from 'mobx';
import axios from 'axios';

class ObservableTodoStore {
  items = [];
  sortedItems = [];
  filter ='';

  constructor() {
    makeObservable(this, {
      todos: observable,
      pendingRequests: observable,
      completedTodosCount: computed,
      report: computed,
      getItems: action,
      addTodo: action,
    });
    autorun(() => console.log(this.report));
  }

  get completedTodosCount() {
    return this.todos.filter(
      todo => todo.completed === true
    ).length;
  }

  get report() {
    if (this.todos.length === 0)
      return "<none>";
    const nextTodo = this.todos.find(todo => todo.completed === false);
    return `Next todo: "${nextTodo ? nextTodo.task : "<none>"}". ` +
      `Progress: ${this.completedTodosCount}/${this.todos.length}`;
  }

  getItems() {
    axios.get('https://jsonplaceholder.typicode.com/photos')
      .then(function (response) {
        this.items = response.data;
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  addTodo(task) {
    this.todos.push({
      task: task,
      completed: false,
      assignee: null
    });
  }
}

export const store = new ObservableTodoStore();