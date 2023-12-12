import { Island } from '@hubspot/cms-components';
import TodoList from '../../islands/TodoList.jsx?island';
import Layout from '../../Layout.jsx';

/**
 * Here we are exporting the 3 requirements of a module: Component, fields, and meta
 *
 * 'props' contains the resolved values from the defined module fields (./fields.jsx)
 * This will be the value provided by a marketer in the page editor, or will fallback to the defined default value
 * e.g., props = {
 *   "default_todo": {"text": "Todo Test 1", "completed": false}
 * }
 *
 * <Island /> is used here to enable client-side interactivty of a component
 * the `hydrateOn` prop allows customization of hydration, i.e., hydrate on page load, or hydrate when the component first becomes visible
 *
 * The Island component takes on the props of the component it is wrapping
 * Note: only props that can be serialized are supported
 */
export const Component = ({ fieldValues, hublParameters = {} }) => {
  const {
    default_todo: defaultTodos,
    button_color: buttonColor,
    complete_todo_opacity: completeTodoOpacity,
  } = fieldValues;
  const { title } = hublParameters;
  return (
    <Layout>
      <h1>{title || 'Todo'}</h1>
      <Island
        module={TodoList}
        hydrateOn="load"
        // TodoList props:
        initialTodos={[defaultTodos]}
        buttonColor={buttonColor}
        completeTodoOpacity={completeTodoOpacity}
      />
    </Layout>
  );
};
export { fields } from './fields.jsx';
export const meta = {
  label: `Todo List Module`,
};
