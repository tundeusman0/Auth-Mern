import axios from 'axios';
import { GET_ITEMS, ADD_ITEMS, DELETE_ITEMS, ITEMS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getItems = () => dispatch => {
  dispatch(setItemLoading());
  axios
    .get('/api/items')
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    )
    .catch(error => {
      console.log(error);
      dispatch(returnErrors("couldn't get errors", 400));
    });
};

export const startDeleteItem = payload => ({
  type: DELETE_ITEMS,
  payload
});

export const deleteItem = id => (dispatch, getState) => {
  axios
    .delete(`/api/items/${id}`, tokenConfig(getState))
    .then(res => dispatch(startDeleteItem(id)))
    .catch(error => {
      console.log(error);
      dispatch(returnErrors("couldn't get errors", 400));
    });
};
export const startAddItem = payload => ({
  type: ADD_ITEMS,
  payload
});
export const addItem = payload => (dispatch, getState) => {
  axios
    .post('/api/items', payload, tokenConfig(getState))
    .then(res => dispatch(startAddItem(res.data)))
    .catch(error => {
      console.log(error);
      dispatch(returnErrors("couldn't get errors", 400));
    });
};
export const setItemLoading = () => ({
  type: ITEMS_LOADING
});
