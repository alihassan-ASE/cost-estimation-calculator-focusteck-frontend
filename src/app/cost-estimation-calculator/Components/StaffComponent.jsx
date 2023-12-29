"use client";
import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  Grid,
  useMediaQuery,
  Slide,
} from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { styled } from "@mui/material/styles";
import Question from "../Components/Question/page";
import { useRouter } from "next/navigation";
import Stepper from "../Components/Stepper/page";
import { getQuestions } from "../../lib/api/getData";
import StaffResource from "./StaffResource";
import CircularProgress from "@mui/material/CircularProgress";
import ShowSummary from "./ShowSummary";

const CustomButton = styled(Button)(({ theme }) => ({
  color: "white",
  boxShadow: "none",
  textTransform: "none",
  lineHeight: 1.5,
  height: "40px",
  maxWidth: "100px",
  backgroundColor: "#005DBD",
  fontWeight: "normal",
  borderRadius: "5px",
  textAlign: "center",
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

const CustomButtonAdd = styled(Button)(({ theme }) => ({
  border: "1px solid #0069d9",
  padding: "3em",
  borderRadius: ".5em",
  height: 445,
  width: "362px",
  [theme.breakpoints.down("md")]: {
    width: "335px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "290px",
  },
}));

const CustomCard = styled(Card)(({ theme }) => ({
  height: 380,
  width: "294px",
  padding: "2em 1.5em",
  margin: "2em 1em",
  borderRadius: ".5em",
  display: "flex",
  justifyContent: "center",
  [theme.breakpoints.down("md")]: {
    margin: "2em 0 ",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "1em 0",
    padding: "2em 1em",
  },
}));

const StaffComponent = () => {
  const [count, setCount] = useState(0);
  const [values, setValues] = useState([]);
  const [buttonState, setButtonState] = useState(true);

  const [additionalQuesiton, setAdditionalQuesiton] = useState([]);
  const [staffBase, setStaffBaseResources] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentState, setCurrentState] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [actualResponses, setActualResponses] = useState({});

  const [isOptionSelected, setIsOptionSelected] = useState(true);

  const [addedOption, setAddedOption] = useState([]);

  const [isNextClicked, setIsNextClicked] = useState(false);
  const [isStepperClicked, setIsStepperClicked] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [orientation, setOrientation] = useState("horizontal");
  const isNarrowScreen = useMediaQuery("(max-width:600px)");
  const [resource, setResource] = useState([]);
  const [lastQuestionSelectedOption, setLastQuestionSelectedOption] = useState(
    []
  );
  const [slideIn, setSlideIn] = useState(true);
  const [stepperState, setStepperState] = useState(false);
  const route = useRouter();
  const dataObj = {};
  const [displayQuestion, setDisplayQuestion] = useState(true);

  // Setting Staff Resources and Questions
  useEffect(() => {
    getQuestions().then((resp) => {
      const { Resources, additionalQuestions } = resp;
      setAdditionalQuesiton(additionalQuestions);
      setStaffBaseResources(Resources);
    });
  }, []);


  useEffect(() => {
    if (isNarrowScreen) {
      setOrientation("horizontal");
    } else {
      setOrientation("vertical");
    }
  }, [isNarrowScreen]);

  //calling Handle Price function on next button click and on stepper
  useEffect(() => {
    if (actualResponses !== null) {
      if (isNextClicked) {
        handlePrice("next");
        setIsNextClicked(false);
      } else if (isStepperClicked) {
        handlePrice("stepper");
        setIsStepperClicked(false);
      }
    }
  }, [actualResponses, isNextClicked, isStepperClicked]);

  useEffect(() => {
    if (values?.length > 0) {
      setCount(values?.length - 1);
    }
    setResource(values);
  }, [values?.length]);

  const deleteResource = (index) => {
    if (values) {
      if (index >= 0 && index < values.length) {
        const newValues = values.filter((_, i) => i !== index);
        setValues(newValues);
      } else {
        if (index > 0) {
          setCount(count - 1);
        }
      }
    }
  };


  // Function To Handling Price
  const handlePrice = (type) => {
    switch (type) {
      case "stepper":
      case "next": {
        let totalPrice = 0;

        if (actualResponses.responses.length >= 0) {
          actualResponses.responses.forEach((response, index) => {
            if (index === 0) {
              if (response.resources && response.resources.length > 0) {
                response.resources.forEach((resource) => {
                  if (
                    resource.resourceOption &&
                    resource.resourceOption.price
                  ) {
                    totalPrice += resource.resourceOption.price;
                  }
                });
              }
            } else {
              if (response.selectedData && response.selectedData.length > 0) {
                response.selectedData.forEach((select) => {
                  if (select.price) {
                    totalPrice += select.price;
                  }
                });
              }
            }
          });
        }

        setTotalCost(totalPrice);

        break;
      }
    }
  };

  // Changing active question on stepper
  const changeActiveQuestion = (obj) => {
    const { index, step } = obj;
    setDisplayQuestion(true);

    if (index == 1) {
      setCurrentState(true);
    }

    setCurrentQuestionIndex(index - 1);
    setCurrentQuestion(step);
    actualResponses.responses.splice(index - 1);
    setLastQuestionSelectedOption(step.selectedData);
    setIsStepperClicked(true);
    setIsOptionSelected(false);
  };

  // receiving selected option from child Component
  const selectedOptionPassToParent = (data, boolVal, label) => {
    setValues((prev) => [...prev, data]);
    setButtonState(true);

    setIsOptionSelected(false);
    setResource((prev) => [...prev, data]);
  };

  // setting Response in actual Array
  const setResponseData = () => {
    dataObj.resources = values;
    setResource(dataObj.resources);
    currentState
      ? setActualResponses({ responses: [dataObj] })
      : setActualResponses((prev) => {
        return {
          responses: [
            ...prev.responses,
            { ...currentQuestion, ...addedOption },
          ],
        };
      });
  };
  // Getting Response from child Component(Question Component)
  const getResponsesData = (resp) => {
    setAddedOption(resp);
    if (resp.selectedData.length == 0) {
      setIsOptionSelected(true);
    } else {
      setIsOptionSelected(false);
    }
  };

  // Handling Next Quesiton
  const nextQuestion = () => {
    setCurrentState(false);
    setButtonState(true);
    setIsOptionSelected((prev) => !prev);
    setStepperState(true);

    let currentQuestionLocal = currentQuestion;
    let currentQuestionIndexLocal = currentQuestionIndex;
    if (!currentQuestion) {
      currentQuestionLocal = additionalQuesiton[currentQuestionIndexLocal];
      currentQuestionIndexLocal++;
    } else if (currentQuestionIndexLocal < additionalQuesiton.length) {
      currentQuestionLocal = additionalQuesiton[currentQuestionIndexLocal];
      currentQuestionIndexLocal++;
    } else {
      setCurrentQuestionIndex(currentQuestionIndexLocal++);
    }

    setCurrentQuestion(currentQuestionLocal);
    setCurrentQuestionIndex(currentQuestionIndexLocal);
    setResponseData();
    setIsNextClicked(true);
    setLastQuestionSelectedOption([]);
    slider();
  };

  const slider = function () {
    setSlideIn(false);
    setTimeout(() => {
      setSlideIn(true);
    }, 250);
  };

  // Handling Back Question and Calculating Price on Back Button
  const backQuestion = () => {
    setDisplayQuestion(true);

    let lastQuestion;
    if (actualResponses.responses && actualResponses.responses.length === 1) {
      setCurrentState(true);
    }

    if (currentQuestionIndex > 0) {
      let newArray = [...actualResponses.responses];
      lastQuestion = newArray.pop();
      if (lastQuestion) {
        setCurrentQuestion(lastQuestion);
        setActualResponses({ responses: newArray });
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        setLastQuestionSelectedOption(lastQuestion.selectedData);
        setIsOptionSelected(false);
      }

      if (actualResponses.responses.length >= 0) {
        let totalPriceToSubtract = 0;
        if (lastQuestion) {
          if (lastQuestion.resources?.length) {
            if (lastQuestion.resources && lastQuestion.resources.length > 0) {
              lastQuestion.resources.forEach((resource) => {
                if (resource.resourceOption && resource.resourceOption.price) {
                  totalPriceToSubtract += resource.resourceOption.price;
                }
              });
            }
          } else {
            if (
              lastQuestion.selectedData &&
              lastQuestion.selectedData.length > 0
            ) {
              lastQuestion.selectedData.forEach((select) => {
                if (select.price) {
                  totalPriceToSubtract += select.price;
                }
              });
            }
          }
          setTotalCost((prev) => prev - totalPriceToSubtract);
        }
      }
    }
  };

  useEffect(() => {
    if (currentQuestionIndex > additionalQuesiton.length) {
      setDisplayQuestion(false);
      // actualResponses.totalCost = totalCost;
      // try {
      //   let data = JSON.stringify(actualResponses);
      //   localStorage.setItem("Response", data);
      // } catch (error) {
      //   console.log("Error", error);
      // }
    }
  }, [nextQuestion]);


  // Showing selected Resources
  const returnResources = () => {
    const tags = [];
    for (let i = 0; i <= count; i++) {
      tags.push(
        <CustomCard key={i}>
          <StaffResource
            key={i}
            question={currentQuestion}
            options={staffBase}
            index={i}
            count={count}
            setCount={setCount}
            setValues={setValues}
            values={values}
            selectedOption={resource}
            selectedOptionPassToParent={selectedOptionPassToParent}
            deleteResource={deleteResource}
          />
        </CustomCard>
      );
    }
    return tags;
  };


  return (
    <Box sx={{ padding: "0 2.7%" }}>
      {additionalQuesiton.length && staffBase.length ? (
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
              margin: "-1em 0",
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
              disabled={!currentQuestionIndex > 0}
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
                },
                "&:hover > .typography": {
                  transform: "translateX(-10px)",
                },
              }}
            >
              <ArrowBackIcon
                sx={{
                  fontSize: "18px",
                  transition: "all 0.2s ease-in",
                  padding: ".5em .8em",
                  marginLeft: "3px",
                  borderRadius: "0px 50% 50% 0px",
                  color: "white",
                }}
              />
              <Typography
                className="typography"
                sx={{
                  fontSize: "12px",
                  transition: "all 0.2s ease-in",
                }}
              >
                Back
              </Typography>
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
                },
                "&:hover > .typography": {
                  transform: "translateX(10px)",
                },
              }}
              disabled={isOptionSelected}
            >
              <Typography
                className="typography"
                sx={{
                  fontSize: "12px",
                  transition: "all 0.2s ease-in",
                }}
              >
                Next
              </Typography>

              <ArrowForwardIcon
                sx={{
                  fontSize: "18px",
                  transition: "all 0.2s ease-in",
                  padding: ".5em .8em",
                  marginLeft: "3px",
                  borderRadius: "50% 5px 5px 50%",
                  color: "white",
                }}
              />
            </CustomButton>
          </Box>

          {currentState ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  padding: "2em",
                  gap: "1em",
                }}
              >
                {returnResources()}

                {resource.length > 0 ? (
                  <Box>
                    <CustomButtonAdd
                      onClick={() => {
                        setCount(count + 1);
                        returnResources();
                      }}
                    >
                      <ControlPointIcon sx={{ fontSize: 30 }} />
                    </CustomButtonAdd>
                  </Box>
                ) : null}
              </Box>
            </>
          ) : isNarrowScreen ? (
            <Grid
              sx={{ padding: "2em", maxWidth: "100%" }}
              container
              spacing={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
            >
              {stepperState && (
                <Grid item lg={4} md={3} sm={4} xs={12}>
                  {actualResponses.length || actualResponses.responses ? (
                    <Stepper
                      responses={actualResponses.responses}
                      changeActiveQuestion={changeActiveQuestion}
                      orientation={orientation}
                    />
                  ) : null}
                </Grid>
              )}
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
                        Question {actualResponses.responses.length}
                      </Typography>
                    </Box>
                    : null
                }
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
                      <div>
                        {
                          displayQuestion
                            ?
                            <Question
                              currentQuestion={currentQuestion}
                              getResponsesData={getResponsesData}
                              selectedOption={lastQuestionSelectedOption}
                            />
                            : <ShowSummary response={actualResponses} />
                        }

                      </div>
                    </Slide>
                    : ''
                }
              </Grid>
            </Grid>
          ) : (
            <Grid
              sx={{ padding: "2em", maxWidth: "100%" }}
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
                        Question {actualResponses.responses.length}
                      </Typography>
                    </Box>
                    : null
                }
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
                      <div>
                        {
                          displayQuestion
                            ?
                            <Question
                              currentQuestion={currentQuestion}
                              getResponsesData={getResponsesData}
                              selectedOption={lastQuestionSelectedOption}
                            />
                            : <ShowSummary response={actualResponses} />
                        }
                      </div>
                    </Slide>
                    : ""}
              </Grid>
              <Grid item lg={4} md={3} sm={4} xs={12}>
                {actualResponses.length || actualResponses.responses ? (
                  <Stepper
                    responses={actualResponses.responses}
                    changeActiveQuestion={changeActiveQuestion}
                    orientation={orientation}
                  />
                ) : null}
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

export default StaffComponent;
