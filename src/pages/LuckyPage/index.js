import React from 'react';
import styled from 'styled-components';
import { Button } from 'primereact/button';


const StyledWrapper = styled.div`
  position: relative;
  padding: 81px 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  color: #333;
`
export const LuckyPage = () => { 
  return (
    <StyledWrapper>
      <div>
        即將開放，敬請期待
      </div>
    </StyledWrapper>
  )
};
