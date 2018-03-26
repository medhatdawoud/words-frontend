import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HttpClientModule } from '@angular/common/http';
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';

import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { IAppState, store, WordActions } from './store';

import { TRANSLATION_PROVIDERS, TranslatePipe, TranslateService } from './translate';

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
    OrderByPipe,
    TranslatePipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    FormsModule,
    NgReduxModule,
    ReactiveFormsModule,
  ],
  providers: [
    WordService,
    WordActions,
    ValidationService,
    TRANSLATION_PROVIDERS,
    TranslateService
  ],
  bootstrap: [AppComponent],

})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.provideStore(store);
  }
}
