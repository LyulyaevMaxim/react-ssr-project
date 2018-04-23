import { combineReducers, ReducersMapObject } from 'redux';
import { routerReducer } from 'react-router-redux';

import UserReducer from './user/UserReducer';
import LoadingReducer from './loading/LoadingReducer';
import MetaReducer from './meta/MetaReducer';
import RenderReducer from './render/RenderReducer';

import IStore from './IStore';

const reducers: ReducersMapObject = {
  loadingReducer: LoadingReducer.reducer,
  metaReducer: MetaReducer.reducer,
  renderReducer: RenderReducer.reducer,
  router: routerReducer,
  userReducer: UserReducer.reducer,
};

export default combineReducers<IStore>(reducers);
