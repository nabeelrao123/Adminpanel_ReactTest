// store.js
import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import rootReducer from './reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['items']
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(/* any middleware you want to apply */));
const persistor = persistStore(store);


//  const store = createStore(rootReducer, applyMiddleware(thunk));

//  export default store;
// const persistedReducer = persistReducer(persistConfig, reducer);

// const store = createStore(persistedReducer, applyMiddleware(/* any middleware you want to apply */));
// const persistor = persistStore(store);

export { store, persistor };