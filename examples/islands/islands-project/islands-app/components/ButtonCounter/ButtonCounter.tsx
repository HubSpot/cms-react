import { useState, CSSProperties } from 'react';
import { useAfterIslandHydration } from '@hubspot/cms-components';
import classes from './ButtonCounter.module.css';

type ButtonCounterProps = {
  defaultCount: number;
  style: CSSProperties;
};

type DisabledProps = {
  disabled?: boolean;
};

const ButtonCounter = (props: ButtonCounterProps) => {
  const { defaultCount = 0, style } = props;
  const [count, setCount] = useState(defaultCount);
  const afterHydration = useAfterIslandHydration();

  let disabledProps: DisabledProps = { disabled: true };

  if (afterHydration) {
    disabledProps = {};
  }

  return (
    <>
      <h3>This is a button!</h3>
      <p className={afterHydration ? classes.hydrated : ''} style={style}>
        <button
          type="button"
          className={classes.button}
          onClick={() => setCount((count) => count + 1)}
          {...disabledProps}
        >
          count is: {count}
        </button>
        <span className={classes.hydrationText}>hydrated</span>
      </p>
    </>
  );
};

export default ButtonCounter;
