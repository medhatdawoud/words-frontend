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
  filledValue = false;
  public multiControlForm: FormGroup;

  constructor(private controlContainer: ControlContainer) { }

  ngOnInit() {
    this.multiControlForm = <FormGroup>this.controlContainer.control;
  }

  removeItem(index) {
    this.items.splice(index, 1);
  }

  addItem(oneItem, type) {
    if (type === 'images') {
      if (this.multiControlForm.controls.images.valid) {
        this.items.push(oneItem);
      }
    } else if (type === 'tags') {
      if (this.multiControlForm.controls.tags.valid) {
        this.items.push(oneItem);
      }
    } else if (type === 'examples') {
      if (this.multiControlForm.controls.examples.valid) {
        this.items.push(oneItem);
      }
    } else if (type === 'synonym') {
      if (this.multiControlForm.controls.synonym.valid) {
        this.items.push(oneItem);
      }
    }
  }

  changeState(item) {
    if (item && item !== '') {
      this.filledValue = true;
    } else {
      this.filledValue = false;
    }
  }
}
