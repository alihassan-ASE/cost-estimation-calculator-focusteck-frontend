"use client";
// final code
import Stepper from "../Components/Stepper/page";
import Question from "../Components/Question/page";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";

// const CustomButton = styled(Button)(({ theme }) => ({
//   padding: 0,
//   color: "#ACACAC",
//   borderRadius: "50%",
//   justifyContent: "normal",
//   minWidth: "min-content",
//   "&:hover": {
//     backgroundColor: "#fff",
//   },
//   "&:selected": {
//     backgroundColor: "#fff",
//   },
//   "&:focus": {
//     backgroundColor: "#fff",
//   },
//   "&:active": {
//     backgroundColor: "#fff",
//   },
// }));

const CustomButton = styled(Button)(({ theme }) => ({
  color: "white",
  boxShadow: "none",
  textTransform: "none",
  // padding: "4em 2em",
  lineHeight: 1.5,
  height: "40px",
  maxWidth: "100px",
  backgroundColor: "#005DBD",
  fontWeight: "normal",
  borderRadius: "5px",
  textAlign: "center",
  // display: "flex",
  flexWrap: "wrap",
  flexDirection: "column",
  flexGrow: 1,
  flexShrink: 1,
  gap: ".1em",
  transition: "all 0.3s ease",
  fontFamily: ["Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
    ","
  ),
  "&:hover": {
    backgroundColor: "#005DBD",
    color: "#fff",
  },
  "&.Mui-disabled": {
    background: "#4f9ef0",
    color: "#eaeaea"
  }
}));


//   width: 150,
//   margin: "2em 0",
//   fontFamily: [
//     "Proxima Nova",
//     "Poppins",
//     "-apple-system",
//     "BlinkMacSystemFont",
//     '"Segoe UI"',
//     "Roboto",
//     '"Helvetica Neue"',
//     "Arial",
//     "sans-serif",
//     '"Apple Color Emoji"',
//     '"Segoe UI Emoji"',
//     '"Segoe UI Symbol"',
//   ].join(","),
//   [theme.breakpoints.down("md")]: {
//     fontSize: 14,
//     margin: "2em 0",
//   },
//   [theme.breakpoints.down("sm")]: {
//     width: 100,
//     fontSize: 10,
//     margin: "1.5em 0",
//   },
// }));

const page = () => {
  const [preProjectQuestions, setPreQuestion] = useState([]);
  const [postProjectQuestions, setPostQuestion] = useState([]);

  const [currentState, setCurrentState] = useState("pre");
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loaderState, setLoaderState] = useState(false);

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
      }
    } catch (error) { }
  };


  // getting Response from child Component
  const getResponsesData = (resp) => {
    setSelectedData(resp.selectedData);
    setSelectedOption(resp.nextQuestion);

    if (resp.selectedData.length <= 3 && currentQuestion.typeOfUI == "CheckBox") {
      setIsOptionSelected(true);
    }
    else if (resp.selectedData.length !== 0) {
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

  // // Handling Next Question
  const nextQuestion = async () => {
    setIsOptionSelected(true);
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
    // setTimeout(() => {
    setLoaderState((prev) => !prev);
    // }, 500);
    selectedData.map((op) => {
      cost = cost + op.price;
    });

    handlePrice("next", cost);
    setLastQuestionSelectedOption([]);
    slider();
  };
  // const nextQuestion = async () => {

  //   setIsOptionSelected(true);
  //   setLoaderState(true);

  //   cost = 0;
  //   setStepperState(true);

  //   let currentStateLocal = currentState;
  //   let currentQuestionLocal = currentQuestion;
  //   let currentQuestionIndexLocal = currentQuestionIndex;
  //   let questionsToShowLocal = questionsToShow;

  //   switch (currentStateLocal) {
  //     case "pre": {
  //       if (currentQuestionIndexLocal >= preProjectQuestions.length - 1) {
  //         currentStateLocal = "dynamic";
  //         currentQuestionLocal = null;
  //         currentQuestionIndexLocal = 0;
  //       } else {
  //         currentQuestionLocal =
  //           preProjectQuestions[currentQuestionIndexLocal + 1];
  //         currentQuestionIndexLocal++;
  //       }
  //       if (currentQuestionLocal) {
  //         break;
  //       }
  //     }
  //     case "dynamic": {
  //       if (!currentQuestionLocal) {
  //         currentQuestionLocal = await getDynamicQuestion();
  //       } else if (currentQuestionLocal) {
  //         if (Array.isArray(

  //         )) {
  //           questionsToShowLocal.push(...selectedOption);
  //         } else {
  //           if (
  //             selectedOption &&
  //             !questionsToShowLocal.includes(selectedOption)
  //           ) {
  //             questionsToShowLocal.push(selectedOption);
  //           }
  //         }
  //         if (questionsToShowLocal.length) {
  //           currentQuestionLocal = await getDynamicQuestion(
  //             questionsToShowLocal[questionsToShowLocal.length - 1]
  //           );
  //         } else {
  //           currentStateLocal = "post";
  //           currentQuestionLocal = null;
  //           currentQuestionIndexLocal = 0;
  //         }
  //       }
  //       if (currentQuestionLocal) {
  //         break;
  //       }
  //     }

  //     case "post": {
  //       if (currentQuestionIndexLocal < postProjectQuestions.length) {
  //         currentQuestionLocal =
  //           postProjectQuestions[currentQuestionIndexLocal];
  //         currentQuestionIndexLocal++;
  //       } else {
  //         currentQuestionIndexLocal++;
  //         break;
  //       }
  //     }
  //     default: {
  //       null;
  //     }
  //   }
  //   setCurrentState(currentStateLocal);
  //   setCurrentQuestion(currentQuestionLocal);
  //   setCurrentQuestionIndex(currentQuestionIndexLocal);
  //   setQuestionsToShow(questionsToShowLocal);
  //   setResponseData();
  //   // setTimeout(() => {
  //   setLoaderState((prev) => !prev);
  //   // }, 500);
  //   selectedData.map((op) => {
  //     cost = cost + op.price;
  //   });

  //   handlePrice("next", cost);
  //   setLastQuestionSelectedOption([]);
  //   // setSelectedData([]);
  //   slider();
  // };

  if (
    currentState === "post" &&
    currentQuestionIndex > postProjectQuestions.length
  ) {
    goToForm();
  }

  const slider = function () {
    setSlideIn(false);
    setTimeout(() => {
      setSlideIn(true);
    }, 250);
  };

  return (
    <Box ref={projectPageRef} sx={{ padding: "1em 0" }}>
      {fetchQuesitons !== null ? (
        <Box >
          <Box
            sx={{
              display: "flex",
              gap: "1em",
              alignItems: "center",
              margin: "-2em 0",
              display: "flex",
              flexDirection: "row",
              backgroundColor: "#f5fcff",
              justifyContent: "space-between",
              maxWidth: "100%",
              position: "sticky",
              padding: "0 2em",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1000,
              height: "80px",
            }}
          >

            <CustomButton
              disabled={!actualResponses.length}
              onClick={backQuestion}
              sx={{
                "&:hover svg": {
                  color: "#005DBD",
                  height: "100%",
                  backgroundColor: "white",
                  transform: "translateX(-20px)",
                  position: "relative",
                },
                overflow: "hidden",
                "&:hover": {
                  borderRadius: "0px 5px 5px 0px",
                }
              }}
            >
              <ArrowBackIcon sx={{
                fontSize: "18px",
                transition: "all 0.2s ease-in",
                padding: ".5em .8em",
                marginLeft: "3px",
                borderRadius: "0px 50% 50% 0px",
                color: "white",
              }} />
              <Typography sx={{
                fontSize: "12px",
                color: "white",
              }}>Back</Typography>
            </CustomButton>

            <Typography variant="h6">Total Cost : $ {totalCost}</Typography>

            <CustomButton
              onClick={nextQuestion}
              sx={{
                "&:hover svg": {
                  color: "#005DBD",
                  height: "100%",
                  backgroundColor: "white",
                  transform: "translateX(20px)",
                  position: "relative",
                },
                overflow: "hidden",
                "&:hover": {
                  borderRadius: "5px 0px 0px 5px",
                }
              }}
              disabled={isOptionSelected}>
              <Typography sx={{
                fontSize: "12px",
                color: "white",
              }}>Next</Typography>

              <ArrowForwardIcon sx={{
                fontSize: "18px",
                transition: "all 0.2s ease-in",
                padding: ".5em .8em",
                marginLeft: "3px",
                borderRadius: "50% 5px 5px 50%",
                color: "white",
              }} />
            </CustomButton>
          </Box>

          {isNarrowScreen ? (
            <Grid sx={{ padding: " 2em" }} container spacing={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}>
              {actualResponses.length > 0 && stepperState && (
                <Grid item lg={4} md={4} sm={4} xs={12}>
                  <Stepper
                    responses={actualResponses}
                    changeActiveQuestion={changeActiveQuestion}
                    orientation={orientation}
                  />
                </Grid>
              )}
              <Grid item lg={8} md={8} sm={8} xs={12}>
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

                    // node.addEventListener(
                    //   "transition",
                    //   (e) => {
                    //   },
                    //   false
                    // );
                  }}
                >
                  <div>
                    {!loaderState ? (
                      <Question
                        currentQuestion={currentQuestion}
                        getResponsesData={getResponsesData}
                        selectedOption={lastQuestionSelectedOption}
                      />
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

                <Box sx={{ display: "flex", gap: "2em" }}>
                  {/* <CustomNextButton
                    disabled={isOptionSelected}
                    size="medium"
                    variant="contained"
                    vairant="contained"
                    onClick={() => {
                      nextQuestion();
                    }}
                  >
                    Next
                  </CustomNextButton> */}
                </Box>
              </Grid>
            </Grid>
          ) : (
            <Grid sx={{ padding: "2em" }} container spacing={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}>
              <Grid item lg={8} md={9} sm={8} xs={12}>
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
                    // node.addEventListener(
                    //   "transition",
                    //   (e) => {
                    //   },
                    //   false
                    // );

                  }}
                >
                  <div>
                    {!loaderState ? (
                      <Question
                        currentQuestion={currentQuestion}
                        getResponsesData={getResponsesData}
                        selectedOption={lastQuestionSelectedOption}
                      />
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
                <Box sx={{ display: "flex", gap: "2em" }}>
                  {/* <CustomNextButton
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
                  </CustomNextButton> */}
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
      )}
    </Box>
  );
};

export default page;
