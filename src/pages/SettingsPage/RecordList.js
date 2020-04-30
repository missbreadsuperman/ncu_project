import React from 'react';
import styled from 'styled-components';


const StyledWrapper = styled.div`
  margin-bottom: 15px;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
  }
`
const StyledListWrapper = styled.div`
  max-height: 311px;
  overflow-y: scroll;
  border: solid 1px #eaeaea;
  height: ${props => props.height}px;
  `
const StyledListRow = styled.div`
  display: grid;
  color: #333;
  grid-template-columns: ${props => props.gridTemplateColumns};
  grid-template-rows: 50px;
  font-size: 16px;
  font-weight: ${props => props.fontWeight === 'bold' ? 'bold' : 'normal'};
  align-items: center;
  background-color: ${props => props.bgColor};
  & > div:first-of-type {
    padding-left: 20px;
  }
`
const formRecords = [
  {
    id: 0,
    date: '20 / 04 / 30',
    time: '14:20',
    action: '上架',
    formInfo: {
      name: '大中央牛排v.s白鬍子',
      url: 'https://docs.google.com/forms/d/1GfTqFptEDOMxquNwnqpDCjFlwgb8IS2blxtTkQMAL9U/edit',
    },
    points: 23,
  },
  {
    id: 1,
    date: '20 / 04 / 29',
    time: '18:20',
    action: '填寫',
    formInfo: {
      name: '大中央牛排v.s白鬍子',
      url: 'https://docs.google.com/forms/d/1GfTqFptEDOMxquNwnqpDCjFlwgb8IS2blxtTkQMAL9U/edit',
    },
    points: 33,
  },
  {
    id: 2,
    date: '20 / 04 / 29',
    time: '12:20',
    action: '填寫',
    formInfo: {
      name: '大中央牛排v.s白鬍子',
      url: 'https://docs.google.com/forms/d/1GfTqFptEDOMxquNwnqpDCjFlwgb8IS2blxtTkQMAL9U/edit',
    },
    points: 30,
  },
  {
    id: 3,
    date: '20 / 04 / 29',
    time: '12:20',
    action: '填寫',
    formInfo: {
      name: '大中央牛排v.s白鬍子',
      url: 'https://docs.google.com/forms/d/1GfTqFptEDOMxquNwnqpDCjFlwgb8IS2blxtTkQMAL9U/edit',
    },
    points: 20,
  },
  {
    id: 4,
    date: '20 / 04 / 28',
    time: '21:20',
    action: '填寫',
    formInfo: {
      name: '大中央牛排v.s白鬍子',
      url: 'https://docs.google.com/forms/d/1GfTqFptEDOMxquNwnqpDCjFlwgb8IS2blxtTkQMAL9U/edit',
    },
    points: 10,
  },
  {
    id: 5,
    date: '20 / 04 / 23',
    time: '21:20',
    action: '填寫',
    formInfo: {
      name: '大中央牛排v.s白鬍子',
      url: 'https://docs.google.com/forms/d/1GfTqFptEDOMxquNwnqpDCjFlwgb8IS2blxtTkQMAL9U/edit',
    },
    points: 4,
  },
  {
    id: 6,
    date: '20 / 04 / 23',
    time: '10:20',
    action: '填寫',
    formInfo: {
      name: '大中央牛排v.s白鬍子',
      url: 'https://docs.google.com/forms/d/1GfTqFptEDOMxquNwnqpDCjFlwgb8IS2blxtTkQMAL9U/edit',
    },
    points: 2,
  },
  {
    id: 7,
    date: '20 / 04 / 21',
    time: '10:20',
    action: '填寫',
    formInfo: {
      name: '大中央牛排v.s白鬍子',
      url: 'https://docs.google.com/forms/d/1GfTqFptEDOMxquNwnqpDCjFlwgb8IS2blxtTkQMAL9U/edit',
    },
    points: 0,
  },
];
const luckyRecords = [
  {
    id: 0,
    date: '20 / 04 / 30',
    time: '16:20',
    result: '中獎 - 獎品名稱',
    points: 30,

  },
  {
    id: 1,
    date: '20 / 04 / 30',
    time: '14:20',
    result: '摃龜',
    points: 50,
  },
]
const gridColumnsForFormList = '138px 87px 70px 302px 177px';
const gridColumnsForLuckyList = '138px 87px 372px 177px';
export const RecordList = () => { 
  return (
    <div>
      <StyledWrapper>
        <div className="title">問卷填寫及上架</div>
        <StyledListWrapper height={311}>
          <StyledListRow gridTemplateColumns={gridColumnsForFormList} fontWeight="bold">
            <div>日期</div>
            <div>時間</div>
            <div>動作</div>
            <div>問卷</div>
            <div>完成後剩餘點數</div>
          </StyledListRow>
          {
            formRecords.map((record,index) => (
              <StyledListRow key={index} gridTemplateColumns={gridColumnsForFormList} bgColor={record.action === '填寫' ? '#ecf9ef' : '#fefbec'}>
                <div>{record.date}</div>
                <div>{record.time}</div>
                <div>{record.action}</div>
                <a target="_blank" href={record.formInfo.url}>{record.formInfo.name}</a>
                <div>{record.points}</div>
              </StyledListRow>
            ))
          }
        </StyledListWrapper>
      </StyledWrapper>
      <StyledWrapper>
        <div className="title">幸運轉盤紀錄</div>
        <StyledListWrapper height={207} >
          <StyledListRow gridTemplateColumns={gridColumnsForLuckyList} fontWeight="bold">
            <div>日期</div>
            <div>時間</div>
            <div>開獎結果</div>
            <div>完成後剩餘點數</div>
          </StyledListRow>
          {
            luckyRecords.map((record,index) => (
              <StyledListRow key={index} gridTemplateColumns={gridColumnsForLuckyList} bgColor={record.result === '摃龜' ? '#fefbec' : '#ecf9ef'}>
                <div>{record.date}</div>
                <div>{record.time}</div>
                <div>{record.result}</div>
                <div>{record.points}</div>
              </StyledListRow>
            ))
          }
        </StyledListWrapper>
      </StyledWrapper>
    </div>
  )
};

