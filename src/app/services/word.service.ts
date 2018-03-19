import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { Word } from '../store';

@Injectable()
export class WordService {
  constructor(private apollo: Apollo) {}

  getAllWords() {
    return this.apollo.query({
      query: gql`
        {
          words {
            id
            word
            pronounce
            tags
            synonym
            addedAt
          }
        }
      `
    });
  }

  getWordById(wordId: string) {
    const getWordByIdRequest = gql`
      query getWordById($id: ID!) {
        word(id: $id) {
          id
          word
          pronounce
          description
          synonym
          tags
          lang
          type
          soundUrl
          images
          examples
          videos
          addedAt
          updatedAt
        }
      }
    `;
    return this.apollo.query({
      query: getWordByIdRequest,
      variables: {
        id: wordId
      }
    });
  }

  addNewWord(oneWord) {
    const addWordRequest = gql`
      mutation addNewWord($word: WordInput) {
        addNewWord(word: $word) {
          id
        }
      }
    `;
    return this.apollo.mutate({
      mutation: addWordRequest,
      variables: {
        word: {
          lang: oneWord.lang,
          word: oneWord.word,
          pronounce: oneWord.pronounce,
          description: oneWord.description,
          synonym: oneWord.synonym || [],
          tags: oneWord.tags || [],
          type: oneWord.type,
          soundUrl: oneWord.soundUrl,
          images: oneWord.images || [],
          examples: oneWord.examples || [],
          videos: oneWord.videos || []
        }
      }
    });
  }

  updateWord(updatingWord: Word) {
    const updateWordRequest = gql`
      mutation updateWord($id: ID, $word: WordInput) {
        updateWord(id: $id, word: $word) {
          id
        }
      }
    `;
    return this.apollo.mutate({
      mutation: updateWordRequest,
      variables: {
        id: updatingWord.id,
        word: {
          lang: updatingWord.lang,
          word: updatingWord.word,
          pronounce: updatingWord.pronounce,
          description: updatingWord.description,
          synonym: updatingWord.synonym || [],
          tags: updatingWord.tags || [],
          type: updatingWord.type,
          soundUrl: updatingWord.soundUrl,
          images: updatingWord.images || [],
          examples: updatingWord.examples || [],
          videos: updatingWord.videos || []
        }
      }
    });
  }

  deleteWord(wordId) {
    const deleteWordRequest = gql`
      mutation deleteWord($id: ID) {
        deleteWord(id: $id) {
          id
        }
      }
    `;
    return this.apollo.mutate({
      mutation: deleteWordRequest,
      variables: {
        id: wordId
      }
    });
  }
}
