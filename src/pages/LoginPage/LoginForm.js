import React, { useState, useEffect } from 'react';
import update from 'immutability-helper';
import styled from 'styled-components';
import firebase from 'firebase';
import { useHistory } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
  margin-right: ${props => props.marginRight}px;
`
const StyledLabel = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 6px;
`
const StyledInput = styled(InputText)`
  height: 40px;
  border-radius: 10px !important;
  border: solid 2px #eaeaea !important;
  padding-left: 20px !important;
  margin-left: 5px;
  width: 360px;
  @media (max-width: 414px) {
    width: 85%;
  }
`
const StyledDropdown = styled(Dropdown)`
  width: 143px;
  height: 30px;
  border-radius: 10px !important;
  border: solid 2px #eaeaea !important;
  padding-left: 20px !important;
  .p-dropdown-trigger, .p-dropdown-label {
    background-color: unset !important;
  }
  margin-left: 5px;
  @media (max-width: 414px) {
    width: 85%;
  }
`
const StyledMultiSelect = styled(MultiSelect)`
  width: 360px;
  height: 30px !important;
  border-radius: 10px !important;
  border: solid 2px #eaeaea !important;
  padding-left: 20px !important;
  .p-multiselect-trigger, .p-multiselect-label {
    background-color: unset !important;
  }
  .p-multiselect-label-container {
    height: 30px !important;
  }
  margin-left: 5px;
  @media (max-width: 414px) {
    width: 85%;
  }
`
const StyledInputNumber = styled(InputNumber)`
  input {
    width: 92px;
    height: 30px;
    border-radius: 10px !important;
    border: solid 2px #eaeaea !important;
    text-align: center;
    margin-top: 2px;
    margin-left: 5px;
    @media (max-width: 414px) {
      width: 85%;
    }
  }
`
const StyledRadioGroup = styled.div`
  display: flex;
  width: 143px;
  padding-left: 18px;
  padding-right: 15px;
  font-size: 16px;
  color: #333;
  align-items: center;
  margin-top: 8px;
  justify-content: space-between;
  @media (max-width: 414px) {
    width: 85%;
  }
`
const StyledFormRow = styled.div`
  display: flex;
  @media (max-width: 414px) {
    flex-direction: column;
  }
`
const StyledButton = styled(Button)`
  width: 135px;
  height: 48px;
  background-color: #dea552 !important;
  border: 0 !important;
  margin-top: 50px !important;
  font-size: 16px !important;
  font-weight: 500;
  @media (max-width: 414px) {
    margin: 30px 0 !important;
  }
`


const educationItems = [
  {label: '國小', value: 'elementary'},
  {label: '國中', value: 'junior'},
  {label: '高中職', value: 'senior'},
  {label: '大專', value: 'bachelor'},
  {label: '研究所', value: 'master'},
  {label: '研究所以上', value: 'phd'}
];
const marriageItems = [
  {label: '未婚', value: 'single'},
  {label: '已婚', value: 'married'},
];
const interestItems = [
  {label: '閱讀', value: 'reading'},
  {label: '運動', value: 'sports'},
  {label: '旅遊', value: 'travel'},
  {label: '音樂', value: 'music'},
  {label: '3C', value: 'ccc'},
  {label: '時尚', value: 'fashion'},
  {label: '遊戲', value: 'game'},
  {label: '文學', value: 'literature'},
  {label: '時事', value: 'news'},
  {label: '美食', value: 'food'},
  {label: '攝影', value: 'photography'},
  {label: '星座', value: 'star'},
  {label: '投資', value: 'invest'},
  {label: '電影', value: 'movie'},
  {label: '美妝', value: 'cosmetic'},
  {label: '汽車', value: 'car'},
  {label: '科技', value: 'technology'},
  {label: '網購', value: 'eShopping'},
  {label: '其他', value: 'other'},
];
const jobItems = [
  {label: '學生', value: 'student'},
  {label: '軍公教', value: 'government'},
  {label: '餐飲服務業', value: 'food'},
  {label: '專業技術', value: 'technic'},
  {label: '工商貿易', value: 'business'},
  {label: '自由業', value: 'freelance'},
  {label: '退休', value: 'retired'},
  {label: '其他', value: 'others'},
];
const tenureItems = [
  {label: '1年以下', value: 'under1'},
  {label: '1～5年', value: 'under5'},
  {label: '5～10年', value: 'under10'},
  {label: '10年以上', value: 'over10'},
];
const salaryItems = [
  {label: '50萬以下', value: 'below500k'},
  {label: '50萬～1百萬', value: 'below1m'},
  {label: '1百萬以上', value: 'over1m'},
];

const initInfo = {
  name: '',
  gender: 'male',
  age: 20,
  education: null,
  marriage: null,
  interest: [],
  job: null,
  tenure: null,
  salary: null,
}

export const LoginForm = ({ userID = '2994711603897571', userKey, setUserKey }) => {
  const history = useHistory();
  const [info, setInfo] = useState(initInfo);
  const usersRef = firebase.database().ref('/users');
  useEffect(() => {
    usersRef.orderByValue().on('value', function(snapshot) {
      snapshot.forEach(function(data) {
        if (data.val().userID === userID) {
          setUserKey(data.key);
        }
      });
    })
  }, [userID])
  const setInfoItem = (item, value) => {
    setInfo(update(info, {[item]: {$set: value}}));
  }
  const handleInfoSubmit = () => {
    if (userKey) firebase.database().ref('/users/'+ userKey + '/settings').set({
      ...info,
      points: 0,
    });
    history.push('/');
  }
  return (
    <div>
      <StyledForm>
        <StyledLabel>用戶名</StyledLabel>
        <StyledInput value={info.name} onChange={e => setInfoItem('name', e.target.value)} />
      </StyledForm>
      <StyledFormRow>
        <StyledForm marginRight={35}>
          <StyledLabel>性別</StyledLabel>
          <StyledRadioGroup>
            <RadioButton value="male" name="gender" onChange={e => setInfoItem('gender', e.value)} checked={info.gender === 'male'} />
            <label>男</label>
            <RadioButton value="female" name="gender" onChange={e => setInfoItem('gender', e.value)} checked={info.gender === 'female'} />
            <label>女</label>
          </StyledRadioGroup>
        </StyledForm>
        <StyledForm>
          <StyledLabel>年齡</StyledLabel>
          <StyledInputNumber value={info.age} onChange={e => setInfoItem('age', e.value)} mode="decimal" min={0} max={100} />
        </StyledForm>
      </StyledFormRow>
      <StyledFormRow>
        <StyledForm marginRight={35}>
          <StyledLabel>教育程度</StyledLabel>
          <StyledDropdown value={info.education} options={educationItems} onChange={e => setInfoItem('education', e.value)} />
        </StyledForm>
        <StyledForm>
          <StyledLabel>婚姻</StyledLabel>
          <StyledDropdown value={info.marriage} options={marriageItems} onChange={e => setInfoItem('marriage', e.value)} />
        </StyledForm>
      </StyledFormRow>
      <StyledFormRow>
        <StyledForm marginRight={35}>
          <StyledLabel>職業</StyledLabel>
          <StyledDropdown value={info.job} options={jobItems} onChange={e => setInfoItem('job', e.value)} />
        </StyledForm>
      </StyledFormRow>
      <StyledFormRow>
        <StyledForm marginRight={35}>
          <StyledLabel>工作年資</StyledLabel>
          <StyledDropdown value={info.tenure} options={tenureItems} onChange={e => setInfoItem('tenure', e.value)} />
        </StyledForm>
        <StyledForm>
          <StyledLabel>工作年薪</StyledLabel>
          <StyledDropdown value={info.salary} options={salaryItems} onChange={e => setInfoItem('salary', e.value)}/>
        </StyledForm>
      </StyledFormRow>
      <StyledForm>
        <StyledLabel>興趣</StyledLabel>
        <StyledMultiSelect value={info.interest} options={interestItems} onChange={e => setInfoItem('interest', e.value)} />
      </StyledForm>
      <StyledButton label="送出" className="p-button-rounded" onClick={handleInfoSubmit}/>
    </div>
  )
}