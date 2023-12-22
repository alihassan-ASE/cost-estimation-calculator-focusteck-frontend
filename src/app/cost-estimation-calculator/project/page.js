"use client";
// final code
import Stepper from "../Components/Stepper/page";
import Question from "../Components/Question/page";
import {
  getQuestions,
  getDynamicQuestion,
} from "@/app/lib/api/getProjectQuestions";
import { useState, useEffect, useRef } from "react";
import {
  Button,
  Box,
  Typography,
  useMediaQuery,
  Grid,
  Slide,
} from "@mui/material";
import { useRouter } from "next/navigation";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { styled } from "@mui/material/styles";

const CustomButton = styled(Button)(({ theme }) => ({
  "&:hover": {
    backgroundColor: "#fff",
  },
}));

const CustomNextButton = styled(Button)(({ theme }) => ({
  width: 150,
  margin: "2em 0",
  fontFamily: [
    "Proxima Nova",
    "Poppins",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  [theme.breakpoints.down("md")]: {
    fontSize: 14,
    margin: "2em 0",
  },
  [theme.breakpoints.down("sm")]: {
    width: 100,
    fontSize: 10,
    margin: "1.5em 0",
  },
}));

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
  const [orientation, setOrientation] = useState("horizontal");
  const isNarrowScreen = useMediaQuery("(max-width:600px)");
  const [slideIn, setSlideIn] = useState(true);

  const [lastQuestionSelectedOption, setLastQuestionSelectedOption] = useState(
    []
  );

  const [isOptionSelected, setIsOptionSelected] = useState(true);
  const [totalCost, setTotalCost] = useState(0);
  const [stepperState, setStepperState] = useState(false);

  const projectPageRef = useRef(null);

  useEffect(() => {
    if (projectPageRef.current) {
      projectPageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

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

  const goToForm = () => {
    try {
      let data = JSON.stringify({
        responses: actualResponses,
        totalCost: totalCost,
      });
      if (data) {
        localStorage.setItem("Response", data);
        route.push("/cost-estimation-calculator/submit");
      } else {
        route.push("/cost-estimation-calculator");
      }
    } catch (error) {}
  };

  // getting Response from child Component
  const getResponsesData = (resp) => {
    setSelectedData(resp.selectedData);
    setSelectedOption(resp.nextQuestion);
    if (resp.selectedData || resp.selectedData.length > 3) {
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
    dataObj.stack = [...questionsToShow];
    questionsToShow.pop();
    setQuestionsToShow(questionsToShow);
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
    setLastQuestionSelectedOption(lastQuestion.selectedOption);

    lastQuestion.selectedOption.map((op) => {
      setTotalCost((prev) => prev - op.price);
    });
  };

  // Handling Next Question
  const nextQuestion = async () => {
    cost = 0;
    let questionToShowArray = [];

    setStepperState(true);
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
            if (
              selectedOption &&
              !questionsToShowLocal.includes(selectedOption)
            ) {
              questionsToShowLocal.push(selectedOption);
            }
          }
          if (questionsToShowLocal.length) {
            currentQuestionLocal = await getDynamicQuestion(
              questionsToShowLocal[questionsToShowLocal.length - 1]
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
          currentQuestionIndexLocal++;
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
    setLastQuestionSelectedOption([]);
    slider();
  };

  if (
    currentState === "post" &&
    currentQuestionIndex > postProjectQuestions.length
  ) {
    goToForm();
  }
  console.log("actual responses: ", actualResponses);

  // useEffect(() => {
  //   slideIn.current = true;
  // }, [actualResponses.length]);

  // const slider = function () {
  //   slideIn.current = false;
  // };

  const slider = function () {
    setSlideIn(false);
    setTimeout(() => {
      setSlideIn(true);
    }, 250);
  };
  // Handling Stepper and Active Question
  const changeActiveQuestion = (obj) => {
    const { index, step } = obj;
    setCurrentQuestionIndex(step.index);
    setCurrentQuestion(step.question);
    setCurrentState(step.state);
    setQuestionsToShow(step.stack);
    actualResponses.splice(index - 1);
    setLastQuestionSelectedOption(step.selectedOption);
    handlePrice("stepper");
  };

  if (
    currentState === "post" &&
    currentQuestionIndex > postProjectQuestions.length
  ) {
    goToForm();
  }

  return (
    <Box ref={projectPageRef} sx={{ padding: "1em 0" }}>
      {fetchQuesitons !== null ? (
        <Box sx={{ margin: "1em 2em" }}>
          <Box
            sx={{
              display: "flex",
              gap: "1em",
              alignItems: "center",
              margin: "1em 0",
            }}
          >
            {actualResponses.length > 0 && (
              <CustomButton
                sx={{
                  color: "#ACACAC",
                  borderRadius: "50%",
                  padding: ".3em",
                }}
                onClick={backQuestion}
              >
                <KeyboardBackspaceIcon
                  sx={{
                    color: "#ACACAC",
                    border: "2px solid #ACACAC",
                    borderRadius: "50%",
                    padding: ".3em",
                    ":hover": {
                      cursor: "pointer",
                      backgroundColor: "#0069d9",
                      border: "2px solid #fff",
                      color: "#fff",
                    },
                  }}
                />
              </CustomButton>
            )}
            <Typography variant="h6">Total Cost : $ {totalCost}</Typography>
          </Box>

          {isNarrowScreen ? (
            <Grid container spacing={{ xs: 1, sm: 2, md: 5, lg: 4, xl: 5 }}>
              {actualResponses.length > 0 && stepperState && (
                <Grid item lg={4} md={3} sm={4} xs={12}>
                  <Stepper
                    responses={actualResponses}
                    changeActiveQuestion={changeActiveQuestion}
                    orientation={orientation}
                  />
                </Grid>
              )}
              <Grid item lg={8} md={9} sm={8} xs={12}>
                <Slide
                  direction="down"
                  in={slideIn}
                  timeout={{
                    appear: 250,
                    enter: 250,
                    exit: 0,
                  }}
                  appear={true}
                >
                  <div>
                    <Question
                      currentQuestion={currentQuestion}
                      getResponsesData={getResponsesData}
                      selectedOption={lastQuestionSelectedOption}
                    />
                  </div>
                </Slide>
                <Box sx={{ display: "flex", gap: "2em" }}>
                  <CustomNextButton
                    disabled={isOptionSelected}
                    size="medium"
                    variant="contained"
                    vairant="contained"
                    onClick={() => {
                      nextQuestion();
                    }}
                  >
                    Next
                  </CustomNextButton>
                </Box>
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}>
              <Grid item lg={8} md={9} sm={8} xs={12}>
                <Slide
                  direction="down"
                  in={slideIn}
                  timeout={{
                    appear: 250,
                    enter: 250,
                    exit: 0,
                  }}
                  appear={true}
                >
                  <div>
                    <Question
                      currentQuestion={currentQuestion}
                      getResponsesData={getResponsesData}
                      selectedOption={lastQuestionSelectedOption}
                    />
                  </div>
                </Slide>
                <Box sx={{ display: "flex", gap: "2em" }}>
                  <CustomNextButton
                    disabled={isOptionSelected}
                    size="medium"
                    variant="contained"
                    sx={{ width: 150 }}
                    vairant="contained"
                    onClick={() => {
                      nextQuestion();
                    }}
                  >
                    Next
                  </CustomNextButton>
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
        <Box sx={{ margin: "2em 1em" }}>Loading .....</Box>
      )}
    </Box>
  );
};

export default page;
