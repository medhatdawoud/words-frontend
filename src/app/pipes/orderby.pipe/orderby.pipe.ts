import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(array: Array<{}>, args: string[]): Array<string> | Array<{}> {
    array = array || [];
    const myArgs = (<any>Object).values(args);

    if (typeof args === 'undefined' || myArgs.length !== 2) {
      return array;
    }

    if (myArgs[1] !== 'ASC' && myArgs[1] !== 'DESC') {
      return array;
    }
    console.log(myArgs);
    return _.orderBy(array, (item: any) => item[myArgs[0]], myArgs[1].toLowerCase());
  }
}
