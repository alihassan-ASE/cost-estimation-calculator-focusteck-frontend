import React from "react";
import { Box, Typography } from "@mui/material";

const QuestionsComponent = ({ question }) => {
  return (
    <Box>
      <Typography variant="h4" mb={2}>
        {question}
      </Typography>
      <Typography variant="h4" mb={2}>
        What is the Type Of Project
      </Typography>
    </Box>
  );
};

export default QuestionsComponent;
