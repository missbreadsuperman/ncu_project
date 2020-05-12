import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import numberIcon from '../../assets/icon_number.svg';
import JPGFillFormImg from './fillform_img.jpg';

const StyledWrapper = styled.div`
  padding: 85px 80px;
  max-height: 100vh;
  overflow-y: scroll;
`
const StyledButtonGroup = styled.div`
  display: flex;
  margin-bottom: 55px;
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
const StyledCardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const StyledCard = styled.div`
  flex-basis: 300px;
  flex-shrink: 0;
  height: 358px;
  border: solid 3px #dea654;
  border-radius: 10px 10px 0 0;
  margin: 0 20px 20px 0;
  cursor: pointer;
  .img {
    height: 191px;
    border-bottom: solid 3px #dea654;
  }
  .card-body {
    padding: 37px 24px 32px 36px;
    position: relative;
  }
  .title {
    font-size: 16px;
    font-weight: 900;
    max-width: 240px;
    flex-basis: 240px;
    flex-shrink: 0;
    margin-bottom: 32px;
  }`
const StyledHeartIcon = styled(FavoriteBorderIcon)`
  width: 27px !important;
  height: 26px !important;
  fill: #dea654 !important;
  position: absolute;
  top: 32px;
  right: 24px;
  cursor: pointer;
`
const StyledCardDetail = styled.div`
  display: flex;
  margin-bottom: 8px;
  align-items: center;
  p {
    margin-left: 11px;
    color: #333333;
    font-size: 13px;
  }
  svg {
    width: 12px !important;
    height: 18px !important;
    fill: #dea654 !important;
  }
` ;
const StyledFormImg = styled.img`
  width: 100%;
  height: 100%;
  opacity: 0.5;
  border-radius: 7px 7px 0 0;
  &:hover {
    opacity: 1;
  }
`
export const FindPage = ({ userKey }) => {
  const [filter, setFilter] = useState('hot');
  const [forms, setForms] = useState([]);
  const history = useHistory();
  useEffect(() => {
    firebase.database().ref('/forms').once('value').then((snapshot) => {
      if (snapshot.val()) {
        let formTmp = [];
        for (let [key, value] of Object.entries(snapshot.val())) {
          formTmp.push({...value, key: key})
        }
        setForms(formTmp);
      }
    })
  }, [])
  return (
    <StyledWrapper>
      <StyledButtonGroup>
        <StyledButton selected={filter === 'hot'} onClick={() => setFilter('hot')}>最熱門</StyledButton>
        <StyledButton selected={filter === 'match'} onClick={() => setFilter('match')}>最適合你</StyledButton>
      </StyledButtonGroup>
      <StyledCardWrapper>
        {
          forms.map((form, index) => (
            <StyledCard key={index} onClick={() => history.push('/form/' + form.key)} >
              <div className="img">
                <StyledFormImg src={JPGFillFormImg} alt=""/>
              </div>
              <div className="card-body">
                <div className="title">
                    {form.formData.title}
                </div>
                {/* <StyledHeartIcon /> */}
                <StyledCardDetail>
                  <object type="image/svg+xml" data={numberIcon} style={{height: '18px', width: '12px'}}/>
                  <p>問題數目  {form.formData.detail.length}</p>
                </StyledCardDetail>
                <StyledCardDetail>
                  <FavoriteIcon />
                  <p>已填人數</p>
                </StyledCardDetail>
              </div>
            </StyledCard>
          ))
        }
      </StyledCardWrapper>
    </StyledWrapper>
  )
}