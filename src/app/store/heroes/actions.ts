import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { NgRedux } from '@angular-redux/store';

import { EntitiesActions } from '../entities/actions';
import { hero } from './schemas';
import { ACTIONS } from './action-types';
import { HeroRepository } from './repository';
import { Handler } from '../utils/handler';

@Injectable()
export class HeroActions {

  constructor(
    private ngRedux: NgRedux<any>,
    private heroRepository: HeroRepository,
    private entitiesActions: EntitiesActions,
    private handler: Handler,
  ) {}

  public fetchAll(options = null): Observable<any> {
    this.ngRedux.dispatch({
      type: ACTIONS.FETCH_ALL_START,
      loading: true,
    });

    return this.heroRepository.fetchAll(options)
      .pipe(
        tap((response) => {
          this.handler.dispatchSuccess(ACTIONS.FETCH_ALL, {
            heroes: this.entitiesActions.setEntity(hero, response.results),
            pagination: {
              offset: response.offset,
              limit: response.limit,
              total: response.total,
              count: response.count,
            }
          });
        }),
        catchError((error) => {
          this.handler.dispatchError(ACTIONS.FETCH_ALL, {
            message: error.message,
          });

          return of(error);
        }),
        finalize(() => {
          // Use finalize to catch canceled request
          this.handler.dispatchDone(ACTIONS.FETCH_ALL);
        }),
      );
  }

}
