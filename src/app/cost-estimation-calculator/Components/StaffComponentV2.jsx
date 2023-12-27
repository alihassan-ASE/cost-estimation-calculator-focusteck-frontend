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
import { styled } from "@mui/material/styles";
import Question from "../Components/Question/page";
import { useRouter } from "next/navigation";
import Stepper from "../Components/Stepper/page";
import { getQuestions } from "../../lib/api/getData";
import StaffResourceV2 from "./StaffResourceV2";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CircularProgress from "@mui/material/CircularProgress";

const CustomNextButton = styled(Button)(({ theme }) => ({
  width: 150,
  // margin: "2em 0",
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
    padding: ".7em 1.3em",
  },
  [theme.breakpoints.down("sm")]: {
    width: 100,
    fontSize: 10,
    padding: ".7em 1.7em",
  },
}));
const CustomBackButton = styled(Button)(({ theme }) => ({
  padding: 0,
  color: "#ACACAC",
  borderRadius: "50%",
  justifyContent: "normal",
  minWidth: "min-content",
  "&:hover": {
    backgroundColor: "#fff",
  },
  "&:selected": {
    backgroundColor: "#fff",
  },
  "&:focus": {
    backgroundColor: "#fff",
  },
  "&:active": {
    backgroundColor: "#fff",
  },
}));
const CustomButton = styled(Button)(({ theme }) => ({
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
  boxShadow: "none",
}));

const StaffComponentV2 = () => {
  const [buttonState, setButtonState] = useState(true);
  const [count, setCount] = useState(0);
  const [values, setValues] = useState([]);
  const [currentQuestionType, setCurrentQuestionType] = useState("resources");

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
  const [questionState, setQuestionState] = useState(0);

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

  // Function to navigate on Form Page
  const goToForm = () => {
    actualResponses.totalCost = totalCost;
    try {
      let data = JSON.stringify(actualResponses);
      localStorage.setItem("Response", data);
      route.push("/cost-estimation-calculator/submit");
    } catch (error) {
      console.log("Error", error);
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

    if (index == 1) {
      setCurrentState(true);
    }

    setCurrentQuestionIndex(index - 1);
    setCurrentQuestion(step);
    actualResponses.responses.splice(index - 1);
    setLastQuestionSelectedOption(step.selectedData);
    setIsStepperClicked(true);
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
    setIsOptionSelected(false);
    setAddedOption(resp);
  };
  // console.log("questionState: ", currentQuestionType);

  const selectedOptionPassToParent = (data, resourceOption, stateVal) => {
    // console.log("resource Option: ", resourceOption);
    if (stateVal < 3) {
      setQuestionState(stateVal);
    } else {
      setCurrentQuestionType("additional");
    }
    setValues((prev) => [...prev, { data: [data], options: resourceOption }]);
    setButtonState(true);

    setIsOptionSelected(false);
    setResource((prev) => [...prev, data]);
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
    } else if (currentQuestionType === "resources") {
      setQuestionState(questionState - 1);
      let newArray = [...values];
      lastQuestion = newArray.pop();
      if (lastQuestion) {
        setStaffBaseResources(lastQuestion.options);
        // setActualResponses({ responses: newArray });
      }
    } else if (
      currentQuestionType === "additional" &&
      currentQuestionIndex === 0
    ) {
      setCurrentQuestionType("resources");
    }
  };
  // calling goToForm Function after selecting last question
  if (currentQuestionIndex > additionalQuesiton.length) {
    setTimeout(() => {
      goToForm();
    }, 100);
  }

  // const returnResources = () => {
  //   const tags = [];
  //   for (let i = 0; i <= count; i++) {
  //     tags.push(
  //       <CustomCard key={i}>
  //         <StaffResourceV2
  //           key={i}
  //           question={currentQuestion}
  //           options={staffBase}
  //           index={i}
  //           count={count}
  //           setCount={setCount}
  //           setValues={setValues}
  //           values={values}
  //           selectedOption={[]}
  //           selectedOptionPassToParent={selectedOptionPassToParent}
  //           deleteResource={deleteResource}
  //         />
  //       </CustomCard>
  //     );
  //   }
  //   return tags;
  // };

  // console.log("currentQuestion: ", currentQuestion);
  // console.log("actualResponses", actualResponses);
  console.log("values: ", values);
  // console.log("actual responses: ", questionState);
  // console.log("count: ", count);

  return (
    <Box sx={{ margin: "1em 2em" }}>
      {additionalQuesiton.length && staffBase.length ? (
        <Box>
          <Box
            sx={{
              display: "flex",
              gap: "1em",
              alignItems: "center",
              margin: "1em 0",
            }}
          >
            {values.length > 0 && (
              <CustomBackButton onClick={backQuestion}>
                <KeyboardBackspaceIcon
                  sx={{
                    color: "#ACACAC",
                    border: "2px solid #ACACAC",
                    borderRadius: "50%",
                    padding: ".3em",
                    borderRadius: "50%",

                    ":hover": {
                      cursor: "pointer",
                      backgroundColor: "#0069d9",
                      border: "2px solid #fff",
                      color: "#fff",
                    },
                  }}
                />
              </CustomBackButton>
            )}
            <Typography variant="h6">Total Cost : $ {totalCost}</Typography>
          </Box>

          {currentQuestionType === "resources" ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "1em",
                }}
              >
                {/* {returnResources()} */}
                <StaffResourceV2
                  question={currentQuestion}
                  options={staffBase}
                  setValues={setValues}
                  values={values}
                  selectedOption={[]}
                  selectedOptionPassToParent={selectedOptionPassToParent}
                  deleteResource={deleteResource}
                  questionState={questionState}
                  setQuestionState={setQuestionState}
                />

                {/* {actualResponses.length >= 1 ? (
                  <Box>
                    <CustomButton
                      onClick={() => {
                        setCount(count + 1);
                        returnResources();
                      }}
                    >
                      <ControlPointIcon sx={{ fontSize: 30 }} />
                    </CustomButton>
                  </Box>
                ) : null} */}
              </Box>
            </>
          ) : isNarrowScreen && currentQuestionType === "additional" ? (
            <Grid container spacing={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}>
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
                    node.style.opacity = 0;

                    setTimeout(() => {
                      node.style.opacity = 1;
                    }, 200);
                  }}
                >
                  <div>
                    <Question
                      currentQuestion={currentQuestion}
                      getResponsesData={getResponsesData}
                      selectedOption={lastQuestionSelectedOption}
                    />
                  </div>
                </Slide>

                {additionalQuesiton.length >= currentQuestionIndex && (
                  <Box
                    sx={{
                      margin: "2em 0",
                    }}
                  >
                    <CustomNextButton
                      size="medium"
                      variant="contained"
                      sx={{ width: 150 }}
                      onClick={nextQuestion}
                      disabled={isOptionSelected}
                    >
                      Next
                    </CustomNextButton>
                  </Box>
                )}
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}>
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
                    node.style.opacity = 0;

                    setTimeout(() => {
                      node.style.opacity = 1;
                    }, 200);
                  }}
                >
                  <div>
                    <Question
                      currentQuestion={currentQuestion}
                      getResponsesData={getResponsesData}
                      selectedOption={lastQuestionSelectedOption}
                    />
                  </div>
                </Slide>
                {additionalQuesiton.length >= currentQuestionIndex && (
                  <Box
                    sx={{
                      margin: "2em 0",
                    }}
                  >
                    <CustomNextButton
                      size="medium"
                      variant="contained"
                      sx={{ width: 150 }}
                      onClick={nextQuestion}
                      disabled={isOptionSelected}
                    >
                      Next
                    </CustomNextButton>
                  </Box>
                )}
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

export default StaffComponentV2;
