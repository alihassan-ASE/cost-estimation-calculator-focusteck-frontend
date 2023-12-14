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
    changeActiveQuestion({step , index});
    setActiveStep(index - 1);
  };

  useEffect(() => { setActiveStep(responses.length + 1); }, [responses.length]);
  return (
    <Box sx={{ maxWidth: 800 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {responses.map((step, index) => (
          <Step key={step.question._id}>
           {
            step.selectedOption.map((selected , key)=>(
              <StepLabel key={key} cursor="pointer" onClick={() => handleStep(step, index + 1)}>{step.question.label.toUpperCase()} <Typography fontSize={"12px"} color={"gray"}> {selected.opt}  (${selected.price})</Typography></StepLabel>
            ))
           }
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
