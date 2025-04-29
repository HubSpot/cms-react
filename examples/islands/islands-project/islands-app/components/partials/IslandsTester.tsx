import { Island } from '@hubspot/cms-components';

import ButtonCounterIsland from '../ButtonCounter?island';

export default function IslandsTester({
  numIslands = 1,
  marginTop,
  marginBetween = '50vh',
  hydrateOn = 'load',
  islandIdPrefix = '',
}: Props) {
  const islandElements = Array.from({ length: Number(numIslands) }, (_, i) => {
    const style =
      i === 0 && marginTop == null
        ? null
        : { marginTop: marginTop ?? marginBetween };

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
}

interface Props {
  numIslands?: number | string;
  marginTop?: string | null;
  marginBetween?: string;
  hydrateOn?: string;
  islandIdPrefix?: string;
}
