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
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import ShowSummary from "../Components/ShowSummary";
import { PaddingOutlined } from "@mui/icons-material";

const CustomButton = styled(Button)(({ theme }) => ({
  padding: 0,
  color: "#ACACAC",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  position: "absolute",
  right: "-32px",
  justifyContent: "normal",
  minWidth: "min-content",
  border: "2px solid #ACACAC",
  padding: ".2em",
  "&:hover svg": {
    transform: "translateX(-5px)"
  },
  "&:hover": {
    boxShadow: "0 0 5px rgba(0, 93, 189, 0.8)",
  },
  "&.Mui-disabled": {
    background: "#4f9ef0",
    color: "#eaeaea",
  },
  "&:focus": {
    outline: "none",
    boxShadow: "0 0 5px rgba(0, 93, 189, 0.8)",
  },
}));

const CustomNextButton = styled(Button)(({ theme }) => ({
  width: 150,
  margin: "2em 0",
  backgroundColor: "#0045e6",
  "&:hover": {
    backgroundColor: "#0045e6"
  },
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

const CustomCostBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#1E1D28",
  padding: "2em",
  borderRadius: "10px",
  minWidth: "250px",
  margin: "1em 0",
  [theme.breakpoints.down("sm")]: {
    padding: "1em",
  },
}));

const CustomNormalTypography = styled(Typography)(({ theme }) => ({
  fontFamily: ["Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
    ","
  ),
}));

const CustomTypography = styled(Typography)(({ theme }) => ({
  color: "#fff",
  fontSize: "2em",
  fontFamily: ["Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
    ","
  ),
}));

const page = () => {
  const [preProjectQuestions, setPreQuestion] = useState([]);
  const [postProjectQuestions, setPostQuestion] = useState([]);

  const [currentState, setCurrentState] = useState("pre");
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loaderState, setLoaderState] = useState(false);

  const [selectedOption, setSelectedOption] = useState();
  const [selectedData, setSelectedData] = useState([]);
  const [fetchQuesitons, setFetchQuestions] = useState(null);
  const [actualResponses, setActualResponses] = useState([]);
  const [questionsToShow, setQuestionsToShow] = useState([]);
  const [orientation, setOrientation] = useState("horizontal");
  const isNarrowScreen = useMediaQuery("(max-width:1200px)");
  const [slideIn, setSlideIn] = useState(true);
  const [displayQuestion, setDisplayQuestion] = useState(true);
  const [lastQuestionSelectedOption, setLastQuestionSelectedOption] = useState(
    []
  );

  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [stepperState, setStepperState] = useState(false);

  const projectPageRef = useRef(null);

  let cost;

  useEffect(() => {
    if (projectPageRef.current) {
      projectPageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (selectedData.length && currentQuestion.typeofselection == "single") {
      nextQuestion();
    }
  }, [selectedData])

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


  // getting Response from child Component
  const getResponsesData = (resp) => {

    setSelectedData(resp.selectedData);
    setSelectedOption(resp.nextQuestion);

    if (resp.selectedData.length >= 3 && currentQuestion.typeofselection == "multiple") {
      setIsOptionSelected(true);
    }
    else {
      setIsOptionSelected(false)
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



  // Handling Stepper and Active Question
  const changeActiveQuestion = (obj) => {

    setDisplayQuestion(true);

    const { index, step } = obj;
    setCurrentQuestionIndex(step.index);
    setCurrentQuestion(step.question);
    setCurrentState(step.state);
    actualResponses.splice(index - 1);
    setLastQuestionSelectedOption(step.selectedOption);
    handlePrice("stepper");

    if (
      step.question.label == "project type" ||
      step.question.label == "both platform"
    ) {
      step.stack = [];
    } else {
      setQuestionsToShow(step.stack);
    }
    if (step.question.typeofselection === "multiple") {
      setSelectedData(step.selectedOption);
      setIsOptionSelected(true);
    }
    slider();

  };

  // Handling Back Quesiton Functionality
  const backQuestion = () => {

    setDisplayQuestion(true);
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

    if (lastQuestion.question.typeofselection === "multiple") {
      setIsOptionSelected(true)
      setSelectedData(lastQuestion.selectedOption)
    }
    else {
      setIsOptionSelected(false)
    }

    slider();

  };

  // Handling Next Question
  const nextQuestion = async () => {

    setIsOptionSelected(false);
    setLoaderState(true);

    cost = 0;
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
    setLoaderState((prev) => !prev);
    selectedData.map((op) => {
      cost = cost + op.price;
    });

    handlePrice("next", cost);
    setLastQuestionSelectedOption([]);
    slider();
  };


  useEffect(() => {
    if (
      currentState === "post" &&
      currentQuestionIndex > postProjectQuestions.length
    ) {
      setDisplayQuestion(false);
    }
  }, [nextQuestion]);


  const slider = function () {
    setSlideIn(false);
    setTimeout(() => {
      setSlideIn(true);
    }, 250);
  };
  return (
    <Box ref={projectPageRef} >
      {fetchQuesitons !== null ? (
        <Box
          sx={{
            maxWidth: "1520px",
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          <Grid
            container
            spacing={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          >
            <Grid item lg={8} md={12} sm={12} xs={12}>
              <Box sx={{
                display: "flex", alignItems: "center",
                padding: "2.2em 0 1em 0",
                gap: isNarrowScreen && actualResponses.length > 0 ? "1.9em" : 0,
                paddingLeft: isNarrowScreen && actualResponses.length > 0 ? "7.4%" : 0,
                paddingBottom: actualResponses.length > 0 ? "1em" : 0
              }}>
                <Box
                  sx={{
                    display: "flex",
                    gap: "1em",
                    alignItems: "center",
                    position: "relative"
                  }}
                >
                  {actualResponses.length > 0 && (
                    <CustomButton onClick={backQuestion}>
                      <KeyboardBackspaceIcon
                        sx={{
                          textAlign: "center",
                          fontSize: "1.6em",
                          alignItems: "center",
                          justifyContent: "center",
                          display: "flex",
                          width: "100%",
                          transition: "all 0.3s ease-in-out",
                          ":hover": {
                            cursor: "pointer",
                          },
                        }}
                      />
                    </CustomButton>
                  )}
                </Box>
                {
                  displayQuestion
                    ?
                    <Box
                      sx={{ paddingLeft: "7.4%" }}
                    >
                      <Typography sx={{ color: "#0045e6", fontSize: "1.2em", }}>
                        Question {actualResponses.length + 1}
                      </Typography>
                    </Box>
                    : <Box
                      sx={{ paddingLeft: "7.4%" }}
                    >
                      <CustomNormalTypography variant="h5" sx={{ color: "#89899C", fontWeight: 600, }}>
                        Your Results
                      </CustomNormalTypography>
                    </Box>
                }
              </Box>
              {
                slideIn ?
                  <Slide
                    direction="down"
                    in={slideIn}
                    timeout={{
                      enter: 1500,
                      exit: 0,
                    }}
                    appear={true}
                    onEnter={(node) => {
                      node.style.transform = "translateY(-50px)";
                    }}
                  >
                    <div style={{ padding: "0 7.4%" }}>
                      {!loaderState ? (
                        displayQuestion
                          ?
                          <Question
                            currentQuestion={currentQuestion}
                            getResponsesData={getResponsesData}
                            selectedOption={lastQuestionSelectedOption}
                          />
                          : <ShowSummary response={{
                            responses: actualResponses,
                            totalCost: totalCost,
                          }} />
                      ) : (
                        <Box
                          sx={{
                            margin: "5em 2em",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <CircularProgress />
                        </Box>
                      )}
                    </div>
                  </Slide> : ''
              }

              {
                isOptionSelected ?
                  <Box sx={{ display: "flex", gap: "2em", justifyContent: "flex-end", paddingBottom: "1em", margin: "0 1em" }}>
                    <CustomNextButton
                      size="medium"
                      variant="contained"
                      sx={{ width: 150, backgroundColor: "#0045e6", margin: "1em 2em", "&:hover": { backgroundColor: "#0045e6" } }}

                      onClick={() => {
                        nextQuestion();
                      }}
                    >
                      Next
                    </CustomNextButton>
                  </Box> : null
              }

            </Grid>
            <Box sx={{
              borderRight: orientation === "vertical" ? "1px solid grey" : "0",
              borderTop: orientation !== "vertical" ? "1px solid grey" : "0",
              width: orientation !== "vertical" ? "90%" : "0",
              margin: orientation !== "vertical" ? "auto" : "0",
              marginTop: "5%",
              height: orientation === "vertical" ? "90vh" : 0
            }}></Box>
            <Grid item lg={3.9} md={12} sm={12} xs={12}>
              <div style={{
                padding: orientation !== "vertical" ? "0 7.4%" : 0
              }}>
                <Stepper
                  responses={actualResponses}
                  changeActiveQuestion={changeActiveQuestion}

                />
                {
                  displayQuestion
                    ?
                    <CustomCostBox>
                      <CustomNormalTypography
                        variant="h6"
                        sx={{ color: "#fff", fontSize: "1.1em" }}
                      >
                        Estimated Cost
                      </CustomNormalTypography>
                      <CustomTypography>$ {totalCost}</CustomTypography>
                    </CustomCostBox>
                    : null
                }


              </div>
            </Grid>
          </Grid >

        </Box >
      ) : (
        <Box
          sx={{
            margin: "5em 2em",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      )
      }
    </Box >
  )
}


export default page;
