import { Component, OnInit, Input } from '@angular/core';
import { PatternComponent } from '../../patterns-component/pattern.component';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
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
  // item = null;
  userForm: any;
  flag = 0;
  display = true;
  //patterns = {imgUrl: '^https?://(?:[a-z0-9\-]+\.)+[a-z0-9]{2,6}(?:/[^/#?]+)+\.(?:jpg|gif|png|jpeg|svg)$'};

  constructor(private formBuilder: FormBuilder) {
    this.display = true;
    this.userForm = this.formBuilder.group({
      'item': ['', [Validators.required,Validators.pattern('^https?://(?:[a-z0-9\-]+\.)+[a-z0-9]{2,6}(?:/[^/#?]+)+\.(?:jpg|gif|png|jpeg|svg)$')]]
    });

  }

  ngOnInit() {
  }

  removeItem(index) {
    this.items.splice(index, 1);
  }

  addItem(oneItem) {
    if (this.flag <= this.maxLength) {
      this.items.push(oneItem);
      this.flag++;
      this.userForm = this.formBuilder.group({
        'item': ['',  [Validators.required]]
      });
    }
    else {
      this.display = false;
      this.userForm = this.formBuilder.group({
        'item': ['', [Validators.required]]
      });
      return false;
    }


  }

}
