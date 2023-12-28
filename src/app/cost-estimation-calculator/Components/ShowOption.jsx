import React from "react";
import { Box } from "@mui/material";

import TilesComponent from "./TilesOptions";
import CheckBoxComponent from "./CheckBoxOptions";
import MultipleComponent from "./MultipleSelectOptions";
import DropDownComponent from "./DropDownOptions";
import RadioButtonComponent from "./RadioButtonOptions";

// Show Options will get options Array, selected option Array, and the Style of the Component

const ShowOption = ({
  typeOfSelection,
  options,
  label,
  disable,
  selectedOption,
  typeofUI,
  selectedOptionPassToParent,
}) => {
  return (
    <Box>
      {
        typeOfSelection === "single" && options?.length > 10 ?

          <DropDownComponent
            options={options}
            label={label}
            disable={disable}
            selectedOption={selectedOption}
            selectedOptionPassToParent={selectedOptionPassToParent}
          /> : typeOfSelection === "single" && typeofUI == "DropDown" ?
            <DropDownComponent
              options={options}
              label={label}
              disable={disable}
              selectedOption={selectedOption}
              selectedOptionPassToParent={selectedOptionPassToParent}
            />
            : typeOfSelection === "multiple" ?

              <MultipleComponent
                options={options}
                selectedOptionPassToParent={selectedOptionPassToParent}
                selectedOption={selectedOption}
              /> :
              <TilesComponent
                options={options}
                selectedOption={selectedOption}
                selectedOptionPassToParent={selectedOptionPassToParent}
              />
      }
    </Box>
  );
};

export default ShowOption;
