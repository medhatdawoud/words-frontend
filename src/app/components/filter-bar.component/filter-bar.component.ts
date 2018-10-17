import { Component, OnInit } from '@angular/core';
import { WordActions, IAppState } from '../../store';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'bw-filter-bar',
  templateUrl: './filter-bar.component.html'
})
export class FilterBarComponent implements OnInit {
  sortWordsOptions = [
    {
      label: 'Newest First',
      field: 'addedAt',
      direction: 'DESC'
    },
    {
      label: 'Oldest First',
      field: 'addedAt',
      direction: 'ASC'
    },
    {
      label: 'Word ASC',
      field: 'word',
      direction: 'ASC'
    },
    {
      label: 'Word DESC',
      field: 'word',
      direction: 'DESC'
    }
  ];

  selectSorting = null;
  words: any;
  filteredWords: any;

  constructor(
    private wordActions: WordActions,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
    this.store.pipe(select('words')).subscribe(res => {
      this.filteredWords = (<any>Object).values(res.filteredWords);
      this.words = (<any>Object).values(res.words);
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
}
