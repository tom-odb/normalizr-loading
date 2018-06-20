import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingComponent } from './loading.component';
import { IsLoadingComponent } from './is-loading.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    LoadingComponent,
    IsLoadingComponent,
  ],
  exports: [
    LoadingComponent,
    IsLoadingComponent,
  ],
})
export class LoadingModule { }
