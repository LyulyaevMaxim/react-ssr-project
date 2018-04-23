import { RouterState } from 'react-router-redux';
import { Reducer } from 'redux';

import ILoadingReducerState from './loading/ILoadingReducerState';
import IMetaReducerState from './meta/IMetaReducerState';
import IUserReducerState from './user/IUserReducerState';
import IRenderReducerState from './render/IRenderReducerState';

interface IStore {
  readonly loadingReducer: ILoadingReducerState;
  readonly metaReducer: IMetaReducerState;
  readonly renderReducer: IRenderReducerState;
  readonly router: Reducer<RouterState>;
  readonly userReducer: IUserReducerState;
}

export default IStore;
