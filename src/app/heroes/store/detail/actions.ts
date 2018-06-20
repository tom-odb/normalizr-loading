import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';

import { HeroRepository } from '../repository';
import { EntitiesActions } from '../../../store/entities/actions';
import { Handler } from '../../../store/utils/handler';

import { hero } from '../schemas';
import { HEROES_DETAIL_ACTIONS as ACTIONS } from './action-types';

@Injectable()
export class HeroesDetailActions {

  constructor(
    private heroRepository: HeroRepository,
    private entitiesActions: EntitiesActions,
    private handler: Handler,
  ) {}

  public fetchById(id: string): Observable<any> {
    this.handler.dispatchStart(ACTIONS.FETCH);

    return this.heroRepository.fetchById(id)
      .pipe(
        tap((response) => {
          this.handler.dispatchSuccess(ACTIONS.FETCH, {
            hero: this.entitiesActions.setEntity(hero, response.results)[0],
          });
        }),
        catchError((error) => {
          this.handler.dispatchError(ACTIONS.FETCH, {
            message: error.message,
          });

          return of(error);
        }),
        finalize(() => {
          this.handler.dispatchDone(ACTIONS.FETCH);
        }),
      );
  }

  public clear(): void {
    this.handler.dispatch(ACTIONS.CLEAR);
  }
}
