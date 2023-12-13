"use client";
import React from "react";
import { Button, Box, Typography } from "@mui/material";

import TilesComponent from "./TilesOptions";
import CheckBoxComponent from "./CheckBoxOptions";
import MultipleComponent from "./MultipleSelectOptions";
import DropDownComponent from "./DropDownOptions";
import RadioButtonComponent from "./RadioButtonOptions";

// Show Options will get options Array, selected option Array, and the Style of the Component
const ShowOption = ({ options,label, selectedOption, getData }) => {
  let style = "DropDown";
  return (
    <Box>
      {/* <Typography variant="body1" style={{ fontSize: 15, margin: "2em 0" }}>
        Please choose one from the options below
      </Typography> */}

      {style === "Tiles" ? (
        <>
          <TilesComponent
            options={options}
            selectedOption={selectedOption}
            selectedOptionPassToParent={selectedOptionPassToParent}
          />
          <MultipleComponent
            options={options}
            selectedOption={selectedOption}
            selectedOptionPassToParent={selectedOptionPassToParent}
          />
          <DropDownComponent
            options={options}
            selectedOption={selectedOption}
            selectedOptionPassToParent={selectedOptionPassToParent}
          />
          <CheckBoxComponent
            options={options}
            selectedOption={selectedOption}
            selectedOptionPassToParent={selectedOptionPassToParent}
          />
          <RadioButtonComponent
            options={options}
            selectedOption={selectedOption}
            selectedOptionPassToParent={selectedOptionPassToParent}
          />
        </>
      ) : style === "MultipleSelectTiles" ? (
        <MultipleComponent
          options={options}
          selectedOption={selectedOption}
          selectedOptionPassToParent={selectedOptionPassToParent}
        />
      ) : style === "DropDown" ? (
        <DropDownComponent
          options={options}
          label={label}
          selectedOption={selectedOption}
          getData={getData}
        />
      ) : style === "CheckBox" ? (
        <CheckBoxComponent
          options={options}
          selectedOption={selectedOption}
          selectedOptionPassToParent={selectedOptionPassToParent}
        />
      ) : style === "Radio" ? (
        <RadioButtonComponent
          options={options}
          selectedOption={selectedOption}
          selectedOptionPassToParent={selectedOptionPassToParent}
        />
      ) : null}
    </Box>
  );
};

export default ShowOption;
