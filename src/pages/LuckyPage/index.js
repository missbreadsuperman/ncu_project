import React from 'react';
import styled from 'styled-components';
import { Button } from 'primereact/button';
import { Wheel } from './Wheel';

const StyledWrapper = styled.div`
  position: relative;
  padding: 81px 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  color: #333;
  @media (max-width: 414px) {
    padding: 80px 20px;
    max-width: 100vw;
    overflow: hidden;
  }
`
export const LuckyPage = () => { 
  return (
    <StyledWrapper>
      <div>
        <Wheel />
      </div>
    </StyledWrapper>
  )
};
