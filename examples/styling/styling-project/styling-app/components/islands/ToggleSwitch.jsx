import { useState } from 'react';
import { Switch } from '@headlessui/react';

export default function SomeToggleSwitch({ id, islandId, defaultChecked }) {
  id ??= `${islandId}-switch`;

  const [checked, setChecked] = useState(defaultChecked);

  const onChange = () => {
    console.log(`toggle ${id} changed`, !checked);
    setChecked(!checked);
  };
  return (
    <Switch
      checked={defaultChecked}
      onChange={onChange}
      id={id}
      className={`${
        checked ? 'bg-blue-600' : 'bg-gray-200'
      } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">Enable something</span>

      <span
        aria-hidden="true"
        className={`${
          checked ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  );
}
