import {combineReducers, applyMiddleware, createStore} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reduxThunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import {composeWithDevTools} from 'redux-devtools-extension';

// reducers
import settingsReducer from './reducers/settingsReducer';
import loadingReducer from './reducers/loadingReducer';
import unsentLocationsActions from './reducers/unsentLocationsReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['settingsState', 'routeState'],
};

// -----------------------------------Nested persist example----------------------------------
// const rootPersistConfig = {
//   key: 'root',
//   storage: storage,
//   blacklist: ['auth']
// }

// const authPersistConfig = {
//   key: 'auth',
//   storage: storage,
//   blacklist: ['somethingTemporary']
// }

const middleware = [reduxThunk];
const combinedReducers = combineReducers({
  settingsState: settingsReducer,
  loadingState: loadingReducer,
  unsentLocations: unsentLocationsActions,
});
const persistedReducer = persistReducer(persistConfig, combinedReducers);

const getStore = () => {
  const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(...middleware)));
  const persistor = persistStore(store);
  return {store, persistor};
};

export default getStore;
