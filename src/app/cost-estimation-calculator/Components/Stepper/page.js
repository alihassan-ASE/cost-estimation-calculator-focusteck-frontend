"use client";
import React, { useEffect, useRef, useState } from "react";
import { Box, Grid, Stepper, Step, StepLabel, Typography, useMediaQuery } from "@mui/material";
import styled from "styled-components";
import { maxHeight } from "@mui/system";
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

export default function VerticalLinearStepper(props) {
  const { responses, changeActiveQuestion } = props;
  const isNarrowScreen = useMediaQuery("(max-width:1200px)");
  const leng = responses?.length;
  const [activeStep, setActiveStep] = useState(leng - 1);
  const containerRef = useRef(null);

  const [CustomScrollableContainer] = useState(
    styled.div({
      maxHeight: "45vh",
      Width: "100%",
      minHeight: "70px",
      margin: "1em 0",
      overflow: "auto",
      "&::-webkit-scrollbar": {
        width: "5px",
        height: "5px",
      },

      "&::-webkit-scrollbar-track": {
        backgroundColor: "#f1f1f1",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#B1B1B1",
        borderRadius: "5px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "#7E7E7E",
      },
      "&::-webkit-scrollbar-corner": {
        backgroundColor: "transparent",
      },
    })
  );

  const handleStep = (step, index) => {
    changeActiveQuestion({ step, index });
    setActiveStep(index - 1);
  };

  useEffect(() => {
    setActiveStep(responses?.length + 1);
  }, [responses?.length]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [handleStep]);

  const [containerHeight, setContainerHeight] = useState(20);
  const containerLabelRef = useRef(null);
  useEffect(() => {
    if (containerLabelRef.current) {
      const newHeight = containerLabelRef.current.clientHeight;
      setContainerHeight(newHeight);
    }
  }, [responses]);

  let questionsArray = ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5"];
  return (
    <Box
      sx={{
        padding: "2.4em 0em"
        // minWidth: orientation === "vertical" ? "212px" : 0,
      }}
    >
      <Typography sx={{ fontWeight: "bold" }}>SUMMARY</Typography>
      <Box
        sx={{
          maxHeight: "max-content",
          height: isNarrowScreen ? "40vh" : "45vh",
          paddingLeft: "0em",
          marginRight: "5px",
          maxWidth: "100%",
        }}
      >
        <CustomScrollableContainer ref={containerRef}>
          <Stepper
            ref={containerLabelRef}
            sx={{
              "& .MuiStepLabel-root": {
                padding: 0,
                alignItems: "start",
                textAlign: "start",
              },
              borderColor: "#0045e6",
              "& .MuiStepConnector-root": {
                marginLeft: "9px",
                // position: "relative"
              },
              "& .MuiStepConnector-line": {
                // position: "absolute",
                borderWidth: "2px",
                // minHeight: "20px",
                height: "20px",
                // height: `${containerHeight}px`
              }
            }}
            nonLinear
            activeStep={responses.length}
            orientation={"vertical"}
          >
            {[...questionsArray, ...Array(Math.max(0, responses.length - questionsArray.length))].map((_, index) => (
              <Step key={index} sx={{ position: "relative" }}>
                {index < responses.length ? (
                  <>
                    {responses[index].resources && index === 0 ? (
                      <>
                        {responses[index].resources.map((resource, resourceIndex) => (
                          <div key={resourceIndex}>
                            <StepLabel
                              sx={{
                                "& .MuiStepIcon-root": {
                                  width: "1.2rem",
                                  height: "1.2rem",
                                  alignItems: "start",
                                  color: index < activeStep ? "#0045e6" : "0045e6",
                                },
                                position: "absolute",
                                top: 0,
                                "& .MuiStepLabel-root": {
                                  padding: 0,
                                  alignItems: "start"
                                },
                                "& .MuiStepIcon-root": {
                                  width: "1.2rem",
                                  height: "1.2rem",
                                },
                                "& .MuiStepLabel-label": {
                                  fontSize: "0.7rem",
                                  alignItems: "start"
                                },
                                minWidth: "170px",
                              }}
                              key={index}
                              cursor="pointer"
                              onClick={() => handleStep(responses[index], index + 1)}
                            >
                              <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                                <Box sx={{ width: "50%" }}>
                                  <Typography fontSize={"14px"} textTransform={"capitalize"} fontWeight={500}>  {resource.resource}</Typography>
                                </Box>
                                <Box sx={{ width: "50%", padding: "3px" }} >

                                  {/* <Typography textAlign={"left"} fontSize={"13px"} fontWeight={600} color={"black"} sx={{
                                    fontFamily: ["Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
                                      ","
                                    ),
                                  }}>
                                    {resource.resource}
                                  </Typography> */}
                                  <Typography textAlign={"left"} fontSize={"13px"} fontWeight={600} color={"black"} sx={{
                                    fontFamily: ["Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
                                      ","
                                    ),
                                  }}>
                                    {resource.resourceOption.opt}
                                  </Typography>
                                  {/* <Typography textAlign={"left"} fontSize={"13px"} fontWeight={600} color={"black"} sx={{
                                    fontFamily: ["Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
                                      ","
                                    ),
                                  }}>
                                    {resource.seniorityLevel}
                                  </Typography>
                                  <Typography textAlign={"left"} fontSize={"13px"} fontWeight={600} color={"black"} sx={{
                                    fontFamily: ["Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
                                      ","
                                    ),
                                  }}>
                                    {resource.numOfResources}
                                  </Typography> */}
                                </Box>
                              </Box>

                            </StepLabel>
                            <StepConnector />
                          </div>
                        ))}
                      </>
                    ) : (
                      <StepLabel
                        sx={{
                          "& .MuiStepIcon-root": {
                            width: "1.2rem",
                            height: "1.2rem",
                            alignItems: "start",
                            color: index < activeStep ? "#0045e6" : "0045e6",
                          },
                          "& .MuiStepLabel-label": {
                            fontSize: "0.7rem",
                            alignItems: "start",
                            padding: "0px"
                          },
                          "&.css-1xr15il-MuiStepLabel-root": {
                            padding: "0"
                          },
                          "& .MuiSvgIcon-root-MuiStepIcon-root .Mui-completed": {
                            backgroundColor: "#0045e6"
                          },
                          "& .MuiBox-root": {
                            alignItems: "start"
                          }
                        }}
                        cursor="pointer"
                        onClick={() => handleStep(responses[index], index + 1)}
                      >
                        {(responses[index].selectedOption || responses[index].selectedData) && (
                          <div>
                            <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                              <Box sx={{ width: "50%" }}>
                                <Typography fontSize={"14px"} textTransform={"capitalize"} fontWeight={500}> {responses[index].question?.label
                                  ? responses[index].question.label
                                  : responses[index].label}
                                </Typography>
                              </Box>
                              <Box sx={{ width: "50%" }} >
                                {(responses[index].selectedOption || responses[index].selectedData).map((selected, key) => (
                                  <div key={key}>
                                    <Typography fontSize={"14px"} textTransform={"capitalize"} fontWeight={600} color={"black"}>
                                      {selected.opt}
                                    </Typography>
                                  </div>
                                ))}
                              </Box>
                            </Box>
                          </div>
                        )}
                      </StepLabel>
                    )
                    }
                  </>
                ) : (
                  <StepLabel
                    sx={{
                      "& .MuiStepIcon-root": {
                        width: "1.2rem",
                        height: "1.2rem",
                        alignItems: "start",
                        color: index < activeStep ? "#0045e6" : "0045e6",
                      },

                      "& .MuiStepLabel-label": {
                        fontSize: "0.7rem",
                        alignItems: "start",
                        padding: "0px"
                      },
                      "&.css-1xr15il-MuiStepLabel-root": {
                        padding: "0"
                      },
                      "& .MuiSvgIcon-root-MuiStepIcon-root .Mui-completed": {
                        backgroundColor: "#0045e6"
                      },
                      "& .MuiBox-root": {
                        alignItems: "start"
                      }

                    }}
                    cursor="pointer"
                    onClick={() => setActiveStep(index + 1)}
                  >
                    {index < questionsArray.length ? questionsArray[index] : ''}
                  </StepLabel>
                )}
              </Step>
            ))}
          </Stepper>
        </CustomScrollableContainer>
      </Box>
    </Box >
  );
}
