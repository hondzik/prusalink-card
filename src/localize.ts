import * as cs from './translations/cs.json';
import * as de from './translations/de.json';
import * as en from './translations/en.json';
import * as es from './translations/es.json';
import * as fr from './translations/fr.json';
import * as he from './translations/he.json';
import * as hu from './translations/hu.json';
import * as it from './translations/it.json';
import * as ja from './translations/ja.json';
import * as nl from './translations/nl.json';
import * as no from './translations/no.json';
import * as pl from './translations/pl.json';
import * as pt from './translations/pt.json';
import * as sk from './translations/sk.json';
import * as sv from './translations/sv.json';
import * as uk from './translations/uk.json';
import * as zh from './translations/zh.json';
import type { HomeAssistant } from './types/HomeAssistant';

const languages: Record<string, unknown> = { cs, de, en, es, fr, he, hu, it, ja, nl, no, pl, pt, sk, sv, uk, zh };

const DEFAULT_LANG = 'en';

function getTranslatedString(key: string, lang: string): string | undefined {
  try {
    return key.split('.').reduce((o, i) => (o as Record<string, unknown>)[i], languages[lang]) as string;
  } catch {
    return undefined;
  }
}

export default function setupCustomlocalize(hass?: Pick<HomeAssistant, 'locale'>) {
  return function (key: string): string {
    const lang = hass?.locale.language ?? DEFAULT_LANG;
    return getTranslatedString(key, lang) || getTranslatedString(key, DEFAULT_LANG) || key;
  };
}
