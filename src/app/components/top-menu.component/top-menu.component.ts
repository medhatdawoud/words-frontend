import { Component, OnInit } from '@angular/core';

import { IAppState, WordActions } from '../../store';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'bw-top-menu',
  templateUrl: './top-menu.component.html'
})
export class TopMenuComponent implements OnInit {
  languages = [
    {
      name: 'العربية',
      code: 'ar_EG'
    },
    {
      name: 'English',
      code: 'en_US'
    },
    {
      name: 'Nederlands',
      code: 'nl_NL'
    }
  ];

  selectedLang = null;

  constructor(
    private store: Store<IAppState>,
    private wordActions: WordActions
  ) {}

  ngOnInit() {
    this.store.pipe(select('language')).subscribe(data => {
      this.selectedLang = this.languages.filter(
        item => item.code.split('_')[0] === data
      )[0];
    });
  }

  changeSelectedLanguage(lang) {
    const code = lang.code.split('_')[0];
    this.wordActions.changeLocaleLanguage(code);

    // presisting the choice in sessionStorage
    sessionStorage.setItem('language', code);
    location.reload();
  }

  openAddWord() {
    const collapsableContainer = document.querySelector(
      '.collapsable-container'
    );
    if (collapsableContainer.className.indexOf(' show') === -1) {
      collapsableContainer.className += ' show';
    }
  }
}
