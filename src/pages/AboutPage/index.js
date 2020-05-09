import React from 'react';
import styled from 'styled-components';
import { Button } from 'primereact/button';
import SVGMember1  from './member1.svg';
import SVGMember2  from './member2.svg';
import SVGMember3 from './member3.svg';
import SVGChat1 from './chat1.svg';
import SVGChat2 from './chat2.svg';

const StyledWrapper = styled.div`
  position: relative;
  padding: 81px 80px;
`
const StyledTitle = styled.div`
  font-size: 20px;
  color: #333;
  font-weight: bold;
  margin-bottom: 20px;
`
const StyledMemberGroup = styled.div`
  display: flex;
  img {
    width: 250px;
    height: 290px;
  }
  img:not(:first-of-type) {
    margin-left: 50px;
  }
`
const StyledChatGroup = styled.div`
  display: flex;
  img:not(:first-of-type) {
    margin-left: 60px;
  }
`
const members = [SVGMember1, SVGMember2, SVGMember3];
const chats = [SVGChat1, SVGChat2];
export const AboutPage = () => { 
  return (
    <StyledWrapper>
      <StyledTitle>關於我們</StyledTitle>
      <StyledMemberGroup>
        {
          [0,1,2].map((e,i) => (
            <img src={members[i]} alt="" key={i}/>
          ))
        }
      </StyledMemberGroup>
      <StyledChatGroup>
        {
          [0,1].map((e,i) => (
            <img src={chats[i]} alt="" key={i}/>
          ))
        }
      </StyledChatGroup>
    </StyledWrapper>
  )
};
