import { Island } from '@hubspot/cms-components';

import MakeServerlessRequestIsland from './MakeServerlessRequestIsland?island';

export function Component() {
  return (
    <div>
      <h1>Parrot Island</h1>
      <Island
        id="make-serverless-request"
        module={MakeServerlessRequestIsland}
      />
    </div>
  );
}

export const fields = [];

export const meta = {
  label: 'Make Serverless Requests',
};
