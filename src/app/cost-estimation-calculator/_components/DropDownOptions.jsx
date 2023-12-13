import React, { useState, useEffect } from "react";
import {
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  OutlinedInput,
  Chip,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
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

const DropDownComponent = ({ options, label, selectedOption, getData }) => {
  const [selectedValue, setSelectedValue] = useState(selectedOption || "");
  // console.log("Selected Value: ", selectedValue);

  return (
    <Box
      style={{
        borderRadius: ".5em",
        margin: ".5em 0",
        // maxWidth: 300,
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <FormControl sx={{ maxWidth: 300, minWidth: 270 }}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          autoFocus={false}
          value={selectedValue || ""}
          onChange={(e) => {
            const selectedObject = e.target.value;
            console.log("Selected Object: ", selectedObject);

            setSelectedValue(selectedObject);
            getData(selectedObject, label);
          }}
          input={<OutlinedInput id="select-multiple-chip" label={label} />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.opt ? (
                <Chip
                  key={selected.opt}
                  label={`${selected.opt} (${selected.price} $)`}
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
              key={index}
              value={
                data.opt && data.price
                  ? { opt: data.opt, price: data.price }
                  : data
              }
            >
              {data.opt ? data.opt : data}{" "}
              {data.price ? `(${data.price} $)` : null}
            </StyledMenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DropDownComponent;
