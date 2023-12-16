"use client";
import React, { useEffect, useState } from "react";
import { Box, Grid, Stepper, Step, StepLabel, Typography } from "@mui/material";
export default function VerticalLinearStepper(props) {
  const { responses, changeActiveQuestion, orientation } = props;

  const leng = responses?.length;
  const [activeStep, setActiveStep] = useState(leng - 1);

  const handleStep = (step, index) => {
    changeActiveQuestion({ step, index });
    setActiveStep(index - 1);
  };

  useEffect(() => {
    setActiveStep(responses?.length + 1);
  }, [responses?.length]);

  return (
    <Box sx={{ maxHeight: "60vh", overflowY: "auto" }}>
      <Stepper activeStep={activeStep} orientation={orientation}>
        {responses?.map((step, index) => (
          <Step key={index}>
            {(step.selectedOption || step.selectedData) &&
              (step.selectedOption || step.selectedData).map(
                (selected, key) => (
                  <StepLabel
                    key={key}
                    cursor="pointer"
                    onClick={() => handleStep(step, index + 1)}
                    sx={{
                      "& .MuiStepIcon-root": {
                        width: "1rem",
                        height: "1rem",
                      },
                      "& .MuiStepLabel-label": {
                        fontSize: "0.7rem",
                      },
                      minWidth: "150px",
                    }}
                  >
                    {step.question.label
                      ? step.question.label.toUpperCase()
                      : step.label.toUpperCase()}{" "}
                    <Typography fontSize={"10px"} color={"gray"}>
                      {" "}
                      {selected.opt} (${selected.price})
                    </Typography>
                  </StepLabel>
                )
              )}
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
