import { Word } from './IWord';

export interface IAppState {
    currentWord: Word,
    words: Word[],
    filteredWords: Word[],
}
