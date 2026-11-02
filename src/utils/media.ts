export const MEDIA_SOURCE_PREFIX = 'media-source://';

/** How long a resolved (signed) media URL is reused before it is resolved again. */
export const MEDIA_REFRESH_MS = 6 * 60 * 60 * 1000;

/**
 * The `media` selector of the editor stores `{ media_content_id, media_content_type, ... }`, YAML may
 * contain a plain string (a media-source id or a URL such as `/local/printer.png`); both give the id.
 */
export function mediaContentId(value: PrusaLinkCardConfig['image']): string | undefined {
  const id = typeof value === 'string' ? value : value?.media_content_id;
  return id || undefined;
}

/** The picture to show: none when the user switched it off (`use_image: false`) while keeping it chosen. */
export function activeImageId(config: Pick<PrusaLinkCardConfig, 'image' | 'use_image'> | undefined): string | undefined {
  return config?.use_image === false ? undefined : mediaContentId(config?.image);
}

/** Only `media-source://` ids need to be resolved to a (signed) URL; anything else is used as it is. */
export function needsResolve(id: string): boolean {
  return id.startsWith(MEDIA_SOURCE_PREFIX);
}

/** True when the resolved URL of `id`, resolved at `resolvedAt`, can still be used. */
export function isFresh(id: string, resolvedId: string | undefined, resolvedAt: number, now: number): boolean {
  return id === resolvedId && now - resolvedAt < MEDIA_REFRESH_MS;
}
