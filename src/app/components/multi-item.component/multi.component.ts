import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, ControlContainer } from '@angular/forms';
import { ValidationService } from 'app/services/validation.service';
@Component({
  selector: 'bw-multi',
  templateUrl: './multi.component.html'
})
export class MultiComponent implements OnInit {
  @Input() type;
  @Input() items;
  @Input() label;
  @Input() maxLength = 5;
  @Input() submitted = false;
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

  addItem(oneItem, type, input) {
    if (oneItem.trim() !== '') {
      if (type === 'images') {
        if (!this.multiControlForm.controls.images.errors || !this.multiControlForm.controls.images.errors.invalidImages) {
          this.items.push(oneItem);
        }
      } else if (type === 'tags') {
        if (!this.multiControlForm.controls.tags.errors || !this.multiControlForm.controls.tags.errors.invalidTags) {
          this.items.push(oneItem);
        }
      } else if (type === 'examples') {
        if (!this.multiControlForm.controls.examples.errors || !this.multiControlForm.controls.examples.errors.invalidExamples) {
          this.items.push(oneItem);
        }
      } else if (type === 'synonym') {
        if (!this.multiControlForm.controls.synonym.errors || !this.multiControlForm.controls.synonym.errors.invalidSynonym) {
          this.items.push(oneItem);
        }
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
