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

const DropDownComponent = ({
  options,
  label,
  disable,
  selectedResource,
  getData,
}) => {
  const [selectedValue, setSelectedValue] = useState(selectedResource || "");

  return (
    <Box
      style={{
        borderRadius: ".5em",
        margin: ".5em 0",
        display: "flex",
        flexWrap: "wrap",
        flexGrow: 1,
      }}
    >
      <FormControl xs={{ padding: 0 }} sx={{ minWidth: 240, maxWidth: 300 }}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          autoFocus={false}
          value={disable ? null : selectedValue}
          onChange={(e) => {
            const selectedObject = e.target.value;
            setSelectedValue(selectedObject);
            getData(selectedObject, label);
          }}
          // disabled={disable ? true : false}
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
              // sx={{
              //   MaxWidth: 270,
              //   wordWrap: "break-word",
              //   display: "flex",
              //   flexWrap: "wrap",
              // }}
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
      </FormControl>
    </Box>
  );
};

export default DropDownComponent;
