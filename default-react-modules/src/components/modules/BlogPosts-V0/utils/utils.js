// Adds describedby attribute to gated-content link elements
export function addDescribedBy(isGated) {
  return isGated
    ? { 'aria-describedby': 'hs-react-blog-listing-describedby-element' }
    : {};
}
