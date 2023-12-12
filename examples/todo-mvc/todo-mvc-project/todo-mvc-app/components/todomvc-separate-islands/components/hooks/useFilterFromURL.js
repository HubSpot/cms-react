import { usePageUrl } from '@hubspot/cms-components';
import { FILTERS } from '../../constants/filter';

export default function useFilterFromURL() {
  const pageURL = usePageUrl();
  return pageURL.searchParams.get('filter') || FILTERS.all;
}
