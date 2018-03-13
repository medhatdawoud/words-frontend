import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { IAppState, store, WordActions } from './store';

import { AppComponent } from './app.component';
import {
  AddWordComponent,
  WordListComponent,
  MultiComponent,
  ErrorMessageComponent,
  FilterBarComponent
} from './components';
import { WordService, ValidationService } from './services';
import { LimitLengthDirective } from './directives';

import { OrderByPipe } from './pipes';

// TODO: Update anguar to version 5

@NgModule({
  declarations: [
    AppComponent,
    AddWordComponent,
    WordListComponent,
    MultiComponent,
    ErrorMessageComponent,
    LimitLengthDirective,
    FilterBarComponent,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    NgReduxModule,
    ReactiveFormsModule,
  ],
  providers: [
    WordService,
    WordActions,
    ValidationService
  ],
  bootstrap: [AppComponent],

})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.provideStore(store);
  }
}
