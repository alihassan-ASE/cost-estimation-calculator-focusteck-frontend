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
          <Stepper activeStep={activeStep} orientation={orientation}>
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
                          {resource.resource.toUpperCase()}

                          <Typography fontSize={"10px"} color={"gray"}>
                            {resource.resourceOption.opt} ($
                            {resource.resourceOption.price})
                          </Typography>
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
                          width: "170px",
                        }}
                        key={key}
                        cursor="pointer"
                        onClick={() => handleStep(step, index + 1)}
                      >
                        {step.question.label
                          ? step.question.label.toUpperCase()
                          : step.label.toUpperCase()}{" "}
                        <Typography fontSize={"10px"} color={"gray"}>
                          {selected.opt} (${selected.price})
                        </Typography>
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

// <Box
//   sx={{
//     maxHeight: orientation === "horizontal" ? "60vh" : "max-content",
//     height: orientation === "vertical" ? "60vh" : "max-content",
//     boxShadow:
//       responses.length <= 0 ? "none" : "0 0 5px 0 rgba(163,163,163,0.75)",
//     // maxWidth: "100%",
//     // margin: "1em 0",
//     // overflow: "auto",
//     // padding: ".5em 1em",
//   }}
// >
// </Box>
