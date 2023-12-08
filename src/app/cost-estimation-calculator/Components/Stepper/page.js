'use client'
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';


export default function VerticalLinearStepper(props) {

  const { responses, changeActiveQuestion } = props;
  const leng = responses.length;
  const [activeStep, setActiveStep] = useState(leng - 1);
  const handleStep = (step, index) => {
    changeActiveQuestion(index)
    setActiveStep(index - 1);
    console.log({ step, index })
  };

  useEffect(() => { setActiveStep(responses.length - 1); }, [responses.length]);

  return (
    <Box sx={{ maxWidth: 800 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {responses.map((step, index) => (
          <Step key={step._id}>
            <StepLabel cursor="pointer" onClick={() => handleStep(step, index + 1)}>{step.label.toUpperCase()} <Typography fontSize={"12px"} color={"gray"}> {step.selectedOption.opt}  (${step.selectedOption.price})</Typography></StepLabel>
            <StepContent>
              <Typography></Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
