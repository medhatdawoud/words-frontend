import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './IAppState';
import { WordService } from '../services';
import types from './constants';

@Injectable()
export class WordActions {
    constructor(
        private ngRedux: NgRedux<IAppState>,
        private wordService: WordService
    ) { }

    changeCurrentWord(word) {
        this.ngRedux.dispatch({
            type: types.CHANGE_CURRENT_WORD_SUCCEED,
            payload: word
        });
    }

    getAllWords() {
        this.wordService.getAllWords()
            .subscribe(words => {
                this.ngRedux.dispatch({
                    type: types.GET_ALL_WORDS_SUCCEED,
                    payload: words.data
                })
            });
    }

    updateWord(word) {
        this.wordService.updateWord(word)
            .subscribe(res => {
                this.ngRedux.dispatch({
                    type: types.UPDATE_WORD_SUCCEED,
                    payload: word
                })
            });
    }

    deleteWord(id) {
        this.wordService.deleteWord(id)
            .subscribe(word => {
                this.ngRedux.dispatch({
                    type: types.DELETE_WORD_SUCCEED,
                    payload: id
                })
            });
    }

    addWord(word) {
        this.wordService.addNewWord(word)
            .subscribe(res => {
                this.ngRedux.dispatch({
                    type: types.ADD_WORD_SUCCEED,
                    payload: res.data
                })
            });
    }
}