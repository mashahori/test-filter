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
  setItems: (items: IItem[]) => void;
}

class ObservableTodoStore implements IObservableTodoStore {
  items: IItem[] = [];
  sortedItems: IItem[] = [];
  filter: string = '';

  constructor() {
    makeObservable(this as IObservableTodoStore, {
      items: observable,
      sortedItems: observable,
      filter: observable,
      getItems: action,
      setItems: action,
    });
    autorun(() => console.log(''));
  }

  // setItems = (items: IItem[]) => {
  //   this.items = items;
  // }

  getItems() {
    axios.get('https://jsonplaceholder.typicode.com/photos')
      .then((response) => (this as any).items = response.data)
      .catch(function (error) {
        console.log(error);
      })
  }
}

export const store: IObservableTodoStore = new ObservableTodoStore();