import { Word } from '../components';
import { IAppState } from './IAppState';
import { GET_ALL_WORDS_SUCCEED } from './actions';

const initialState: IAppState = {
    words: [
        {
            lang: "English",
            word: "kokowawa",
            synonym: [],
            type: "noun",
            adjective: "koko-wawa",
            description: "",
            soundUrl: "",
            tags: [],
            videos: [],
            examples: [],
            images: []
        }
    ]
}

export function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_WORDS_SUCCEED:
            return Object.assign({}, state, {
                words: action.payload
            });
        default:
            return state;
    }
}