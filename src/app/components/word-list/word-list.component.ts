import { Component, OnInit } from '@angular/core';

import { WordService } from '../../services';

@Component({
  selector: 'bw-word-list',
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.scss']
})
export class WordListComponent implements OnInit {
  words = [];

  constructor(private _wordService: WordService) { }

  ngOnInit() {
    this._wordService.getAllWords()
      .subscribe((allWords) => {
        this.words = allWords.data;
      });
  }

  editWord(word) {
    console.log(word);
  }

}
