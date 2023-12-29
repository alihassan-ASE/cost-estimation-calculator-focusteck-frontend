"use client";
import React, { useEffect, useRef, useState } from "react";
import { Box, Grid, Stepper, Step, StepLabel, Typography } from "@mui/material";
import styled from "styled-components";
import { maxHeight } from "@mui/system";
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

export default function VerticalLinearStepper(props) {
  const { responses, changeActiveQuestion } = props;

  const leng = responses?.length;
  const [activeStep, setActiveStep] = useState(leng - 1);
  const containerRef = useRef(null);

  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 0,
      bottom: 0,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#784af4',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#784af4',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#eaeaf0',
      borderTopWidth: 3,
      borderRadius: 1,
    },
  }));

  const [CustomScrollableContainer] = useState(
    styled.div({
      maxHeight: "60vh",
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

  // useEffect(() => {
  //   if (containerRef.current && orientation === "vertical") {
  //     containerRef.current.scrollTop = containerRef.current.scrollHeight;
  //   }
  //   if (containerRef.current && orientation === "horizontal") {
  //     containerRef.current.scrollLeft = containerRef.current.scrollWidth;
  //   }
  // }, [handleStep]);

  return (
    <Box
      sx={{
        padding: "2em 0em" 
        // minWidth: orientation === "vertical" ? "212px" : 0,
      }}
    >
      <Typography sx={{ textAlign: "left",fontSize:"1.7rem" }} fontWeight={500}>Summary</Typography>
      <Box
        sx={{
          maxHeight: "max-content",
          height:"60vh" ,
          paddingLeft: "0em",

          maxWidth: "100%",
        }}
      >
        <CustomScrollableContainer ref={containerRef}>
          <Stepper sx={{
            "& .MuiStepConnector-line": {
              minHeight: ".5em"
            }
          }}
          connector={<QontoConnector />}
          nonLinear activeStep={responses.length + 1} orientation={"vertical"}>
            {responses?.map((step, index) => (
              <Step key={index}>
                {step.resources && index === 0 ? (
                  <>
                    {step.resources.map((resource, resourceIndex) => (
                      <div key={resourceIndex}>
                        <StepLabel
                          sx={{
                            "& .MuiStepLabel-root":{
                              padding: 0
                            },
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
                              <Typography fontSize={"14px"} textTransform={"capitalize"} fontWeight={500}>  {resource.resource}</Typography>
                            </Box>
                            <Box sx={{ width: "50%",padding:"3px" }}>
                              <Typography textAlign={"left"} fontSize={"13px"} fontWeight={600} color={"black"} sx={{fontFamily: ["Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
        ","
      ),}}>
                              {resource.resourceOption.opt}
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
                            color: index < activeStep ? "#0045e6" : "0045e6", // Change color based on completion status


                          },
                          "& .MuiStepLabel-label": {
                            fontSize: "0.7rem",
                          },
                          "& .MuiSvgIcon-root-MuiStepIcon-root .Mui-completed":{
                            backgroundColor:"#0045e6"
                          }

                        }}
                        key={key}
                        cursor="pointer"
                        onClick={() => handleStep(step, index + 1)}
                      >
                        <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                          <Box sx={{ width: "50%" }}>
                            <Typography fontSize={"14px"} textTransform={"capitalize"} fontWeight={500}>  {step.question.label
                              ? step.question.label
                              : step.label}</Typography>
                          </Box>
                          <Box sx={{ width: "50%",padding:"3px" }}>
                            <Typography textAlign={"left"} fontSize={"13px"} fontWeight={600} color={"black"} sx={{fontFamily: ["Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
        ","
      ),}}>
                              {selected.opt}
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
