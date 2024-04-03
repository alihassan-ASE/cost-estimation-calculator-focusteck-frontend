import React, { useState, useEffect } from "react";
import {
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  OutlinedInput,
  Chip,
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
  const [selectedFormats, setSelectedFormats] = useState("");

  useEffect(() => {
    if (Array.isArray(selectedOption)) {
      setSelectedFormats(selectedOption[0]);
    } else {
      setSelectedFormats(selectedOption);
    }
  }, [selectedOption]);

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
          setSelectedFormats(selectedObject);
          selectedOptionPassToParent(selectedObject, label);
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
    </StyledFormControl>
  );
};

export default DropDownComponent;
