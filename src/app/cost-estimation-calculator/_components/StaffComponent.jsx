"use client";
import React, { useState } from "react";
import { Box, Typography, Button, Select } from "@mui/material";

import question from "../../../data/question.json";
import responsesData from "../../../data/responsesData.json";

import QuestionsComponent from "@/app/cost-estimation-calculator/_components/Question";

const StaffComponent = () => {
  const [selectedData, setSelectedData] = useState([]);
  const [getButton, setGetButton] = useState(false);
  //   let getButton = false;

  const selectedOptionPassToParent = (data) => {
    setSelectedData([data]);
  };
  console.log("Selected Option: ", selectedData);

  return (
    <Box sx={{ margin: "2em" }}>
      <Typography variant="h5">Staff Questions</Typography>
      <QuestionsComponent
        question={question.question}
        responsesData={responsesData}
        selectedOptionPassToParent={selectedOptionPassToParent}
      />
      {/* {selectedData ? (
        <Box>
          <Button variant="outlined" onClick={() => setGetButton(true)}>
            Save
          </Button>
          {getButton ? (
            <Button variant="outlined">Selected Resource </Button>
          ) : null}
        </Box>
      ) : null} */}
    </Box>
  );
};

export default StaffComponent;
