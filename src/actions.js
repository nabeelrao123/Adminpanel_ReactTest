export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';
export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';

export const fetchDataRequest = () => ({
  type: FETCH_DATA_REQUEST
});

export const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data
});

export const fetchDataFailure = (error) => ({
  type: FETCH_DATA_FAILURE,
  payload: error
});

export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item
});

export const deleteItem = (itemId) => ({
  
  type: DELETE_ITEM,
  payload: itemId
});

export const updateItem = (itemId, newItem) => ({
  type: UPDATE_ITEM,
  payload: { itemId, newItem }
});

