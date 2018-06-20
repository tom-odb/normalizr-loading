import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: 'heroes',
    loadChildren: './heroes/heroes.module#HeroesModule',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/heroes',
  },
];
