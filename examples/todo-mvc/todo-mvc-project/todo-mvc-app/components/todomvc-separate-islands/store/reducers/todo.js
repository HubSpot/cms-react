import { v4 as uuidv4 } from 'uuid';
import { ACTION_TYPES } from '../../constants/action-type.js';
import { selectCompleted, selectNotCompleted } from '../selectors/todo.js';

const areAllCompleted = (state) =>
  state.length && selectCompleted(state).length === state.length;

export default function todosReducer(state = [], action) {
  switch (action.type) {
    case ACTION_TYPES.load:
      return [...action.todos];
    case ACTION_TYPES.create:
      return [...state, { id: uuidv4(), name: action.name, completed: false }];
    case ACTION_TYPES.update:
      return state.map((todo) =>
        todo.id === action.values.id ? { ...todo, ...action.values } : todo,
      );
    case ACTION_TYPES.remove:
      return state.filter((todo) => todo.id !== action.id);
    case ACTION_TYPES.completeAll:
      return state.map((todo) => ({
        ...todo,
        ...{ completed: !areAllCompleted(state) },
      }));
    case ACTION_TYPES.clearCompleted:
      return selectNotCompleted(state);
    default:
      return state;
  }
}
