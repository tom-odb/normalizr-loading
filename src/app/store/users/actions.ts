import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { EntitiesActions } from '../entities/actions';

import { user } from './schemas';
import * as ACTIONS from './action-types';
import { USERS_INITIAL_STATE } from './initial-state';

@Injectable()
export class UsersActions {
  constructor(
    private ngRedux: NgRedux<any>,
    private entitiesActions: EntitiesActions,
  ) {}

  public fetchUsers() {
    this.ngRedux.dispatch({
      type: ACTIONS.LOAD,
      loading: true,
    });

    setTimeout(() => {
      this.loadUsers(USERS_INITIAL_STATE);
    }, 5000);
  }

  public loadUsers(users) {
    this.ngRedux.dispatch({
      type: ACTIONS.LOAD,
      users: this.entitiesActions.setEntity(user, users),
    });
  }
}
