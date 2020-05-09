import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import styled from 'styled-components';
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
  width: 360px;
  height: 40px;
  border-radius: 10px !important;
  border: solid 2px #eaeaea !important;
  padding-left: 20px !important;
  margin-left: 5px;
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
`
const StyledFormRow = styled.div`
  display: flex;
`
const StyledButton = styled(Button)`
  width: 135px;
  height: 48px;
  background-color: #dea552 !important;
  border: 0 !important;
  margin-top: 50px !important;
  font-size: 16px !important;
  font-weight: 500;
  position: relative;
  left: 90px;
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


export const LoginForm = ({ userKey }) => {
  console.log('userKey: ', userKey);
  const [name, setName] = useState();
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState(20);
  const [education, setEducation] = useState();
  const [marriage, setMarriage] = useState();
  const [interest, setInterest] = useState([]);
  const [job, setJob] = useState([]);
  const [tenure, setTenure] = useState([]);
  const [salary, setSalary] = useState([]);
  const [info, setInfo] = useState({});
  console.log('info: ', info);
  // const getInfoInit = () => firebase.database().ref('/users/'+ userKey + '/settings').once('value').then((snapshot) => {
  //   if (snapshot.val()) {
  //     setInfo(snapshot.val())       
  //   } 
  // })
  // useEffect(() => {
  //   firebase.database().ref('/users/'+ userKey + '/settings').once('value').then((snapshot) => {
  //     if (snapshot.val()) {
  //       setInfo(snapshot.val())       
  //     } 
  //   }, [userKey]); 
  // })
 
  


  return (
    <div>
      <StyledForm>
        <StyledLabel>用戶名</StyledLabel>
        <StyledInput value={name} onChange={(e) => setName(e.value)} />
      </StyledForm>
      <StyledFormRow>
        <StyledForm marginRight={35}>
          <StyledLabel>性別</StyledLabel>
          <StyledRadioGroup>
            <RadioButton value="male" name="gender" onChange={(e) => setGender(e.value)} checked={gender === 'male'} />
            <label>男</label>
            <RadioButton value="female" name="gender" onChange={(e) => setGender(e.value)} checked={gender === 'female'} />
            <label>女</label>
          </StyledRadioGroup>
        </StyledForm>
        <StyledForm>
          <StyledLabel>年齡</StyledLabel>
          <StyledInputNumber value={age} onChange={(e) => setAge(e.value)} mode="decimal" min={0} max={100} />
        </StyledForm>
      </StyledFormRow>
      <StyledFormRow>
        <StyledForm marginRight={35}>
          <StyledLabel>教育程度</StyledLabel>
          <StyledDropdown value={education} options={educationItems} onChange={(e) => setEducation(e.value)} />
        </StyledForm>
        <StyledForm>
          <StyledLabel>婚姻</StyledLabel>
          <StyledDropdown value={marriage} options={marriageItems} onChange={(e) => setMarriage(e.value)} />
        </StyledForm>
      </StyledFormRow>
      <StyledFormRow>
        <StyledForm marginRight={35}>
          <StyledLabel>職業</StyledLabel>
          <StyledDropdown value={job} options={jobItems} onChange={(e) => setJob(e.value)} />
        </StyledForm>
      </StyledFormRow>
      <StyledFormRow>
        <StyledForm marginRight={35}>
          <StyledLabel>工作年資</StyledLabel>
          <StyledDropdown value={tenure} options={tenureItems} onChange={(e) => setTenure(e.value)} />
        </StyledForm>
        <StyledForm>
          <StyledLabel>工作年薪</StyledLabel>
          <StyledDropdown value={salary} options={salaryItems} onChange={(e) => setSalary(e.value)} />
        </StyledForm>
      </StyledFormRow>
      <StyledForm>
        <StyledLabel>興趣</StyledLabel>
        <StyledMultiSelect value={interest} options={interestItems} onChange={(e) => setInterest(e.value)} />
      </StyledForm>
      <StyledButton label="送出" className="p-button-rounded" />
    </div>
  )
}