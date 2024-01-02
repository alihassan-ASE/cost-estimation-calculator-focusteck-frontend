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
        padding: "2.4em 0em .5em 0"
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
                padding: ".3em 0",
                alignItems: "start",
                textAlign: "start"
              },
              "& .MuiStepConnector-line": {
                borderColor: "#0045e6",
                borderLeftWidth: "2px",
                marginLeft: "-3px",
                padding: "1px"
              },
              "& .MuiStepConnector-root": {
                marginTop: "-2px",
              },
              borderColor: "#0045e6",

            }}
            nonLinear
            activeStep={responses?.length}
            orientation={"vertical"}
          >
            {[
              ...questionsArray,
              ...(responses && responses.length > questionsArray.length
                ? Array(responses.length - questionsArray.length).fill(null)
                : [])
            ].map((_, index) => (
              <Step key={index} sx={{ position: "relative" }}>
                {index < responses?.length ? (
                  <>
                    {responses[index].resources && index === 0 ? (
                      <>
                        <StepLabel sx={{
                          "& .MuiStepIcon-root": {
                            width: "1.2rem",
                            height: "1.2rem",
                            alignItems: "start",
                            color: index < activeStep ? "#0045e6" : "#0045e6",
                          },

                          "&.css-1xr15il-MuiStepLabel-root": {
                            // padding: "0"
                          },
                          "& .MuiStepLabel-label": {
                            fontSize: "0.7rem",
                            alignItems: "start",
                            padding: "-2px"
                          }
                          ,
                          "& .MuiBox-root": {
                            alignItems: "start"
                          }

                        }}
                          key={index}
                          cursor="pointer"
                          onClick={() => handleStep(responses[index], index + 1)}>

                          <Typography sx={{
                            fontSize: "14px",
                            textTransform: "capitalize",
                            fontWeight: 500,
                            lineHeight: 1.3

                          }}>Resources</Typography>

                        </StepLabel>
                        {responses[index].resources.map((resource, resourceIndex) => (
                          <div key={resourceIndex}>
                            <Box sx={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "center", alignItems: "start" }}>
                              <Box sx={{ width: "50%", paddingLeft: "30px", }}>
                                <Typography fontSize={"14px"} textTransform={"capitalize"} fontWeight={500}>{resource.resource}</Typography>
                              </Box>
                              <Box sx={{ width: "50%", padding: "3px" }}>
                                <Typography paddingRight={"6px"} textAlign={"left"} fontSize={"13px"} fontWeight={600} color={"black"} sx={{
                                  fontFamily: ["Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
                                    ","
                                  ),
                                }}>
                                  {resource.resourceOption.opt}
                                </Typography>
                              </Box>
                            </Box>
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
                            color: "#0045e6"
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
                                    <Typography fontSize={"14px"} textTransform={"capitalize"} fontWeight={600} color={"black"} paddingRight={"6px"}>
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
                    <Typography fontSize={"14px"} textTransform={"capitalize"} fontWeight={500} paddingRight={"6px"}>
                      {index < questionsArray?.length ? questionsArray[index] : ''}
                    </Typography>
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