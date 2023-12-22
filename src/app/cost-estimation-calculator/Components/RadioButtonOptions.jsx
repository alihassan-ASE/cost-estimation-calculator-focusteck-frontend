import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  Typography,
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
  "& span.price": {
    color: "#3f37c9",
  },
  "&:focus span.price": {
    color: "white",
  },
}));

const RadioButtonComponent = ({
  options,
  selectedOption,
  selectedOptionPassToParent,
}) => {
  let otherData = {
    opt: null,
    price: null,
  };
  const [otherVal, setOtherVal] = useState("");
  const [inputField, setInputField] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [checkInputVal, setCheckInputVal] = useState(false);
  const [selectedFormats, setSelectedFormats] = useState("");
  const [price , setPrice] = useState(0);

  useEffect(() => {
    if (selectedOption && selectedOption.length > 0) {
      setSelectedFormats(selectedOption[0] || null);

      const isSelectedOptAvailable = options.some(
        (option) => option.opt === selectedOption[0]?.opt
      );

      if (!isSelectedOptAvailable) {
        if (
          selectedOption[0]?.opt !== "Other (Specify)" &&
          selectedOption[0]?.opt !== "Other"
        ) {
          setOtherVal(selectedOption[0]?.opt || null);
          selectedOption.length = 0;
          setInputField(true);
        }
      }
    } else {
      setOtherVal("");
    }
  }, [selectedOption, options]);

  const checkSelectedOption = (value, price) => {
    const res = selectedFormats?.opt === value && selectedFormats?.price === price;

    return !!res;
  };

  const submitOtherVal = () => {
    const trimmedOtherVal = otherVal.trim();

    if (!trimmedOtherVal) {
      setErrorMessage("Field cannot be empty");
      setCheckInputVal(true);
      setInputField(true);
    }
    if (trimmedOtherVal) {
      setErrorMessage(null);
      setInputField(false);
      setCheckInputVal(false);
      setOtherVal(trimmedOtherVal);
    }
  };


  const handleFormat = (event) => {
    const selectedOpt = event.target.value;
    const selectedData = options.find((data) => data.opt === selectedOpt);
    setSelectedFormats(selectedData);
    selectedOptionPassToParent(selectedData);
  };

  
  return (
    <Box>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          value={selectedFormats}
          onChange={handleFormat}
          name="radio-buttons-group"
        >
          {options?.map((data, index) => (
            <FormControlLabel
              key={index}
              value={data.opt}
              control={<Radio />}
              label={
                <CustomTypography variant="body1">
                  <span>{data.opt ? data.opt : data}</span>&nbsp;
                  <span className="price">
                    {" "}
                    {data.price ? `($${data.price})` : null}
                  </span>
                </CustomTypography>
              }
              onClick={() => {
                if (data.opt === "Other (Specify)" || data.opt === "Other") {
                  setInputField(!inputField);
                  setPrice(data.price)
                } else {
                  setSelectedFormats(data);
                  selectedOptionPassToParent(data);
                  setInputField(false);
                }
              }}

              checked={checkSelectedOption(data.opt , data.price)}
            />
          ))}
        </RadioGroup>
     { inputField ?
                <Box
                  sx={{
                    display: "flex",
                    gap: "1em",
                    flexWrap: "wrap",
                    margin: ".5em 0",
                  }}
                >
                  <TextField
                    fullWidth
                    id="fullWidth"
                    label="Other"
                    variant="outlined"
                    sx={{ width: "90%" }}
                    value={otherVal}
                    onChange={(e) => {
                      setOtherVal(e.target.value);
                      setCheckInputVal(false);
                      setErrorMessage(null);
                    }}
                    error={checkInputVal}
                    helperText={errorMessage}
                  />
                  <Button
                    variant="contained"
                    sx={{ width: "100px" }}
                    onClick={() => {
                      otherData.price = price;
                      otherData.opt = otherVal;
                      if (otherVal !== "") {
                        setSelectedFormats(otherData);
                        selectedOptionPassToParent(otherData);
                        setInputField(false);
                        setOtherVal(otherVal);
                        setErrorMessage(null);
                      }
                      submitOtherVal();
                    }}
                  >
                    Enter
                  </Button>
                </Box>
              
            : null}
      </FormControl>
    </Box>
  );
};

export default RadioButtonComponent;
