import React from "react";
import { Box } from "@mui/material";

import TilesComponent from "./TilesOptions";
import CheckBoxComponent from "./CheckBoxOptions";
import MultipleComponent from "./MultipleSelectOptions";
import DropDownComponent from "./DropDownOptions";
import RadioButtonComponent from "./RadioButtonOptions";
import LargeTiles from "./LargeTiles";

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
      {typeOfSelection === "single" ? (
        typeofUI === "Radio" ? (
          options?.length > 10
            ? <RadioButtonComponent
              options={options}
              selectedOption={selectedOption}
              selectedOptionPassToParent={selectedOptionPassToParent}
            />
            : <LargeTiles
              options={options}
              selectedOption={selectedOption}
              selectedOptionPassToParent={selectedOptionPassToParent}
            />
        ) : typeofUI === "Tiles" ? (
          options.length > 4 ? (
            <TilesComponent
              options={options}
              selectedOption={selectedOption}
              selectedOptionPassToParent={selectedOptionPassToParent}
            />
          ) : (
            <LargeTiles
              options={options}
              selectedOption={selectedOption}
              selectedOptionPassToParent={selectedOptionPassToParent}
            />
          )
        ) : typeofUI === "DropDown" ? (
          <DropDownComponent
            options={options}
            label={label}
            disable={disable}
            selectedOption={selectedOption}
            selectedOptionPassToParent={selectedOptionPassToParent}
          />
        ) : options.length > 4 ? (
          <TilesComponent
            options={options}
            selectedOption={selectedOption}
            selectedOptionPassToParent={selectedOptionPassToParent}
          />
        ) : (
          <LargeTiles
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
      )}
    </Box>
  );
};

export default ShowOption;
