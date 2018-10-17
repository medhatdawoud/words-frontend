import { Component, OnInit } from '@angular/core';

import { MultiComponent } from './../';
import { WordService, ValidationService } from '../../services';
// import { NgRedux } from '@angular-redux/store';
import { IAppState, WordActions } from '../../store';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'bw-add-word',
  templateUrl: './add-word.component.html'
})
export class AddWordComponent implements OnInit {
  public addWordForm: FormGroup;
  word: any = {
    id: '',
    lang: '',
    word: '',
    synonym: [],
    type: '',
    pronounce: '',
    description: '',
    soundUrl: '',
    tags: [],
    videos: [],
    examples: [],
    images: [],
    addedAt: '',
    updatedAt: ''
  };
  words = [{
    id: '',
    lang: '',
    word: '',
    synonym: [],
    type: '',
    pronounce: '',
    description: '',
    soundUrl: '',
    tags: [],
    videos: [],
    examples: [],
    images: [],
    addedAt: '',
    updatedAt: ''
  }];
  autoCompleteResult: any = [];
  controlName = false;
  formSubmitted = false;
  addMoreDetails = false;

  constructor(
    private _wordService: WordService,
    // private ngRedux: NgRedux<IAppState>,
    private validationService: ValidationService,
    private wordActions: WordActions,
    private form: FormBuilder
  ) {}

  ngOnInit() {
    // this.ngRedux.select('currentWord').subscribe(data => {
    //   this.word = Object.assign({}, data);

    //   if (
    //     this.word.synonym.length ||
    //     this.word.images.length ||
    //     this.word.examples.length ||
    //     this.word.tags.length
    //   ) {
    //     this.addMoreDetails = true;
    //   } else {
    //     this.addMoreDetails = false;
    //   }
    // });

    // this.ngRedux.select('filteredWords').subscribe(res => {
    //   this.words = (<any>Object).values(res);
    // });
    // Initialize our form
    this.addWordForm = this.form.group({
      word: ['', [Validators.required, this.validationService.wordValidator]],
      pronounce: [
        '',
        [Validators.required, this.validationService.pronounceValidator]
      ],
      description: ['', [Validators.required, Validators.maxLength(300)]],
      multiControl: this.form.group({
        synonym: [
          '',
          [this.validationService.synonymValidator, Validators.maxLength(20)]
        ],
        images: ['', [this.validationService.imageValidator]],
        examples: ['', [Validators.maxLength(100)]],
        tags: ['', [this.validationService.tagsValidator]]
      })
    });

    const autoCompleteSearch = document.querySelector('[formControlName="word"]');
    // Observable.fromEvent(autoCompleteSearch, 'keyup')
    //   .do(event => {
    //     const e = <any>event;
    //     if (e.code === 'Backspace') {
    //       this.search('');
    //     }
    //   })
    //   .debounceTime(600)
    //   .subscribe(e => {
    //     const searchTerm = (<any>e).target.value;
    //     this.search(searchTerm);
    //   });
  }

  saveWord() {
    if (this.addWordForm.valid) {
      if (this.word.id) {
        this.wordActions.updateWord(this.word);
      } else {
        this.wordActions.addWord(this.word);
      }
      this.addMoreDetails = false;
      this.addWordForm.markAsPristine();
      this.closeAddWord();
    } else {
      for (const key in this.addWordForm.controls) {
        if (this.addWordForm.controls[key]) {
          this.addWordForm.controls[key].markAsTouched();
        }
      }
      this.addWordForm.markAsDirty();
    }
    this.formSubmitted = true;
  }

  deleteWord() {
    this.wordActions.deleteWord(this.word.id);
    this.formSubmitted = false;
    this.addMoreDetails = false;
    this.closeAddWord();
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

  matchWord(searchTerm) {
    this.autoCompleteResult = [];

    // TODO: we need to make it from database because later on we will have a lot of words and we
    //       are not able to load all of them into the state
    const matchWords = this.words
      .filter(w => w.word.toLowerCase().startsWith(searchTerm))
      .map(w => {
        return { id: w.id, word: w.word };
      });
    return matchWords;
  }

  search(searchTerm) {
    if (searchTerm) {
      this.autoCompleteResult = this.matchWord(searchTerm.toLowerCase());
    } else {
      this.autoCompleteResult = [];
    }
  }

  loadWord(id) {
    this.autoCompleteResult = [];
    this.wordActions.getWordById(id);
  }

  closeAddWord() {
    const colapsableContainer = document.querySelector(
      '.collapsable-container'
    );
    colapsableContainer.className = colapsableContainer.className.substr(
      0,
      colapsableContainer.className.indexOf(' show')
    );
    this.addMoreDetails = false;
    this.word = {};
    this.addWordForm.markAsPristine();
    this.wordActions.changeCurrentWord(); // reset the form after collapsing it
  }
}
