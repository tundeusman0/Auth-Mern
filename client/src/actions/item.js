import { GET_ITEMS, ADD_ITEMS, DELETE_ITEMS, ITEMS_LOADING } from './types';
import axios from 'axios';

export const getItems = () => dispatch => {
  dispatch(setItemLoading());
  axios.get('/api/items').then(res =>
    dispatch({
      type: GET_ITEMS,
      payload: res.data
    })
  );
};

export const startDeleteItem = payload => ({
  type: DELETE_ITEMS,
  payload
});

export const deleteItem = id => dispatch => {
  axios.delete(`/api/items/${id}`).then(res => dispatch(startDeleteItem(id)));
};
export const startAddItem = payload => ({
  type: ADD_ITEMS,
  payload
});
export const addItem = payload => dispatch => {
  axios
    .post('/api/items', payload)
    .then(res => dispatch(startAddItem(res.data)));
};
export const setItemLoading = () => ({
  type: ITEMS_LOADING
});
