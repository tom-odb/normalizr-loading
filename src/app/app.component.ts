import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

import { heroesList } from './store/heroes/selectors';
import { HeroActions } from './store/heroes/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @select(heroesList) public heroes$: Observable<any>;
  @select(['heroes']) public meta$: Observable<any>;
  @select(['heroes', 'loading']) public heroesLoading$: Observable<any>;
  @select(['heroes', 'pagination']) public heroesPagination$: Observable<any>;
  @select(['heroes', 'error']) public heroesError$: Observable<any>;

  public page = 1;
  private isFetching;

  constructor(
    private heroActions: HeroActions,
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
