import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';

import { StoreModule } from './store/store.module';
import { LoadingModule } from './loading/loading.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(APP_ROUTES),
    StoreModule,
    LoadingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
