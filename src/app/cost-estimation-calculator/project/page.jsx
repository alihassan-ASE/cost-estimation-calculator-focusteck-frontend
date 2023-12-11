import React from "react";
import { Box } from "@mui/material";

import question from "../../../../data/question.json";
import responsesData from "../../../../data/responsesData.json";

import QuestionsComponent from "@/app/cost-estimation-calculator/_components/Question";

const page = () => {
  return (
    <Box sx={{ margin: "2em" }}>
      <QuestionsComponent
        question={question.question}
        responsesData={responsesData}
      />
    </Box>
  );
};

export default page;
