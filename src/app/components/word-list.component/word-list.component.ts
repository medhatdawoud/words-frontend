import { Component, OnInit, Input } from '@angular/core';
import { store, IAppState, WordActions, Word } from '../../store';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { WordService } from '../../services';
import { OrderByPipe } from '../../pipes';

@Component({
  selector: 'bw-word-list',
  templateUrl: './word-list.component.html',
})
export class WordListComponent implements OnInit {
  words = [];
  sort = null;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private wordActions: WordActions,
    private _wordService: WordService,
  ) {
  }

  ngOnInit() {
    this.wordActions.getAllWords();
    this.ngRedux.select('filteredWords')
      .subscribe(res => {
        this.words = (<any>Object).values(res);
      });
    this.ngRedux.select('sort')
      .subscribe(res => {
        this.sort = Object.assign({}, this.sort, res);
      });
  }

  editWord(word) {
    this.wordActions.changeCurrentWord(word);
  }

  wordDetialsModal(w) {
    const wordNameModal = document.getElementById('wordName');
    const wordSynonymModal = document.getElementById('wordSynonym');
    const wordPronounceModal = document.getElementById('wordPronounce');
    const wordDescriptionModal = document.getElementById('wordDescription');
    const wordImagesModal = document.getElementById('wordImages');
    const wordExamplesModal = document.getElementById('wordExamples');
    const wordTagsModal = document.getElementById('wordTags');

    if (w.word !== '') {
      wordNameModal.innerHTML = 'Word :' + w.word;
    } else {
      wordNameModal.innerHTML = '';
    }

    if (w.pronounce !== '') {
      wordPronounceModal.innerHTML = 'Pronounce :' + w.pronounce;
    } else {
      wordPronounceModal.innerHTML = '';
    }

    if (w.description !== '') {
      wordDescriptionModal.innerHTML = 'Description :' + w.description;
    } else {
      wordDescriptionModal.innerHTML = '';
    }

    if (w.synonym.length > 0) {
      wordSynonymModal.innerHTML = 'Synonym : ';
      for (const syn of w.synonym) {
        wordSynonymModal.innerHTML += syn;
      }
    } else {
      wordSynonymModal.innerHTML = '';
    }

    if (w.images.length > 0) {
      wordImagesModal.innerHTML = 'Images : ';
      for (const img of w.images) {
        wordImagesModal.innerHTML += ' <img src="' + img + '" width="100px" height="100px"/> ';
        console.log(img);
      }
    } else {
      wordImagesModal.innerHTML = '';
    }

    if (w.examples.length > 0) {
      wordExamplesModal.innerHTML = 'Examples : ';
      for (const exam of w.examples) {
        wordExamplesModal.innerHTML += exam;
      }
    } else {
      wordExamplesModal.innerHTML = '';
    }

    if (w.tags.length > 0) {
      wordTagsModal.innerHTML = 'Tags : ';
      for (const tag of w.tags) {
        wordTagsModal.innerHTML += tag;
      }
    } else {
      wordTagsModal.innerHTML = '';
    }

  }
}
