import { useEffect } from 'react';
import './App.css';
import { Gallery } from './components/Gallery';
import { observer } from 'mobx-react';

const App = observer(({ store }) => {

  useEffect(() => {
    store.getItems()
  }, [store]);

  return (
    <Gallery />
  );
});

export default App;
