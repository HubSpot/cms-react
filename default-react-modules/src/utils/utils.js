export function stripTags(stringWithTags) {
  return stringWithTags.replace(/<\/?[^>]+>/gi, '');
}

export function createExcerpt(excerptString, maxLength) {
  const excerptWithoutTags = stripTags(excerptString);
  const showEllipsis = excerptWithoutTags.length > maxLength;

  return showEllipsis
    ? `${excerptWithoutTags.substring(0, maxLength)}...`
    : excerptWithoutTags;
}
