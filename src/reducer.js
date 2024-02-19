import { combineReducers } from 'redux';
import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE, ADD_ITEM, DELETE_ITEM, UPDATE_ITEM } from './actions';
import _, { isUndefined } from 'lodash'

const initialState = {
  items: [],
  loading: false,
  error: null
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return { ...state, loading: true };
    case FETCH_DATA_SUCCESS:
      return { ...state, loading: false, items: action.payload, error: null };
    case FETCH_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_ITEM:
      return {
        ...state, items: {
          data: [...state.items.data, {
            id: state.items.data.length + 1, first_name: action.payload.first_name,
            email: action.payload.email, avatar: URL.createObjectURL(action.payload.avatar)
          }]
        }
      };
    case DELETE_ITEM:
      return { ...state, items: { data: state.items.data.filter(item => item.id !== action.payload) } };
    case UPDATE_ITEM:
      return {
        ...state, items: {
          data: state.items.data.map(item => item.id == action.payload.itemId
            ? {
              ...item, first_name: action.payload.newItem.first_name, email: action.payload.newItem.email,
              avatar: _.isObject(action.payload.newItem.avatar) ? URL.createObjectURL(action.payload.newItem.avatar) : action.payload.newItem.avatar
            }
            : item)
        }
      };

    case UPDATE_ITEM:
      return {
        ...state, items: {
          data: state.items.data.map(item => item.id == action.payload.itemId
            ? { ...item, first_name: action.payload.newItem.customerName, email: action.payload.newItem.email }
            : item)
        }
      };

    default:
      return state;
  }
};

export default combineReducers({
  data: dataReducer
});
