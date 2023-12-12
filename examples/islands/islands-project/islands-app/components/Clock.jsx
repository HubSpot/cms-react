import { useEffect, useState } from 'react';

export default function Clock({ startTimestamp, enabled = true }) {
  // If curious you can see the imlementation details of useCurrTimestamp below
  // but for the sake of starting to understand islands, those details are not critical.
  const timestamp = useCurrentTimestamp(startTimestamp, enabled);

  const labelSuffix = enabled ? '(enabled)' : '(disabled)';
  return (
    <>
      Time {labelSuffix}: {new Date(timestamp).toLocaleTimeString()}
    </>
  );
}

// React hook that:
//  - Takes an initial timestamp and enabled boolean flag
//  - On the server, it will always return the initial timestamp
//  - But in the browser, if enabled, it will return newly updated timestamp every second
function useCurrentTimestamp(startTimestamp, enabled) {
  const [currTimestamp, setCurrTimestamp] = useState(startTimestamp);

  // This effect that updates the current timestamp state every second will only
  // run in the browser.
  useEffect(() => {
    if (enabled) {
      const intervalId = setInterval(() => setCurrTimestamp(Date.now(), 1000));

      // Cleanup function to stop the timer if/when this component is unmounted
      return function cleanup() {
        clearInterval(intervalId);
      };
    }
  }, [enabled]);

  return currTimestamp;
}
