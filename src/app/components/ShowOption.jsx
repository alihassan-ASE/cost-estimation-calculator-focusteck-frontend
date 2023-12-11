"use client";
import React, { useState } from "react";
import responsesData from "../../../data/responsesData.json";
import { Button, Box, Typography } from "@mui/material";

import TilesComponent from "./TilesOptions";
import CheckBoxComponent from "./CheckBoxOptions";
import MultipleComponent from "./MultipleSelectOptions";
import DropDownComponent from "./DropDownOptions";
import RadioButtonComponent from "./RadioButtonOptions";

// Show Options will get options Array, selected option Array, and the Style of the Component
const ShowOption = () => {
  const [options, setOptions] = useState([]);

  const selectedOptionFromChild = (data) => {
    setOptions([data]);
  };

  console.log("Selected Option State Val: ", options);
  let style = "Tiles";
  return (
    <Box>
      <Typography variant="body1" style={{ fontSize: 15 }}>
        Please choose one from the options below
      </Typography>
      {style === "Tiles" ? (
        <>
          <TilesComponent
            responseData={responsesData}
            selectedOptionFromChild={selectedOptionFromChild}
          />
          <MultipleComponent
            responseData={responsesData}
            selectedOptionFromChild={selectedOptionFromChild}
          />
          <DropDownComponent
            responseData={responsesData}
            selectedOptionFromChild={selectedOptionFromChild}
          />
          <CheckBoxComponent
            responseData={responsesData}
            selectedOptionFromChild={selectedOptionFromChild}
          />
          <RadioButtonComponent
            responseData={responsesData}
            selectedOptionFromChild={selectedOptionFromChild}
          />
        </>
      ) : style === "MultipleSelectTiles" ? (
        <MultipleComponent
          responseData={responsesData}
          selectedOptionFromChild={selectedOptionFromChild}
        />
      ) : style === "DropDown" ? (
        <DropDownComponent
          responseData={responsesData}
          selectedOptionFromChild={selectedOptionFromChild}
        />
      ) : style === "CheckBox" ? (
        <CheckBoxComponent
          responseData={responsesData}
          selectedOptionFromChild={selectedOptionFromChild}
        />
      ) : style === "Radio" ? (
        <RadioButtonComponent
          responseData={responsesData}
          selectedOptionFromChild={selectedOptionFromChild}
        />
      ) : null}
    </Box>
  );
};

export default ShowOption;
