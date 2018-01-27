import { Component, OnInit } from '@angular/core';

import { MultiComponent } from './../../shared/ui-components';
import { WordService, ValidationService } from '../../services';
import { NgRedux } from '@angular-redux/store';
import { IAppState, WordActions } from '../../store';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'bw-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.scss']
})
export class AddWordComponent implements OnInit {
  public userForm: FormGroup;
  word: any;

  languages = [{
    name: 'Arabic',
    code: 'ar_EG'
  }, {
    name: 'English',
    code: 'en_US'
  }, {
    name: 'Dutch',
    code: 'nl_NL'
  }];

  selectedLang = this.languages[1];

  constructor(private _wordService: WordService,
    private ngRedux: NgRedux<IAppState>,
    private validationService: ValidationService,
    private wordActions: WordActions, private formBuilder: FormBuilder) {
  }

  ngOnInit() {

    this.ngRedux.select('currentWord')
      .subscribe(data => {
        this.word = Object.assign({}, data);
      });
    // Initialize our form
    this.userForm = this.formBuilder.group({
      'word': ['', Validators.compose([Validators.required, this.validationService.wordValidator])],
      'pronounce': ['', Validators.compose([Validators.required, this.validationService.pronounceValidator])],
      'description': ['', Validators.compose([Validators.required, Validators.maxLength(300)])],
      'multiControl': this.formBuilder.group({
        'synonym': ['', Validators.compose([this.validationService.synonymValidator, Validators.maxLength(20)])],
        'images': ['', Validators.compose([Validators.required, this.validationService.imageValidator])],
        'examples': ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
        'tags': ['', Validators.compose([Validators.required, this.validationService.tagsValidator])],

      })
    });

  }

  saveWord() {
    if (this.userForm.valid) {
      if (this.word._id) {
        this.wordActions.updateWord(this.word);
      } else {
        this.wordActions.addWord(this.word);
      }
    }
  }
  deleteWord() {
    this.wordActions.deleteWord(this.word._id);
  }

  changeSelectedLanguage(lang) {
    this.selectedLang = lang;
  }

  autoResize() {
    const textArea = document.getElementById('resizableTextarea');
    textArea.style.overflow = 'hidden';
    textArea.style.height = '116px';
    const height = textArea.style.height;
    // tslint:disable-next-line:radix
    if (textArea.scrollHeight >= parseInt(height.substr(0, height.length - 2))) {
      textArea.style.height = textArea.scrollHeight + 30 + 'px';
    }
  }

}
