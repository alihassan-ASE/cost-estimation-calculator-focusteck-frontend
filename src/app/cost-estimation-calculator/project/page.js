"use client";
import { useState, useEffect, useRef } from "react";
import {
  Button,
  Box,
  Typography,
  useMediaQuery,
  Grid,
  Slide,
  Breadcrumbs,
  Link,
  CircularProgress
} from "@mui/material";
import { styled } from "@mui/material/styles";

import Stepper from "../Components/Stepper/page";
import Question from "../Components/Question/page";
import ShowSummary from "../Components/ShowSummary";
import QuestionsProgress from "../Components/QuestionsProgress"
import {
  getQuestions,
  getDynamicQuestion,
} from "@/app/lib/api/getProjectQuestions";


const CustomButton = styled(Button)(({ theme }) => ({
  color: "#ACACAC",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  marginLeft: '50px !important',
  backgroundColor: '#005DBD',
  justifyContent: "normal",
  minWidth: "min-content",
  border: "2px solid #005DBD",
  padding: ".2em",
  "&:hover svg": {
    transform: "translateX(-5px)"
  },
  "&:hover": {
    boxShadow: "0 0 7px rgba(12, 61, 255, 0.8)",
    backgroundColor: '#0045e6',
  },
  "&.Mui-disabled": {
    background: "#0045e6",
    color: "#eaeaea",
  },
  "&:focus": {
    outline: "none",
    boxShadow: "0 0 5px rgba(0, 93, 189, 0.8)",
  },
  [theme.breakpoints.down("md")]: {
    right: "-32px",
  },
  [theme.breakpoints.down("sm")]: {
    right: "-52px",
  },
}));

const CustomNextButton = styled(Button)(({ theme }) => ({
  width: 150,
  margin: "2em 0",
  backgroundColor: "#005DBD",
  "&:hover": {
    backgroundColor: "#005DBD"
  },
  fontFamily: ["Aeonik", "Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
    ","
  ),
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
  backgroundColor: "#005DBD",
  padding: "30px 25px",
  borderRadius: "20px",
  minWidth: "250px",
  maxWidth: '433px',
  margin: "1em 0",
  height: '134px',
  maxHeight: "194px",
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  [theme.breakpoints.down("sm")]: {
    padding: "1em",
    // margin: "2em 0 0 0",

  },
}));

const CustomNormalTypography = styled(Typography)(({ theme }) => ({
  fontFamily: ["Aeonik", "Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
    ","
  ),
}));

const CustomTypography = styled(Typography)(({ theme }) => ({
  color: "#fff",
  fontSize: "60px",
  fontWeight: 500,
  lineHeight: '50px',
  fontFamily: ["Aeonik", "Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
    ","
  ),
}));

const CustomBox = styled(Box)(({ theme }) => ({
  padding: "0 2em",
  [theme.breakpoints.down("sm")]: {
    margin: "0",
    padding: "0 0.5em"
  },
}))

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
  const changeGap = useMediaQuery("(max-width:600px)");
  const [slideIn, setSlideIn] = useState(true);
  const [displayQuestion, setDisplayQuestion] = useState(true);
  const [lastQuestionSelectedOption, setLastQuestionSelectedOption] = useState(
    []
  );
  const [isPreState, setIsPreState] = useState();
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [stepperState, setStepperState] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(0);

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

    let data = localStorage.getItem('Response');
    // let localState = localStorage.getItem('state');

    data = JSON.parse(data);
    // localState = JSON.parse(localState)


    try {

      if (data) {

        setDisplayQuestion(false);
        setActualResponses(data.responses);
        setIsPreState(data.responses[length - 1])
        // setState(localState);
        setCurrentQuestionIndex(data.responses.length - 1);

        setTotalCost(data.totalCost);

      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }, []);

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
          setTotalQuestions(data.preProjectQuestion.length + data.postProjectQuestion.length)
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
    setIsPreState((prev) => [dataObj])
    setActualResponses((prev) => [...prev, dataObj]);
  };



  // Handling Stepper and Active Question
  const changeActiveQuestion = (obj) => {
    setDisplayQuestion(true);

    const { index, step } = obj;

    if (totalQuestions > preProjectQuestions.length + postProjectQuestions.length && step.state === "dynamic") {
      const newIndex = actualResponses.length - index;

      if (newIndex === 0) {
        setTotalQuestions(prev => prev - 1);
      }
      else {
        if (isPreState[0].state === "post") {
          setTotalQuestions(prev => (prev + isPreState[0].index) - newIndex);
        } else {
          setTotalQuestions(prev => prev - newIndex);
        }
      }
    }
    if (totalQuestions > preProjectQuestions.length + postProjectQuestions.length && step.state === "pre") {
      setTotalQuestions(preProjectQuestions.length + postProjectQuestions.length);
    }

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
    setIsPreState(newResponse[length - 1])
    setCurrentQuestionIndex(lastQuestion.index);

    setLastQuestionSelectedOption(lastQuestion.selectedOption);
    if (totalQuestions > preProjectQuestions.length + postProjectQuestions.length && lastQuestion.state === "dynamic" && lastQuestion.question.label !== "monetization model") {
      setTotalQuestions(prev => prev - 1)
    }

    if (lastQuestion.question.label === "monetization model") {
      setQuestionsToShow(lastQuestion.stack)
    }

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
          setTotalQuestions(prev => prev + 1);
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
            setTotalQuestions(prev => prev + 1);

          } else {
            currentStateLocal = "post";
            currentQuestionLocal = null;
            currentQuestionIndexLocal = 0;
            // setTotalQuestions(prev => prev + 1);
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
    <CustomBox ref={projectPageRef}>
      {fetchQuesitons !== null ? (
        <Box
          sx={{
            maxWidth: "1285px",
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          {
            displayQuestion ?
              <Box sx={{ marginBottom: '30px' }}>
                <Typography variant="h1" sx={{
                  fontSize: '60px',
                  fontWeight: 700,
                  marginBottom: '20px'
                }}>Estimate Project Cost</Typography>
                <div role="presentation">
                  <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="black" href="/">Home</Link>
                    <Link underline="hover" color="black" href="/cost-estimation-calculator">Cost Estimation Calculator</Link>
                    <Link underline="hover" color="black" href="/cost-estimation-calculator/project">Project</Link>
                  </Breadcrumbs>
                </div>
              </Box> : null
          }

          <Box>
            {
              displayQuestion
                ?
                <Grid
                  container
                  sx={{
                    "&.MuiGrid-root.MuiGrid-container": {
                      justifyContent: "space-between"
                    },
                    "&.css-11lq3yg-MuiGrid-root": {
                      justifyContent: "space-between"

                    }
                  }}
                >
                  <Grid item
                    lg={7} md={12} sm={12} xs={12}
                  >
                    <QuestionsProgress currentQuestion={actualResponses.length} totalQuestions={totalQuestions} />
                  </Grid>
                  <Grid item lg={4.6} md={12} sm={12} xs={12}>
                    <CustomCostBox>
                      <CustomNormalTypography
                        variant="h6"
                        sx={{ color: "#fff", fontSize: "20px", fontWeight: 400 }}
                      >
                        Estimated Cost
                      </CustomNormalTypography>
                      <CustomTypography>${totalCost}.00</CustomTypography>
                    </CustomCostBox>
                  </Grid>
                </Grid>
                : null
            }
          </Box>
          {
            displayQuestion
              ?
              <Grid
                container
                spacing={{ xs: 3, sm: 3, md: 3, lg: 3, xl: 3 }}
              >
                <Grid item
                  lg={3.9} md={12} sm={12} xs={12}
                // sx={{ backgroundColor: '#F7F7F7', }}
                >
                  <Box sx={{
                    // height: "100%"
                  }}>
                    <Typography sx={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>Summary</Typography>

                    <div style={{
                    }}>
                      <Stepper
                        responses={actualResponses}
                        changeActiveQuestion={changeActiveQuestion}
                      />
                    </div>
                  </Box>
                </Grid>

                <Grid item lg={8} md={12} sm={12} xs={12} sx={{
                }}>
                  <Box sx={{
                    minHeight: "65vh",
                    backgroundColor: '#F7F7F7',
                    marginTop: '67.5px',
                    paddingBottom: '50px'
                  }}>

                    <Box sx={{
                      display: "flex", alignItems: "center",
                      padding: '48px 0 0 0',
                      gap: changeGap && actualResponses.length > 0 ? "2.9em" : "0",
                      marginBottom: '40px'
                    }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          position: "relative",
                        }}
                      >
                        {actualResponses.length > 0 && (
                          <CustomButton onClick={backQuestion}>
                            <svg style={{
                              textAlign: "center",
                              fontSize: "1.6em",
                              alignItems: "center",
                              justifyContent: "center",
                              display: "flex",
                              width: "100%",
                              paddingRight: '5px',
                              transition: "all 0.3s ease-in-out",
                              ":hover": {
                                cursor: "pointer",
                              },
                            }} width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M0.623712 7.37629C0.436241 7.18876 0.330925 6.93445 0.330925 6.66929C0.330925 6.40412 0.436241 6.14982 0.623712 5.96229L6.28071 0.305288C6.37296 0.209778 6.4833 0.133596 6.60531 0.0811868C6.72731 0.0287778 6.85853 0.00119152 6.99131 3.77123e-05C7.12409 -0.0011161 7.25577 0.0241859 7.37867 0.0744668C7.50156 0.124748 7.61321 0.199001 7.70711 0.292893C7.801 0.386786 7.87525 0.498438 7.92553 0.621334C7.97581 0.744231 8.00112 0.87591 7.99996 1.00869C7.99881 1.14147 7.97122 1.27269 7.91881 1.39469C7.8664 1.5167 7.79022 1.62704 7.69471 1.71929L2.74471 6.66929L7.69471 11.6193C7.87687 11.8079 7.97766 12.0605 7.97539 12.3227C7.97311 12.5849 7.86794 12.8357 7.68253 13.0211C7.49712 13.2065 7.24631 13.3117 6.98411 13.314C6.72192 13.3162 6.46931 13.2154 6.28071 13.0333L0.623712 7.37629Z" fill="white" />
                            </svg>
                          </CustomButton>
                        )}
                      </Box>
                      <Box
                        sx={{ paddingLeft: actualResponses.length > 0 ? "20px" : "50px", }}
                      >
                        <Typography sx={{ color: "#000", fontSize: "24px", fontWeight: 700, minWidth: "100px" }}>
                          Question No: {actualResponses.length + 1}
                        </Typography>
                      </Box>
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
                          <div style={{
                            margin: "0 50px",
                            backgroundColor: '#fff',
                            border: '1px solid #E3EAEF',
                            borderRadius: '10px',
                            padding: '26px 34px'
                          }}>
                            {!loaderState ? (

                              <Question
                                questionNumber={actualResponses.length}
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
                        </Slide> : ''
                    }

                    {
                      isOptionSelected ?
                        <Box sx={{ display: "flex", gap: "2em", justifyContent: "flex-end", margin: "0 3.5em" }}>
                          <CustomNextButton
                            size="medium"
                            variant="contained"
                            sx={{ width: 150, backgroundColor: "#005DBD", margin: "2em 2em 0em 2em", "&:hover": { backgroundColor: "#005DBD" } }}

                            onClick={() => {
                              nextQuestion();
                            }}
                          >
                            Next
                          </CustomNextButton>
                        </Box> : null
                    }
                  </Box>

                </Grid>
              </Grid >
              :
              <ShowSummary name={"Project"} response={{
                responses: actualResponses,
                totalCost: totalCost,
              }} />
          }

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
    </CustomBox >
  )
}


export default page;
