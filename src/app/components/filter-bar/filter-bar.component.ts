import { Component, OnInit } from '@angular/core';
import { WordActions } from '../../store';

@Component({
  selector: 'bw-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {

  constructor(private actions: WordActions) { }

  ngOnInit() {
  }

  search(searchTerm) {
    this.actions.filterWords(searchTerm)
  }

}
