import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, ControlContainer } from '@angular/forms';
import { ValidationService } from 'app/services/validation.service';
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
  public userForm: FormGroup;

  constructor(private controlContainer: ControlContainer) { }

  ngOnInit() {
    this.userForm = <FormGroup>this.controlContainer.control;
  }

  removeItem(index) {
    this.items.splice(index, 1);
  }

  addItem(oneItem, type) {
    if (type == "images") {
      if (this.userForm.controls.images.valid) {
        this.items.push(oneItem);
      }
    } else if (type == "tags") {
      if (this.userForm.controls.tags.valid) {
        this.items.push(oneItem);
      }
      //this.item = null;
    } else if (type == "examples") {
      if (this.userForm.controls.examples.valid) {
        this.items.push(oneItem);
      }
    } else if (type == "synonym") {
      if (this.userForm.controls.synonym.valid) {
        this.items.push(oneItem);
      }
    }
  }
}
function newFunction(): any {
  return ']';
}

