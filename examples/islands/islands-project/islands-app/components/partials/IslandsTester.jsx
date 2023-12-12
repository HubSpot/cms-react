import { Island } from '@hubspot/cms-components';

import ButtonCounterIsland from '../ButtonCounter?island';

const IslandsTester = ({
  numIslands = 1,
  marginTop,
  marginBetween = '50vh',
  hydrateOn = 'load',
  islandIdPrefix = '',
}) => {
  numIslands = parseInt(numIslands, 10);

  const islandElements = new Array(numIslands).fill('').map((_, i) => {
    let style = { marginTop: marginTop ?? marginBetween };
    if (i === 0 && marginTop == null) {
      delete style.marginTop;
    }

    const islandId = `${islandIdPrefix}island-${i}`;

    return (
      <Island
        id={islandId}
        key={islandId}
        module={ButtonCounterIsland}
        hydrateOn={hydrateOn}
        defaultCount={i}
        style={style}
      />
    );
  });
  return <div style={{ fontSize: '1.5em' }}>{islandElements}</div>;
};

export default IslandsTester;
