import React, { useEffect, useState } from 'react'
import ShowOptions from "../ShowOption";
const page = (props) => {
  let { currentQuestion, getResponsesData } = props;
  const [selectedOption, setSelectedOption] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  const [selectedData, setSelectedData] = useState([]);
  const selectedOptionPassToParent = (data) => {
    setSelectedData([data]);
  };


  useEffect(() => {
    if (selectedData || Array.isArray(selectedData)) {
      selectedData.forEach(data => {
        const { nextQuestion } = data;

        if (nextQuestion == undefined) {

          getResponsesData({ selectedData });
        }
         else if (nextQuestion !== '') {
          getResponsesData({ selectedData, nextQuestion})
        }
        else if (currentQuestion.nextQuestion) {
          getResponsesData({ selectedData, nextQuestion: currentQuestion.nextQuestion  });
        } else {
          getResponsesData({ selectedData, nextQuestion: currentQuestion.nextQuestion  });
        }
      });
    }
  }, [selectedData, currentQuestion]);


  return (
    <div>
      <h1>{currentQuestion.question}</h1>
      <ShowOptions options={currentQuestion.options} selectedOptionPassToParent={selectedOptionPassToParent} selectedOption={selectedOption} />

    </div>
  )
}

export default page;