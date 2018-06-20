import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';

import { EntitiesActions } from '../../../store/entities/actions';
import { Handler } from '../../../store/utils/handler';

import { HeroRepository } from '../repository';
import { hero } from '../schemas';
import { HEROES_LIST_ACTIONS as ACTIONS } from './action-types';

@Injectable()
export class HeroesListActions {

  constructor(
    private heroRepository: HeroRepository,
    private entitiesActions: EntitiesActions,
    private handler: Handler,
  ) {}

  public fetchAll(options?): Observable<any> {
    this.handler.dispatchStart(ACTIONS.FETCH_ALL);

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
