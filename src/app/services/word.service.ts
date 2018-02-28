import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class WordService {
  apiUrl = 'https://beeswords.herokuapp.com/';
  // apiUrl = 'http://localhost:8080';

  constructor(private http: Http) { }

  getAllWords() {
    return this.http.get(this.apiUrl + 'api/word')
      .map(this.extractRequiredData)
      .catch(this.handleError);
  }

  addNewWord(oneWord) {
    return this.http.post(this.apiUrl + 'api/word', {
      lang: oneWord.lang,
      word: oneWord.word,
      type: oneWord.type,
      synonym: oneWord.synonym,
      pronounce: oneWord.pronounce,
      description: oneWord.description,
      soundUrl: oneWord.soundUrl,
      tags: oneWord.tags,
      videos: oneWord.videos,
      examples: oneWord.examples,
      images: oneWord.images
    })
      .map(this.extractRequiredData)
      .catch(this.handleError);
  }

  updateWord(word) {
    return this.http.put(this.apiUrl + 'api/word', {
      _id: word._id,
      lang: word.lang,
      word: word.word,
      type: word.type,
      synonym: word.synonym,
      pronounce: word.pronounce,
      description: word.description,
      soundUrl: word.soundUrl,
      tags: word.tags,
      videos: word.videos,
      examples: word.examples,
      images: word.images
    })
      .map(this.extractRequiredData)
      .catch(this.handleError);
  }

  deleteWord(id) {
    return this.http.delete(this.apiUrl + 'api/word', new RequestOptions({
      body: { id: id }
    }))
      .map(this.extractRequiredData)
      .catch(this.handleError);
  }

  private extractRequiredData(res: Response) {
    const body = res.json();
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
