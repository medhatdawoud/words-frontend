import { Injectable } from '@angular/core';

import { IAppState } from '../store';
// import { NgRedux } from '@angular-redux/store';

@Injectable()
export class ValidationService {
  static word: any;

  constructor(
    // private ngRedux: NgRedux<IAppState>
    ) {
    // ngRedux.select('currentWord')
    //   .subscribe(data => {
    //     ValidationService.word = Object.assign({}, data);
    //   });
  }

  // tslint:disable-next-line:member-ordering
  static pattern = {
    'word': /^[a-zA-Z]*$/,
    'Pronounce': /^[a-z](?!.*--)[a-z-]*[a-z]$/,
    'synonym': /^[a-zA-Z]*$/,
    'images': /(https?:\/\/.*\.(?:jpeg|jpg|png|gif|svg))/i,
    'tags': /^[a-zA-Z](?!.*--)[a-zA-Z-]*[a-zA-Z]$/
  };


  getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const errorMessages = {
      'required': 'Required',
      'invalidWord': 'invalid word name , only accept alphabets',
      'invalidSynonym': 'invalid synonym name , only accept alphabets',
      'invalidImages': 'invalid image Url ',
      'requiredLimit': 'required at least 1 item',
      'invalidExamples': 'invalid example ',
      'invalidTags': 'invalid tag ',
      'invalidPronounce': 'invalid pronounce ,only accept lowercase alphabet and dashes',
      'maxlength': `Maximum length ${validatorValue.requiredLength}`
    };
    return errorMessages[validatorName];
  }

  wordValidator(control) {
    if (control.value && control.value.match(ValidationService.pattern.word)) {
      return null;
    } else {
      return { 'invalidWord': true };
    }
  }
  pronounceValidator(control) {
    if (control.value && !control.value.match(ValidationService.pattern.Pronounce)) {
      return { 'invalidPronounce': true };
    }
  }

  synonymValidator(control) {
    if (!control.value) {
      return null;
    } else if (control.value.match(ValidationService.pattern.synonym)) {
      return null;
    } else {
      return { 'invalidSynonym': true };
    }

  }

  imageValidator(control) {
    if (control.value) {
      if (control.value.match(ValidationService.pattern.images)) {
        return null;
      } else {
        return { 'invalidImages': true };
      }
    }
  }

  validateRequiredNumberOfItems(control) {
    if (ValidationService.word) {
      // console.log(ValidationService.word.images.length);
      // TODO: need to be general not checking only images
      // TODO: needs to run on submit as well
      if (ValidationService.word.images.length >= 1) {
        return null;
      } else {
        return { 'requiredLimit': true };
      }
    }
  }

  tagsValidator(control) {
    if (control.value) {
      if (control.value.match(ValidationService.pattern.tags)) {
        return null;
      } else {
        return { 'invalidTags': true };
      }
    }
  }

}
