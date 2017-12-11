import { Word } from '../components';
import { IAppState } from './IAppState';
import { GET_ALL_WORDS_SUCCEED, CHANGE_CURRENT_WORD_SUCCEED } from './actions';

const initialState: IAppState = {
    currentWord: {
        id          : null, 
        lang        : "",
        word        : "",
        synonym     : [],
        type        : "",
        pronounce   : "",
        description : "",
        soundUrl    : "",
        tags        : [],
        videos      : [],
        examples    : [],
        images      : []
    },
    words: [],
}

export function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_WORDS_SUCCEED:
            return Object.assign({}, state, {
                words: action.payload
            });
        case CHANGE_CURRENT_WORD_SUCCEED:
            return Object.assign({}, state, {
                currentWord: action.payload
            }); 
        default:
            return state;
    }
}