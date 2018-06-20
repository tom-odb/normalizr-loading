import { Component } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

import { heroesList, heroesListLoading, heroesListPagination, HeroesListActions, heroesListError } from '../../store';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview.page.html',
})
export class OverviewPageComponent {
  @select(heroesList) public heroes$: Observable<any>;
  @select(heroesListLoading) public heroesLoading$: Observable<any>;
  @select(heroesListPagination) public heroesPagination$: Observable<any>;
  @select(heroesListError) public heroesError$: Observable<any>;
  @select(['heroes']) public meta$: Observable<any>;

  public page = 1;
  private isFetching;

  constructor(
    private heroActions: HeroesListActions,
  ) { }

  public ngOnInit(): void {
    this.fetchHeroes();
  }

  public prev() {
    if (this.page > 1) {
      this.page = this.page > 1 ? this.page - 1 : 1;
      this.fetchHeroes();
    }
  }

  public next() {
    this.page = this.page + 1;
    this.fetchHeroes();
  }

  public fetchHeroes() {
    this.cancelFetch();

    this.isFetching = this.heroActions
      .fetchAll({
        offset: (this.page - 1) * 10,
        limit: 10,
      })
      .subscribe();
  }

  public cancelFetch() {
    if (this.isFetching) {
      this.isFetching.unsubscribe();
    }
  }
}
