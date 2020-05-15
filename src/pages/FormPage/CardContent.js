import React, { useEffect, useState } from 'react';
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

export const CardContent = ({ type, detail, questionIndex, answerData, setAnswerData }) => {
  console.log('CardContent -> answerData', answerData)
  const [dateTime, setDateTime] = useState({date: new Date(), hour: new Date().getHours(), minute: new Date().getMinutes()})
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
  const handleGridChange = ({ value, row }) => {
    const tmp = update(answerData, {[questionIndex]: {answer: {[row]: {$set: value}}}})
    setAnswerData(tmp)
  }
  const handleGridCheckboxChange = ({ value, row, checked }) => {
    if (checked) {
      const tmp =  update(answerData, {[questionIndex]: {answer: {[row]: {$push: [value]}}}})
      setAnswerData(tmp)
    } else {
      const index = get(answerData, [questionIndex, 'answer', row], []).indexOf(value);
      setAnswerData(update(answerData, {[questionIndex]: {answer: {[row]: { $splice: [[index, 1]] }}}}))
    }
  }
  useEffect(() => {
    if (answerData[questionIndex]) {
      const dateTimeTmp =  new Date(dateTime.date.getFullYear(), dateTime.date.getMonth() , dateTime.date.getDate(), dateTime.hour, dateTime.minute)
      setAnswerData(update(answerData, {[questionIndex]: {answer: {$set: dateTimeTmp}}}))
    }
  }, [dateTime]);
  
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
                      <RadioButton inputId={'choice'+j} name="choice" value={col} onChange={(e) => handleGridChange({value: e.value, row: i })} checked={get(answerData, [questionIndex, 'answer', i], ['']) === col} />
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
                      <Checkbox inputId={'choice'+j} name="choice" value={col} onChange={(e) => handleGridCheckboxChange({value: e.value, row: i, checked: e.checked })} checked={get(answerData, [questionIndex, 'answer', i], ['']).indexOf(col) > -1} />
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
            <div><StyledCalendar value={dateTime.date} onChange={(e) => setDateTime(update(dateTime, {date: {$set: e.value}}))} showIcon={true} /></div>
            <StyledRowFlexItem>
              <StyledTimeInput value={dateTime.hour} onChange={(e) => setDateTime(update(dateTime, {hour: {$set: e.value}}))} mode="decimal" min={0} max={23} />
                :
              <StyledTimeInput value={dateTime.minute} onChange={(e) => setDateTime(update(dateTime, {minute: {$set: e.value}}))} mode="decimal" min={0} max={59} />
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
            <div><StyledTimeInput value={get(answerData, [questionIndex, 'answer', 0], [0])} onChange={(e) => setAnswerData(update(answerData, {[questionIndex]: {answer: {0: {$set: e.value}}}}))} mode="decimal" min={0} max={72} /></div><div>:</div>
            <div><StyledTimeInput value={get(answerData, [questionIndex, 'answer', 1], [0])} onChange={(e) => setAnswerData(update(answerData, {[questionIndex]: {answer: {1: {$set: e.value}}}}))} mode="decimal" min={0} max={59} /></div><div>:</div>
            <div><StyledTimeInput value={get(answerData, [questionIndex, 'answer', 2], [0])} onChange={(e) => setAnswerData(update(answerData, {[questionIndex]: {answer: {2: {$set: e.value}}}}))} mode="decimal" min={0} max={59} /></div>
          </StyledGridWrapper>
        )
      }
      {
        type === 'TIME' && (
          <div>
            <StyledGridWrapper gridTemplateCols="auto" gridTemplateRows="24px auto">
              <StyledLabel>時間</StyledLabel>
              <StyledRowFlexItem>
                <StyledTimeInput value={get(answerData, [questionIndex, 'answer', 0], [0])} onChange={(e) => setAnswerData(update(answerData, {[questionIndex]: {answer: {0: {$set: e.value}}}}))} mode="decimal" min={0} max={23} />
                  :
                <StyledTimeInput value={get(answerData, [questionIndex, 'answer', 1], [0])} onChange={(e) => setAnswerData(update(answerData, {[questionIndex]: {answer: {1: {$set: e.value}}}}))} mode="decimal" min={0} max={59} />
              </StyledRowFlexItem>
            </StyledGridWrapper>
          </div>
        )
      }
    </div>
  )
};