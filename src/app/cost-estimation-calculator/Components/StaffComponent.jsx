"use client";
import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  Grid,
  useMediaQuery,
} from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { styled } from "@mui/material/styles";
import Question from "../Components/Question/page";
import { useRouter } from "next/navigation";
import Stepper from "../Components/Stepper/page";
import { getQuestions } from "../../lib/api/getData";
import StaffResource from "./StaffResource";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { NEXT_BODY_SUFFIX } from "next/dist/lib/constants";

const CustomButton = styled(Button)({
  border: "1px solid #0069d9",
});

const CustomCard = styled(Card)(({ theme }) => ({
  height: 340,
  width: "294px",
  padding: "2em 1.5em",
  margin: "2em 1em",
  borderRadius: ".5em",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
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
  const [addMore, setAddMore] = useState(false);
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

  const route = useRouter();
  const dataObj = {};

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
  }, [values?.length]);

  const goToForm = () => {
    actualResponses.totalCost = totalCost;

    try {
      let data = JSON.stringify(actualResponses);
      localStorage.setItem("Response", data);
      route.push("/cost-estimation-calculator/submit");
    } catch (error) {
      console.log("Data is not set", error);
    }
  };

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

  const changeActiveQuestion = (obj) => {
    const { index, step } = obj;

    if (index == 1) {
      setCurrentState(true);
    }

    setCurrentQuestionIndex(index - 1);
    setCurrentQuestion(step);
    actualResponses.responses.splice(index - 1);
    setIsStepperClicked(true);
  };

  const selectedOptionPassToParent = (data, boolVal, label) => {
    setResource();
    setValues((prev) => [...prev, data]);

    setButtonState(true);
    setAddMore(!boolVal);
    setIsOptionSelected(false);
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

  const getResponsesData = (resp) => {
    setIsOptionSelected(false);
    setAddedOption(resp);
  };

  const nextQuestion = () => {
    setCurrentState(false);
    setButtonState(true);
    setIsOptionSelected((prev) => !prev);

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
  };

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
      }

      if (actualResponses.responses.length > 0) {
        let totalPriceToSubtract = 0;
        if (lastQuestion) {
          if (actualResponses.responses.length === 0) {
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

          setTotalCost((prev) => Math.max(0, prev - totalPriceToSubtract));
        }
      }
    }
  };

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
            setValues={setValues}
            values={values}
            selectedOption={resource}
            selectedOptionPassToParent={selectedOptionPassToParent}
          />
        </CustomCard>
      );
    }
    return tags;
  };

  if (currentQuestionIndex > additionalQuesiton.length) {
    goToForm();
  }
  console.log("resource", resource);
  console.log("actualResponses", actualResponses);

  return (
    <Box sx={{ margin: "3em 1em 1em 1em" }}>
      <Box>
        {currentQuestionIndex > 0 && (
          <KeyboardBackspaceIcon
            sx={{
              color: "#ACACAC",
              border: "2px solid #ACACAC",
              padding: ".2em",
              borderRadius: "50%",
              margin: "0 0 1em 0",
            }}
            onClick={backQuestion}
            disable={values[0] ? false : true}
          />
        )}
        <Typography variant="h6">Total Cost : $ {totalCost}</Typography>
        {currentState ? (
          <>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "1em",
              }}
            >
              {returnResources()}

              <Box>
                {addMore && (
                  <CustomButton
                    onClick={() => {
                      setAddMore(false);
                      setCount(count + 1);
                      returnResources();
                    }}
                    style={{
                      padding: "3em",
                      borderRadius: ".5em",
                      minWidth: 100,
                      height: 405,
                      width: 290,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ControlPointIcon
                      sx={{ fontSize: "2em" }}
                      onClick={() => setAddMore(false)}
                    />
                  </CustomButton>
                )}
              </Box>
            </Box>
            {values[0] && (
              <Box
                sx={{
                  margin: "2em 1em",
                }}
              >
                <Button
                  disabled={!buttonState}
                  size="medium"
                  variant="contained"
                  sx={{ width: 150 }}
                  onClick={() => {
                    nextQuestion();
                  }}
                  disable={values[0] ? false : true}
                >
                  Next
                </Button>
              </Box>
            )}
          </>
        ) : isNarrowScreen ? (
          <Grid container spacing={{ xs: 5, sm: 2, md: 3, lg: 4, xl: 5 }}>
            <Grid item lg={4} md={3} sm={4} xs={12}>
              {actualResponses.length || actualResponses.responses ? (
                <Stepper
                  responses={actualResponses.responses}
                  changeActiveQuestion={changeActiveQuestion}
                  orientation={orientation}
                />
              ) : null}
            </Grid>
            <Grid item lg={8} md={9} sm={8} xs={12}>
              <Question
                currentQuestion={currentQuestion}
                getResponsesData={getResponsesData}
                selectedOption={[]}
                styleVal={"Tiles"}
              />

              {additionalQuesiton.length >= currentQuestionIndex && (
                <Box
                  sx={{
                    margin: "2em 0",
                  }}
                >
                  <Button
                    size="medium"
                    variant="contained"
                    sx={{ width: 150 }}
                    onClick={() => {
                      nextQuestion();
                    }}
                    disabled={isOptionSelected}
                  >
                    Next
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}>
            <Grid item lg={8} md={9} sm={8} xs={12}>
              <Question
                currentQuestion={currentQuestion}
                getResponsesData={getResponsesData}
                selectedOption={[]}
                styleVal={"Tiles"}
              />
              {additionalQuesiton.length >= currentQuestionIndex && (
                <Box
                  sx={{
                    margin: "2em 0",
                  }}
                >
                  <Button
                    size="medium"
                    variant="contained"
                    sx={{ width: 150 }}
                    onClick={() => {
                      nextQuestion();
                    }}
                    disabled={isOptionSelected}
                  >
                    Next
                  </Button>
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
    </Box>
  );
};

export default StaffComponent;
