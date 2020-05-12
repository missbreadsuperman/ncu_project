import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import firebase from 'firebase';
import { FindPage } from './FindPage';
import { LoginPage } from './LoginPage';
import { LeftNavbar } from './LeftNavbar';
import { UploadPage } from './UploadPage';
import { SettingsPage } from './SettingsPage';
import { AboutPage } from './AboutPage';
import { LuckyPage } from './LuckyPage';
import { FormPage } from './FormPage';

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: 279px auto;
  grid-template-rows: 100vh;
`

export const HomePage = () => {
  const [userKey, setUserKey] = useState();
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    firebase.database().ref('/users').once('value').then((snapshot) => {
      if (snapshot.val()) setUsers(Object.values(snapshot.val()));
    });
  }, [userKey]);
  function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          user !== null && user.settings !== null ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

  return (
    <Router>
      <Switch>
         <Route path="/login">
           <LoginPage userKey={userKey} setUserKey={setUserKey} users={users} setUsers={setUsers} user={user} setUser={setUser} setUserProfile={setUserProfile}/>
         </Route>
        <StyledWrapper>
          <LeftNavbar userProfile={userProfile}/>
          <PrivateRoute exact path="/">
            <FindPage userKey={userKey} />
          </PrivateRoute>
          <PrivateRoute path="/form/:id">
            <FormPage userKey={userKey} />
          </PrivateRoute>
          <PrivateRoute path="/upload">
            <UploadPage userKey={userKey} />
          </PrivateRoute>
          <PrivateRoute path="/settings">
            <SettingsPage userKey={userKey} />
          </PrivateRoute>
          <PrivateRoute path="/about">
            <AboutPage userKey={userKey} />
          </PrivateRoute>
          <PrivateRoute path="/lucky">
            <LuckyPage />
          </PrivateRoute>
        </StyledWrapper>
      </Switch>
      
    </Router>
  )};

