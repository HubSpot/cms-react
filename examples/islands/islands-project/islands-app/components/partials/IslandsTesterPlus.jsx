import IslandTester from './IslandsTester';

const IslandsColumn = ({ numIslands, marginBetween, hydrateOn }) => {
  return (
    <div style={{ width: '33%' }}>
      <h4>On {hydrateOn}</h4>
      <IslandTester
        islandIdPrefix={`${hydrateOn}-`}
        numIslands={numIslands}
        marginBetween={marginBetween}
        hydrateOn={hydrateOn}
      />
    </div>
  );
};
const IslandsTesterPlus = ({ numIslands = 1, marginBetween = '50vh' }) => {
  return (
    <div style={{ display: 'flex' }}>
      <IslandsColumn
        numIslands={numIslands}
        marginBetween={marginBetween}
        hydrateOn="load"
      />
      <IslandsColumn
        key="visible"
        numIslands={numIslands}
        marginBetween={marginBetween}
        hydrateOn="visible"
      />
      <IslandsColumn
        numIslands={numIslands}
        marginBetween={marginBetween}
        hydrateOn="idle"
      />
    </div>
  );
};

export default IslandsTesterPlus;
