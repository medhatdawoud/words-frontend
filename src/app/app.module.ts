import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AddWordComponent } from './components/add-word/add-word.component';
import { WordListComponent } from './components/word-list/word-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddWordComponent,
    WordListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
