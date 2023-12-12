'use client'
// last code
import Stepper from '../Components/Stepper/page';
// import Responses from '../../jsonData/responses';
import Question from '../Components/Question/page';
import { getQuestions, getDynamicQuestion } from '@/app/lib/api/getProjectQuestions';
import { useState, useEffect } from 'react';

const page = () => {

  const [fetchQuestions, setFetchQuestions] = useState(null);
  const [preProjectQuestions, setPreQuestion] = useState([]);
  const [dynamicQuestion, setDynamicQuestion] = useState([]);
  const [dynamicQuestionId, setDynamicQuestionId] = useState();
  const [postProjectQuestions, setPostQuestion] = useState([]);
  const [actualResponses, setActualResponses] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [dynamicQuestionsIterated, setDynamicQuestionsIterated] = useState(false);
  const [postQuestionIndex, setPostQuestionIndex] = useState(0);
  const [question, setQuestion] = useState(null);

  const [handleButton, setHandleButton] = useState(false)




  useEffect(() => {
    const fetchData = () => {
      getQuestions()
        .then(data => {
          setFetchQuestions(data);
          setPreQuestion(data.preProjectQuestion);
          setPostQuestion(data.postProjectQuestion);
          setQuestion(data.preProjectQuestion[currentQuestionIndex]);
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

      try {
        const dynamic = await getDynamicQuestion(dynamicQuestionId);
        setDynamicQuestion(dynamic);
        // Rest of your logic based on dynamic question data
      } catch (error) {
        console.error('Error fetching dynamic question:', error);
        // Handle errors here (e.g., set an error state)
      }

    };

    fetchDynamicQuestion();
  }, [dynamicQuestionId]);



  const changeActiveQuestion = (obj) => {

    const { index, step } = obj;
    let Index;
    let postQuestion;

    postProjectQuestions.map((ques, i) => {

      if (ques.question === step.question) {
        Index = i;
        postQuestion = ques;

      }
    })

    if (index <= preProjectQuestions.length) {
      setCurrentQuestionIndex(index - 1);
      setQuestion(step);
    }
    else if (postQuestion !== undefined) {
      console.log("Post Question", postQuestion)
      setQuestion(postQuestion);
      setPostQuestionIndex(Index + 1);

    }
    else {
      setPostQuestionIndex(0)
      setQuestion(step)
    }
    actualResponses.splice(index - 1);
  }

  // Getting Id of Dynamic Question from child
  const getDynamicQuestionId = async (id) => {
    
    setDynamicQuestionId(id);


  }

  const getResponsesData = (obj) => {
    if (obj.length > 0) {
      question.selectedOption = obj;
      setHandleButton(true)
    }

  }

  const handleNextQuestion = () => {

    setActualResponses((prev) => [...prev, question]);
    setHandleButton(false);

    if (currentQuestionIndex < preProjectQuestions.length - 1) {
      // Send preProjectQuestions one by one
      setQuestion(preProjectQuestions[currentQuestionIndex + 1]);
      setCurrentQuestionIndex(currentQuestionIndex + 1);

      if (currentQuestionIndex == preProjectQuestions.length - 1) {
        setDynamicQuestionsIterated(true);
      }
    }
    else if (
      currentQuestionIndex >= preProjectQuestions.length - 1
    ) {
      console.log(currentQuestionIndex)
      console.log(dynamicQuestion)
      setQuestion(dynamicQuestion);

      if (actualResponses.length > preProjectQuestions.length && dynamicQuestionId == "") {

        setQuestion(postProjectQuestions[postQuestionIndex]);
        setPostQuestionIndex(postQuestionIndex + 1);

      }

    }

  };

  const handleBackQuestion = () => {


    if (currentQuestionIndex > 0) {

      if (currentQuestionIndex < preProjectQuestions.length && actualResponses.length <= preProjectQuestions.length) {

        if (actualResponses.length == preProjectQuestions.length) {
          const prevQuestion = preProjectQuestions[currentQuestionIndex]
          setCurrentQuestionIndex(currentQuestionIndex)
          setQuestion(prevQuestion);
          setDynamicQuestionsIterated(false)
        }
        else {

          const prevQuestion = preProjectQuestions[currentQuestionIndex - 1]
          setCurrentQuestionIndex(currentQuestionIndex - 1)
          setQuestion(prevQuestion);
        }
        actualResponses.pop();


      } else if (actualResponses.length > preProjectQuestions.length && dynamicQuestionsIterated == true) {

        const prevDynamic = actualResponses.pop();
        setQuestion(prevDynamic)
        if (actualResponses.length == preProjectQuestions.length) {
          setDynamicQuestionsIterated(false);
        }
      }
      else if (postQuestionIndex > 0) {
        const prevPostQuestion = actualResponses.pop();
        setQuestion(prevPostQuestion);
        setPostQuestionIndex(postQuestionIndex - 1);

      }
      else if (postQuestionIndex === 0 && dynamicQuestionsIterated == false) {
        const prevPostQuestion = actualResponses.pop();
        setQuestion(prevPostQuestion);
        setDynamicQuestionsIterated(true)
      }
    }
  };


  return (
    <>
      {
        fetchQuestions !== null ?
          <div>
            <div className='flex w-full h-screen justify-between items-center'>
              <div>
                <Question question={question} questionId={getDynamicQuestionId} responsesData={getResponsesData} />
              </div>
              <div>
                <Stepper responses={actualResponses} changeActiveQuestion={changeActiveQuestion} />
              </div>
            </div>
            <div>
              <button onClick={handleBackQuestion}>Back</button>
              <button disabled={!handleButton} onClick={handleNextQuestion}>Next</button>
            </div>
          </div> :
          <div>Loading .....</div>
      }
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
