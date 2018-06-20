import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

@Injectable()
export class Handler {
  public SUCCESS = 'SUCCESS';
  public ERROR = 'ERROR';
  public DONE = 'DONE';

  constructor(
    private ngRedux: NgRedux<any>,
  ) {}

  public dispatchSuccess(action, payload) {
    this.ngRedux.dispatch({
      type: `${action}/${this.SUCCESS}`,
      ...payload,
    });
  }

  public dispatchError(action, payload) {
    this.ngRedux.dispatch({
      type: `${action}/${this.ERROR}`,
      ...payload,
    });
  }

  public dispatchDone(action) {
    this.ngRedux.dispatch({
      type: `${action}/${this.DONE}`,
    });
  }
}