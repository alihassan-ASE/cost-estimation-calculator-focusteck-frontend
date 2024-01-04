"use client";
import React, { useEffect, useRef, useState } from "react";
import { Box, Grid, Stepper, Step, StepLabel, Typography, useMediaQuery } from "@mui/material";
import styled from "styled-components";
import { maxHeight } from "@mui/system";
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { ContactPageSharp } from "@mui/icons-material";

export default function VerticalLinearStepper(props) {
  const { responses, changeActiveQuestion } = props;
  const isNarrowScreen = useMediaQuery("(max-width:1200px)");
  const isMobileScreen = useMediaQuery("(max-width:445px)");
  const leng = responses?.length;
  const [activeStep, setActiveStep] = useState(leng - 1);
  const containerRef = useRef(null);
  const [indexVal, setIndexVal] = useState(0)

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
  let questionsArray = ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5"];

  const [containerHeight, setContainerHeight] = useState(20);
  const containerLabelRef = useRef(null);

  useEffect(() => {
    if (containerLabelRef.current) {
      const newHeight = containerLabelRef.current.clientHeight;
      setContainerHeight(newHeight);
    }
  }, [responses]);

  const mergedArray = [
    ...questionsArray,
    ...(responses && responses.length > questionsArray.length
      ? Array(responses.length - questionsArray.length).fill(null)
      : [])
  ]

  return (
    <Box
      sx={{
        padding: "2.4em 0em .5em 0",
      }}
    >
      <Typography sx={{ fontWeight: "bold" }}>SUMMARY</Typography>
      <Box
        sx={{
          maxHeight: "max-content",
          // height: "45vh",
          paddingLeft: "0em",
          marginRight: "5px",
          maxWidth: "100%",
          marginBottom: isMobileScreen ? "2em" : 0
        }}
      >
        <CustomScrollableContainer ref={containerRef}>
          <Stepper
            ref={containerLabelRef}
            sx={{
              borderColor: "#0045e6",
              position: "relative",
              "& .MuiStepLabel-root": {
                padding: ".2em 0em 2em 0",
                textAlign: "start",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                // padding: 0
              },
              "& .MuiStepConnector-line": {
                // borderColor: "#0045e6",
                borderLeftWidth: "2px",
                marginLeft: "0px",
                height: "100%"
              },
              "& .MuiStepConnector-root": {
                position: "absolute",
                marginTop: "auto",
                marginBottom: "auto",
                zIndex: -100,
                height: "100%",
                top: '15px'
              },
              "& .MuiStepIcon-root": {
                width: "1.2rem",
                height: "1.2rem",
                alignItems: "start",
              },

            }}
            nonLinear
            activeStep={responses?.length}
            orientation={"vertical"}
          >
            {
              [
                ...questionsArray,
                ...(responses && responses.length > questionsArray.length
                  ? Array(responses.length - questionsArray.length).fill(null)
                  : [])
              ].map((_, index) => (
                <Box
                  sx={{
                    position: "relative",
                    "& .MuiStepConnector-root": {
                      display: index === mergedArray.length - 1 ? "none" : "block",
                      "& .MuiStepConnector-line": {
                        borderColor: index < activeStep - 1 ? "#0045e6" : "#838383",
                      }
                    },
                  }}>
                  <Step key={index} sx={{
                    display: "flex",
                    alignItems: "flex-start",
                  }}>
                    <Box sx={{
                      color: "#fff", padding: ".3em", borderRadius: "50%", backgroundColor: index < activeStep ? "#0045e6" : "#838383", marginRight: "7px", width: "1em", height: "1em", textAlign: "center", fontFamily: ["Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
                        ","
                      ),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",

                    }}>
                      <Typography sx={{
                        fontSize: "11px"
                      }}>
                        {index + 1}
                      </Typography>
                    </Box>
                    {index < responses?.length ? (
                      <>
                        {responses[index].resources && index === 0 ? (
                          <>
                            <StepLabel sx={{
                              width: "100%",
                              "& .MuiStepIcon-root.Mui-active": {
                                color: "#0045e6",
                              },
                              "& .MuiStepIcon-root": {
                                width: "1.2rem",
                                height: "1.2rem",
                                alignItems: "start",
                                color: index < activeStep ? "#0045e6" : "#838383",
                              },
                              "& .MuiStepLabel-label": {
                                fontSize: "0.7rem",
                                alignItems: "start",
                              }
                              ,
                              "& .MuiBox-root": {
                                alignItems: "start"
                              },
                              display: "flex",
                              justifyContent: "space-between"
                            }}
                              key={index}
                              cursor="pointer"
                              onClick={() => {
                                handleStep(responses[index], index + 1)
                              }}>
                              {responses[index].resources.map((resource, resourceIndex) => (
                                <div key={resourceIndex}>
                                  <Box sx={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "start" }}>
                                    <Box sx={{ width: "40%", }}>
                                      <Typography fontSize={"14px"} textTransform={"capitalize"} fontWeight={500}>{resource.resource}</Typography>
                                    </Box>
                                    <Box sx={{ width: "55%", marginLeft: "2em" }}>
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
                            </StepLabel>

                          </>
                        ) : (
                          <StepLabel
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                              "& .MuiStepIcon-root.Mui-active": {
                                color: "#0045e6",
                              },
                              "& .MuiStepIcon-root": {
                                width: "1.2rem",
                                height: "1.2rem",
                                alignItems: "start",
                                color: index < activeStep ? "#0045e6" : "#838383",

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
                            onClick={() => {
                              handleStep(responses[index], index + 1)
                            }}
                          >
                            {(responses[index].selectedOption || responses[index].selectedData) && (
                              <div>
                                <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center", }}>
                                  <Box sx={{ width: "40%" }}>
                                    <Typography fontSize={"14px"} textTransform={"capitalize"} fontWeight={500}> {responses[index].question?.label
                                      ? responses[index].question.label
                                      : responses[index].label}
                                    </Typography>
                                  </Box>
                                  <Box sx={{ width: "55%", marginLeft: "2em" }} >
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
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          "& .MuiStepIcon-root.Mui-active": {
                            color: "#0045e6",
                          },
                          "& .MuiStepIcon-root": {
                            width: "1.2rem",
                            height: "1.2rem",
                            alignItems: "start",
                            color: index < activeStep ? "#0045e6" : "#838383",

                          },
                          "& .MuiStepLabel-label": {
                            fontSize: "0.7rem",
                            alignItems: "start",
                            padding: "0px"
                          },
                          "& .MuiSvgIcon-root-MuiStepIcon-root .Mui-completed": {
                            backgroundColor: "#0045e6"
                          },
                          "& .MuiBox-root": {
                            alignItems: "start"
                          },
                        }}
                        cursor="pointer"
                        onClick={() => {
                          setActiveStep(index + 1)
                        }}
                      >
                        <Typography fontSize={"14px"} textTransform={"capitalize"} fontWeight={500} paddingRight={"6px"}>
                          {index < questionsArray?.length ? questionsArray[index] : ''}
                        </Typography>
                      </StepLabel>
                    )}
                  </Step>
                </Box>
              ))}
          </Stepper>
        </CustomScrollableContainer >
      </Box >
    </Box >
  );
}