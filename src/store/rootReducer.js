import { deleteItemAction, sortByAlbumIdAction, loadItemsAction } from './actions';
  
const initState = {
  items: [],
  sortedItems: [],
  filter: '',
};
  
export const rootReducer = (state = initState, action) => {
    switch (action.type) {
      case loadItemsAction.toString():
        return {
          ...state,
          items: action.payload,
        };
    case sortByAlbumIdAction.toString(): {
      let sortedItems = state.items.filter(el => el.albumId.toString() === action.payload);
      return {
        ...state,
        filter: action.payload,
        sortedItems,
      };
    };
    case deleteItemAction.toString(): {
      let arr = state.filter ? state.sortedItems : state.items;
      let itemIndex = arr.findIndex(item=> item.id === action.payload);
      const restItems = [ ...arr.slice(0, itemIndex), ...arr.slice(itemIndex +1) ];
      return {
        ...state,
        sortedItems: state.filter ? restItems : state.sortedItems,
        items:  state.filter ? state.items : restItems,
      }
    };
    default:
      return state;
    }
};
  