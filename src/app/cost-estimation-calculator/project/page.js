"use client";
// final code
import Stepper from "../Components/Stepper/page";
import Question from "../Components/Question/page";

import {
  getQuestions,
  getDynamicQuestion,
} from "@/app/lib/api/getProjectQuestions";
import { useState, useEffect } from "react";
import { Button, Box, Typography, useMediaQuery, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

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
  const [lastQuestionSelected, setLastQuestionSelected] = useState();
  const [orientation, setOrientation] = useState("horizontal");
  const isNarrowScreen = useMediaQuery("(max-width:600px)");

  const [lastQuestionSelectedOption, setLastQuestionSelectedOption] = useState();
  const [isOptionSelected, setIsOptionSelected] = useState(true);
  const [totalCost, setTotalCost] = useState(0);

  const route = useRouter();
  let cost;

  useEffect(() => {
    if (isNarrowScreen) {
      setOrientation("horizontal");
    } else {
      setOrientation("vertical");
    }
  }, [isNarrowScreen]);

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
    if(resp.selectedData || resp.selectedData.length>3){
    setIsOptionSelected(false);
    }
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
    setLastQuestionSelected(lastQuestion.selectedOption);

    lastQuestion.selectedOption.map((op) => {
      setTotalCost((prev)=> prev - op.price);
    })
  }

  // Handling Next Question
  const nextQuestion = async () => {
    cost = 0;


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
        }
        else {
          break;
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
    setIsOptionSelected(true);


  };


  // Handling Stepper and Active Question
  const changeActiveQuestion = (obj) => {

    const { index, step } = obj;

    setCurrentQuestionIndex(step.index);
    setCurrentQuestion(step.question);
    setCurrentState(step.state);
    actualResponses.splice(index - 1)
    setLastQuestionSelectedOption(step.selectedOption)
    handlePrice("stepper");

  };

  const goToForm = () => {
    try {
      let data = JSON.stringify({
        responses: actualResponses,
        totalCost: totalCost,
      });
      localStorage.setItem("Response", data);
      route.push("/cost-estimation-calculator/submit");
    } catch (error) {
      console.log("Error", error)
    }
  };

  if (currentState === 'post' && currentQuestionIndex >= postProjectQuestions.length) {
    goToForm();
  }

  return (
    <>
      {fetchQuesitons !== null ? (
        <Box sx={{ margin: "1em 2em" }}>
          {actualResponses.length > 0 && (
            <KeyboardBackspaceIcon
              sx={{
                color: "#ACACAC",
                border: "2px solid #ACACAC",
                padding: ".2em",
                borderRadius: "50%",
                margin: "0 0 1em 0",
              }}
              onClick={backQuestion}
            />
          )}
          <Typography variant="h6">Total Cost : $ {totalCost}</Typography>

          {isNarrowScreen ? (
            <Grid container spacing={{ xs: 5, sm: 2, md: 5, lg: 4, xl: 5 }}>
              <Grid item lg={4} md={3} sm={4} xs={12}>
                <Stepper
                  responses={actualResponses}
                  changeActiveQuestion={changeActiveQuestion}
                  orientation={orientation}
                />
              </Grid>
              <Grid item lg={8} md={9} sm={8} xs={12}>
                <Question
                  currentQuestion={currentQuestion}
                  getResponsesData={getResponsesData}
                  selectedOption={lastQuestionSelected}
                />
                <Box sx={{ display: "flex", gap: "2em", margin: "3em 0" }}>
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
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}>
              <Grid item lg={8} md={9} sm={8} xs={12}>
                <Question
                  currentQuestion={currentQuestion}
                  getResponsesData={getResponsesData}
                  selectedOption={lastQuestionSelected}
                />
                <Box sx={{ display: "flex", gap: "2em", margin: "3em 0" }}>
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
              </Grid>
              <Grid item lg={4} md={3} sm={4} xs={12}>
                <Stepper
                  responses={actualResponses}
                  changeActiveQuestion={changeActiveQuestion}
                  orientation={orientation}
                />
              </Grid>
            </Grid>
          )}
        </Box>
      ) : (
        <Box sx={{ margin: "2em 0" }}>Loading .....</Box>
      )}
    </>
  );
};

export default page;
