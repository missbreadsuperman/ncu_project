import React, { useState } from 'react';
import styled from 'styled-components';
import update from 'immutability-helper';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';





const StyledWrapper = styled.div`
  padding: 40px 80px;
  max-height: 100vh;
  overflow-y: scroll;
`
const StyledTitle = styled.div`
  font-size: 20px;
  font-weight: 900;
  color: #333;
  margin-bottom: 20px;
`
const StyledStepRow = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
  color: #333;
  margin-bottom: 10px;
  .label {
    font-size: 16px;
    margin-right: 20px;
    strong {
      font-weight: bold;
    }
  }
`
const StyledInput = styled(InputText)`
  width: 582px;
  height: 50px;
  border-radius: 10px !important;
  border: solid 2px #eaeaea;
  font-size: 11px !important;
`
const StyledFormWrapper = styled.div`
  display: grid;
  grid-template-columns: 117px auto;
  grid-template-rows: auto;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-left: 147px;
  margin-bottom: 20px;
`
const StyledFormRow = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  .p-checkbox {
    margin-right: 10px;
  }
  .middle-char {
    margin: 0 9px;
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
  justify-content: space-between;
`
const StyledInputNumber = styled(InputNumber)`
  input {
    width: 75px;
    height: 30px;
    border-radius: 10px !important;
    border: solid 2px #eaeaea !important;
    text-align: center;
    margin-top: 2px;
    margin-left: 5px;
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
`
const StyleInterestWrapper = styled.div`
  display: flex;
  /* width: 20px;
  height: 20px;
  border-radius: 5px;
  border: solid 2px #eaeaea; */
`
const StyledInterestItem = styled.div`
  display: flex;
  align-items: center;
  .label {
    margin-right: 20px;
    font-size: 16px;
    font-weight: normal;
  }
`
const StyledButton = styled(Button)`
  display: block;
  margin: auto !important;
  width: 135px;
  height: 48px;
  background-color: #dea552 !important;
  border: 0 !important;
  /* margin-top: 50px !important; */
  font-size: 16px !important;
  font-weight: 500;
`


const conditions = ['性別', '年齡', '教育程度', '婚姻', '職業', '工作年資', '工作年薪', '興趣'];
const conditionItems = conditions.map(item => ({ text: item, checked: false }));
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
  {label: '閱讀', value: 'reading', checked: false},
  {label: '運動', value: 'sports', checked: false},
  {label: '旅遊', value: 'travel', checked: false},
  {label: '音樂', value: 'music', checked: false},
  {label: '其他', value: 'other', checked: false},
];
const jobItems = [
  {label: '學生', value: 'student', },
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
  {label: '50萬', value: 'below500k'},
  {label: '50萬～1百萬', value: 'below1m'},
  {label: '1百萬以上', value: 'over1m'},
];

export const UploadPage = () => {
  const [formUrl,setFormUrl] = useState(null);
  const [conditionChecked, setConditionChecked] = useState(conditionItems);
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState([20, 40]);
  const [education, setEducation] = useState(['elementary', 'phd']);
  const [marriage, setMarriage] = useState('single');
  const [job, setJob] = useState('student');
  const [tenure, setTenure] = useState('under1');
  const [salary, setSalary] = useState('below500k');
  const [interest, setInterest] = useState(interestItems);

  return (
    <StyledWrapper>
      <StyledTitle>上架問卷</StyledTitle>
      <StyledStepRow>
        <div className="label"><strong>Step1</strong> 輸入 Google 表單網址：</div>
        <StyledInput value={formUrl} onChange={e => setFormUrl(e.value)} />
      </StyledStepRow>
      <StyledStepRow>
        <div className="label"><strong>Step2</strong> 選擇受眾條件：</div>
      </StyledStepRow>
      <StyledFormWrapper>
        <div>
          {
            conditionChecked.map((item,index) => (
              <StyledFormRow key={index}>
                <div><Checkbox checked={item.checked} onChange={e => setConditionChecked(update(conditionChecked, {[index]: { checked: {$set: e.checked}}}))} /></div>
                <div>{item.text}</div>
              </StyledFormRow>
            ))
          }
        </div>
        <div>
          <StyledFormRow>
            <StyledRadioGroup>
              <RadioButton value="male" name="gender" onChange={(e) => setGender(e.value)} checked={gender === 'male'} />
              <label>男</label>
              <RadioButton value="female" name="gender" onChange={(e) => setGender(e.value)} checked={gender === 'female'} />
              <label>女</label>
            </StyledRadioGroup>
          </StyledFormRow>
          <StyledFormRow>
            <StyledInputNumber value={age[0]} onChange={(e) => setAge(update(age, {0: {$set: e.value}}))} mode="decimal" min={0} max={100} />
            <div className="middle-char">～</div>
            <StyledInputNumber value={age[1]} onChange={(e) => setAge(update(age, {1: {$set: e.value}}))} mode="decimal" min={0} max={100} />
          </StyledFormRow>
          <StyledFormRow>
            <StyledDropdown value={education[0]} options={educationItems} onChange={(e) => setEducation(update(education, {0: {$set: e.value}}))} />
            <div className="middle-char">至</div>
            <StyledDropdown value={education[1]} options={educationItems} onChange={(e) => setEducation(update(education, {1: {$set: e.value}}))} />
          </StyledFormRow>
          <StyledFormRow>
            <StyledDropdown value={marriage} options={marriageItems} onChange={(e) => setMarriage(e.value)} />
          </StyledFormRow>
          <StyledFormRow>
            <StyledDropdown value={job} options={jobItems} onChange={(e) => setJob(e.value)} />
          </StyledFormRow>
          <StyledFormRow>
            <StyledDropdown value={tenure} options={tenureItems} onChange={(e) => setTenure(e.value)} />
          </StyledFormRow>
          <StyledFormRow>
            <StyledDropdown value={salary} options={salaryItems} onChange={(e) => setSalary(e.value)} />
          </StyledFormRow>
          <StyledFormRow>
            <StyleInterestWrapper>
              {
                interest.map((item, index) => (
                  <StyledInterestItem key={index}>
                    <Checkbox checked={item.checked} onChange={e => setInterest(update(interest, {[index]: {checked: {$set: e.checked}}}))} />
                    <div className="label">{item.label}</div>
                  </StyledInterestItem>
                ))
              }
            </StyleInterestWrapper>
          </StyledFormRow>
        </div>
      </StyledFormWrapper>
      <StyledButton label="送出" className="p-button-rounded" />
    </StyledWrapper>
  )
}