import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { IAppState, store, WordActions } from './store';

import { AppComponent } from './app.component';
import { AddWordComponent, WordListComponent } from './components';
import { WordService } from './services';
import { MultiComponent, PatternComponent } from './shared';

@NgModule({
  declarations: [
    AppComponent,
    AddWordComponent,
    WordListComponent,
    MultiComponent,
    PatternComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    NgReduxModule
  ],
  providers: [
    WordService,
    WordActions
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.provideStore(store);
  }
}
