import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";

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
  typeOfUI,
  selectedOptionPassToParent,
  otherInput,
}) => {
  return (
    <Box>
      {
        // typeOfSelection === "single" ? (
        //   typeOfUI === "Radio" ? (
        //     <RadioButtonComponent
        //       options={options}
        //       selectedOption={selectedOption}
        //       selectedOptionPassToParent={selectedOptionPassToParent}
        //     />
        //   ) : typeOfUI === "Tiles" ? (
        //     <TilesComponent
        //       options={options}
        //       selectedOption={selectedOption}
        //       selectedOptionPassToParent={selectedOptionPassToParent}
        //       otherInput
        //     />
        //   ) : typeOfUI === "DropDown" ? (
        //     <DropDownComponent
        //       options={options}
        //       label={label}
        //       disable={disable}
        //       selectedOption={selectedOption}
        //       selectedOptionPassToParent={selectedOptionPassToParent}
        //     />
        //   ) : null
        // ) : typeOfSelection === "multiple" && typeOfUI === "CheckBox" ? (
        //   <CheckBoxComponent
        //     options={options}
        //     selectedOptionPassToParent={selectedOptionPassToParent}
        //     selectedOption={selectedOption}
        //   />
        // ) : (
        //   <MultipleComponent
        //     options={options}
        //     selectedOptionPassToParent={selectedOptionPassToParent}
        //     selectedOption={selectedOption}
        //   />
        // )

        // typeOfSelection === "single" ? (
        //   <TilesComponent
        //     options={options}
        //     selectedOption={selectedOption}
        //     selectedOptionPassToParent={selectedOptionPassToParent}
        //     otherInput
        //   />
        // ) : (
        //   <DropDownComponent
        //     options={options}
        //     label={label}
        //     disable={disable}
        //     selectedOption={selectedOption}
        //     selectedOptionPassToParent={selectedOptionPassToParent}
        //   />
        // )

        typeOfSelection === "multiple" ? (
          <MultipleComponent
            options={options}
            selectedOptionPassToParent={selectedOptionPassToParent}
            selectedOption={selectedOption}
          />
        ) : (
          <TilesComponent
            options={options}
            selectedOption={selectedOption}
            selectedOptionPassToParent={selectedOptionPassToParent}
            otherInput={otherInput}
          />
        )
      }
    </Box>
  );
};

export default ShowOption;
