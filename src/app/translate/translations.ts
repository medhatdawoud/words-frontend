// app/translate/translation.ts

import { OpaqueToken } from '@angular/core';

// import translations
import { LANG_EN_NAME, LANG_EN_TRANS } from './lang-en';
import { LANG_AR_NAME, LANG_AR_TRANS } from './lang-ar';
import { LANG_NL_NAME, LANG_NL_TRANS } from './lang-nl';

// translation token
export const TRANSLATIONS = new OpaqueToken('translations');

// all translations
const dictionary = {
    [LANG_EN_NAME]: LANG_EN_TRANS,
    [LANG_AR_NAME]: LANG_AR_TRANS,
    [LANG_NL_NAME]: LANG_NL_TRANS,
};

// providers
export const TRANSLATION_PROVIDERS = [
    { provide: TRANSLATIONS, useValue: dictionary },
];