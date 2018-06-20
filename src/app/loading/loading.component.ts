import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { timer, Subject } from 'rxjs';
import { map, distinctUntilChanged, delay } from 'rxjs/operators';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
})
export class LoadingComponent implements OnChanges {
  @Input() public loading = true;
  @Output() public cancel = new EventEmitter();

  public isLoading$ = new Subject();
  public status = {
    SHORT: 'SHORT',
    MIDDLE: 'MIDDLE',
    LONG: 'LONG',
  };
  private timer$;

  public ngOnChanges() {
    if (this.timer$) {
      this.timer$.unsubscribe();
    }

    if (this.loading) {
      this.timer$ = timer(0, 1000)
        .pipe(
          delay(1000), // Faster than 1 second --> do nothing
          map((i) => {

            // Faster than 2 seconds --> show short loading state
            if (i < 2) {
              return this.status.SHORT;
            }

            // Faster than 5 seconds --> show middle loading state
            if (i < 5) {
              return this.status.MIDDLE;
            }

            // Longer than 5 seconds --> show long loading state
            return this.status.LONG;
          }),
          distinctUntilChanged(),
        )
        .subscribe((o) => {
          this.isLoading$.next(o);
        });
    } else {
      // Prevent flickering --> show loading icon at least 1 second
      setTimeout(() => {
        this.isLoading$.next(null);
      }, 1000);
    }
  }

  public emitCancel() {
    this.cancel.emit();
  }
}
