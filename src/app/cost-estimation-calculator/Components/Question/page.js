import React from 'react'
import Option from "../Options/page";
const page = (props) => {

  let {question} = props;
  console.log("Fetched Questions" , question)
  return (
    <div>
      <h1>{question.question}</h1>
      <Option options = {question.options}/>
    
    </div>
  )
}

export default page;