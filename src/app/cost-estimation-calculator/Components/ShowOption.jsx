"use client";
import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";

// import TilesComponent from "./TilesOptions";

import TilesComponent from "./TilesOptions";
import CheckBoxComponent from "./CheckBoxOptions";
import MultipleComponent from "./MultipleSelectOptions";
import DropDownComponent from "./DropDownOptions";
import RadioButtonComponent from "./RadioButtonOptions";

// Show Options will get options Array, selected option Array, and the Style of the Component
// const [style, SetStyle] = useState("DropDown");
const ShowOption = ({ options, label, disable, selectedResource, styleVal, selectedOption, getData, selectedOptionPassToParent }) =>  {
  // let style = "Tile";
  return (
    <Box>
      { styleVal === "DropDown"
          ? <DropDownComponent
            options={options}
            label={label}
            disable={disable}
            selectedOption={selectedOption}
            getData={getData}
          /> : <TilesComponent
            options={options}
            selectedResource={selectedResource}
            selectedOptionPassToParent={selectedOptionPassToParent}
          />

      }
    </Box>
  );
};

export default ShowOption;
