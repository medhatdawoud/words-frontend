import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './IAppState';
import { WordService } from '../services';

export const GET_ALL_WORDS_SUCCEED = "GET_ALL_WORDS_SUCCEED";
export const CHANGE_CURRENT_WORD_SUCCEED = "CHANGE_CURRENT_WORD_SUCCEED";

@Injectable()
export class WordActions {
    constructor(
        private ngRedux: NgRedux<IAppState>,
        private wordService: WordService
    ) { }

    changeCurrentWord(word) {
        this.ngRedux.dispatch({
            type: CHANGE_CURRENT_WORD_SUCCEED,
            payload: word
        });
    }

    getAllWords() {
        this.wordService.getAllWords()
            .subscribe(words => {
                this.ngRedux.dispatch({
                    type: GET_ALL_WORDS_SUCCEED,
                    payload: words.data
                })
            });
    }
}