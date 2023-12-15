import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";

const RadioButtonComponent = ({
  options,
  selectedOption,
  selectedOptionPassToParent,
}) => {
  const [selectedFormat, setSelectedFormat] = useState("");

  useEffect(() => {
    if (selectedOption.length > 0) {
      setSelectedFormat(selectedOption[0]);
    }
  }, [responseData]);

  const handleFormat = (event) => {
    const selectedOpt = event.target.value;
    const selectedData = options.find((data) => data.opt === selectedOpt);
    setSelectedFormat(selectedData);
    selectedOptionPassToParent([selectedData]);
  };

  const checkSelectedOption = (value) => {
    return (
      selectedFormat &&
      selectedFormat.opt === value.opt &&
      selectedFormat.price === value.price
    );
  };

  return (
    <Box>
      {/* <Typography variant="h4">Radio Button Single Select</Typography> */}
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">RadioButtons</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          value={selectedFormat ? selectedFormat.opt : ""}
          onChange={handleFormat}
          name="radio-buttons-group"
        >
          {options.map((data, index) => (
            <FormControlLabel
              key={index}
              value={data.opt}
              control={<Radio />}
              label={`${data.opt} (${data.price} $)`}
              checked={checkSelectedOption(data)}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default RadioButtonComponent;
