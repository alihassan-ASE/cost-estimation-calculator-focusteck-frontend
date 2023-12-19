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
  typeofUI,
  selectedOptionPassToParent,
}) => {
  return (
    <Box>
      {
        typeOfSelection === "single" ? (
          typeofUI === "Radio" ? (
            <RadioButtonComponent
              options={options}
              selectedOption={selectedOption}
              selectedOptionPassToParent={selectedOptionPassToParent}
            />
          ) : typeofUI === "Tiles" ? (
            <TilesComponent
              options={options}
              selectedOption={selectedOption}
              selectedOptionPassToParent={selectedOptionPassToParent}
            />
          ) : typeofUI === "DropDown" ? (
            <DropDownComponent
              options={options}
              label={label}
              disable={disable}
              selectedOption={selectedOption}
              selectedOptionPassToParent={selectedOptionPassToParent}
            />
          ) : (
            <TilesComponent
              options={options}
              selectedOption={selectedOption}
              selectedOptionPassToParent={selectedOptionPassToParent}
            />
          )
        ) : typeOfSelection === "multiple" && typeofUI === "CheckBox" ? (
          <CheckBoxComponent
            options={options}
            selectedOptionPassToParent={selectedOptionPassToParent}
            selectedOption={selectedOption}
          />
        ) : (
          <MultipleComponent
            options={options}
            selectedOptionPassToParent={selectedOptionPassToParent}
            selectedOption={selectedOption}
          />
        )

        // typeOfSelection === "single" ? (
        //   <TilesComponent
        //     options={options}
        //     selectedOption={selectedOption}
        //     selectedOptionPassToParent={selectedOptionPassToParent}

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

        // typeOfSelection === "multiple" ? (
        //   <MultipleComponent
        //     options={options}
        //     selectedOptionPassToParent={selectedOptionPassToParent}
        //     selectedOption={selectedOption}
        //   />
        // ) : (
        //   <TilesComponent
        //     options={options}
        //     selectedOption={selectedOption}
        //     selectedOptionPassToParent={selectedOptionPassToParent}
        //
        //   />
        // )
      }
    </Box>
  );
};

export default ShowOption;
