import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import taskReducer from "../features/taskSlice";
import labelReducer from "../features/labelSlice";
import projectReducer from "../features/projectSlice";
import globalReducer from "../features/globalSlice";
import authReducer from "../features/authSlice";
import socketReducer from "../features/socketSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducers = combineReducers({
  label: labelReducer,
  project: projectReducer,
  task: taskReducer,
  global: globalReducer,
  auth: authReducer,
  socket: socketReducer
});

// const myReduxStoreEnhancer = () => (createStore) => (reducer, preloadedState) => {
//   const store = createStore(reducer, preloadedState);
//   let pendingActions = [];
//   const dispatch = async(action) => {
//     let actionReturned;
//     console.log("%c:: MY-REDUX-STORE-ENHANCER :: Action ::", 'background:#006964; color:#fff', action);
//
//     if(action.type === 'YOU_ARE_ONLINE') {
//
//     }
//
//     actionReturned = store.dispatch(action);
//
//     return actionReturned;
//   }
// };

// const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: reducers,
  // middleware: getDefaultMiddleware({
  //   serializableCheck: {
  //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //   },
  // }),
  preloadedState: JSON.parse(window.localStorage.getItem('persistedStore')) || {},
  devTools: process.env.NODE_ENV !== 'production',
});

store.subscribe(() => {
  // console.log("%c:: MY-REDUX-STORE-ENHANCER :: State from Subscribe ::", 'background:#006964; color:#fff', store.getState());
  localStorage.setItem('persistedStore', JSON.stringify(store.getState()));
  // console.log("%c::::: PERSISTING STORE :::::", 'background:#fff; color:red');
});

// export const persistor = persistStore(store);

export default store;
