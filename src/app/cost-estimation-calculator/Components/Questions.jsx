import React from "react";
import { Box } from "@mui/material";

import ShowOption from "@/app/cost-estimation-calculator/Components/ShowOption";

const QuestionsComponent = ({
  question,
  options,
  label,
  disable,
  selectedOption,
  selectedOptionPassToParent,
  otherInput,
}) => {
  return (
    <Box>
      <ShowOption
        options={options}
        selectedOption={selectedOption}
        selectedOptionPassToParent={selectedOptionPassToParent}
        label={label}
        disable={disable}
        otherInput={otherInput}
      />
    </Box>
  );
};

export default QuestionsComponent;
