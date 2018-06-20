import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import * as ACTIONS from './action-types';

@Injectable()
export class FooActions {
  constructor(
    private ngRedux: NgRedux<any>
  ) {}

  public setFoo(foo) {
    this.ngRedux.dispatch({
      type: ACTIONS.SET,
      loading: true,
    });

    setTimeout(() => {
      this.ngRedux.dispatch({
        type: ACTIONS.SET,
        foo,
      });
    }, 1000);
  }
}
