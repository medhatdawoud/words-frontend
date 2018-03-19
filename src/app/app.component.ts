import { Component } from '@angular/core';
import { AddWordComponent, WordListComponent } from './components';

import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

@Component({
  selector: 'bw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private apollo: Apollo, private httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({
        uri: 'https://mybeeswords.herokuapp.com/graphql'
      }),
      cache: new InMemoryCache()
    });
  }
}
