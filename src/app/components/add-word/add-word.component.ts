import { Component, OnInit } from '@angular/core';

import { WordService } from '../../services';

@Component({
  selector: 'bw-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.scss']
})
export class AddWordComponent implements OnInit {
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

  word = {
    lang: this.selectedLang.name,
    word: '',
    type: '',
    adjective: '',
    description: '',
    soundUrl: '',
    tags: [],
    videos: [],
    examples: [],
    images: []
  };

  constructor(private _wordService: WordService) { }

  ngOnInit() {
  }

  addWord() {
    this._wordService.addNewWord(this.word)
      .subscribe((res) => {
        console.log(res);
      })
  }

  changeSelectedLanguage(lang){
    this.selectedLang = lang;
  }

}
