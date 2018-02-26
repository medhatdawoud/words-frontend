import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { IAppState, store, WordActions } from './store';

import { AppComponent } from './app.component';
import { AddWordComponent, WordListComponent } from './components';
import { WordService, ValidationService } from './services';
import { MultiComponent, ErrorMessageComponent } from './shared/ui-components';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalComponent } from 'app/components/word-list/word-list.component';

// TODO: Update anguar to version 5

@NgModule({
  declarations: [
    AppComponent,
    AddWordComponent,
    WordListComponent,
    MultiComponent,
    ErrorMessageComponent,
    NgbdModalComponent
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
    ValidationService,
    WordActions
  ],
  bootstrap: [AppComponent],

  entryComponents: [NgbdModalComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.provideStore(store);
  }
}
