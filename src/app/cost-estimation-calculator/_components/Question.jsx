"use client";
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

import ShowOption from "@/app/cost-estimation-calculator/_components/ShowOption";

const QuestionsComponent = ({
  question,
  options,
  label,
  disable,
  selectedOption,
  getData,
}) => {
  return (
    <Box>
      {/* <Typography variant="h4" mb={2}>
        {question}
      </Typography> */}
      <ShowOption
        options={options}
        selectedOption={selectedOption}
        getData={getData}
        label={label}
        disable={disable}
      />
    </Box>
  );
};

export default QuestionsComponent;
