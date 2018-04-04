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
      label: 'filter_word.form.sort_by_newest',
      field: 'addedAt',
      direction: 'DESC'
    },
    {
      label: 'filter_word.form.sort_by_oldest',
      field: 'addedAt',
      direction: 'ASC'
    },
    {
      label: 'filter_word.form.sort_by_word_az',
      field: 'word',
      direction: 'ASC'
    },
    {
      label: 'filter_word.form.sort_by_word_za',
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
}
