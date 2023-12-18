"use client";
// final code
import Stepper from "../Components/Stepper/page";
import Question from "../Components/Question/page";
import {
  getQuestions,
  getDynamicQuestion,
} from "@/app/lib/api/getProjectQuestions";
import { useState, useEffect } from "react";
import { Button, Box, Typography } from "@mui/material";
import { useRouter } from 'next/navigation';

const page = () => {
  const [preProjectQuestions, setPreQuestion] = useState([]);
  const [postProjectQuestions, setPostQuestion] = useState([]);

  const [currentState, setCurrentState] = useState("pre");
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [selectedOption, setSelectedOption] = useState();
  const [selectedData, setSelectedData] = useState();
  const [fetchQuesitons, setFetchQuestions] = useState(null);
  const [actualResponses, setActualResponses] = useState([]);
  const [questionsToShow, setQuestionsToShow] = useState([]);
  const [lastQuestionSelected , setLastQuestionSelected] = useState();

  const [isOptionSelected, setIsOptionSelected] = useState(true);


  const [totalCost, setTotalCost] = useState(0);

  const route = useRouter();
  let cost;



  useEffect(() => {
    const fetchData = () => {
      getQuestions()
        .then((data) => {
          setFetchQuestions(data);
          setPreQuestion(data.preProjectQuestion);
          setCurrentQuestion(data.preProjectQuestion[currentQuestionIndex]);
          setPostQuestion(data.postProjectQuestion);
        })
        .catch((error) => {
          console.error("Error fetching questions:", error);
          // Handle errors here (e.g., set an error state)
        });
    };

    fetchData();
  }, []);


  const handlePrice = (type, price) => {

    cost = 0;
    switch (type) {
      case "next": {
        setTotalCost((prev) => prev + price);
        break;
      }
      case "back": {
        setTotalCost((prev) => prev - price);
        break;
      }
      case "stepper": {
        actualResponses.map((obj) => {
          obj.selectedOption.map((selected) => {
            cost = selected.price + cost;
          });
        });
        setTotalCost(cost);
        break;
      }
    }
  };

  // getting Response from child Component
  const getResponsesData = (resp) => {
    setSelectedData(resp.selectedData);
    setSelectedOption(resp.nextQuestion);
    setIsOptionSelected(false)

  };

  // setting Response in actual Array
  const setResponseData = () => {
    const dataObj = {};
    dataObj.selectedOption = selectedData;
    dataObj.question = currentQuestion;
    dataObj.state = currentState;
    dataObj.index = currentQuestionIndex;
    setActualResponses((prev) => [...prev, dataObj]);
  };

  // Handling Back Quesiton Functionality
  const backQuestion = () => {
    cost = 0;
    let newResponse = [...actualResponses];
    let lastQuestion = newResponse.pop();
    setCurrentQuestion(lastQuestion.question);
    setCurrentState(lastQuestion.state);
    setActualResponses(newResponse);
    setCurrentQuestionIndex(lastQuestion.index);
    setLastQuestionSelected(lastQuestion.selectedOption)

    lastQuestion.selectedOption.map((op) => {
      cost = op.price;
    })
    handlePrice("back", cost)

  }

  // Handling Next Question
  const nextQuestion = async () => {

    cost = 0;

    selectedData.map((op) => {
      cost = cost + op.price;
    });

    setTotalCost((prev) => prev + cost);

    // handlePrice("next", cost);
    setIsOptionSelected(true);

    let currentStateLocal = currentState;
    let currentQuestionLocal = currentQuestion;
    let currentQuestionIndexLocal = currentQuestionIndex;
    let questionsToShowLocal = questionsToShow;

    switch (currentStateLocal) {
      case "pre": {
        if (currentQuestionIndexLocal >= preProjectQuestions.length - 1) {
          currentStateLocal = "dynamic";
          currentQuestionLocal = null;
          currentQuestionIndexLocal = 0;
        } else {
          currentQuestionLocal = preProjectQuestions[currentQuestionIndexLocal + 1];
          currentQuestionIndexLocal++;
        }
        if (currentQuestionLocal) {
          break;
        }
      }
      case "dynamic": {
        if (!currentQuestionLocal) {

          currentQuestionLocal = await getDynamicQuestion();
        } else if (currentQuestionLocal) {
          if (Array.isArray(selectedOption)) {
            questionsToShowLocal.push(...selectedOption);
          } else {
            if (selectedOption) {
              questionsToShowLocal.push(selectedOption);
            }
          }
          if (questionsToShowLocal.length) {
            currentQuestionLocal = await getDynamicQuestion(questionsToShowLocal.pop());
          } else {
            currentStateLocal = "post";
            currentQuestionLocal = null;
            currentQuestionIndexLocal = 0;
          }
        }
        if (currentQuestionLocal) {
          break;
        }
      }

      case "post": {
        if (currentQuestionIndexLocal < postProjectQuestions.length) {
          currentQuestionLocal = postProjectQuestions[currentQuestionIndexLocal];
          currentQuestionIndexLocal++;
        }
        else {
         break ;
        }
      }

      default: {
        null;
      }
    }
    setCurrentState(currentStateLocal);
    setCurrentQuestion(currentQuestionLocal);
    setCurrentQuestionIndex(currentQuestionIndexLocal);
    setQuestionsToShow(questionsToShowLocal);
    setResponseData();


  };
  
  // Handling Stepper and Active Question
  const changeActiveQuestion = (obj) => {
    const { index, step } = obj;

    setCurrentQuestionIndex(step.index);
    setCurrentQuestion(step.question);
    setCurrentState(step.state);
    actualResponses.splice(index - 1);
    handlePrice("stepper");
  };


  const goToForm = () => {
    try {
      let data = JSON.stringify({ responses: actualResponses, totalCost: totalCost });
      localStorage.setItem("Response", data);
      route.push('/cost-estimation-calculator/submit');
    } catch (error) {
      console.log("Error",error)
    }
  };

  if(currentState === 'post' && currentQuestionIndex >= postProjectQuestions.length){
    goToForm(); 
  }

  return (
    <>
      {fetchQuesitons !== null ? (
        <Box sx={{ margin: "1em 2em" }}>
          <Typography variant="h6">Total Cost : $ {totalCost}</Typography>
          <Box
            className="flex w-full h-screen justify-between items-center"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box>
              <Question
                currentQuestion={currentQuestion}
                getResponsesData={getResponsesData}
                lastQuestionSelected = {lastQuestionSelected}
              />
              <Box sx={{ display: "flex", gap: "2em", margin: "3em 1em " }}>
                {actualResponses.length > 0 ? <Button
                  size="medium"
                  variant="contained"
                  sx={{ width: 150 }}
                  vairant="contained"
                  onClick={backQuestion}
                >
                  Back
                </Button> : null}
                <Button
                  disabled={isOptionSelected}
                  size="medium"
                  variant="contained"
                  sx={{ width: 150 }}
                  vairant="contained"
                  onClick={nextQuestion}
                >
                  Next
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                margin: "2em 3em 2em 5em",
                minWidth: "300px",
              }}
            >
              <Stepper
                responses={actualResponses}
                changeActiveQuestion={changeActiveQuestion}
              />
            </Box>
          </Box>
        </Box>
      ) : (
        <div>Loading .....</div>
      )}
    </>
  );
};

export default page;
