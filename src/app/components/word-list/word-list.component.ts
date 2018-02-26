import { Component, OnInit, Input } from '@angular/core';
import { store, IAppState, WordActions } from '../../store';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Word } from '../IWord';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WordService } from '../../services';

@Component({
  selector: 'bw-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title"> Word Detials </h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
         <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p *ngIf='currentWordCopy.word != ""'>Word: {{currentWordCopy.word}}</p>

      <p *ngIf='currentWordCopy.synonym.length > 0'>Synonym:
        <span *ngFor='let syn of currentWordCopy.synonym'> {{syn}}</span>
      </p>

      <p *ngIf='currentWordCopy.pronounce != ""'>Pronounce: {{currentWordCopy.pronounce}}</p>

      <p *ngIf='currentWordCopy.description != ""'>Description: {{currentWordCopy.description}}</p>

      <p *ngIf='currentWordCopy.images.length > 0'> Images:
        <span *ngFor='let img of currentWordCopy.images'> <img [src]='img' width="200px" height="100px" /></span>
      </p>

      <p *ngIf='currentWordCopy.examples.length > 0'>Examples:
        <span *ngFor='let exmp of currentWordCopy.examples'> {{exmp}}</span>
      </p>

      <p *ngIf='currentWordCopy.tags.length > 0'>Tags:
        <span *ngFor='let tag of currentWordCopy.tags'> {{tag}}</span>
      </p>

    </div>
  `
})
export class NgbdModalComponent {
  @Input() currentWordCopy;

  constructor(public activeModal: NgbActiveModal) {}
}


@Component({
  selector: 'bw-word-list',
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.scss']
})
export class WordListComponent implements OnInit {
  @select('words') words$: Observable<Word>;
  words = [];
  constructor(private ngRedux: NgRedux<IAppState>, private wordActions: WordActions, private _wordService: WordService
    , private modalService: NgbModal) {
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

  wordDetialsModal(word) {
      const modalRef = this.modalService.open(NgbdModalComponent);
      modalRef.componentInstance.currentWordCopy = Object.assign({}, word);

    }
}
