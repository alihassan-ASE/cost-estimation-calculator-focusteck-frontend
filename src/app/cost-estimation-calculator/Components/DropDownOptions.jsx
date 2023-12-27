import React, { useState, useEffect } from "react";
import {
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  OutlinedInput,
  Chip,
  Button,
  Grid,
  TextField
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: "100%",
  borderRadius: ".5em",
  margin: ".3em 0",
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  fontFamily: ["Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
    ","
  ),
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
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
    sx: {
      "& .MuiMenuItem-root.Mui-selected": {
        backgroundColor: "#0062cc",
        color: "white",
      },
      "& .MuiMenuItem-root.Mui-selected:hover": {
        backgroundColor: "#0069d9",
        color: "white",
      },
      "& .Mui-selected:hover": {
        backgroundColor: "#0069d9",
        color: "white",
      },
      "& .MuiMenuItem-root.Mui-selected:focus": {
        backgroundColor: "#0069d9",
        color: "white",
      },
    },
  },
};


const DropDownComponent = ({
  options,
  label,
  disable,
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
  const [price, setPrice] = useState(0);

  useEffect(() => {


    if (Array.isArray(selectedOption)) {
      setSelectedFormats(selectedOption[0]);
    } else {
      setSelectedFormats(selectedOption);
      setSelectedFormats(selectedOption);
    }

  }, [selectedOption, options])

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
    <StyledFormControl>
      <InputLabel id="demo-simple-select-label">{label?label:"Select Your Option"}</InputLabel>
      <Select

        sx={{ height: "65px", width: "270px" }}
        autoFocus={false}
        value={disable ? null : selectedFormats}
        onChange={(e) => {
          const selectedObject = e.target.value;

          if (selectedObject.opt === "Other (Specify)" || selectedObject.opt === "Other") {
            setPrice(selectedObject.price)
            setInputField(true);
            setOtherVal(""); // Clear any previous input value
          } else {
            setInputField(false);
            setSelectedFormats(selectedObject);
            selectedOptionPassToParent(selectedObject, label);
          }


        }}
        disabled={disable ? true : false}
        input={<OutlinedInput id="select-multiple-chip" label={label?label:"Select Your Option"} />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.opt ? (
              <Chip
                key={selected.opt}
                label={`${selected.opt} ($${selected.price})`}
              />
            ) : (
              <Chip key={selected} label={selected} />
            )}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {options?.map((data, index) => (
          <StyledMenuItem
            sx={{ width: 270, wordWrap: "break-word", whiteSpace: "normal" }}
            key={index}
            value={
              data.opt && data.price
                ? { opt: data.opt, price: data.price }
                : data
            }
          >
            {data.opt ? data.opt : data}{" "}
            {data.price ? `($${data.price})` : null}
          </StyledMenuItem>
        ))}
      </Select>
      {/* Input field for "Other (Specify)" or "Other" */}

      {inputField ?
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
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
            sx={{ width: "36%" }}
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
              if (otherVal.trim()) {
                setSelectedFormats(otherData);
                selectedOptionPassToParent(otherData);
                setInputField(false);
                setErrorMessage(null);
              }
              submitOtherVal();
            }}
          >
            Enter
          </Button>
        </Box> : null
      }
    </StyledFormControl>
  );
};

export default DropDownComponent;


