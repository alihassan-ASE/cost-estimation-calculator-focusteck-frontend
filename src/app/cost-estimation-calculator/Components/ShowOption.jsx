import React from "react";
import { Button, Box, Typography } from "@mui/material";

// import TilesComponent from "./TilesOptions";

import TilesComponent from "./TilesOptions";
import CheckBoxComponent from "./CheckBoxOptions";
import MultipleComponent from "./MultipleSelectOptions";
import DropDownComponent from "./DropDownOptions";
import RadioButtonComponent from "./RadioButtonOptions";

// Show Options will get options Array, selected option Array, and the Style of the Component
// const [style, SetStyle] = useState("DropDown");
const ShowOption = ({
  typeOfSelection,
  options,
  label,
  disable,
  styleVal,
  selectedOption,
  selectedOptionPassToParent,
}) => {
  return (
    <Box>
      {
        styleVal === "DropDown" ? (
          <DropDownComponent
            options={options}
            label={label}
            disable={disable}
            selectedOption={selectedOption}
            selectedOptionPassToParent={selectedOptionPassToParent}
          />
        ) : typeOfSelection === "single" ? (
          <TilesComponent
            options={options}
            selectedOption={selectedOption}
            selectedOptionPassToParent={selectedOptionPassToParent}
          />
        ) : (
          <MultipleComponent
            options={options}
            selectedOptionPassToParent={selectedOptionPassToParent}
            selectedOption={selectedOption}
          />
        )

        // <RadioButtonComponent
        //   options={options}
        //   selectedOption={selectedOption}
        //   selectedOptionPassToParent={selectedOptionPassToParent}
        // />
        // <MultipleComponent
        //   options={options}
        //   selectedOptionPassToParent={selectedOptionPassToParent}
        //   selectedOption={selectedOption}
        // />
        // <CheckBoxComponent
        //   options={options}
        //   selectedOptionPassToParent={selectedOptionPassToParent}
        //   selectedOption={selectedOption}
        // />
        // <DropDownComponent
        //   options={options}
        //   label={label}
        //   disable={disable}
        //   selectedOption={selectedOption}
        //   selectedOptionPassToParent={selectedOptionPassToParent}
        // />
      }
    </Box>
  );
};

export default ShowOption;
