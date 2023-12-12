"use client";
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

// import StaffComponent from "@/app/components/StaffComponent";

import question from "../../../../data/question.json";
import responsesData from "../../../../data/responsesData.json";

import QuestionsComponent from "@/app/cost-estimation-calculator/Components/Question";

const page = () => {
  const [selectedData, setSelectedData] = useState([]);

  const selectedOptionPassToParent = (data) => {
    setSelectedData([data]);
  };
  console.log("Selected Option: ", selectedData);
  return (
    <Box sx={{ margin: "2em" }}>
      <Typography variant="h5">Staff Questions</Typography>
      <QuestionsComponent
        question={question.question}
        options={options}
        selectedOption={selectedOption}
        selectedOptionPassToParent={selectedOptionPassToParent}
      />
    </Box>
  );
};

export default page;
