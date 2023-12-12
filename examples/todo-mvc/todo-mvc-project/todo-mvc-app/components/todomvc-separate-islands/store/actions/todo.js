import { ACTION_TYPES } from '../../constants/action-type.js';

export const onLoad = (todos) => ({ type: ACTION_TYPES.load, todos });
export const onCreate = (name) => ({ type: ACTION_TYPES.create, name });
export const onRemove = (id) => ({ type: ACTION_TYPES.remove, id });
export const onUpdate = (values) => ({ type: ACTION_TYPES.update, values });
export const onCompleteAll = () => ({ type: ACTION_TYPES.completeAll });
export const onClearCompleted = () => ({ type: ACTION_TYPES.clearCompleted });
