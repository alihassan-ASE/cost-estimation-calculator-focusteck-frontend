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

const CustomButton = styled(Button)(({ theme }) => ({
  padding: 0,
  color: "#ACACAC",
  height: "50px",
  width: "50px",
  borderRadius: "50%",
  justifyContent: "normal",
  minWidth: "min-content",
  border: "2px solid #ACACAC",
  padding: ".2em",
  "&:hover svg": {
    transform: "translateX(-5px)"
  },
  "&:hover": {
    backgroundColor: "#005DBD",
    color: "#fff",
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

  const route = useRouter();
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
      let data = JSON.stringify({
        responses: actualResponses,
        totalCost: totalCost,
      });
      if (data) {
        localStorage.setItem("Response", data);
      }
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
    <Box ref={projectPageRef} sx={{ padding: "0 2.7%" }}>
      {fetchQuesitons !== null ? (
        <Box
          sx={{
            maxWidth: "1520px",
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "1em",
              alignItems: "center",
              margin: "1em 0",
            }}
          >
            {actualResponses.length > 0 && (
              <CustomButton sx={{

              }} onClick={backQuestion}>
                <KeyboardBackspaceIcon
                  sx={{
                    textAlign: "center",
                    fontSize: "1.6em",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    transition: "all 0.3s ease-in-out",
                    width: "100%",
                    // color: "#ACACAC",
                    // border: "2px solid #ACACAC",
                    // borderRadius: "50%",
                    // padding: ".3em",
                    ":hover": {
                      cursor: "pointer",
                      // backgroundColor: "#0069d9",
                      // border: "2px solid #fff",
                      // color: "#fff",
                    },
                  }}
                />
              </CustomButton>
            )}
            {/* <Typography variant="h6">Total Cost : $ {totalCost}</Typography> */}
          </Box>



             
            <Grid container spacing={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}>
              <Grid sx={{paddingRight:"10px"}}   item lg={8} md={12} sm={12} xs={12}>
                <Slide
                  direction="down"
                  in={slideIn}
                  timeout={{
                    appear: 100,
                    enter: 950,
                    exit: 0,
                  }}
                  appear={true}
                  onEnter={(node) => {
                    node.style.transform = "translateY(-50px)";
                  }}
                >
                  <div>
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
                          alignItems: "center",
                        }}
                      >
                        <CircularProgress />
                      </Box>
                    )}
                  </div>
                </Slide>
              </Grid>
            </Grid>
          ) : (
            <Grid
              sx={{ padding: "2em" }}
              container
              spacing={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
            >
              <Grid item lg={8} md={9} sm={8} xs={12}>
                {
                  displayQuestion
                    ?
                    <Box
                      sx={{
                        paddingTop: "1.9em",
                      }}
                    >
                      <Typography sx={{ color: "#0045e6", fontSize: "1.2em" }}>
                        Question {actualResponses.length + 1}
                      </Typography>
                    </Box>
                    : null
                }
                <Slide
                  direction="down"
                  in={slideIn}
                  timeout={{
                    appear: 100,
                    enter: 950,
                    exit: 0,
                  }}
                  appear={true}
                  onEnter={(node) => {
                    node.style.transform = "translateY(-50px)";
                  }}
                >
                  <div>
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
                </Slide>
                {
                  isOptionSelected ?
                    <Box sx={{ display: "flex", gap: "2em" }}>
                      <CustomNextButton
                        size="medium"
                        variant="contained"
                        sx={{ width: 150, backgroundColor: "#0045e6", "&:hover": { backgroundColor: "#0045e6" } }}

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
                width: orientation !== "vertical" ? "100%" : "0",
                marginTop:"7%",
                // marginRight:"10px",
                height:orientation=== "vertical" ? "65vh": 0

              }}></Box>
              <Grid item lg={3.9} md={12} sm={12} xs={12}>
            
                <Stepper
                  responses={actualResponses}
                  changeActiveQuestion={changeActiveQuestion}
                
                />
              </Grid>
            </Grid>
          
        </Box>
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
  );
};

export default page;
