import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import SVGProfile from './icon_profile.svg';
import SVGFind from './icon_find.svg';
import SVGUpload from './icon_upload.svg';
import SVGSettings from './icon_settings.svg';
import SVGLucky from './icon_lucky.svg';
import SVGTeam from './team.svg';
import { Button } from 'primereact/button';


const StyledLeftPanel = styled.div`
  background-color: #dea552;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const StyledProfile = styled.div`
  width: 100px;
  height: 100px;
  background-color: #fff;
  border-radius: 50%;
  img {
    display: block;
    margin: 20px auto;
    width: 60px;
  }
`
const StyledUserDetail = styled.div`
  margin-top: 17px;
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  color: #fff;
  font-size: 10px;
  line-height: 14px;
  & > div {
    display: flex;
    margin-bottom: 4px;
    .label {
      width: 60px;
      text-align: end;
    }
    .value {
      width: 36px;
      text-align: end;
      flex-shrink: 0;
      font-weight: bold;
    }
  }
`
const StyledNavbar = styled(NavLink)`
  display: flex;
  margin-bottom: ${props => props.lastItem ? 60 : 23}px;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  position: relative;
  img {
    margin-right: 11px;
    z-index: 3;
  }
  div {
    z-index: 3;
  }
  &:hover {
    color: #333;
  }
  &:hover:not(.selected) {
    &::before {
      content: '';
      background-color: #fff;
      width: 190px;
      height: 34px;
      border-radius: 20px;
      position: absolute;
      left: -20px;
      opacity: 40%;
    }
  }
  &.selected {
    &::before {
      content: '';
      background-color: #fff;
      width: 190px;
      height: 34px;
      border-radius: 20px;
      position: absolute;
      left: -20px;
    }
  }
`
const StyledAboutWrapper = styled.div`
  width: 205px;
  height: 257px;
  border-radius: 10px;
  border: solid 1px #dea654;
  background-color: #ffffff;
  padding: 20px 0 15px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-style: dashed;
  border-width: 2px;
  .title {
    font-size: 14px;
    font-weight: bold;
    color: #333;
  }
  img {
    margin: 21px 0 35px 0;
  }
`
const StyledButton = styled(Button)`
  width: 100px;
  height: 35px;
  background-color: rgb(222, 166, 84, 0.6) !important;
  border: 0 !important;
  border-radius: 20px;
  .p-button-text {
    color: #333;
    font-size: 12px;
    font-weight: bold;
  }
  &:hover {
    background-color: rgb(222, 166, 84, 0.3) !important
  }
`
const navbarItems = [
  {
    text: '找問卷', icon: SVGFind, url: '/find',
  },
  {
    text: '上架問卷', icon: SVGUpload, url: '/upload',
  },
  {
    text: '個人設定', icon: SVGSettings, url: '/settings',
  },
  {
    text: '幸運轉盤', icon: SVGLucky, url: '/lucky',
  },
]
export const LeftNavbar = () => {
  const [userProfile, setUserProfile] = useState(null)
  return (
    <StyledLeftPanel>
      <StyledProfile>
        {
          userProfile === null ? <img src={SVGProfile} /> : <div>img</div>
        }
      </StyledProfile>
      <StyledUserDetail>
        <div>
          <div className="label">現有點數</div>
          <div className="value">20</div>
        </div>
        <div>
          <div className="label">已填問卷數</div>
          <div className="value">20</div>
        </div>
        <div>
          <div className="label">上架中問卷</div>
          <div className="value">20</div>
        </div>
      </StyledUserDetail>
      <div>
        {
          navbarItems.map((item,index) => (
            <StyledNavbar key={index} to={item.url} activeClassName="selected" lastItem={index === navbarItems.length-1}>
              <img src={item.icon} />
              <div>{item.text}</div>
            </StyledNavbar>
          ))
        }
      </div>
      <StyledAboutWrapper>
        <div className="title">關於我們</div>
        <img src={SVGTeam} />
        <StyledButton label="團隊介紹 →" className="p-button-rounded" />

      </StyledAboutWrapper>
    </StyledLeftPanel>
  )
}