import { Component, OnInit } from '@angular/core';
import { WordActions, IAppState } from '../../store';
import { NgRedux } from '@angular-redux/store';

@Component({
  selector: 'bw-filter-bar',
  templateUrl: './filter-bar.component.html'
})
export class FilterBarComponent implements OnInit {
  sortWordsOptions = [
    {
      label: 'Newest first',
      field: 'addedAt',
      direction: 'DESC'
    },
    {
      label: 'Oldest first',
      field: 'addedAt',
      direction: 'ASC'
    },
    {
      label: 'Words A->Z',
      field: 'word',
      direction: 'ASC'
    },
    {
      label: 'Words Z->A',
      field: 'word',
      direction: 'DESC'
    }
  ];

  selectSorting = null;
  words: any;
  filteredWords: any;

  constructor(
    private wordActions: WordActions,
    private ngRedux: NgRedux<IAppState>
  ) {}

  ngOnInit() {
    /*this.ngRedux.select('sort')
      .subscribe(res => {
        this.selectSorting = <any>res;
      });*/
    this.ngRedux.select('filteredWords').subscribe(res => {
      this.filteredWords = (<any>Object).values(res);
    });
    this.ngRedux.select('words').subscribe(res => {
      this.words = (<any>Object).values(res);
    });
    this.selectSorting = this.sortWordsOptions[1];
  }

  search(searchTerm) {
    this.wordActions.filterWords(searchTerm);
  }

  changeSelectedSort(sort) {
    this.selectSorting = sort;
    this.wordActions.sortWords(sort);
  }

  openAddWord() {
    const collapsableContainer = document.querySelector(
      '.collapsable-container'
    );
    if (collapsableContainer.className.indexOf(' show') === -1) {
      collapsableContainer.className += ' show';
    }
  }
}
