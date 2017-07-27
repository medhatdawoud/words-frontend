import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bw-multi',
  templateUrl: './multi.component.html',
  styleUrls: ['./multi.component.scss']
})
export class MultiComponent implements OnInit {
  @Input() type;
  @Input() items;
  @Input() label;
  @Input() maxLength = 5;
  item = null;

  constructor() { }

  ngOnInit() {
  }

  removeItem(index) {
    this.items.splice(index, 1);
  }

  addItem(oneItem) {
    this.items.push(oneItem);
    this.item = null;
  }

}
