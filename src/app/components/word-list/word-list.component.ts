import { Component, OnInit } from '@angular/core';
import { store, IAppState, WordActions } from '../../store';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Word } from '../IWord';

import { WordService } from '../../services';

@Component({
  selector: 'bw-word-list',
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.scss']
})
export class WordListComponent implements OnInit {
  @select('words') words$: Observable<Word>;
  words = [];

  constructor(private ngRedux: NgRedux<IAppState>, private wordActions: WordActions, private _wordService: WordService) {
  }

  ngOnInit() {
    this.wordActions.getAllWords();
    // this._wordService.getAllWords()
    //   .subscribe((allWords) => {
    //     this.words = allWords.data;
    //   });
  }

  editWord(word) {
    this.wordActions.changeCurrentWord(word);
  }

}
