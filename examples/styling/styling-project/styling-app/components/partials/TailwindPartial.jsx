import { Island } from '@hubspot/cms-components';
import BookOpenIcon from '@heroicons/react/24/solid/esm/BookOpenIcon.js';

import ToggleSwitchIsland from '../islands/ToggleSwitch.jsx?island';

import biker from '../../assets/biker-tailwind-ai.png';
import dog from '../../assets/dog-named-tailwind-ai.png';
import trail from '../../assets/windy-trail-ai.png';
import '../../styles/tailwind.css';

const aiArt = [
  {
    name: 'A Biker With a Tailwind',
    image: `${biker}?name=calvin&width=150`,
  },
  {
    name: 'A Dog Named Tailwind',
    image: `${dog}?name=kristen&width=150`,
  },
  {
    name: 'The Windiest Trail',
    image: `${trail}?name=ted&width=150`,
  },
];

export default function Example() {
  return (
    <>
      <ul className="divide-y divide-gray-200">
        {aiArt.map((art) => (
          <li key={art.name} className="py-4 flex">
            <img className="h-20 w-20 rounded-full" src={art.image} alt="" />
            <div className="ml-3">
              <p className="text-lg font-medium text-gray-900">{art.name}</p>
            </div>
          </li>
        ))}
      </ul>

      <Island
        module={ToggleSwitchIsland}
        id="custom-id"
        defaultChecked={false}
      />

      <dl>
        <dt>BookOpen</dt>
        <dd>
          <BookOpenIcon width={200} />
        </dd>
      </dl>
    </>
  );
}
