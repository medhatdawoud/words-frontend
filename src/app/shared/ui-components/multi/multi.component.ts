import { Component, OnInit, Input } from '@angular/core';
import {PatternComponent} from '../../patterns-component/pattern.component';
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
  
  patterns = {imgUrl: '^https?://(?:[a-z0-9\-]+\.)+[a-z0-9]{2,6}(?:/[^/#?]+)+\.(?:jpg|gif|png|jpeg|svg)$'};
  
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
