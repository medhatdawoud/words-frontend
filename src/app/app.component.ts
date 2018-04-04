import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
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

@Component({
  selector: 'bw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private apollo: Apollo,
    private ngRedux: NgRedux<IAppState>,
    private httpLink: HttpLink,
    private translate: TranslateService
  ) {
    apollo.create({
      link: httpLink.create({
        uri: 'https://mybeeswords.herokuapp.com/graphql'
      }),
      cache: new InMemoryCache()
    });
  }

  ngOnInit() {
    this.ngRedux.select('language').subscribe(lang => {
      this.selectLang(<any>lang);
    });
  }

  isCurrentLang(lang: string) {
    return lang === this.translate.currentLang;
  }

  selectLang(lang: string) {
    this.translate.use(lang);
  }
}
