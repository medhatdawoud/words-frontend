import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './IAppState';
import { WordService } from '../services';

export const GET_ALL_WORDS_SUCCEED = "GET_ALL_WORDS_SUCCEED";

@Injectable()
export class WordActions {
    constructor(
        private ngRedux: NgRedux<IAppState>,
        private wordService: WordService
    ) { }

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