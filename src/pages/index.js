import React from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { FindPage } from './FindPage';
import { LoginPage } from './LoginPage';
import { LeftNavbar } from './LeftNavbar';
import { UploadPage } from './UploadPage';
import { SettingsPage } from './SettingsPage';

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: 279px auto;
  grid-template-rows: 100vh;
`

export const HomePage = () => 
{
  return (
    <Router>
     
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <StyledWrapper>
          <LeftNavbar />
          <Route path="/find">
            <FindPage />
          </Route>
          <Route path="/upload">
            <UploadPage />
          </Route>
          <Route path="/settings">
            <SettingsPage />
          </Route>
        </StyledWrapper>
      </Switch>
      
    </Router>
  )};

