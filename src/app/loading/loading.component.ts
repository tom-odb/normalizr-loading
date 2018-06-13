import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Subscription } from "rxjs";
import { get, isEqual } from 'lodash-es';
import { NgRedux } from "@angular-redux/store";

import { StateSelector } from "../store/store.types";

@Component({
  selector: 'loading',
  template: `
    <span *ngIf="loading">...</span>
    <ng-content *ngIf="!loading"></ng-content>
  `,
})
export class LoadingComponent implements OnChanges {
  @Input() public selector: StateSelector;

  public loading: boolean = true;
  private subscription: Subscription;

  constructor(
    private ngRedux: NgRedux<any>,
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    const selector = get(changes, 'selector.currentValue', null);

    if (isEqual(selector, get(changes, 'selector.previousValue', null))) {
      return;
    }

    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = this.ngRedux.select(selector)
      .subscribe((loading: boolean) => this.loading = loading);
  }
}
