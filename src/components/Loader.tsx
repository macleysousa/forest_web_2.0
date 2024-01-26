import React from 'react';
import styled from 'styled-components';

interface LoaderProps {
  fullScreen?: boolean;
}

const Container = styled.div<LoaderProps>`
width: 100%;
padding: 30px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: ${(props: LoaderProps) => (props.fullScreen ? '100vh' : '100%')}};
`;

const LoaderDiv = styled.div`
  animation: is-rotating 1s infinite;
  width: 100px;
  height: 100px;
  border: 10px solid #ECECEC;
  border-top-color: #110834;
  border-radius: 50%;
  margin-bottom: 20px;
  @keyframes is-rotating {
    to {
      transform: rotate(1turn);
    }
  }
`;

export const Loading: React.FC<LoaderProps> = ({ fullScreen }) => {
  return (
    <Container fullScreen={fullScreen}>
      <LoaderDiv />
    </Container>
  );
};

