import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class WordService {
  apiUrl = "https://beeswords.herokuapp.com/";

  constructor(private http: Http) { }

  getAllWords() {
    return this.http.get(this.apiUrl + "api/word")
      .map(this.extractRequiredData)
      .catch(this.handleError);
  }

  addNewWord(oneWord) {
    return this.http.post(this.apiUrl + "api/word", {
      lang: oneWord.lang,
      word: oneWord.word,
      type: oneWord.type,
      adjective: oneWord.adjective,
      description: oneWord.desc,
      soundUrl: oneWord.soundUrl,
      tags: [oneWord.tags],
      videos: [oneWord.videos],
      examples: [oneWord.examples],
      images: [oneWord.images]
    })
      .map(this.extractRequiredData)
      .catch(this.handleError);
  }

  private extractRequiredData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
