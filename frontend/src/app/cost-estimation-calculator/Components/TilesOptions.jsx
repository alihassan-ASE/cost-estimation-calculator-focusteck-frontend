import React, { useState, useEffect } from "react";
import { Button, Box, Typography, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomButton = styled(Button)(({ theme }) => ({
  color: "#000000",
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "1em 2em",
  lineHeight: 1.5,
  backgroundColor: "#F8F8F9",
  borderRadius: "3em",
  minwidth: "140px",
  display: "flex",
  flexWrap: "wrap",
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
  "&:hover": {
    backgroundColor: "#0069d9",
    borderColor: "#0062cc",
    boxShadow: "none",
    color: "white",
  },
  "&:focus": {
    backgroundColor: "#0069d9",
    borderColor: "#0062cc",
    boxShadow: "none",
    color: "white",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: 14,
    padding: ".7em 1.3em",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: 10,
    padding: ".7em 1.7em",
    width: "160px",
  },
  "& span.price": {
    color: "#3f37c9",
  },
  "&:hover span.price": {
    color: "white",
  },
  "&:focus span.price": {
    color: "white",
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
  const [otherVal, setOtherVal] = useState("");
  const [inputField, setInputField] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [checkInputVal, setCheckInputVal] = useState(false);
  const [selectedFormats, setSelectedFormats] = useState("");

  useEffect(() => {
    if (selectedOption?.length) {
      setSelectedFormats(selectedOption[0] || []);
    }
  }, [selectedOption]);

  const checkSelectedOption = (value, price) => {
    const res =
      selectedFormats?.opt === value && selectedFormats?.price === price;

    return !!res;
  };

  console.log("selectedOption: ", selectedOption);
  // console.log("selectedFormats: ", selectedFormats);

  const submitOtherVal = () => {
    if (!otherVal) {
      setErrorMessage("Field cannot be empty");
      setCheckInputVal(true);
    }
    if (otherVal) {
      setErrorMessage(null);
      setInputField(false);
      setCheckInputVal(false);
    }
  };

  return (
    <Box sx={{ display: "flex", gap: "1em", flexWrap: "wrap" }}>
      {options?.map((data, index) => (
        <Box sx={{ display: "inline-block" }} key={index}>
          <CustomButton
            value={selectedFormats}
            onClick={() => {
              if (data.opt === "Other (Specify)") {
                setInputField(!inputField);
              } else {
                selectedOptionPassToParent(data);
                setInputField(false);
                setOtherVal("");
                setErrorMessage(null);
                setCheckInputVal(false);
              }
              setSelectedFormats(data);
              // selectedOption[0] = data;
            }}
            sx={
              checkSelectedOption(data.opt, data.price)
                ? {
                    backgroundColor: "#0062cc",
                    color: "white",
                    "& span.price": {
                      color: "white",
                    },
                  }
                : {}
            }
          >
            <span>{data.opt}</span>&nbsp;
            <span className="price">($ {data.price})</span>
          </CustomButton>
          {data.opt === "Other (Specify)"
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
                    sx={{ width: "90%" }}
                    value={otherVal}
                    onChange={(e) => {
                      setOtherVal(e.target.value);
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
                      if (otherVal !== "") {
                        setSelectedFormats(otherData);
                        selectedOptionPassToParent(otherData);
                        setInputField(false);
                        setOtherVal("");
                        setErrorMessage(null);
                      } else {
                        submitOtherVal();
                      }
                    }}
                  >
                    Enter
                  </Button>
                </Box>
              )
            : null}
        </Box>
      ))}
    </Box>
  );
};

export default TilesComponent;
