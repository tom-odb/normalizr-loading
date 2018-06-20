import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { LoadingHandler } from './loading-handler.class';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnChanges {
  @Input() public loading = true;
  @Output() public cancel = new EventEmitter();

  public loader = new LoadingHandler();
  public isLoading$ = this.loader.isLoading();

  public ngOnChanges() {
    this.loader.clearLoader();

    if (this.loading) {
      this.loader.startLoading();
    } else {
      this.loader.stopLoading();
    }
  }

  public emitCancel() {
    this.cancel.emit();
  }
}
