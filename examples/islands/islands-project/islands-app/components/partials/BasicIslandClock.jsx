import { Island } from '@hubspot/cms-components';
import ClockIsland from '../Clock?island';

export default function BasicIslandClock() {
  return <Island module={ClockIsland} startTimestamp={Date.now()} />;
}
