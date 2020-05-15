import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import SVGFind from './icon_find.svg';
import SVGUpload from './icon_upload.svg';
import SVGSettings from './icon_settings.svg';
import SVGLucky from './icon_lucky.svg';
import SVGTeam from './team.svg';

const navbarItems = [
  {
    text: '個人設定', icon: SVGSettings, url: '/settings',
  },
  {
    text: '上架問卷', icon: SVGUpload, url: '/upload',
  },

  {
    text: '找問卷', icon: SVGFind, url: '/',
  },
  {
    text: '幸運轉盤', icon: SVGLucky, url: '/lucky',
  },
  {
    text: '關於我們', icon: SVGTeam, url: '/about'
  }
]

const StyledWrapper = styled.div`
  display: none;
  @media (max-width: 414px) {
    width: 100vw;
    font-weight: 500;
    display: flex;
    position: fixed;
    z-index: 2;
  }
`
const StyledNavLink = styled(NavLink)`
  flex-basis: 20%;
  flex-shrink: 0;
  height: 60px;
  background-color: #dea552;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid #F0D7B3;
  color: #333 !important;
  &.selected {
    background-color: #F0D7B3;
  }
`
const StyledIcon = styled.img`
  height: 24px;
  margin-bottom: 5px;
` 

export const TopNavbar = ({ userProfile }) => {
  const history = useHistory();
  return (
    <StyledWrapper>
      {
        navbarItems.map((item,index) => (
          <StyledNavLink key={index} exact={index === 2} to={item.url} activeClassName="selected" lastItem={index === navbarItems.length-1}>
            <StyledIcon src={item.icon} />
            <div>{item.text}</div>
          </StyledNavLink>
        ))
      }
    </StyledWrapper>
  )
}