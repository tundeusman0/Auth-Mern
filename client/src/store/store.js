import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import item from '../reducers/item';
// import tasks from '../reducers/tasks';
import error from '../reducers/errorReducer';
import auth from '../reducers/authReducer';

const composeEnhanser = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      item,
      error,
      auth
    }),
    composeEnhanser(applyMiddleware(thunk))
  );
  return store;
};
