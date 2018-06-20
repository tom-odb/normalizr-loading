import { NgModule } from '@angular/core';
import { NgRedux, NgReduxModule, DevToolsExtension } from '@angular-redux/store';
import { HttpClientModule } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Handler } from './utils/handler';

import { FooActions } from './foo/actions';
import { EntitiesActions } from './entities/actions';
import { UsersActions } from './users/actions';
import { CommentsActions } from './comments/actions';
import { HeroActions } from './heroes/actions';
import { HeroRepository } from './heroes/repository';
import { StoreService } from './store.service';

@NgModule({
  imports: [
    NgReduxModule,
    HttpClientModule,
  ],
  providers: [
    StoreService,
    FooActions,
    EntitiesActions,
    UsersActions,
    CommentsActions,
    HeroActions,
    HeroRepository,
    Handler,
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
