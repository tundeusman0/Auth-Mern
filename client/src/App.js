import React from 'react';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import { Provider } from 'react-redux';
import storeConfig from './store/store';
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap';
import { loadUser } from '../src/actions/authActions';

import './bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const store = storeConfig();

class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <ItemModal />
            <ShoppingList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
