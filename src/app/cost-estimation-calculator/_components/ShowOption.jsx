"use client";
import React from "react";
import { Button, Box, Typography } from "@mui/material";

import TilesComponent from "./TilesOptions";
import CheckBoxComponent from "./CheckBoxOptions";
import MultipleComponent from "./MultipleSelectOptions";
import DropDownComponent from "./DropDownOptions";
import RadioButtonComponent from "./RadioButtonOptions";

// Show Options will get options Array, selected option Array, and the Style of the Component
const ShowOption = ({
  options,
  selectedOption,
  selectedOptionPassToParent,
}) => {
  let style = "DropDown";
  return (
    <Box>
      <Typography variant="body1" style={{ fontSize: 15, margin: "2em 0" }}>
        Please choose one from the options below
      </Typography>

      {style === "Tiles" ? (
        <>
          <TilesComponent
            options={options}
            selectedOption={selectedOption}
            selectedOptionPassToParent={selectedOptionPassToParent}
          />
          {/* <MultipleComponent
            responseData={responsesData}
            selectedOptionPassToParent={selectedOptionPassToParent}
          />
          <DropDownComponent
            responseData={responsesData}
            selectedOptionPassToParent={selectedOptionPassToParent}
          />
          <CheckBoxComponent
            responseData={responsesData}
            selectedOptionPassToParent={selectedOptionPassToParent}
          />
          <RadioButtonComponent
            responseData={responsesData}
            selectedOptionPassToParent={selectedOptionPassToParent}
          /> */}
        </>
      ) : style === "MultipleSelectTiles" ? (
        <MultipleComponent
          responseData={responsesData}
          selectedOptionPassToParent={selectedOptionPassToParent}
        />
      ) : style === "DropDown" ? (
        <DropDownComponent
          responseData={responsesData}
          selectedOptionPassToParent={selectedOptionPassToParent}
        />
      ) : style === "CheckBox" ? (
        <CheckBoxComponent
          responseData={responsesData}
          selectedOptionPassToParent={selectedOptionPassToParent}
        />
      ) : style === "Radio" ? (
        <RadioButtonComponent
          responseData={responsesData}
          selectedOptionPassToParent={selectedOptionPassToParent}
        />
      ) : null}
    </Box>
  );
};

export default ShowOption;
