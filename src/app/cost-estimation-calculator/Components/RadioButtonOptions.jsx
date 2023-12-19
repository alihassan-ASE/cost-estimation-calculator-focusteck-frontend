import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomTypography = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  fontWeight: "normal",
  fontFamily: [
    "Proxima Nova",
    "Poppins",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  [theme.breakpoints.down("md")]: {
    fontSize: 14,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: 10,
  },
}));

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
          {options?.map((data, index) => (
            <FormControlLabel
              key={index}
              value={data.opt}
              control={<Radio />}
              label=
             { <CustomTypography variant="body1">
              {`${data.opt} ($${data.price})`}
            </CustomTypography>}
              checked={selectedFormat?.opt === data.opt}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default RadioButtonComponent;
