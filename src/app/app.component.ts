import { Component, OnInit } from '@angular/core';
import {
  AddWordComponent,
  WordListComponent,
  TopMenuComponent
} from './components';
import { IAppState } from './store';

import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { TranslateService } from './translate';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'bw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private apollo: Apollo,
    private store: Store<IAppState>,
    private httpLink: HttpLink,
    // private translate: TranslateService
  ) {
    apollo.create({
      link: httpLink.create({
        uri: 'https://beeswords.herokuapp.com/graphql'
      }),
      cache: new InMemoryCache()
    });
  }

  ngOnInit() {
    this.store.pipe(select('words')).subscribe(res => {
      this.selectLang(<any>res.language);
    });
  }

  isCurrentLang(lang: string) {
    // return lang === this.translate.currentLang;
  }

  selectLang(lang: string) {
    // this.translate.use(lang);
  }
}
