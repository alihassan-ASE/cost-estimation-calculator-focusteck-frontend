"use client";
import React, { useEffect, useState } from "react";
import ShowOptions from "../ShowOption";
import { Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomTypography = styled(Typography)(({ theme }) => ({
  fontSize: "2em",
  display: "flex",
  flexWrap: "wrap",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.5em",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1em",
  },
}));

const page = (props) => {
  // const [selectedOption, setSelectedOption] = useState([]);
  let { currentQuestion, getResponsesData, selectedOption } = props;

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
          getResponsesData({ selectedData , nextQuestion: currentQuestion.nextQuestion });
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
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
      <CustomTypography variant="h4">
        {currentQuestion?.question}
      </CustomTypography>
      <ShowOptions
        typofUI={currentQuestion?.typeOfUI}
        typeOfSelection={currentQuestion?.typeofselection}
        options={currentQuestion?.options}
        selectedOptionPassToParent={selectedOptionPassToParent}
        selectedOption={selectedOption}
      />
    </Box>
  );
};

export default page;
