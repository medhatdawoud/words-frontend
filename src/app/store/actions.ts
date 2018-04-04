import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './IAppState';
import { WordService } from '../services';
import types from './constants';
import { initialState } from './reducer';

@Injectable()
export class WordActions {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private wordService: WordService
  ) {}

  changeCurrentWord(word = initialState.currentWord) {
    this.ngRedux.dispatch({
      type: types.CHANGE_CURRENT_WORD_SUCCEED,
      payload: word
    });
  }

  getAllWords() {
    this.wordService.getAllWords().subscribe(res => {
      const words = (<any>res).data.words;
      this.ngRedux.dispatch({
        type: types.GET_ALL_WORDS_SUCCEED,
        payload: words
      });
    });
  }

  getWordById(id: string) {
    this.wordService.getWordById(id).subscribe(res => {
      const word = (<any>res).data.word;
      this.ngRedux.dispatch({
        type: types.GET_WORD_BY_ID_SUCCEED,
        payload: word
      });
    });
  }

  updateWord(word) {
    this.wordService.updateWord(word).subscribe(res => {
      this.ngRedux.dispatch({
        type: types.UPDATE_WORD_SUCCEED,
        payload: word
      });
    });
  }

  deleteWord(id) {
    this.wordService.deleteWord(id).subscribe(word => {
      this.ngRedux.dispatch({
        type: types.DELETE_WORD_SUCCEED,
        payload: id
      });
    });
  }

  addWord(word) {
    this.wordService.addNewWord(word).subscribe(res => {
      this.ngRedux.dispatch({
        type: types.ADD_WORD_SUCCEED,
        payload: res.data
      });
    });
  }

  filterWords(search) {
    this.ngRedux.dispatch({
      type: types.SEARCH_WORD_SUCCED,
      payload: search
    });
  }

  sortWords(sortObj) {
    this.ngRedux.dispatch({
      type: types.SORT_WORD_SUCCED,
      payload: sortObj
    });
  }

  changeLocaleLanguage(lang) {
    this.ngRedux.dispatch({
      type: types.CHANGE_LOCALE_LANGUAGE,
      payload: lang
    });
  }
}
