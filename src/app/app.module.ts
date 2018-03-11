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
  NgbdModalComponent,
  FilterBarComponent
} from './components';
import { WordService, ValidationService } from './services';
import { LimitLengthDirective } from './directives';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderByPipe } from './pipes';

// TODO: Update anguar to version 5

@NgModule({
  declarations: [
    AppComponent,
    AddWordComponent,
    WordListComponent,
    MultiComponent,
    ErrorMessageComponent,
    NgbdModalComponent,
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
    NgbModule.forRoot()
  ],
  providers: [
    WordService,
    WordActions,
    ValidationService
  ],
  bootstrap: [AppComponent],

  entryComponents: [NgbdModalComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.provideStore(store);
  }
}
