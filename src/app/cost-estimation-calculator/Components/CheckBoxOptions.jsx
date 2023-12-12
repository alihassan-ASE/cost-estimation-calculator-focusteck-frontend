import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  FormControl,
  FormLabel,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";

const CheckBoxComponent = ({ responseData, selectedOptionPassToParent }) => {
  const [selectedFormats, setSelectedFormats] = useState([]);

  useEffect(() => {
    setSelectedFormats(responseData.responses[2].selectedOption || []);
  }, [responseData]);

  const handleFormat = (event) => {
    // console.log("Event: ", event);
    const selectedFormat = responseData.responses[2].options.find(
      (option) => option.opt === event.target.name
    );

    const isChecked = event.target.checked;

    let updatedFormats = [...selectedFormats];

    if (isChecked) {
      updatedFormats.push(selectedFormat);
    } else {
      updatedFormats = updatedFormats.filter(
        (format) => format.opt !== selectedFormat.opt
      );
    }

    setSelectedFormats(updatedFormats);
    selectedOptionPassToParent(updatedFormats);
  };

  const isChecked = (opt, price) => {
    return selectedFormats.some(
      (format) => format.opt === opt && format.price === price
    );
  };

  return (
    <Box>
      {/* <Typography variant="h4">CheckBox Multi Select</Typography> */}
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">CheckBoxes</FormLabel>
        <FormGroup>
          {responseData.responses[2].options.map((data, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={isChecked(data.opt, data.price)}
                  onChange={handleFormat}
                  name={data.opt}
                />
              }
              label={`${data.opt} (${data.price} $)`}
            />
          ))}
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default CheckBoxComponent;