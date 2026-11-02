import { describe, expect, it } from 'vitest';
import setupCustomlocalize from '../src/localize';
import cs from '../src/translations/cs.json';
import de from '../src/translations/de.json';
import en from '../src/translations/en.json';
import es from '../src/translations/es.json';
import fr from '../src/translations/fr.json';
import he from '../src/translations/he.json';
import hu from '../src/translations/hu.json';
import it_ from '../src/translations/it.json';
import ja from '../src/translations/ja.json';
import nl from '../src/translations/nl.json';
import no from '../src/translations/no.json';
import pl from '../src/translations/pl.json';
import pt from '../src/translations/pt.json';
import sk from '../src/translations/sk.json';
import sv from '../src/translations/sv.json';
import uk from '../src/translations/uk.json';
import zh from '../src/translations/zh.json';

const languages: Record<string, unknown> = { cs, de, en, es, fr, he, hu, it: it_, ja, nl, no, pl, pt, sk, sv, uk, zh };

const flatten = (obj: Record<string, unknown>, prefix = ''): string[] =>
  Object.entries(obj).flatMap(([k, v]) => (typeof v === 'object' && v ? flatten(v as Record<string, unknown>, `${prefix}${k}.`) : [`${prefix}${k}`]));

describe('translations', () => {
  const enKeys = flatten(en).sort();

  it('has all 17 languages', () => {
    expect(Object.keys(languages)).toHaveLength(17);
  });

  for (const [lang, content] of Object.entries(languages)) {
    it(`${lang} has exactly the keys of en`, () => {
      expect(flatten(content as Record<string, unknown>).sort()).toEqual(enKeys);
    });
  }
});

describe('localize', () => {
  it('uses the language of hass', () => {
    expect(setupCustomlocalize({ locale: { language: 'cs' } })('card.pause')).toBe('Pozastavit');
  });

  it('falls back to en for an unsupported language and to the key for an unknown key', () => {
    expect(setupCustomlocalize({ locale: { language: 'xx' } })('card.pause')).toBe('Pause');
    expect(setupCustomlocalize()('card.pause')).toBe('Pause');
    expect(setupCustomlocalize()('card.nope')).toBe('card.nope');
  });
});
