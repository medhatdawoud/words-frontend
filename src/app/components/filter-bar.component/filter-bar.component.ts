import { Component, OnInit } from '@angular/core';
import { WordActions, IAppState } from '../../store';
import { NgRedux } from '@angular-redux/store';

@Component({
  selector: 'bw-filter-bar',
  templateUrl: './filter-bar.component.html',
})
export class FilterBarComponent implements OnInit {
  sortWordsOptions = [{
    'label': 'Newest first',
    'field': 'addedAt',
    'direction': 'DESC'
  }, {
    'label': 'Oldest first',
    'field': 'addedAt',
    'direction': 'ASC'
  }, {
    'label': 'Words A->Z',
    'field': 'word',
    'direction': 'ASC'
  }, {
    'label': 'Words Z->A',
    'field': 'word',
    'direction': 'DESC'
  }
  ];

  selectSorting = null;

  constructor(private wordActions: WordActions,
    private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.ngRedux.select('sort')
      .subscribe(res => {
        this.selectSorting = <any>res;
      });
  }

  search(searchTerm, sortType) {
    this.wordActions.filterWords(searchTerm)
  }

  changeSelectedSort(sort) {
    this.selectSorting = sort;
    this.wordActions.sortWords(sort);
  }

}
