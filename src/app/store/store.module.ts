import { NgModule } from '@angular/core';
import { NgRedux, NgReduxModule, DevToolsExtension } from '@angular-redux/store';
import { HttpClientModule } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Handler } from './utils/handler';

import { EntitiesActions } from './entities/actions';
import { StoreService } from './store.service';

@NgModule({
  imports: [
    NgReduxModule,
    HttpClientModule,
  ],
  providers: [
    StoreService,
    EntitiesActions,
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
      entities: {},
    };
    this.ngRedux.configureStore(this.storeService.createReducer(this.storeService.asyncReducers), initialState, [], enhancers);
  }
}
