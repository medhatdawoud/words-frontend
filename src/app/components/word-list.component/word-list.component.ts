import { Component, OnInit, Input } from '@angular/core';
import { store, IAppState, WordActions, Word } from '../../store';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { WordService } from '../../services';
import { OrderByPipe } from '../../pipes';

@Component({
  selector: 'bw-word-list',
  templateUrl: './word-list.component.html'
})
export class WordListComponent implements OnInit {
  words = [];
  sort = null;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private wordActions: WordActions,
    private wordService: WordService
  ) {}

  ngOnInit() {
    this.wordActions.getAllWords();
    this.ngRedux.select('filteredWords').subscribe(res => {
      this.words = (<any>Object).values(res);
    });
    this.ngRedux.select('sort').subscribe(res => {
      this.sort = Object.assign({}, this.sort, res);
    });
  }

  editWord(word) {
    this.wordActions.getWordById(word.id);
  }

  wordDetialsModal(w) {
    this.wordService.getWordById(w.id).subscribe(res => {
      const word = (<any>res).data.word;

      const wordNameModal = document.getElementById('wordName');
      const wordSynonymModal = document.getElementById('wordSynonym');
      const wordPronounceModal = document.getElementById('wordPronounce');
      const wordDescriptionModal = document.getElementById('wordDescription');
      const wordImagesModal = document.getElementById('wordImages');
      const wordExamplesModal = document.getElementById('wordExamples');
      const wordTagsModal = document.getElementById('wordTags');

      if (word.word !== '') {
        wordNameModal.innerHTML = 'Word :' + word.word;
      } else {
        wordNameModal.innerHTML = '';
      }

      if (word.pronounce !== '') {
        wordPronounceModal.innerHTML = 'Pronounce :' + word.pronounce;
      } else {
        wordPronounceModal.innerHTML = '';
      }

      if (word.description !== '') {
        wordDescriptionModal.innerHTML = 'Description :' + word.description;
      } else {
        wordDescriptionModal.innerHTML = '';
      }

      if (word.synonym.length > 0) {
        wordSynonymModal.innerHTML = 'Synonym : ';
        for (const syn of word.synonym) {
          wordSynonymModal.innerHTML += syn;
        }
      } else {
        wordSynonymModal.innerHTML = '';
      }

      if (word.images.length > 0) {
        wordImagesModal.innerHTML = 'Images : ';
        for (const img of word.images) {
          wordImagesModal.innerHTML +=
            ' <img src="' + img + '" width="100px" height="100px"/> ';
          // console.log(img);
        }
      } else {
        wordImagesModal.innerHTML = '';
      }

      if (word.examples.length > 0) {
        wordExamplesModal.innerHTML = 'Examples : ';
        for (const exam of word.examples) {
          wordExamplesModal.innerHTML += exam;
        }
      } else {
        wordExamplesModal.innerHTML = '';
      }

      if (word.tags.length > 0) {
        wordTagsModal.innerHTML = 'Tags : ';
        for (const tag of word.tags) {
          wordTagsModal.innerHTML += tag;
        }
      } else {
        wordTagsModal.innerHTML = '';
      }
    });
  }
}
