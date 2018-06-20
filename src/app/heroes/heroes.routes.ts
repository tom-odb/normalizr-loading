import { Routes } from "@angular/router";
import { OverviewPage } from "./pages/overview/overview.page";
import { DetailPage } from "./pages/detail/detail.page";

export const HEROES_ROUTES: Routes = [
  {
    path: '',
    component: OverviewPage,
  },
  {
    path: ':id',
    component: DetailPage,
  },
];
