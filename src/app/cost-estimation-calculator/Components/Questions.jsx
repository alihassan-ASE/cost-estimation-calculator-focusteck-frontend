"use client";
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

import ShowOption from "@/app/cost-estimation-calculator/Components/ShowOption";

const QuestionsComponent = ({
  question,
  options,
  label,
  disable,
  selectedOption,
  selectedResource,
  styleVal,
  selectedOptionPassToParent,
}) => {
  return (
    <Box>
      <ShowOption
        options={options}
        selectedOption={selectedOption ? selectedOption : selectedResource}
        selectedOptionPassToParent={selectedOptionPassToParent}
        styleVal={styleVal}
        label={label}
        disable={disable}
      />
    </Box>
  );
};

export default QuestionsComponent;
