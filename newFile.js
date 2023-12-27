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

  const [additionalQuesiton, setAdditionalQuesiton] = useState([]);
  const [staffBase, setStaffBaseResources] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentState, setCurrentState] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [actualResponses, setActualResponses] = useState({ responses: [] });

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
  let newOption;
  const [questionState, setQuestionState] = useState(0);

  const seniorityLevelOptions = ["Mid Level", "Senior Level", "Team Lead"];
  const numOfResourcesOptions = {
    "Mid Level": [1, 2, 3, 4],
    "Senior Level": [1, 2, 3, 4, 5],
    "Team Lead": [1, 2],
  };

  const [option, setOption] = useState();
  const [resourceOption, setResourceOption] = useState();

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
    setResourceOption(staffBase.map((item) => item.typeOfResource));
  }, [staffBase]);

  const type = useMemo(() => {
    return staffBase[0]?.typeOfUI;
  }, [staffBase]);

  const typeOfSelection = useMemo(() => {
    return staffBase[0]?.typeofselection;
  }, [staffBase]);

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
    const newResponse = { ...currentQuestion, ...addedOption };

    setActualResponses((prev) => ({
      ...prev,
      responses: [...prev.responses, newResponse],
    }));
  };

  // Getting Response from child Component(Question Component)
  const getResponsesData = (resp) => {
    setOption(resp.selectedData[0]);
    setIsOptionSelected(false);
    setAddedOption(resp);
  };

  // Handling Next Quesiton
  const nextQuestion = () => {
    setOption();

    staffBase.find((data) => {
      if (data.typeOfResource === option) {
        newOption = data.options;
      }
    });

    if (newOption) {
      setQuestionState(questionState + 1);
      setResourceOption(newOption);
    } else {
      for (const key in numOfResourcesOptions) {
        if (key === option) {
          setQuestionState(questionState + 1);
          setResourceOption(numOfResourcesOptions[key]);
          break;
        } else if (questionState === 1) {
          setQuestionState(questionState + 1);
          setResourceOption(seniorityLevelOptions);
        } else {
          setCurrentState(false);
          setButtonState(true);
          setIsOptionSelected((prev) => !prev);
          setStepperState(true);

          let currentQuestionLocal = currentQuestion;
          let currentQuestionIndexLocal = currentQuestionIndex;
          if (!currentQuestion) {
            currentQuestionLocal =
              additionalQuesiton[currentQuestionIndexLocal];
            currentQuestionIndexLocal++;
          } else if (currentQuestionIndexLocal < additionalQuesiton.length) {
            currentQuestionLocal =
              additionalQuesiton[currentQuestionIndexLocal];
            currentQuestionIndexLocal++;
          } else {
            setCurrentQuestionIndex(currentQuestionIndexLocal++);
          }

          setCurrentQuestion(currentQuestionLocal);
          setCurrentQuestionIndex(currentQuestionIndexLocal);
          setIsNextClicked(true);
          setLastQuestionSelectedOption([]);
        }
      }
    }

    setResponseData();
    slider();
  };

  const slider = function () {
    setSlideIn(false);
    setTimeout(() => {
      setSlideIn(true);
    }, 250);
  };

  console.log("actual responses: ", questionState);
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
          // if (lastQuestion.resources?.length) {
          //   if (lastQuestion.resources && lastQuestion.resources.length > 0) {
          //     lastQuestion.resources.forEach((resource) => {
          //       if (resource.resourceOption && resource.resourceOption.price) {
          //         totalPriceToSubtract += resource.resourceOption.price;
          //       }
          //     });
          //   }
          // } else {
          //   if (
          //     lastQuestion.selectedData &&
          //     lastQuestion.selectedData.length > 0
          //   ) {
          //     lastQuestion.selectedData.forEach((select) => {
          //       if (select.price) {
          //         totalPriceToSubtract += select.price;
          //       }
          //     });
          //   }
          // }
          setTotalCost((prev) => prev - totalPriceToSubtract);
        }
      }
    } else {
      if (questionState > 0) {
        setQuestionState(questionState - 1);
        let newArray = [...actualResponses.responses];
        lastQuestion = newArray.pop();

        if (lastQuestion) {
          setCurrentQuestion(lastQuestion);
          setActualResponses({ responses: newArray });
          setIsOptionSelected(false);
        }
      }
    }
  };

  // calling goToForm Function after selecting last question
  if (currentQuestionIndex > additionalQuesiton.length) {
    setTimeout(() => {
      goToForm();
    }, 100);
  }

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
            {actualResponses.responses?.length > 0 && (
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

          {isNarrowScreen ? (
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
                  }}
                >
                  <div>
                    <Question
                      currentQuestion={currentQuestion}
                      options={resourceOption}
                      getResponsesData={getResponsesData}
                      selectedOption={lastQuestionSelectedOption}
                      typeOfSelection={typeOfSelection}
                      typeofUI={type}
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
                  }}
                >
                  <div>
                    <Question
                      currentQuestion={currentQuestion}
                      options={resourceOption}
                      getResponsesData={getResponsesData}
                      selectedOption={lastQuestionSelectedOption}
                      typeOfSelection={typeOfSelection}
                      typeofUI={type}
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
                {actualResponses.length || actualResponses.responses
                  ? //   <Stepper
                    //     responses={actualResponses.responses}
                    //     changeActiveQuestion={changeActiveQuestion}
                    //     orientation={orientation}
                    //   />
                    null
                  : null}
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
