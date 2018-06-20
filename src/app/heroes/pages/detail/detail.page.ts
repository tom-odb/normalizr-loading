import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';

import { HeroesDetailActions, heroesDetail, heroesDetailLoading, heroesDetailError } from '../../store';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail.page.html',
})
export class DetailPageComponent implements OnInit, OnDestroy {
  @select(heroesDetail) public hero$: Observable<any>;
  @select(heroesDetailLoading) public loading$: Observable<any>;
  @select(heroesDetailError) public error$: Observable<any>;

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
