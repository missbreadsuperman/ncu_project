import React, { useEffect, useState } from 'react';
import {
  useParams
} from 'react-router-dom';
import firebase from 'firebase';
import styled from 'styled-components';
import { get } from 'lodash';
import { CardContent } from './CardContent';


const StyledWrapper = styled.div`
  padding: 81px 80px;
`
const StyledTitle = styled.div`
  font-size: 20px;
  color: #333;
  font-weight: bold;
  margin-bottom: 20px;
`
const StyledCard = styled.div`
  padding: 15px 15px 30px 15px;
  border-radius: 10px;
  background-color: #F0D7B3;
  width: 555px;
  margin-bottom: 24px;
  .p-highlight {
    background-color: rgb(201, 97, 0) !important;
    border-color: rgb(201, 97, 0) !important;
  } 
`
const StyledCardTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
`

export const FormPage = ({ userKey }) => {
  let query = useParams();
  const formKey = query.id;
  const [formData, setFormData] = useState({});
  const [answerData, setAnswerData] = useState([]);
  console.log('answerData: ', answerData);
  
  const handleSubmitClick = () => {
    // fetch('https://script.google.com/macros/s/AKfycbytdg5_3I2clOXaX1gONvsZSkTomIStWR_o7nbtdRdskexi4byy/exec?data+'+JSON.stringify(body), {
    //   method: 'POST',
    //   // body: data,
    //   headers: {
    //     'Content-Type': 'text/plain;charset=utf-8',
    //   }
    // }).then(response => {
    //   console.log('success:', response);
    // }).catch(err => {
    //   console.log('Error:' + err);
    // });
  }
  useEffect(() => {
    if (formKey) {
      firebase.database().ref('/forms/'+ formKey).once('value').then((snapshot) => {
        setFormData(snapshot.val().formData);
        const initAnswer = snapshot.val().formData.detail.map(item => ({index: item.index, type: item.questionType, answer: ''}));
        setAnswerData(initAnswer);
      });
    }
  }, [formKey]);


  return (
    <StyledWrapper>
      <StyledTitle>問卷 - {formData.title}</StyledTitle>
      {get(formData, ['detail'], []).map((question, index) => (
        <StyledCard key={index}>
          <StyledCardTitle>{question.title}</StyledCardTitle>
          <CardContent type={question.questionType} detail={question.questionInfo} questionIndex={index} answerData={answerData} setAnswerData={setAnswerData} />
        </StyledCard>
      )
      )}
      <button onClick={handleSubmitClick}>送出</button>
    </StyledWrapper>
  )
  
}