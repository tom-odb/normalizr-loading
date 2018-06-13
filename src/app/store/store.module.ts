import { NgModule } from '@angular/core';
import { NgRedux, NgReduxModule, DevToolsExtension } from '@angular-redux/store';

import { environment } from '../../environments/environment';

import { FooActions } from './foo/actions';
import { EntitiesActions } from './entities/actions';
import { UsersActions } from './users/actions';
import { CommentsActions } from './comments/actions';
import { StoreService } from './store.service';

@NgModule({
  imports: [
    NgReduxModule,
  ],
  providers: [
    StoreService,
    FooActions,
    EntitiesActions,
    UsersActions,
    CommentsActions,
  ],
})
export class StoreModule {
  constructor(
    private ngRedux: NgRedux<any>,
    private devTools: DevToolsExtension,
    private storeService: StoreService,
  ) {
    const enhancers = !environment.production && this.devTools.isEnabled() ? [this.devTools.enhancer()] : [];

    const initialState = {
      entities: {
        comments: {},
        users: {},
      },
      comments: [],
      users: [],
    };
    this.ngRedux.configureStore(this.storeService.createReducer(this.storeService.asyncReducers), initialState, [], enhancers);
  }
}
