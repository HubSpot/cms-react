import { useState, useId } from 'react';
import { styled } from 'styled-components';

const StyledButton = styled.button`
  padding: ${props => 10 + props.$count * 10}px;
`;

export default function InteractiveStyledComponent() {
  const id = useId();
  const [count, setCount] = useState(0);

  return (
    <StyledButton $count={count} onClick={() => setCount(prevCount => prevCount + 1)}>Current count is: {count} {id}</StyledButton>
  );
}
