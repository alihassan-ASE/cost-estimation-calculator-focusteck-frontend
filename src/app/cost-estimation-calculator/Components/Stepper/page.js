"use client";
import React, { useEffect, useRef, useState } from "react";
import { Box, Grid, Stepper, Step, StepLabel, Typography } from "@mui/material";
import styled from "styled-components";
import { maxHeight } from "@mui/system";

export default function VerticalLinearStepper(props) {
  const { responses, changeActiveQuestion, orientation } = props;

  const leng = responses?.length;
  const [activeStep, setActiveStep] = useState(leng - 1);
  const containerRef = useRef(null);

  const [CustomScrollableContainer] = useState(
    styled.div({
      maxHeight: "60vh",
      maxWidth: "100%",
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
    if (containerRef.current && orientation === "vertical") {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
    if (containerRef.current && orientation === "horizontal") {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth;
    }
  }, [handleStep]);

  return (
    <Box
      sx={{
        padding: orientation === "vertical" ? "2em 1em" : ".5em 1em",
        boxShadow: "0 0 5px 0 rgba(163,163,163,0.75)",
        borderRadius: "5px",
        // minWidth: orientation === "vertical" ? "212px" : 0,
      }}
    >
      <Typography sx={{ textAlign: "center" }}>Summary</Typography>
      <Box
        sx={{
          maxHeight: orientation === "horizontal" ? "60vh" : "max-content",
          height: orientation === "vertical" ? "60vh" : "max-content",
          maxWidth: "100%",
        }}
      >
        <CustomScrollableContainer ref={containerRef}>
          <Stepper sx={{
            "& .MuiStepConnector-line": {
              minHeight: ".5em"
            }
          }} activeStep={activeStep} orientation={orientation}>
            {responses?.map((step, index) => (
              <Step key={index}>
                {step.resources && index === 0 ? (
                  <>
                    {step.resources.map((resource, resourceIndex) => (
                      <div key={resourceIndex}>
                        <StepLabel
                          sx={{
                            "& .MuiStepIcon-root": {
                              width: "1.2rem",
                              height: "1.2rem",
                            },
                            "& .MuiStepLabel-label": {
                              fontSize: "0.7rem",
                            },
                            minWidth: "170px",
                          }}
                          key={index}
                          cursor="pointer"
                          onClick={() => handleStep(step, index + 1)}
                        >
                          {/* {resource.resource.toUpperCase()} */}

                          <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                            <Box sx={{ width: "50%" }}>
                              <Typography fontSize={"12px"} fontWeight={400}>  {resource.resource.toUpperCase()}</Typography>
                            </Box>
                            <Box sx={{ width: "50%",padding:"3px" }}>
                              <Typography textAlign={"left"} fontSize={"13px"} fontWeight={400} color={"grey"}>
                              {resource.resourceOption.opt} ($
                                {resource.resourceOption.price})
                              </Typography>
                            </Box>
                          </Box>
                       
                        </StepLabel>
                      </div>
                    ))}
                  </>
                ) : (
                  (step.selectedOption || step.selectedData) &&
                  (step.selectedOption || step.selectedData).map(
                    (selected, key) => (
                      <StepLabel
                        sx={{
                          "& .MuiStepIcon-root": {
                            width: "1.2rem",
                            height: "1.2rem",
                          },
                          "& .MuiStepLabel-label": {
                            fontSize: "0.7rem",
                          },

                        }}
                        key={key}
                        cursor="pointer"
                        onClick={() => handleStep(step, index + 1)}
                      >
                        <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                          <Box sx={{ width: "50%" }}>
                            <Typography fontSize={"12px"} fontWeight={400}>  {step.question.label
                              ? step.question.label.toUpperCase()
                              : step.label.toUpperCase()}</Typography>
                          </Box>
                          <Box sx={{ width: "50%",padding:"3px" }}>
                            <Typography textAlign={"left"} fontSize={"13px"} fontWeight={400} color={"grey"}>
                              {selected.opt} (${selected.price})
                            </Typography>
                          </Box>
                        </Box>
                      </StepLabel>
                    )
                  )
                )}
              </Step>
            ))}
          </Stepper>
        </CustomScrollableContainer>
      </Box>
    </Box>
  );
}
