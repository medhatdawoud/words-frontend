import { Word } from './IWord';

export interface IAppState {
    language: String,
    currentWord: Word,
    words: Word[],
    filteredWords: Word[],
    sort: {
        label: String,
        field: String,
        direction: String
    }
}
