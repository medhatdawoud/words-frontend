export class ValidationService {
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
    if (control.value && control.value.match(ValidationService.pattern.Pronounce)) {
      return null;
    } else {
      return { 'invalidPronounce': true };
    }
  }

  synonymValidator(control) {
    if (!control.value) {
      return null;
    } else if (control.value.match(ValidationService.pattern.synonym)) {
      return null;
    }else {
      return { 'invalidSynonym': true };
    }

  }

  imageValidator(control) {
    if (control.value && control.value.match(ValidationService.pattern.images)) {
      return null;
    } else {
      return { 'invalidImages': true };
    }
  }

  tagsValidator(control) {
    if (control.value && control.value.match(ValidationService.pattern.tags)) {
      return null;
    } else {
      return { 'invalidTags': true };
    }
  }

}
