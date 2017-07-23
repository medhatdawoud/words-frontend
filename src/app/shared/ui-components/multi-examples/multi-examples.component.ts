import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bw-multi-examples',
  templateUrl: './multi-examples.component.html',
  styleUrls: ['./multi-examples.component.scss']
})
export class MultiExamplesComponent implements OnInit {
  example = null;
  examples = [
    "kokowawa is good",
    "kokowawa is bad"
  ];

  constructor() { }

  ngOnInit() {
  }

  removeExample(exIndex) {
    this.examples.splice(exIndex,1);
  }

  addExample(ex){
    this.examples.push(ex);
    this.example = null;
  }

}
