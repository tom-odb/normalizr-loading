import { Routes } from '@angular/router';
import { OverviewPageComponent } from './pages/overview/overview.page';
import { DetailPageComponent } from './pages/detail/detail.page';

export const HEROES_ROUTES: Routes = [
  {
    path: '',
    component: OverviewPageComponent,
  },
  {
    path: ':id',
    component: DetailPageComponent,
  },
];
