import { Word } from './IWord';
import { IAppState } from './IAppState';
import types from './constants';

const initialState: IAppState = {
    currentWord: {
        _id: '',
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
        images: []
    },
    words: [],
    filteredWords: [],
}

export function reducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_ALL_WORDS_SUCCEED:
            return Object.assign({}, state, {
                words: action.payload,
                filteredWords: action.payload,
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
            const words = state.words;
            words.forEach((element, index) => {
                if (element._id === action.payload._id) {
                    words[index] = action.payload;
                }
            });
            const filteredWords = Object.assign({}, words);
            return Object.assign({}, state, {
                currentWord: Object.assign({}, initialState.currentWord),
                words,
                filteredWords,
            });
        }
        case types.DELETE_WORD_SUCCEED: {
            const words = state.words;
            words.forEach((element, index) => {
                if (element._id === action.payload) {
                    words.splice(index, 1);
                }
            });
            const filteredWords = Object.assign({}, words);
            return Object.assign({}, state, {
                currentWord: Object.assign({}, initialState.currentWord),
                words,
                filteredWords,
            });
        }
        case types.SEARCH_WORD_SUCCED: {
            const search = action.payload.toLowerCase();
            const words = state.words;
            if (!search) {
                return Object.assign({}, state, {filteredWords: words});
            }
            const newWords = words.filter((element) => {
                return element.word.toLowerCase().indexOf(search) > -1
                    || filterMultipleItems(element.synonym, search)
                    || filterMultipleItems(element.tags, search)
            })
            return Object.assign({}, state, { filteredWords: newWords });
        }
        default:
            return state;
    }
}

function filterMultipleItems(items, search) {
    for (const item in items) {
        if (item.toLowerCase().indexOf(search) > -1) {
            return true;
        }
    }
}
