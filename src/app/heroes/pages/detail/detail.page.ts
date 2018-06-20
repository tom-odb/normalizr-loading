import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';

import { heroesSelector, HeroesDetailActions } from '../../store';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail.page.html',
})
export class DetailPageComponent implements OnInit, OnDestroy {
  @select(heroesSelector.detail.result) public hero$: Observable<any>;
  @select(heroesSelector.detail.loading) public loading$: Observable<any>;
  @select(heroesSelector.detail.error) public error$: Observable<any>;

  private isFetching;

  constructor(
    private heroActions: HeroesDetailActions,
    private route: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    this.fetchHero();
  }

  public ngOnDestroy(): void {
    this.cancelFetch();
    this.heroActions.clear();
  }

  public fetchHero() {
    this.cancelFetch();

    this.isFetching = this.heroActions
      .fetchById(this.route.snapshot.params.id)
      .subscribe();
  }

  public cancelFetch() {
    if (this.isFetching) {
      this.isFetching.unsubscribe();
    }
  }
}
