import { useEffect } from 'react';
import './App.css';
import { Gallery } from './components/Gallery';
import { observer } from 'mobx-react';
import { store } from './store/root';

const App = observer(() => {

  useEffect(() => {
    store.getItems()
  }, []);

  return (
    <Gallery />
  );
});

export default App;
