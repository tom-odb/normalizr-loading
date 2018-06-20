import { timer, Subject } from 'rxjs';
import { map, distinctUntilChanged, delay } from 'rxjs/operators';

export class LoadingHandler {
  static STATUS = {
    SHORT: 'SHORT',
    MIDDLE: 'MIDDLE',
    LONG: 'LONG',
  };

  private isLoading$ = new Subject();
  private timer$;

  public isLoading(): Subject<any> {
    return this.isLoading$;
  }

  public startLoading() {
    this.timer$ = timer(0, 1000)
      .pipe(
        delay(1000), // Faster than 1 second --> do nothing
        map((i) => {
          // Faster than 5 seconds --> show middle loading state
          if (i < 5) {
            return LoadingHandler.STATUS.SHORT;
          }

          if (i < 10) {
            return LoadingHandler.STATUS.MIDDLE;
          }

          // Longer than 5 seconds --> show long loading state
          return LoadingHandler.STATUS.LONG;
        }),
        distinctUntilChanged(),
      )
      .subscribe((o) => {
        this.isLoading$.next(o);
      });
  }

  public stopLoading() {
    // Prevent flickering --> show loading icon at least 1 second
    setTimeout(() => {
      this.isLoading$.next(null);
    }, 1000);
  }

  public clearLoader() {
    if (this.timer$) {
      this.timer$.unsubscribe();
    }
  }
}
