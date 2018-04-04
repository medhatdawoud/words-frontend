import { Word } from './IWord';
import { IAppState } from './IAppState';
import types from './constants';

export const initialState: IAppState = {
  language: sessionStorage.getItem('language') || 'en',
  currentWord: {
    id: '',
    lang: '',
    word: '',
    synonym: [],
    type: '',
    pronounce: '',
    description: '',
    soundUrl: '',
    tags: [],
    videos: [],
    examples: [],
    images: [],
    addedAt: '',
    updatedAt: ''
  },
  words: [],
  filteredWords: [],
  sort: {
    label: 'Oldest first',
    field: 'addedAt',
    direction: 'ASC'
  }
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_ALL_WORDS_SUCCEED:
      return Object.assign({}, state, {
        words: action.payload,
        filteredWords: action.payload
      });
    case types.GET_WORD_BY_ID_SUCCEED:
      return Object.assign({}, state, {
        currentWord: action.payload
      });
    case types.CHANGE_CURRENT_WORD_SUCCEED:
      return Object.assign({}, state, {
        currentWord: action.payload
      });
    case types.ADD_WORD_SUCCEED:
      return Object.assign({}, state, {
        currentWord: Object.assign({}, initialState.currentWord),
        words: state.words.concat([action.payload]),
        filteredWords: state.words.concat([action.payload])
      });
    case types.UPDATE_WORD_SUCCEED: {
      const allWords = (<any>Object).values(state.words);
      allWords.forEach((element, index) => {
        if (element.id === action.payload.id) {
          allWords[index] = action.payload;
        }
      });
      const filteredWords = Object.assign({}, allWords);
      return Object.assign({}, state, {
        currentWord: Object.assign({}, initialState.currentWord),
        words: allWords,
        filteredWords
      });
    }
    case types.DELETE_WORD_SUCCEED: {
      const allWords = (<any>Object).values(state.words);
      allWords.forEach((element, index) => {
        if (element.id === action.payload) {
          allWords.splice(index, 1);
        }
      });
      const filteredWords = Object.assign({}, allWords);
      return Object.assign({}, state, {
        currentWord: Object.assign({}, initialState.currentWord),
        words: allWords,
        filteredWords
      });
    }
    case types.SEARCH_WORD_SUCCED: {
      const search = action.payload.toLowerCase();
      const words = state.words;
      if (!search) {
        return Object.assign({}, state, { filteredWords: words });
      }
      const newWords = words.filter(element => {
        return (
          element.word.toLowerCase().indexOf(search) > -1 ||
          filterMultipleItems(element.synonym, search) ||
          filterMultipleItems(element.tags, search)
        );
      });
      return Object.assign({}, state, { filteredWords: newWords });
    }
    case types.SORT_WORD_SUCCED: {
      return Object.assign({}, state, {
        sort: action.payload
      });
    }
    case types.CHANGE_LOCALE_LANGUAGE: {
      return Object.assign({}, state, {
        language: action.payload
      });
    }
    default:
      return state;
  }
}

function filterMultipleItems(items, search) {
  for (const item of items) {
    if (item.toLowerCase().indexOf(search) > -1) {
      return true;
    }
  }
}
