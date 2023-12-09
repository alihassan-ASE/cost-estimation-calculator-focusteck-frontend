import React, { useEffect } from "react";
import {
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";

const DropDownComponent = ({ responseData, selectedOptionFromChild }) => {
  useEffect(() => {
    selectedOptionFromChild(responseData.responses[0].selectedOption[0]);
  }, [selectedOptionFromChild, responseData.responses]);

  const selectedValue = responseData.responses[0].selectedOption[0];

  const checkSelectedOption = (data) => {
    return (
      selectedValue &&
      data.opt === selectedValue.opt &&
      data.price === selectedValue.price
    );
  };

  return (
    <Box style={{ marginBottom: "3em" }}>
      {/* <Typography variant="h4">DropDown Single Select</Typography> */}
      <FormControl sx={{ width: 400 }}>
        <InputLabel id="demo-simple-select-label">Drop Down Options</InputLabel>
        <Select
          onChange={(e) => {
            const selectedValue = e.target.value;
            selectedOptionFromChild(selectedValue);
            responseData.responses[0].selectedOption[0] = selectedValue;
          }}
        >
          {responseData.responses[0].options.map((data, index) => (
            <MenuItem
              key={index}
              value={data}
              sx={
                checkSelectedOption(data)
                  ? {
                      backgroundColor: "#0062cc",
                    }
                  : {}
              }
            >
              {data.opt} ({data.price} $)
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DropDownComponent;
