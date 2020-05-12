import React from 'react';
import { Redirect } from 'react-router-dom'
import styled from 'styled-components';
import firebase from 'firebase';
import { get } from 'lodash';
import FacebookLoginWithButton from 'react-facebook-login';
import SVGlogin_illustration from './login_illustration.svg';
import { LoginForm } from './LoginForm';

const StyledWrapper = styled.div`
  position: relative;
`
const StyledIllustration = styled.img`
  height: 100%;
  position: fixed;
  left: -97px;
  z-index: -1;
`
const StyledRightInfo = styled.div`
  position: absolute;
  right: 0;
  padding: ${props => props.loginSuccess ? '76px 18%' : '138px 18%'};
  text-align: center;
`
const StyledTitle = styled.div`
  color: #333;
  font-size: 35px;
  font-weight: bold;
  margin-bottom: 13px;
`
const StyledHint = styled.div`
  color: #acacac;
  font-size: 20px;
  margin-bottom: 50px;
`
export const LoginPage = ({ userKey, setUserKey, users, user, setUser, setUserProfile }) => { 
  const path = '/users';
  function pushUser(response) {
    firebase.database().ref(path).push(response);
    setUser(response);
  } 
  const responseFacebook = (response) => {
    if (response.userID) {
      setUserProfile(response.picture.data.url);
      const findUser = users.find(item => item.userID && item.userID === response.userID);
      if (findUser) {
        setUser(findUser);
      } else pushUser(response)
    }
  }
  const renderRedirect = () => {
    if (user && user.settings !== undefined) {
      return <Redirect to='/' />
    }
  }
  return (
    <StyledWrapper>
      {renderRedirect()}
      <StyledIllustration src={SVGlogin_illustration}></StyledIllustration>
      <StyledRightInfo loginSuccess={user !== null}>
        <StyledTitle>
          問卷小子
        </StyledTitle>
        <StyledHint>
          {
            user !== null ? '填寫個人資料即可完成' : ' 綁定 Facebook 帳號以繼續'
          }
        </StyledHint>
        {
          user === null && <FacebookLoginWithButton
            size="medium"
            appId="1118261901862256"
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
            icon="fa-facebook"
            onClick={() => setUser(1)}
          />
        }
        {
          user !== null && <LoginForm userID={get(user, 'userID')} userKey={userKey} setUserKey={setUserKey} /> 
        }
    
      </StyledRightInfo>
    )
    </StyledWrapper>
  )
};

