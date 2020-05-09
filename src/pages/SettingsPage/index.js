import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'primereact/button';
import { LoginForm } from './LoginForm';
import { RecordList } from './RecordList';

const StyledWrapper = styled.div`
  position: relative;
  padding: 85px 80px;
`
const StyledButtonGroup = styled.div`
  display: flex;
  margin-bottom: 42px;
`
const StyledButton = styled(Button)`
  width: 135px;
  height: 48px;
  background-color: ${props => props.selected ? '#dea654' : '#fff'} !important;
  color: ${props => props.selected ? '#fff' : '#dea654'} !important;
  font-size: 16px !important;
  margin-right: 16px !important;  
  border: solid 2px #dea654 !important;
`

export const SettingsPage = ({ userKey }) => { 
  const [displaySelected, setDisplaySelected] = useState('info');
  return (
    <StyledWrapper>
      <StyledButtonGroup>
        <StyledButton selected={displaySelected === 'info'} onClick={e => displaySelected !== 'info' && setDisplaySelected('info')} label="修改資料"/>
        <StyledButton selected={displaySelected === 'record'} onClick={e => displaySelected !== 'record' && setDisplaySelected('record')} label="使用紀錄"/>
      </StyledButtonGroup>
      {
        displaySelected === 'info' ? 
          <LoginForm userKey={userKey}/> : <RecordList />
      }
    </StyledWrapper>
  )
};

