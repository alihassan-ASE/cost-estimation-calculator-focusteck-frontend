"use client";
import React from "react";
import { Button, Box, Typography } from "@mui/material";

import TilesComponent from "./TilesOptions";


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

        <>
          <TilesComponent
            options={options}
            selectedOption={selectedOption}
            selectedOptionPassToParent={selectedOptionPassToParent}
          />
        </>
    </Box>
  );
};

export default ShowOption;
