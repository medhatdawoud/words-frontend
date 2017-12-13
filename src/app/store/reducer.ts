import { Word } from '../components';
import { IAppState } from './IAppState';
import types from './constants';

const initialState: IAppState = {
    currentWord: {
        _id: "",
        lang: "",
        word: "",
        synonym: [],
        type: "",
        pronounce: "",
        description: "",
        soundUrl: "",
        tags: [],
        videos: [],
        examples: [],
        images: []
    },
    words: [],
}

export function reducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_ALL_WORDS_SUCCEED:
            return Object.assign({}, state, {
                words: action.payload
            });
        case types.CHANGE_CURRENT_WORD_SUCCEED:
            return Object.assign({}, state, {
                currentWord: action.payload
            });
        case types.ADD_WORD_SUCCEED:
            return Object.assign({}, state, {
                currentWord: initialState.currentWord,
                words: state.words.concat([action.payload])
            });
        case types.UPDATE_WORD_SUCCEED: {
            let words = state.words;
            words.forEach((element, index) => {
                if (element._id === action.payload._id) {
                    words[index] = action.payload;
                }
            });
            return Object.assign({}, state, {
                currentWord: initialState.currentWord,
                words
            });
        }
        case types.DELETE_WORD_SUCCEED: {
            let words = state.words;
            words.forEach((element, index) => {
                if (element._id === action.payload) {
                    words.splice(index,1);
                }
            });
            return Object.assign({}, state, {
                currentWord: initialState.currentWord,
                words
            });
        }
        default:
            return state;
    }
}