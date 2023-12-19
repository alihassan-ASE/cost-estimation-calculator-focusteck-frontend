import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const RadioButtonComponent = ({
  options,
  selectedOption,
  selectedOptionPassToParent,
}) => {
  const [selectedFormat, setSelectedFormat] = useState(0);

  useEffect(() => {
    if (selectedOption?.length > 0) {
      setSelectedFormat(selectedOption[0]);
    }
  }, [selectedOption]);

  const handleFormat = (event) => {
    const selectedOpt = event.target.value;
    const selectedData = options.find((data) => data.opt === selectedOpt);
    setSelectedFormat(selectedData);
    selectedOptionPassToParent(selectedData);
  };

  return (
    <Box>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          value={selectedFormat}
          onChange={handleFormat}
          name="radio-buttons-group"
        >
          {options.map((data, index) => (
            <FormControlLabel
              key={index}
              value={data.opt}
              control={<Radio />}
              label={`${data.opt} ($${data.price})`}
              checked={selectedOption[0]?.opt === data.opt}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default RadioButtonComponent;
