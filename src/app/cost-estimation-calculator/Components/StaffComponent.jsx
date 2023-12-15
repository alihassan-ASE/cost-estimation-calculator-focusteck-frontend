"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Card, Grid } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { styled } from "@mui/material/styles";
import Question from "../Components/Question/page";
import { useRouter } from "next/navigation";
import Stepper from "../Components/Stepper/page";
import { getQuestions } from "../../lib/api/getData";
import StaffResource from "./StaffResource";

import Page from "../submit/page";

const CustomButton = styled(Button)({
  border: "1px solid #0069d9",
});

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
  const [actualResponses, setActualResponses] = useState([]);

  const [addedOption, setAddedOption] = useState([]);

  const [isNextClicked, setIsNextClicked] = useState(false);
  const [isStepperClicked, setIsStepperClicked] = useState(false);

  const route = useRouter();

  // const [resourcesPrice, setResourcesPrice] = useState(0);
  // const [optionPrice, setOptionPrice] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    getQuestions().then((resp) => {
      const { Resources, additionalQuestions } = resp;
      setAdditionalQuesiton(additionalQuestions);
      setStaffBaseResources(Resources);
    });
  }, []);

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

  const resources = actualResponses[0]?.resources;
  useEffect(() => {
    if (actualResponses[0]?.resources.length > 0) {
      setCount(actualResponses[0]?.resources.length - 1);
    }
  }, [actualResponses[0]?.resources]);

  const goToForm = () => {
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

        if (actualResponses.responses.length > 0) {
          actualResponses.responses.forEach((response, index) => {
            // For the first response object (index 0)
            if (index === 0) {
              // Calculate the total price from resources array in the first object
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
              // For subsequent response objects (index > 0)
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

        // Update the total cost by adding the calculated totalPrice to the previous total cost
        setTotalCost(totalPrice);
        break;
      }
    }
  };

  const changeActiveQuestion = (obj) => {
    const { index, step } = obj;
    // console.log(obj)

    setCurrentQuestionIndex(index);
    setCurrentQuestion(step);
    actualResponses.responses.splice(index - 1);
    setIsStepperClicked(true);
  };
  const selectedOptionPassToParent = (data, boolVal, label) => {
    setValues((prev) => [...prev, data]);
    setButtonState(true);
    setAddMore(!boolVal);
  };

  // console.log("actual", actualResponses)
  // setting Response in actual Array
  const setResponseData = () => {
    const dataObj = {};
    dataObj.resources = values;
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
    setAddedOption(resp);
  };

  // Handling next Question
  const nextQuestion = () => {
    setCurrentState(false);
    setButtonState(true);
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
    if (currentQuestionIndex >= additionalQuesiton.length) {
      actualResponses.totalCost = totalCost;
      goToForm();
    }
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
      lastQuestion = newArray.pop();

      if (lastQuestion) {
        setCurrentQuestion(lastQuestion);
        setActualResponses({ responses: newArray });
        setCurrentQuestionIndex(currentQuestionIndex - 1);
      }

      // Check if there's at least one response
      if (actualResponses.responses.length > 0) {
        let totalPriceToSubtract = 0;

        // For the popped response object
        if (lastQuestion) {
          // For the first response object (index 0)
          if (actualResponses.responses.length === 0) {
            // Calculate the total price from resources array in the first object and subtract it
            if (lastQuestion.resources && lastQuestion.resources.length > 0) {
              lastQuestion.resources.forEach((resource) => {
                if (resource.resourceOption && resource.resourceOption.price) {
                  totalPriceToSubtract += resource.resourceOption.price;
                }
              });
            }
          } else {
            // For subsequent response objects (index > 0)
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

          // Subtract the price of the popped response from the total cost
          setTotalCost((prev) => Math.max(0, prev - totalPriceToSubtract)); // Ensure the totalCost doesn't go below 0
        }
      }
    }

    // const resources = selectedResource.resources;
    if (lastQuestion) {
      setCurrentQuestion(lastQuestion);
      setActualResponses({ responses: newArray });
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }

    // Check if there's at least one response
    if (actualResponses.responses.length > 0) {
      let totalPriceToSubtract = 0;

      // For the popped response object
      if (lastQuestion) {
        // For the first response object (index 0)
        if (actualResponses.responses.length === 0) {
          // Calculate the total price from resources array in the first object and subtract it
          if (lastQuestion.resources && lastQuestion.resources.length > 0) {
            lastQuestion.resources.forEach((resource) => {
              if (resource.resourceOption && resource.resourceOption.price) {
                totalPriceToSubtract += resource.resourceOption.price;
              }
            });
          }
        } else {
          // For subsequent response objects (index > 0)
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

        // Subtract the price of the popped response from the total cost
        setTotalCost((prev) => Math.max(0, prev - totalPriceToSubtract)); // Ensure the totalCost doesn't go below 0
      }
    }
  };

  // }

  // const resources = selectedResource.resources;

  const returnResources = () => {
    const tags = [];
    for (let i = 0; i <= count; i++) {
      tags.push(
        <Card
          key={i}
          style={{
            padding: "2em 1.5em",
            borderRadius: ".5em",
            "@media (max-width: 600px)": {
              padding: "0", // Adjust padding for 'xs' breakpoint
            },
          }}
        >
          <StaffResource
            key={i}
            question={currentQuestion}
            options={staffBase}
            index={i}
            setValues={setValues}
            values={values}
            selectedResource={[]}
            selectedOptionPassToParent={selectedOptionPassToParent}
          />
        </Card>
      );
    }
    return tags;
  };

  return (
    <Box>
      <Typography variant="h5" p={2}>
        Staff Questions
      </Typography>

      {currentState ? (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2em",
            alignItems: "center",
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
                  marginBottom: "3em",
                  padding: "3em",
                  borderRadius: ".5em",
                  minWidth: 100,
                  height: 410,
                  width: 340,
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
      ) : (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Question
              currentQuestion={currentQuestion}
              getResponsesData={getResponsesData}
              styleVal={"Tiles"}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "1em 3em",
            }}
          >
            {actualResponses.length || actualResponses.responses ? (
              <Stepper
                responses={actualResponses.responses}
                changeActiveQuestion={changeActiveQuestion}
              />
            ) : null}
          </Box>
        </Box>
      )}
      <Box sx={{ display: "flex", gap: "2em", margin: "1em 0 3em 0" }}>
        {currentQuestionIndex > 0 ? (
          <Button
            size="medium"
            variant="contained"
            sx={{ width: 150 }}
            onClick={backQuestion}
            disable={values[0] ? false : true}
          >
            Back
          </Button>
        ) : null}
        {additionalQuesiton.length >= currentQuestionIndex ? (
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
        ) : (
          <Button
            disabled={!buttonState}
            size="medium"
            variant="contained"
            sx={{ width: 150 }}
            onClick={() => goToForm()}
            disable={values[0] ? false : true}
          >
            Enter More Details
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default StaffComponent;
