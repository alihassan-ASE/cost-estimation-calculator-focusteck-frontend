import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  FormControl,
  FormLabel,
  Checkbox,
  TextField,
  Button,
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

  const [otherVal, setOtherVal] = useState("");
  const [inputField, setInputField] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [checkInputVal, setCheckInputVal] = useState(false);
  const [selectedFormats, setSelectedFormats] = useState([]);
  const [price, setPrice] = useState(0);

  let otherData = {
    opt: null,
    price: null,
  };

  useEffect(() => {

    if (selectedOption && selectedOption.length > 0) {
      setSelectedFormats(selectedOption || []);

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

    if (Array.isArray(selectedFormats)) {
      return selectedFormats.some(
        (format) => format.opt === opt && format.price === price
      );
    }
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
                onClick={() => {

                  if (data.opt === "Other (Specify)" || data.opt === "Other") {
                    setInputField(!inputField);
                    setPrice(data.price)
                  } else {
                    setSelectedFormats([data]);
                    setInputField(false);
                  }
                  
                }}
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
        {inputField ?
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
                  const updatedSelectedFormats = [...selectedFormats, otherData];
                  setSelectedFormats(updatedSelectedFormats);
                  setInputField(false);
                  setOtherVal(otherVal);
                  setErrorMessage(null);
                  submitOtherVal();
                }
                handleFormat
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

export default CheckBoxComponent;
