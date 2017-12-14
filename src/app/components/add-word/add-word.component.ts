import { Component, OnInit } from '@angular/core';

import { MultiComponent, PatternComponent } from './../../shared';
import { WordService } from '../../services';
import { NgRedux } from '@angular-redux/store';
import { IAppState, WordActions } from '../../store';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'bw-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.scss']
})
export class AddWordComponent implements OnInit {
  word: any;
  userForm: any;

 /*bw-pattern="pattern.imgUrl"
  patterns = {
    imgUrl: "^https?://(?:[a-z0-9\-]+\.)+[a-z0-9]{2,6}(?:/[^/#?]+)+\.(?:jpg|gif|png|jpeg|svg)$"
  };*/

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
    private ngRedux: NgRedux<IAppState>,
    private wordActions: WordActions,private formBuilder: FormBuilder) {
      this.userForm = this.formBuilder.group({
        'pronounce': ['', [Validators.required,Validators.pattern('^[a-z-]+$')]]
      });
     }

  ngOnInit() {
    this.ngRedux.select('currentWord')
      .subscribe(data => {
        this.word = Object.assign({}, data);
      });
  }

  saveWord() {
    if (this.word._id) {
      this.wordActions.updateWord(this.word);
    } else {
      this.wordActions.addWord(this.word);
    }
  }

  deleteWord() {
    this.wordActions.deleteWord(this.word._id);
  }

  changeSelectedLanguage(lang) {
    this.selectedLang = lang;
  }

}
