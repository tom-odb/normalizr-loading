import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { combineReducers } from 'redux';

import { reducers } from './store.reducers';

@Injectable()
export class StoreService {
  public asyncReducers = {};

  constructor(
    private ngRedux: NgRedux<any>,
  ) {}

  public createReducer(asyncReducers) {
    return combineReducers({
      ...reducers,
      ...asyncReducers,
    });
  }

  public injectAsyncReducer(name, reducer) {
    this.asyncReducers[name] = reducer;

    this.ngRedux.replaceReducer(this.createReducer(this.asyncReducers));
  }
}
