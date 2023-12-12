import React, { useEffect, useState } from 'react'
import ShowOptions from "../ShowOption";
const page = (props) => {
  let { question, questionId, responsesData } = props;
  const [selectedOption, setSelectedOption] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  console.log("Question", question)
  const [selectedData, setSelectedData] = useState([]);
  const selectedOptionPassToParent = (data) => {
    setSelectedData([data]);
  };



  useEffect(() => {
    if (selectedData) {
      responsesData(selectedData);
    }
  }, [selectedData])


  selectedData.forEach(data => {
    const { nextQuestion } = data;
    console.log(data)
    if (nextQuestion) {
      questionId(nextQuestion);
    }
    else if (question.nextQuestion) {
      questionId(question.nextQuestion)
    }
    else {
      questionId("")
    }

  });

  return (
    <div>
      <h1>{question.question}</h1>
      <ShowOptions options={question.options} selectedOptionPassToParent={selectedOptionPassToParent} selectedOption={selectedOption} />

    </div>
  )
}

export default page;