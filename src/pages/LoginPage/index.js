import React, { useState } from 'react';
import styled from 'styled-components';
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
export const LoginPage = () => { 
  const [facebookRes, setFacebookRes] = useState(null);
  const responseFacebook = (response) => {
    const fakeReponse = {
      accessToken: 'EAAP5DaNtJXABALprzlkIuHsVxEW663hvmpt3WZCHcQW8UJQ6MsnxNwPUTG1uAZAEZAna6nuKtQhfDQM830oNte7Iv8GYi8zlfrMHt0zTA03m5RYZCvAeYky59SZC9XFHhA4YWJlXZCDxyQNscZBmoDiR4ywxxhK4XKPvoiP3B8IzWF9oowSRbHXKBC8x0p3ujmMpxGkd60xoAZDZD',
      data_access_expiration_time: 1595920430,
      email: 'missbreadsuperman@gmail.com',
      expiresIn: 6370,
      graphDomain: 'facebook',
      id: '2994711603897571',
      name: '徐婉瑄',
      picture: {data: {}},
      signedRequest: 'yXSfqpTnhrPEWbK8pUH6i7ZslHQ0ktlgZgAkxkcgFr4.eyJ1c2VyX2lkIjoiMjk5NDcxMTYwMzg5NzU3MSIsImNvZGUiOiJBUUNRbUFZaElNaXc2NDZ2OHdtLTVfR0xLSDhWWERybGpMdDc2U1pHUlo4Q0FNYl9CMV95Z2V0SVRoZC1DWUM3OWFVV29jOUF5MGR5LXo5bEhWRFV4NFpFaXoyVGdzLUpnWnEzVkRiTWpyZzN5RUNmdk5PdjNDa2VIUWVITnBKSTVpaE15YjFtdjBoR3QxdlBEaXMtTTc4a1VNNEJCU3E0ZFZMaTRHMnIwMVhhUEs5QUJUTFhScUJXV0Vic3g4QVIxaDlkVXIyNWE3Wm83ZVpwTVVZTjRnU0p0T2NoVzU2NFlrZmZReXVJbGdrcF94WktHYXlvSklyVU1yYjdMV3BKSy15aUd4Sk5HN29LZG84QjhTQ2FrS2dWWGxGRVI0OENXaGRSOEpWaDNXVjVneTFvbE1XMmIxTUQyWGNwSW1OcmNLb1NyY19jTk9XWGs1R2xFdmZQeDcyNHBTMFZpUXdfQnJUOU5ZbHUzb3ZnOWs5bWUydXdlWHJpY1BUWjZXOU9UbDgiLCJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImlzc3VlZF9hdCI6MTU4ODE0NDQzMH0',
      userID: '2994711603897571',
    }
    setFacebookRes(fakeReponse)
  }
  
  const componentClicked = () => {
    console.log( 'Clicked!' )
  }
  return (
    <StyledWrapper>
      <StyledIllustration src={SVGlogin_illustration}></StyledIllustration>
      <StyledRightInfo loginSuccess={facebookRes !== null}>
        <StyledTitle>
          問卷小子
        </StyledTitle>
        <StyledHint>
          {
            facebookRes !== null ? '填寫個人資料即可完成' : ' 綁定 Facebook 帳號以繼續'
          }
        </StyledHint>
        {
          facebookRes !== null ? <LoginForm /> : <FacebookLoginWithButton
            size="medium"
            appId="1118261901862256"
            autoLoad={false}
            fields="name,email,picture"
            onClick={componentClicked}
            callback={responseFacebook}
            icon="fa-facebook"/>
        }
    
      </StyledRightInfo>
    )
    </StyledWrapper>
  )
};

