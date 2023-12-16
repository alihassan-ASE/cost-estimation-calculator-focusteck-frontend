"use client";
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

  const [totalCost, setTotalCost] = useState(0);

  const route = useRouter();

  useEffect(() => {
    const fetchData = () => {
      getQuestions()
        .then((data) => {
          setFetchQuestions(data);
          setPreQuestion(data.preProjectQuestion);
          setCurrentQuestion(data.preProjectQuestion[currentQuestionIndex]);
          setPostQuestion(data.postProjectQuestion);
          // setQuestion(data.preProjectQuestion[currentQuestionIndex]);
        })
        .catch((error) => {
          console.error("Error fetching questions:", error);
          // Handle errors here (e.g., set an error state)
        });
    };

    fetchData();
  }, []);

  // getting Response from child Component
  const getResponsesData = (resp) => {
    setSelectedData(resp.selectedData);
    setSelectedOption(resp.nextQuestion);
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
    let cost = 0;
    let newResponse = [...actualResponses];
    let lastQuestion = newResponse.pop();
    setCurrentQuestion(lastQuestion.question);
    setCurrentState(lastQuestion.state);
    setActualResponses(newResponse);
    setCurrentQuestionIndex(lastQuestion.index);

    lastQuestion.selectedOption.map((op) => {
      cost = op.price;
    });
    handlePrice("back", cost);
  };

  const goToForm = () => {
    try {
      
      let data = JSON.stringify({responses:actualResponses,totalCost:totalCost});
      // debugger;
      localStorage.setItem("Response", data);
      // console.log("Moving to Form....................")
      route.push("/cost-estimation-calculator/submit");
    } catch (error) {
      // console.log("Data is not set", error)
    }
  };

  // Handling Next Question
  const nextQuestion = async () => {
    let currentStateLocal = currentState;
    let currentQuestionLocal = currentQuestion;
    let currentQuestionIndexLocal = currentQuestionIndex;
    let questionsToShowLocal = questionsToShow;
    let cost = 0;

    switch (currentStateLocal) {
      case "pre": {
        if (currentQuestionIndexLocal >= preProjectQuestions.length - 1) {
          currentStateLocal = "post";
          currentQuestionLocal = null;
          currentQuestionIndexLocal = 0;
        } else {
          currentQuestionLocal =
            preProjectQuestions[currentQuestionIndexLocal + 1];
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
            currentQuestionLocal = await getDynamicQuestion(
              questionsToShowLocal.pop()
            );
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
          currentQuestionLocal =
            postProjectQuestions[currentQuestionIndexLocal];
          currentQuestionIndexLocal++;
        } else {
          goToForm();
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

    selectedData.map((op) => {
      cost = cost + op.price;
    });
    handlePrice("next", cost);
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

  const handlePrice = (type, price) => {
    let cost = 0;
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
              />
              <Box sx={{ display: "flex", gap: "2em", margin: "3em 1em " }}>
                <Button
                  size="medium"
                  variant="contained"
                  sx={{ width: 150 }}
                  vairant="contained"
                  onClick={backQuestion}
                >
                  Back
                </Button>
                <Button
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
