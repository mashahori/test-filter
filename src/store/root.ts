import { makeObservable, autorun, action, computed, observable } from 'mobx';
import axios from 'axios';

interface IItem {
  albumId: string;
  id: string;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface IObservableTodoStore {
  items: IItem[];
  sortedItems: IItem[];
  filter: string;
  getItems: () => void;
  setFilter: (value: string) => void;
  deleteItem: (value: string) => void;
}

class ObservableTodoStore implements IObservableTodoStore {
  items: IItem[] = [];
  filter: string = '';

  constructor() {
    makeObservable(this, {
      items: observable,
      sortedItems: computed,
      filter: observable,
      getItems: action,
      setFilter: action,
      deleteItem: action,
    });
    autorun(() => console.log(''));
  }

  setFilter = (value: string) => {
    this.filter = value;
  }

  getItems = () => {
    axios.get('https://jsonplaceholder.typicode.com/photos')
      .then((response) => (this as any).items = response.data)
      .catch(function (error) {
        console.log(error);
      })
  }

  deleteItem = (value: string) => {
    this.items = this.items.filter((item) => item.id !== value);
  }

  get sortedItems() {
    return this.items.filter(el => el.albumId.toString() === this.filter)
  }
}

export const store: IObservableTodoStore = new ObservableTodoStore();