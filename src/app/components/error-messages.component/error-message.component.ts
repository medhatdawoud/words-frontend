import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ValidationService } from 'app/services';


@Component({
  selector: 'bw-error-message',
  template: `<div class="alert alert-danger" *ngIf="errorMessage !== null">{{errorMessage}}</div>`
})
export class ErrorMessageComponent {
  @Input() control: FormControl;
  @Input() formSubmitted: Boolean;
  constructor(private validationService: ValidationService) { }

  get errorMessage() {
    for (const propertyName in this.control.errors) {
      if (this.control.touched && this.control.errors.hasOwnProperty(propertyName)) {
        return this.validationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }

    return null;
  }
}

