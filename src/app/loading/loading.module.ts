import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingComponent } from './loading.component';
import { LoadingTemplateComponent } from './loading-template.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    LoadingComponent,
    LoadingTemplateComponent,
  ],
  exports: [
    LoadingComponent,
    LoadingTemplateComponent,
  ],
})
export class LoadingModule { }
