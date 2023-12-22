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
  const [selectedFormats, setSelectedFormats] = useState("");

  useEffect(() => {
    if (Array.isArray(selectedOption)) {
      setSelectedFormats(selectedOption[0]);
    } else {
      setSelectedFormats(selectedOption);
    }
  }, [selectedOption]);

  return (
    <StyledFormControl>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        sx={{ height: "65px", width: "270px" }}
        autoFocus={false}
        value={disable ? null : selectedFormats}
        onChange={(e) => {
          const selectedObject = e.target.value;
          setSelectedFormats(selectedObject);
          selectedOptionPassToParent(selectedObject, label);
        }}
        disabled={disable ? true : false}
        input={<OutlinedInput id="select-multiple-chip" label={label} />}
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
    </StyledFormControl>
  );
};

export default DropDownComponent;
