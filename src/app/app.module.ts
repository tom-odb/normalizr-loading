import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StoreModule } from './store/store.module';
import { LoadingModule } from './loading/loading.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule,
    LoadingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
