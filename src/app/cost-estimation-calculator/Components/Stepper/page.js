'use client'
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';


export default function VerticalLinearStepper(props) {

  const { responses , changeActiveQuestion} = props;
    
  const leng = responses?.length;
  const [activeStep, setActiveStep] = useState(leng - 1);

  const handleStep = (step, index) => {
    changeActiveQuestion({step , index});
    setActiveStep(index - 1);
  };

  useEffect(() => { setActiveStep(responses?.length + 1); }, [responses?.length]);
  return (
    <Box sx={{ maxWidth: 800 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
  {responses?.map((step, index) => (
    <Step key={index}>
      {step.resources && index === 0 ? (
        <>
          
          {/* Show a message or handle the resources array */}
          {step.resources.map((resource, resourceIndex) => (
            // Modify this part to display or handle the resources as needed
            <div key={resourceIndex}>
              {/* Example: Display each resource */}
              <StepLabel key={index} cursor="pointer" onClick={() => handleStep(step, index + 1)}>
            <Typography >{resource.resource.toUpperCase()}</Typography>
            <Typography fontSize={"12px"} color={"gray"}>
              {resource.resourceOption.opt} (${resource.resourceOption.price})
            </Typography>
          </StepLabel>
            </div>
          ))}
        </>
      ) : (
        // Handle other steps similar to the existing code
        (step.selectedOption || step.selectedData) &&
        (step.selectedOption || step.selectedData).map((selected, key) => (
          <StepLabel key={key} cursor="pointer" onClick={() => handleStep(step, index + 1)}>
            {step.question.label ? step.question.label.toUpperCase() : step.label.toUpperCase()}{" "}
            <Typography fontSize={"12px"} color={"gray"}>
              {selected.opt} (${selected.price})
            </Typography>
          </StepLabel>
        ))
      )}
    </Step>
  ))}
</Stepper>

      {/* <Stepper activeStep={activeStep} orientation="vertical">
        {responses?.map((step, index) => (
          <Step key={index}>
          {
            step.resourses && index == 0 ? <StepLabel key={key} cursor="pointer" onClick={() => handleStep(step, index + 1)}>  <Typography fontSize={"12px"} color={"gray"}>Hello World</Typography></StepLabel>:
             ((step.selectedOption || step.selectedData) && (step.selectedOption||step.selectedData).map((selected , key)=>(
              <StepLabel key={key} cursor="pointer" onClick={() => handleStep(step, index + 1)}>{step.question.label?step.question.label.toUpperCase(): step.label.toUpperCase()} <Typography fontSize={"12px"} color={"gray"}> {selected.opt}  (${selected.price})</Typography></StepLabel>
            )))
           }
       </Step>
        ))}
      </Stepper> */}
    </Box>
  );
}
