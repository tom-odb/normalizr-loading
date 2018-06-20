import { Component } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

import { heroesSelector, HeroesListActions } from '../../store';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview.page.html',
})
export class OverviewPageComponent {
  @select(heroesSelector.list.result) public heroes$: Observable<any>;
  @select(heroesSelector.list.loading) public heroesLoading$: Observable<any>;
  @select(heroesSelector.list.pagination) public heroesPagination$: Observable<any>;
  @select(heroesSelector.list.error) public heroesError$: Observable<any>;
  @select(heroesSelector.list.meta) public meta$: Observable<any>;

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
