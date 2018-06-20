import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { LoadingModule } from "../loading/loading.module";
import { StoreService } from "../store/store.service";

import { HEROES_ROUTES } from './heroes.routes';
import { Pages } from "./pages";
import { HeroesProviders, heroesReducers } from "./store";

@NgModule({
  imports: [
    CommonModule,
    LoadingModule,
    RouterModule.forChild(HEROES_ROUTES),
  ],
  declarations: [
    Pages,
  ],
  providers: [
    HeroesProviders,
  ],
})
export class HeroesModule {
  constructor(
    private storeService: StoreService,
  ) {
    this.storeService.injectAsyncReducer('heroes', heroesReducers);
  }
}
