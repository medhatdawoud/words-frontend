import { Component, OnInit } from '@angular/core';

import { MultiComponent } from './../';
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
  public addWordForm: FormGroup;
  word: any;
  controlName = false;

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
    this.addWordForm = this.formBuilder.group({
      'word': ['', Validators.compose([Validators.required, this.validationService.wordValidator])],
      'pronounce': ['', Validators.compose([Validators.required, this.validationService.pronounceValidator])],
      'description': ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      'multiControl': this.formBuilder.group({
        'synonym': ['', Validators.compose([this.validationService.synonymValidator, Validators.maxLength(20)])],
        'images': ['', Validators.compose([this.validationService.imageValidator])],
        'examples': ['', Validators.compose([Validators.maxLength(100)])],
        'tags': ['', Validators.compose([this.validationService.tagsValidator])],
      })
    });

  }

  saveWord() {
    for (const key in this.addWordForm.controls) {
      if (!this.addWordForm.contains['multiControl'] && this.addWordForm.controls[key].valid) {
        this.controlName = true;
      }
    }
    if (this.word.images.length >= 1 && this.word.examples.length >= 1 && this.word.tags.length >= 1 && this.controlName) {
      if (this.word._id) {
        this.wordActions.updateWord(this.word);
      } else {
        this.wordActions.addWord(this.word);
      }
    } else {
      for (const key in this.addWordForm.controls) {
        if (this.addWordForm.controls[key]) {
          this.addWordForm.controls[key].markAsTouched();
        }
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
