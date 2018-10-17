import { Component, OnInit, Input } from '@angular/core';
import { IAppState, WordActions, Word } from '../../store';
import { Observable } from 'rxjs/Observable';
import { WordService } from '../../services';
import { OrderByPipe } from '../../pipes';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'bw-word-list',
  templateUrl: './word-list.component.html'
})
export class WordListComponent implements OnInit {
  words = [];
  sort = null;

  constructor(
    private store: Store<IAppState>,
    private wordActions: WordActions,
    private wordService: WordService
  ) {}

  ngOnInit() {
    this.wordActions.getAllWords();
    this.store.pipe(select('words')).subscribe(res => {
      this.words = (<any>Object).values(res.filteredWords);
      this.sort = Object.assign({}, this.sort, res.sort);
    });
  }

  editWord(word) {
    this.wordActions.getWordById(word.id);
    this.openAddWord();
  }

  openAddWord() {
    const collapsableContainer = document.querySelector(
      '.collapsable-container'
    );
    if (collapsableContainer.className.indexOf(' show') === -1) {
      collapsableContainer.className += ' show';
    }
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
        wordNameModal.innerHTML += word.word;
      } else {
        wordNameModal.innerHTML = '';
      }

      if (word.pronounce !== '') {
        wordPronounceModal.innerHTML += word.pronounce;
      } else {
        wordPronounceModal.innerHTML = '';
      }

      if (word.description !== '') {
        wordDescriptionModal.innerHTML += word.description;
      } else {
        wordDescriptionModal.innerHTML = '';
      }

      if (word.synonym.length > 0) {
        for (const syn of word.synonym) {
          wordSynonymModal.innerHTML += syn;
        }
      } else {
        wordSynonymModal.innerHTML = '';
      }

      if (word.images.length > 0) {
        for (const img of word.images) {
          wordImagesModal.innerHTML +=
            ' <img src="' + img + '" width="100px" height="100px"/> ';
          // console.log(img);
        }
      } else {
        wordImagesModal.innerHTML = '';
      }

      if (word.examples.length > 0) {
        for (const exam of word.examples) {
          wordExamplesModal.innerHTML += exam;
        }
      } else {
        wordExamplesModal.innerHTML = '';
      }

      if (word.tags.length > 0) {
        for (const tag of word.tags) {
          wordTagsModal.innerHTML += tag;
        }
      } else {
        wordTagsModal.innerHTML = '';
      }
    });
  }
}
