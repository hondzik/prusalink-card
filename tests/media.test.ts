import { describe, expect, it } from 'vitest';
import { activeImageId, isFresh, MEDIA_REFRESH_MS, mediaContentId, needsResolve } from '../src/utils/media';

describe('mediaContentId', () => {
  it('reads the id from the media selector value and from a plain string', () => {
    expect(mediaContentId({ media_content_id: 'media-source://media_source/local/p.png', media_content_type: 'image/png' })).toBe('media-source://media_source/local/p.png');
    expect(mediaContentId('/local/p.png')).toBe('/local/p.png');
  });

  it('returns nothing for an empty value', () => {
    expect(mediaContentId(undefined)).toBeUndefined();
    expect(mediaContentId('')).toBeUndefined();
    expect(mediaContentId({ media_content_id: '' })).toBeUndefined();
    expect(mediaContentId({})).toBeUndefined();
  });
});

describe('needsResolve', () => {
  it('resolves only media-source ids', () => {
    expect(needsResolve('media-source://media_source/local/p.png')).toBe(true);
    expect(needsResolve('/local/p.png')).toBe(false);
    expect(needsResolve('https://example.com/p.png')).toBe(false);
  });
});

describe('isFresh', () => {
  it('reuses a resolved url of the same id for a limited time', () => {
    expect(isFresh('a', 'a', 1000, 1000 + MEDIA_REFRESH_MS - 1)).toBe(true);
    expect(isFresh('a', 'a', 1000, 1000 + MEDIA_REFRESH_MS)).toBe(false);
    expect(isFresh('a', 'b', 1000, 1001)).toBe(false);
    expect(isFresh('a', undefined, 0, 1)).toBe(false);
  });
});

describe('activeImageId', () => {
  it('uses the picture unless it is switched off', () => {
    const image = { media_content_id: 'media-source://media_source/local/p.png' };
    expect(activeImageId({ image })).toBe('media-source://media_source/local/p.png');
    expect(activeImageId({ image, use_image: true })).toBe('media-source://media_source/local/p.png');
    expect(activeImageId({ image, use_image: false })).toBeUndefined();
    expect(activeImageId({ use_image: true })).toBeUndefined();
    expect(activeImageId(undefined)).toBeUndefined();
  });
});
