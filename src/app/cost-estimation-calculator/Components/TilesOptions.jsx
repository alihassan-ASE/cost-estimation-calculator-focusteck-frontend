import React, { useState, useEffect } from "react";
import { Button, Box, Typography, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ElevatorSharp } from "@mui/icons-material";

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#fff",
  border: "1px solid #fff",
  boxShadow: "0 0 5px 0 rgba(163,163,163,0.75)",
  color: "#000",
  textTransform: "none",
  fontSize: "1rem",
  padding: ".4em 1.2em",
  lineHeight: 1.5,
  fontWeight: "normal",
  borderRadius: "5px",
  minwidth: "140px",
  display: "flex",
  flexWrap: "wrap",
  transition:
    "background-color 600ms cubic-bezier(0.4, 0, 0.2, 1) 100ms, box-shadow 600ms cubic-bezier(0.4, 0, 0.2, 1) 100ms,border-color 600ms cubic-bezier(0.4, 0, 0.2, 1) 100ms,color 600ms cubic-bezier(0.4, 0, 0.2, 1) 100ms",
  fontFamily: ["Aeonik", "Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
    ","
  ),
  "&:hover": {
    color: "#fff",
    backgroundColor: "#005DBD",
    border: "1px solid #005DBD",
  },
  "&:active": {
    color: "#fff",
    backgroundColor: "#005DBD",
    border: "1px solid #005DBD",
  },
  "&:focus": {
    color: "#fff",
    backgroundColor: "#005DBD",
    border: "1px solid #005DBD",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: ".9rem ",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: ".7rem ",
    width: "120px",
    flexGrow: "1",
  },
}));

const TilesComponent = ({
  options,
  selectedOption,
  selectedOptionPassToParent,
}) => {
  let otherData = {
    opt: null,
    price: null,
  };
  const [selectedFormats, setSelectedFormats] = useState("");

  const [otherVal, setOtherVal] = useState("");
  const [inputField, setInputField] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [checkInputVal, setCheckInputVal] = useState(false);

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
    const res =
      selectedFormats?.opt === value && selectedFormats?.price === price;
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

  return (
    <Box sx={{ display: "flex", gap: "1em", flexWrap: "wrap" }}>
      {options?.map((data, index) => (
        <Box sx={{ display: "inline-block" }} key={index}>
          <CustomButton
            key={index}
            value={
              selectedFormats?.opt && selectedFormats?.price
                ? { opt: selectedFormats.opt, price: selectedFormats.price }
                : selectedFormats
            }
            onClick={() => {
              if (data.opt === "Other (Specify)" || data.opt === "Other") {
                setInputField(!inputField);
              } else {
                setSelectedFormats(data);
                selectedOptionPassToParent(data);
              }
            }}
            sx={
              checkSelectedOption(data.opt, data.price)
                ? {
                  backgroundColor: "#005DBD",
                  border: "1px solid #005DBD",
                  color: "white",
                }
                : {}
            }
          >
            <Typography variant="body1">{data.opt ? data.opt : data}</Typography>
          </CustomButton>
          {
            data.opt === "Other (Specify)" || data.opt === "Other"
              ? inputField && (
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
                    sx={{
                      width: "90%",
                      "& .css-1wc848c-MuiFormHelperText-root": {
                        marginLeft: '0px'
                      },
                      "& .css-v7esy": {
                        marginLeft: '0px'
                      },
                    }}
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
                      otherData.price = data.price;
                      otherData.opt = otherVal;

                      if (otherVal.trim() !== "") {
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
              )
              : null
          }
        </Box>
      ))}
    </Box>
  );
};

export default TilesComponent;
