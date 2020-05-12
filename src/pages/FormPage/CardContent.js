import React from 'react';
import styled from 'styled-components';
import update from 'immutability-helper';
import { get } from 'lodash';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';

const StyledInput = styled(InputText)`
  &:focus {
    box-shadow: none !important;
  }
  border: 0 !important;
  border-bottom: 1px solid !important;
  background-color: unset !important;
  border-radius: 0 !important;
`
const StyledInputTextarea = styled(InputTextarea)`
  &:focus {
    box-shadow: none !important;
  }
  background-color: unset !important;
  border: 1px solid !important;
`
const StyledRadioButton = styled(RadioButton)`
  font-size: 14px;
`
const StyledLabel = styled.div`
  font-size: 14px;
  color: #333;
`
const StyledQuestionRow = styled.div`
  display: flex;
  align-items: center;
  &:not(:last-of-type) {
    margin-bottom: 10px;
  }
`
const StyledDropdown = styled(Dropdown)`
  line-height: ${props => props.lineHeight}px !important;
  min-width: ${props => props.minWidth}px !important;
  .p-dropdown-label.p-inputtext {
    padding: 0 0 0 8px !important;
  }
`
const StyledGridWrapper = styled.div`
  display: grid;
  grid-template-columns: ${props => props.gridTemplateCols};
  grid-template-rows: ${props => props.gridTemplateRows};
  align-items: center;
  text-align: ${props => props.textAlign};
`
const StyledRowFlexItem = styled.div`
  display: flex;
  align-items: center;
`
const StyledCalendar = styled(Calendar)`
  .p-inputtext {
    width: 110px !important;
  }
  .p-calendar-button {
    background-color: rgb(201, 97, 0) !important;
    border-color: rgb(201, 97, 0) !important;
  }
`
const StyledTimeInput = styled(InputNumber)`
  .p-inputnumber-input {
    width: 32px;
    text-align: center;
    height: 33px;
    margin: 0 5px;
  }
`
const body = {
  answers: [
    {
      index: 0,
      type: 'TEXT',
      answer: 'answer for text'
    },
    {
      index: 1,
      type: 'PARAGRAPH_TEXT',
      answer: 'answer for text\n p1 \n p2 \n p3 \n 4 paragraphs'
    },
    {
      index: 2,
      type: 'MULTIPLE_CHOICE',
      answer: '選項 2'
    },
    {
      index: 3,
      type: 'CHECKBOX',
      answer: ['選項 1', '選項 2']
    },
    {
      index: 4,
      type: 'LIST',
      answer: '選項 2'
    },
    {
      index: 5,
      type: 'SCALE',
      answer: 4
    },
    {
      index: 6,
      type: 'GRID',
      answer: ['第 2 欄', '第 1 欄', '第 1 欄', '第 2 欄']
    },
    {
      index: 7,
      type: 'CHECKBOX_GRID',
      answer: [['第 1 欄', '第 2 欄'],[ '第 1 欄'], ['第 1 欄', '第 2 欄'], ['第 2 欄']]
    },
    {
      index: 8,
      type: 'DATE_TIME',
      // month -1
      answer: new Date(Date.UTC(2020, 4 , 15, 3, 12))
    },
    {
      index: 9,
      type: 'DURATION',
      answer: [4,0,41]
    },
    {
      index: 10,
      type: 'TIME',
      answer: [17, 31]
    },
  ]
}

export const CardContent = ({ type, detail, questionIndex, answerData, setAnswerData }) => {
  console.log('answerData: ', answerData);
  const handleCheckboxChange = ({ value, checked}) => {
    if (checked) {
      const tmp = get(answerData, [questionIndex, 'answer'], []);
      let result;
      if (tmp === '') result = update(answerData, {[questionIndex]: {answer: {$set: [value]}}})
      else result = update(answerData, {[questionIndex]: {answer: {$push: [value]}}})
      setAnswerData(result);
    } else {
      const index = get(answerData, [questionIndex, 'answer']).indexOf(value);
      setAnswerData(update(answerData, {[questionIndex]: {answer: { $splice: [[index, 1]] }}}))
    }
  }
  return ( 
    <div>
      {
        type === 'TEXT' && (
          <div>
            <StyledInput value={get(answerData, [questionIndex, 'answer'], '')} onChange={(e) => setAnswerData(update(answerData, {[questionIndex]: {answer: {$set: e.target.value}}}))} />
          </div>
        )
      }
      {
        type === 'PARAGRAPH_TEXT' && (
          <div>
            <StyledInputTextarea rows={5} cols={30} value={get(answerData, [questionIndex, 'answer'], '')} onChange={(e) => setAnswerData(update(answerData, {[questionIndex]: {answer: {$set: e.target.value}}}))} autoResize={true} />
          </div>
        )
      }
      {
        type === 'MULTIPLE_CHOICE' && (
          <div>
            {
              detail.choices.map((choice,i) => (
                <StyledQuestionRow key={i}>
                  <StyledRadioButton inputId={'choice'+i} name="choice" value={choice} onChange={(e) => setAnswerData(update(answerData, {[questionIndex]: {answer: {$set: e.value}}}))} checked={get(answerData, [questionIndex, 'answer'], '') === choice} />
                  <StyledLabel className="p-radiobutton-label">{choice}</StyledLabel>
                </StyledQuestionRow>
              ))
            }
          </div>
        )
      }
      {
        type === 'CHECKBOX' && (
          <div>
            {
              detail.choices.map((choice,i) => (
                <StyledQuestionRow key={i}>
                  <Checkbox inputId={'choice'+i} name="choice" value={choice} onChange={(e) => handleCheckboxChange({value: e.value, checked: e.checked })} checked={get(answerData, [questionIndex, 'answer'], []).indexOf(choice) > -1} />
                  <StyledLabel className="p-radiobutton-label">{choice}</StyledLabel>
                </StyledQuestionRow>
              ))
            }
          </div>
        )
      }
      {
        type === 'LIST' && (
          <div>
            <StyledDropdown value={get(answerData, [questionIndex, 'answer'], '')} options={detail.choices.map(item => ({label: item, value: item}))} onChange={(e) => setAnswerData(update(answerData, {[questionIndex]: {answer: {$set: e.value}}}))} placeholder="Select an answer" lineHeight={30} minWidth={100} />
          </div>
        )
      }
      {
        type === 'SCALE' && (
          <StyledGridWrapper gridTemplateCols={`auto repeat(${detail.bounds[1] - detail.bounds[0]+1}, 38px) auto`} gridTemplateRows="48px 48px" textAlign="center">
            <div />
            {Array.from(Array(detail.bounds[1] - detail.bounds[0]+1)).map((_e,i) => (
              <StyledLabel key={i}>{i}</StyledLabel>
            ))}
            <div />
            <StyledLabel style={{ textAlign: 'start', lineHeight: '1.5em' }}>{detail.labels[0]}</StyledLabel>
            {Array.from(Array(detail.bounds[1] - detail.bounds[0]+1)).map((_e,i) => (
              <div key={i}>
                <RadioButton inputId={'choice'+i} name="choice" value={i} onChange={(e) => setAnswerData(update(answerData, {[questionIndex]: {answer: {$set: e.value}}}))} checked={get(answerData, [questionIndex, 'answer'], '') === i} />
              </div>
            ))}
            <StyledLabel style={{ textAlign: 'start', lineHeight: '1.5em' }}>{detail.labels[1]}</StyledLabel>
          </StyledGridWrapper>
        )
      }
      {
        type === 'GRID' && (
          <StyledGridWrapper gridTemplateCols='110px auto' gridTemplateRows={`repeat(${detail.rows.length + 1}, 50px)`} textAlign="center">
            <div />
            <StyledRowFlexItem>
              {detail.columns.map((col, i) => (<StyledLabel key={i} style={{flexBasis: 100 / detail.columns.length +'%'}}>{col}</StyledLabel>))}
            </StyledRowFlexItem>
            {detail.rows.map((row, i) => ( 
              <React.Fragment key={i}>
                <StyledLabel>{row}</StyledLabel>
                <StyledRowFlexItem>
                  {detail.columns.map((col, j) => (
                    <div key={j} style={{flexBasis: 100 / detail.columns.length +'%'}}>
                      <RadioButton inputId={'choice'+j} name="choice" value={col} onChange={(e) => console.log({city: e.value})} checked={false} />
                    </div>
                  ))}
                </StyledRowFlexItem> 
              </React.Fragment>
            ))}
          </StyledGridWrapper>
        )
      }
      {
        type === 'CHECKBOX_GRID' && (
          <StyledGridWrapper gridTemplateCols='110px auto' gridTemplateRows={`repeat(${detail.rows.length + 1}, 50px)`} textAlign="center">
            <div />
            <StyledRowFlexItem>
              {detail.columns.map((col, i) => (<StyledLabel key={i} style={{flexBasis: 100 / detail.columns.length +'%'}}>{col}</StyledLabel>))}
            </StyledRowFlexItem>
            {detail.rows.map((row, i) => ( 
              <React.Fragment key={i}>
                <StyledLabel>{row}</StyledLabel>
                <StyledRowFlexItem>
                  {detail.columns.map((col, j) => (
                    <div key={j} style={{flexBasis: 100 / detail.columns.length +'%'}}>
                      <Checkbox inputId={'choice'+j} name="choice" value={col} onChange={(e) => console.log({city: e.value})} checked={get(answerData, [questionIndex, 'answer'], '').indexOf(col)>-1} />
                    </div>
                  ))}
                </StyledRowFlexItem> 
              </React.Fragment>
            ))}
          </StyledGridWrapper>
        )
      }
      {
        type === 'DATETIME' && (
          <StyledGridWrapper gridTemplateCols='150px 200px' gridTemplateRows="20px 48px" textAlign="start">
            <StyledLabel>日期</StyledLabel>
            <StyledLabel>時間</StyledLabel>
            <div><StyledCalendar value={new Date()} onChange={(e) => console.log({date3: e.value})} showIcon={true} /></div>
            <StyledRowFlexItem>
              <StyledDropdown value="am" options={[{label: '上午', value: 'am'}, {label: '下午', value: 'pm'}]} onChange={() => console.log('change')} lineHeight={33} minWidth={80} />
              <StyledTimeInput value={11} onChange={(e) => console.log({value20: e.value})} mode="decimal" min={0} max={11} />
                :
              <StyledTimeInput value={22} onChange={(e) => console.log({value20: e.value})} mode="decimal" min={0} max={59} />
            </StyledRowFlexItem>
          </StyledGridWrapper>
        )
      }
      {
        type === 'DURATION' && (
          <StyledGridWrapper gridTemplateCols='50px 10px 50px 10px 50px' gridTemplateRows="20px 48px" textAlign="center">
            <StyledLabel>小時</StyledLabel>
            <div />
            <StyledLabel>分</StyledLabel>
            <div />
            <StyledLabel>秒</StyledLabel>
            <div><StyledTimeInput value={11} onChange={(e) => console.log({value20: e.value})} mode="decimal" min={0} /></div><div>:</div>
            <div><StyledTimeInput value={11} onChange={(e) => console.log({value20: e.value})} mode="decimal" min={0} max={59} /></div><div>:</div>
            <div><StyledTimeInput value={11} onChange={(e) => console.log({value20: e.value})} mode="decimal" min={0} max={59} /></div>
          </StyledGridWrapper>
        )
      }
      {
        type === 'TIME' && (
          <div>
            <StyledGridWrapper gridTemplateCols="auto" gridTemplateRows="24px auto">
              <StyledLabel>時間</StyledLabel>
              <StyledRowFlexItem>
                <StyledDropdown value="am" options={[{label: '上午', value: 'am'}, {label: '下午', value: 'pm'}]} onChange={() => console.log('change')} lineHeight={33} minWidth={80} />
                <StyledTimeInput value={11} onChange={(e) => console.log({value20: e.value})} mode="decimal" min={0} max={11} />
                  :
                <StyledTimeInput value={22} onChange={(e) => console.log({value20: e.value})} mode="decimal" min={0} max={59} />
              </StyledRowFlexItem>
            </StyledGridWrapper>
          </div>
        )
      }
    </div>
  )
};