import { Component, OnInit } from '@angular/core';

import { MultiComponent } from './../../shared/ui-components';
import { WordService } from '../../services';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'bw-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.scss']
})
export class AddWordComponent implements OnInit {
  word: any;

  languages = [{
    name: "Arabic",
    code: "ar_EG"
  }, {
    name: "English",
    code: "en_US"
  }, {
    name: "Dutch",
    code: "nl_NL"
  }];

  selectedLang = this.languages[1];

  constructor(private _wordService: WordService,
    private ngRedux: NgRedux<IAppState>) {
    ngRedux.select('currentWord')
      .subscribe(data => {
        this.word = data;
      });;
  }

  ngOnInit() { }

  addWord() {
    if (this.word._id) {
      console.log(this.word._id);
    } else {
      this._wordService.addNewWord(this.word)
        .subscribe((res) => {
          console.log(res);
        });
    }
  }

  changeSelectedLanguage(lang) {
    this.selectedLang = lang;
  }

}
