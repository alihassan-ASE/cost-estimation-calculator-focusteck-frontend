'use client'
import Stepper from './Components/Stepper/page';
import Responses from '../jsonData/responses';
import { useState } from 'react';

const question =  {
  "_id": "6560a181c9f7ceabb2c23853",
  "question": "What is the preferred monetization model for the mobile app?",
  "options": [
    {
      "opt": "Freemium",
      "nextQuestion": "",
      "price": 15
    },
    {
      "opt": "In-app purchases",
      "nextQuestion": "",
      "price": 15
    },
    {
      "opt": "Ad-supported",
      "nextQuestion": "",
      "price": 15
    },
    {
      "opt": "Paid app",
      "nextQuestion": "",
      "price": 15
    }
  ],
  "selectedOption": {
    "opt": "In-app purchases",
    "nextQuestion": "",
    "price": 15
  },
  "nextQuestion": "",
  "label": "monetization model",
  "state": "Dynamic"
}

const page = () => {


  let [actualResponses , setActualResponses]  = useState(Responses);

  const addQestion = ()=>{
    setActualResponses((prevResponses) => [...prevResponses, question]);
  }
  const changeActiveQuestion = (index) => {
    actualResponses.splice(index);
  }

  return (
    <>
      <Stepper responses={actualResponses} changeActiveQuestion={changeActiveQuestion} />
      <button onClick={addQestion}>Add Question</button>

    </>
  )
}

export default page;
