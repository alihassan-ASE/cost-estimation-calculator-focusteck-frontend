'use client'
// last code
import Stepper from '../Components/Stepper/page';
import Responses from '../../jsonData/responses';
import Question from '../Components/Question/page';
import { getQuestions, getDynamicQuestion } from '@/app/lib/api/getProjectQuestions';
import { useState, useEffect } from 'react';

const page = () => {

  const [fetchQuestions, setFetchQuestions] = useState(null);
  const [preProjectQuestions, setPreQuestion] = useState([]);
  const [dynamicQuestion, setDynamicQuestion] = useState([]);
  const [dynamicQuestionIds, setDynamicQuestionIds] = useState([]);
  const [currentDynamicQuestionIndex, setCurrentDynamicQuestionIndex] = useState(0);
  const [postProjectQuestions, setPostQuestion] = useState([]);
  const [actualResponses, setActualResponses] = useState(Responses);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [question, setQuestion] = useState(null);


  useEffect(() => {
    const fetchData = () => {
      getQuestions()
        .then(data => {
          setFetchQuestions(data);
          setPreQuestion(data.preProjectQuestion);
          setPostQuestion(data.postProjectQuestion);
        })
        .catch(error => {
          console.error('Error fetching questions:', error);
          // Handle errors here (e.g., set an error state)
        });
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchDynamicQuestion = async () => {
      const dynamic = await getDynamicQuestion();
      setDynamicQuestion(dynamic)
    }
    fetchDynamicQuestion();
  }, [dynamicQuestionIds, currentDynamicQuestionIndex]);



  // setting first pre question to Question state
  if (fetchQuestions !== null && currentQuestionIndex == 0) {

    setQuestion(preProjectQuestions[currentQuestionIndex]);
    setCurrentQuestionIndex(1)


  }

  const addQestion = () => {
    setActualResponses((prevResponses) => [...prevResponses, quest]);
  }

  const changeActiveQuestion = (index) => {
    actualResponses.splice(index);
  }

  const getDynamicQuestionId = (id) => {
    console.log("first")
  }

  const handleNextQuestion = () => {

    if (currentQuestionIndex < preProjectQuestions.length) {
      // Send preProjectQuestions one by one
      setQuestion(preProjectQuestions[currentQuestionIndex]);
    } else if (
      currentQuestionIndex >= preProjectQuestions.length
    ) {
      // Send dynamicQuestions one by one  
      setQuestion(dynamicQuestion);
      console.log("Dynamic", dynamicQuestion._id)
    }
    else if (
      currentQuestionIndex >= preProjectQuestions.length + dynamicQuestion.length &&
      currentQuestionIndex < preProjectQuestions.length + dynamicQuestion.length + postProjectQuestions.length
    ) {
      // Send postProjectQuestions one by one
      const postIndex = currentQuestionIndex - preProjectQuestions.length - dynamicQuestion.length;
      setQuestion(postProjectQuestions[postIndex]);
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);

  };


  return (
    <>
      {
        fetchQuestions !== null ?
          <div>
            <div className='flex w-full h-screen justify-between items-center'>
              <div>
                <Question question={question} questionId={getDynamicQuestionId} />
              </div>
              <div>
                <Stepper responses={actualResponses} changeActiveQuestion={changeActiveQuestion} />
              </div>
            </div>
            <div>
              <button>Back</button>
              <button onClick={handleNextQuestion}>Next</button>
            </div>
          </div> :
          <div>Loading .....</div>
      }
      <button onClick={addQestion}>Add Question</button>

    </>
  )
}

export default page;




// import projectBase from "../../jsonData/responses";

// const usePreQuestions = () => {
//   const [fetchQuestions, setFetchQuestions] = useState(null);
//   useEffect(() => {
//     const fetchData = () => {
//       getQuestions()
//         .then(data => {
//           setFetchQuestions(data);
//         })
//         .catch(error => {
//           console.error('Error fetching questions:', error);
//           // Handle errors here (e.g., set an error state)
//         });
//     };

//     fetchData();
//   }, []);

//   const getSingleQuestion = (index) => {
//     if (projectBase.length > 0) {
//       console.log(index)
//       let quest = projectBase.find((item)=>  item._id == index );
//       return quest;
//       // console.log(quest)
//       // return fetchQuestions.Resources[index];
//     }
//   };

//   return { fetchQuestions, getSingleQuestion }; // Return fetched questions or null if loading
// };

// export default usePreQuestions;
