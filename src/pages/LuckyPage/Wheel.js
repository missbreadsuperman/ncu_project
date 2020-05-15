import React from 'react';
import styled, { keyframes } from 'styled-components';
// import styles from './index.css';

import yay from '../LoginPage/login_illustration.svg'
const gift = [
  {
    name: '1',
  },
  {
    name: '2'
  }, {
    name: '3'
  }, {
    name: '4'
  },
  {
    name: '5',
  },
  {
    name: '6'
  },
  {
    name: '7'
  },
  {
    name: '8'
  },
  {
    name: '9'
  },
  {
    name: '10'
  },
]
function getColor() {
  let colorValue = '0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f'
  let colorArray = colorValue.split(',')
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += colorArray[Math.floor(Math.random() * 16)]
  }
  return color
}

function get_skew_deg(num) {
  let average_deg = 360 / num

  let skew_deg = 90 - average_deg

  return skew_deg
}


function getItemStyle(num) {

  let skew_deg = get_skew_deg(num)

  let translateY = Math.tan(skew_deg * 2 * Math.PI / 360) * 100

  let transform = `skew(0deg, -${skew_deg}deg) translateY(-${translateY}px)`

  return {
    transform,
    backgroundColor: getColor(),
  }
}

const circle = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(7200deg);
  }
`;
const StyledContent = styled.div`
  height: 400px;
  width: 400px;
  position: relative;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  overflow: hidden;
  animation: ${circle} 3s infinite;
  -webkit-animation:circle 3s infinite; /*Safari and Chrome*/
`
const StyledBox = styled.div`
  height: 400px;
  width: 400px;
  position: absolute;
  left: 0;
  right: 0;
`
const StyledItem = styled.div`
  position: absolute;
  height: 200px;
  width: 200px;
  left: 50%;
  top: 0;
  color: #fff;
`
const StyledInfo = styled.div`
  position: absolute;
  left: 5%;
  top: 50%;
`
const StyledPoint = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 30px;
  height: 30px;
  background-color: #ffd81a;
  border: 2px solid #ed1212;
  transform: translate(-50%, -50%);
  border-radius: 50%;
`
const StyledArrow = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  height: 100px;
  width: 16px;
  transform: translate(-50%, -50%);
  background-color: #ffd81a;
  margin: -50px auto 0;
  box-shadow: 0px 0px 18px #7a7070;
  ::after{
    content: ' ';
    position: absolute;
    border-top: 8px solid transparent;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 20px solid #ffd81a;
    top: -28px;
    left: 0px;
  }
`
export const Wheel = () => {
  return (
    <div className={'normal'}>
      <div className={'turntable'}>
        <StyledContent>
          {gift.map((item, index) =>
            <StyledBox key={item.name} style={{ transform: 'rotate(' + ((360 / gift.length) * index) + 'deg)' }}>
              <StyledItem style={getItemStyle(gift.length)}>
                {item.name}
                <StyledInfo style={{ transform: `skew(0deg, ${get_skew_deg(gift.length)}deg) rotate(${(-(360 / gift.length) * index)}deg)` }}>
                  <img style={{ display: 'block', width: 60, height: 60, borderRadius: '50%' }} src={yay} alt="" />
                </StyledInfo>
              </StyledItem>
            </StyledBox>)
          }
        </StyledContent>
        <StyledArrow />
        <StyledPoint />
      </div>
    </div>
  );
}