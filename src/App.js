import { useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Gallery } from './components/Gallery';
import { useDispatch } from 'react-redux';
import { loadItemsAction } from './store/actions';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/photos')
      .then(function (response) {
        dispatch(loadItemsAction(response.data));
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [dispatch]);

  return (
    <Gallery />
  );
}

export default App;
