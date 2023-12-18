import React from "react";
import { Box } from "@mui/material";

import ShowOption from "@/app/cost-estimation-calculator/Components/ShowOption";

const QuestionsComponent = ({
  question,
  options,
  label,
  disable,
  selectedOption,
  styleVal,
  selectedOptionPassToParent,
}) => {
  return (
    <Box>
      <ShowOption
        options={options}
        selectedOption={selectedOption}
        selectedOptionPassToParent={selectedOptionPassToParent}
        styleVal={styleVal}
        label={label}
        disable={disable}
      />
    </Box>
  );
};

export default QuestionsComponent;
