import classNames from 'clsx';
import { FILTERS } from '../../constants/filter.js';
import {
  selectCompleted,
  selectNotCompleted,
} from '../../store/selectors/todo.js';
import { onClearCompleted } from '../../store/actions/todo.js';
import {
  pushHistoryState,
  useSharedIslandReducer,
  usePageUrl,
} from '@hubspot/cms-components';
import useFilterFromURL from '../hooks/useFilterFromURL.js';

export default function Footer() {
  const pageURL = usePageUrl();
  const [todos, dispatch] = useSharedIslandReducer();
  const filter = useFilterFromURL();

  const filterTitles = [
    { key: FILTERS.all, value: 'All' },
    { key: FILTERS.active, value: 'Active' },
    { key: FILTERS.completed, value: 'Completed' },
  ];
  const completedCount = selectCompleted(todos).length;
  const itemsLeft = selectNotCompleted(todos).length;
  const clearCompleted = () => dispatch(onClearCompleted());

  const filterSelect = (selectedFilter) => {
    const newURL = new URL(pageURL);
    newURL.searchParams.set('filter', selectedFilter);
    pushHistoryState({}, newURL);
  };

  const itemText = itemsLeft === 1 ? 'item' : 'items';

  if (todos.length === 0) {
    return null;
  }

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{itemsLeft}</strong>
        <span> {itemText} left</span>
      </span>
      <ul className="filters">
        {filterTitles.map((filterTitle) => (
          <li key={filterTitle.key}>
            <a
              className={classNames({ selected: filterTitle.key === filter })}
              onClick={() => filterSelect(filterTitle.key)}
              style={{ cursor: 'pointer' }}
            >
              {filterTitle.value}
            </a>
          </li>
        ))}
      </ul>
      {!!completedCount && (
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      )}
    </footer>
  );
}
