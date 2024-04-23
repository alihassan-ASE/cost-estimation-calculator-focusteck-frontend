"use client";
import React, { useEffect, useState } from "react";
import ShowOptions from "../ShowOption";
import { Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomTypography = styled(Typography)(({ theme }) => ({
  fontSize: "24px",
  fontWeight: 700,
  [theme.breakpoints.down("md")]: {
    fontSize: "1.5em",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.3em",
  },
}));

const page = (props) => {
  let {
    currentQuestion,
    getResponsesData,
    selectedOption,
    typeofUI,
    typeOfSelection,
    questionNumber
  } = props;

  const [selectedData, setSelectedData] = useState([]);
  const selectedOptionPassToParent = (data) => {
    if (Array.isArray(data)) {
      setSelectedData([...data]);
    } else {
      setSelectedData([data]);
    }
  };

  useEffect(() => {
    if (selectedData || Array.isArray(selectedData)) {
      selectedData?.forEach((data) => {
        const { nextQuestion } = data;

        if (nextQuestion == undefined) {
          getResponsesData({
            selectedData,
            nextQuestion: currentQuestion.nextQuestion,
          });
        } else if (nextQuestion !== "") {
          getResponsesData({ selectedData, nextQuestion });
        } else if (currentQuestion.nextQuestion) {
          getResponsesData({
            selectedData,
            nextQuestion: currentQuestion.nextQuestion,
          });
        } else {
          getResponsesData({
            selectedData,
            nextQuestion: currentQuestion.nextQuestion,
          });
        }
      });
    }
  }, [selectedData]);

  useEffect(() => {
    setSelectedData([]);
  }, [currentQuestion]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: 'flex', gap: '20px' }}>
        <Box sx={{
          width: '48px',
          height: '48px',
          minWidth: '48px',
          minHeight: '48px',
          backgroundColor: "#005DBD",
          fontSize: '20px',
          borderRadius: '50%',
          color: "#fff",
          display: 'flex',
          alignItems: 'center',
          justifyContent: "center"
        }}>
          <span style={{ fontSize: '28px', }}>
            {questionNumber + 1}
          </span>
        </Box>
        <Box>
          <CustomTypography variant="h4">
            {currentQuestion?.question}
          </CustomTypography>
          <Typography variant="body1" sx={{ paddingTop: "10px", paddingBottom: "1.5em", color: "#212B36", fontSize: '12px', fontWeight: 400 }}>Please choose from the options below.</Typography>
        </Box>
      </Box>
      <Box sx={{ marginLeft: '70px' }}>
        <ShowOptions
          typeofUI={typeofUI || currentQuestion?.typeOfUI}
          typeOfSelection={typeOfSelection || currentQuestion?.typeofselection}
          options={currentQuestion?.options}
          selectedOptionPassToParent={selectedOptionPassToParent}
          selectedOption={selectedOption}
        />
      </Box>
    </Box>
  );
};

export default page;
