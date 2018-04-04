// app/translate/translate.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from './translate.service'; // our translate service

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {
  constructor(private _translate: TranslateService) {}

  transform(value: string, args: any[]): any {
    if (!value) {
      return;
    }

    let translatedValue = this._translate.instant(value);

    if (args && args.length) {
      for (let x = 0; x < args.length; x++) {
        translatedValue = translatedValue.replace('${' + x + '}', args[x]);
      }
    }

    return translatedValue;
  }
}
