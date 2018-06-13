import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { EntitiesActions } from '../entities/actions';

import { comment } from './schemas';
import * as ACTIONS from './action-types';
import { COMMENTS_INITIAL_STATE } from './initial-state';

@Injectable()
export class CommentsActions {
  constructor(
    private ngRedux: NgRedux<any>,
    private entitiesActions: EntitiesActions,
  ) {}

  public fetchComments() {
    this.ngRedux.dispatch({
      type: ACTIONS.LOAD,
      loading: true,
    });

    setTimeout(() => {
      this.loadComments(COMMENTS_INITIAL_STATE);
    }, 6000);
  }

  public loadComments(comments) {
    this.ngRedux.dispatch({
      type: ACTIONS.LOAD,
      comments: this.entitiesActions.setEntity(comment, comments),
    });
  }
}
