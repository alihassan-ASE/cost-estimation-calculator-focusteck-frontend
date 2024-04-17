import React, { useState, useEffect } from "react";
import {
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  OutlinedInput,
  Chip,
  TextField,
  Button
} from "@mui/material";
import { styled } from "@mui/material/styles";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: "100%",
  borderRadius: ".5em",
  margin: ".3em 0",
}));

const CustomInputLabel = styled(InputLabel)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  backgroundColor: 'white',
  padding: theme.spacing(0, 3),
  transformOrigin: 'top left',
  pointerEvents: 'none',
}));


const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  fontFamily: ["Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
    ","
  ),
  "&:hover": {
    backgroundColor: "#0045e6",
    borderColor: "#0045e6",
    boxShadow: "none",
    color: "white",
  },
  "&:focus": {
    backgroundColor: "#0045e6",
    borderColor: "#0045e6",
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
        backgroundColor: "#0045e6",
        color: "white",
      },
      "& .MuiMenuItem-root.Mui-selected:hover": {
        backgroundColor: "#0045e6",
        color: "white",
      },
      "& .Mui-selected:hover": {
        backgroundColor: "#0045e6",
        color: "white",
      },
      "& .MuiMenuItem-root.Mui-selected:focus": {
        backgroundColor: "#0045e6",
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
  const [selectedFormats, setSelectedFormats] = useState("");

  const [otherVal, setOtherVal] = useState("");
  const [inputField, setInputField] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [checkInputVal, setCheckInputVal] = useState(false);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    // if (selectedOption && selectedOption.length > 0) {
    //   setSelectedFormats(selectedOption[0] || null);

    //   const isSelectedOptAvailable = options.some(
    //     (option) => option.opt === selectedOption[0]?.opt
    //   );
    //   if (!isSelectedOptAvailable) {
    //     if (
    //       selectedOption[0]?.opt !== "Other (Specify)" &&
    //       selectedOption[0]?.opt !== "Other"
    //     ) {

    //       setOtherVal(selectedOption[0]?.opt || null);
    //       selectedOption.length = 0;
    //       setInputField(true);
    //     }
    //   }
    // } else {
    //   setOtherVal("");
    //   setSelectedFormats(selectedOption);
    // }
    if (Array.isArray(selectedOption)) {
      setSelectedFormats(selectedOption[0]);
      const isSelectedOptAvailable = options.some(
        (option) => option.opt === selectedOption[0]?.opt
      );
      if (!isSelectedOptAvailable) {
        if (
          selectedOption[0]?.opt !== "Other (Specify)" &&
          selectedOption[0]?.opt !== "Other" && selectedOption[0]?.opt !== undefined
        ) {

          setOtherVal(selectedOption[0]?.opt || null);
          selectedOption.length = 0;
          setInputField(true);
        }
        else {
          setOtherVal("");
        }
      }
      else {
        setOtherVal("");
      }
    } else {
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
    <StyledFormControl
      sx={{
        "& .MuiSvgIcon-root ": {
          backgroundColor: "#1e1d28",
          borderRadius: "50%",
          color: "white",
          transition: "all 0.5s ease-in-out",
          right: "8px",
          height: "1.5rem",
          width: "1.5rem",
          top: "10.5px",
          padding: ".5rem",
          zIndex: 1
        },
        "&:hover .MuiSvgIcon-root ": {
          backgroundColor: disable ? "#1e1d28" : "#0045e6",
        },
        transition: "all 0.5s ease-in-out",
        "&:hover .MuiOutlinedInput-root": {
          color: "#0045e6",
        },
        "& .css-17bpk52-MuiInputBase-root-MuiOutlinedInput-root": {
          borderColor: "#0045e6",
          "& .MuiSvgIcon-root ": {
            backgroundColor: disable ? "#1e1d28 !important" : "#0045e6 !important",
          },
        },
        "& .css-mw2ubh .MuiSvgIcon-root": {
          backgroundColor: disable ? "#1e1d28 !important" : "#0045e6 !important",
        },
        "& .css-1kbjsjj .MuiSvgIcon-root": {
          backgroundColor: disable ? "#1e1d28 !important" : "#0045e6 !important",

        },
        "& .MuiSvgIcon-root.MuiSelect-icon.MuiSelect-iconOutlined.css-1636szt": {
          backgroundColor: disable ? "#1e1d28 !important" : "#0045e6 !important",

        }
      }}
    >
      <CustomInputLabel id="demo-multiple-chip-label">{label ? label : "Select Your Option"}</CustomInputLabel>
      <Select
        IconComponent={KeyboardArrowDownIcon}
        sx={{ height: "60px", rowGap: "10px", width: "100%", borderRadius: "50px" }}
        autoFocus={false}
        value={disable ? null : selectedFormats}
        onChange={(e) => {
          const selectedObject = e.target.value;
          if (selectedObject.opt === "Other (Specify)" || selectedObject.opt === "Other") {
            setPrice(selectedObject.price)
            setInputField(true);
            setOtherVal("");
          } else {
            setInputField(false);
            setSelectedFormats(selectedObject);
            selectedOptionPassToParent(selectedObject, label);
          }
        }}
        disabled={disable ? true : false}

        input={
          <OutlinedInput id="select-multiple-chip" label={label ? label : "Select Your Option"}
            sx={{
              "&:hover": {
                borderColor: "#0045e6"
              },
              '&:focus': {
                borderRadius: 4,
                borderColor: '#80bdff',
                boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
              },
            }} />
        }
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, }}>
            {selected.opt ? (
              <Chip
                key={selected.opt}
                label={`${selected.opt}`}
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
            sx={{ width: "100%", wordWrap: "break-word", whiteSpace: "normal" }}
            key={index}
            value={
              data.opt && data.price
                ? { opt: data.opt, price: data.price }
                : data
            }
          >
            {data.opt ? data.opt : data}{" "}
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
            sx={{
              width: "36%",
              "& .css-1wc848c-MuiFormHelperText-root": {
                marginLeft: '0px'
              },
              "& .css-v7esy": {
                marginLeft: '0px'
              },
              "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                color: 'black'
              },
              "& .css-1x5jdmq": {
                color: 'black'
              }
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
              otherData.price = price;
              otherData.opt = otherVal;

              if (otherVal.trim() !== "") {
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
