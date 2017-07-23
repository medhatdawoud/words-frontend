import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AddWordComponent, WordListComponent } from './components';
import { WordService } from './services';
import { MultiImagesComponent } from './shared/ui-components';

@NgModule({
  declarations: [
    AppComponent,
    AddWordComponent,
    WordListComponent,
    MultiImagesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    WordService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
