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
  height: 311px;
  border: solid 1px #eaeaea;
  height: ${props => props.height}px;
`
const formRecords = [
  {
    id: 0,
    data: '20 / 04 / 30',
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
    data: '20 / 04 / 29',
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
    data: '20 / 04 / 29',
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
    data: '20 / 04 / 29',
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
    data: '20 / 04 / 28',
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
    data: '20 / 04 / 23',
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
    data: '20 / 04 / 23',
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
    data: '20 / 04 / 21',
    time: '10:20',
    action: '填寫',
    formInfo: {
      name: '大中央牛排v.s白鬍子',
      url: 'https://docs.google.com/forms/d/1GfTqFptEDOMxquNwnqpDCjFlwgb8IS2blxtTkQMAL9U/edit',
    },
    points: 0,
  },
]
export const RecordList = () => { 
  return (
    <div>
      <StyledWrapper>
        <div className="title">問卷填寫及上架</div>
        <StyledListWrapper height={311}>

        </StyledListWrapper>
      </StyledWrapper>
      <StyledWrapper>
        <div className="title">幸運轉盤紀錄</div>
        <StyledListWrapper height={207}>
          
        </StyledListWrapper>
      </StyledWrapper>
    </div>
  )
};

