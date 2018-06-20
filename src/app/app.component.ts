import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

import { FooActions } from './store/foo/actions';
import { fooResult, fooLoading } from './store/foo/selectors';
import { usersList, usersLoading } from './store/users/selectors';
import { commentsList, commentsLoading } from './store/comments/selectors';
import { heroesList, heroesLoading } from './store/heroes/selectors';
import { UsersActions } from './store/users/actions';
import { CommentsActions } from './store/comments/actions';
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

  public page = 1;

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
    this.heroActions
      .fetchAll({
        offset: (this.page - 1) * 10,
        limit: 10,
      })
      .subscribe();
  }
}
