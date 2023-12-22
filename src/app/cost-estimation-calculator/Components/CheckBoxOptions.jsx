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
import { styled } from "@mui/material/styles";

const CustomTypography = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  fontWeight: "normal",
  fontFamily: ["Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
    ","
  ),
  [theme.breakpoints.down("md")]: {
    fontSize: 14,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: 10,
  },
  "& span.price": {
    color: "#3f37c9",
  },
  "&:focus span.price": {
    color: "white",
  },
}));
const CheckBoxComponent = ({
  options,
  selectedOption,
  selectedOptionPassToParent,
}) => {
  const [selectedFormats, setSelectedFormats] = useState([]);

  useEffect(() => {
    setSelectedFormats(selectedOption || []);
  }, [selectedOption]);

  const handleFormat = (event) => {
    const selectedFormat = options.find(
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
      <FormControl>
        <FormGroup>
          {options.map((data, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={isChecked(data.opt, data.price)}
                  onChange={handleFormat}
                  name={data.opt}
                />
              }
              label={
                <CustomTypography variant="body1">
                  <span>{data.opt ? data.opt : data}</span>&nbsp;
                  <span className="price">
                    {" "}
                    {data.price ? `($${data.price})` : null}
                  </span>
                </CustomTypography>
              }
            />
          ))}
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default CheckBoxComponent;
