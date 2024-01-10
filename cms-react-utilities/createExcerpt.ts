export function stripHtmlTags(stringWithTags: string): string {
  return stringWithTags.replace(/<\/?[^>]+>/gi, '');
}

export function createExcerpt(excerptString: string, maxLength: number): string {
  const excerptWithoutTags = stripHtmlTags(excerptString);
  const showEllipsis = excerptWithoutTags.length > maxLength;

  return showEllipsis
    ? `${excerptWithoutTags.substring(0, maxLength)}...`
    : excerptWithoutTags;
}
