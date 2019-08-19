import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Loading = styled.div`
  height: 100vh;
  width: 100vw;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  svg {
    animation: ${rotate} 2s linear infinite;
  }
`;

export default Loading;
