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
  "&.Mui-selected": {
    backgroundColor: "#0062cc",
    color: "white",
  },
  "&.Mui-selected:hover": {
    backgroundColor: "#0069d9",
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
    },
  },
};

const DropDownComponent = ({ responseData, selectedOptionFromChild }) => {
  const [selectedValue, setSelectedValue] = useState(
    responseData.responses[0].selectedOption[0] || null
  );

  const checkSelectedOption = (data) => {
    return (
      selectedValue &&
      data.opt === selectedValue.opt &&
      data.price === selectedValue.price
    );
  };

  return (
    <Box style={{ marginBottom: "3em" }}>
      <FormControl sx={{ width: 400 }}>
        <InputLabel id="demo-simple-select-label">Drop Down Options</InputLabel>
        <Select
          autoFocus={false}
          value={selectedValue || ""}
          onChange={(e) => {
            const selectedObject = e.target.value;
            setSelectedValue(selectedObject);
            selectedOptionFromChild(selectedObject);
          }}
          input={<OutlinedInput id="select-multiple-chip" label="Questions" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              <Chip
                key={selected.opt}
                label={`${selected.opt} (${selected.price} $)`}
              />
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {responseData.responses[0].options.map((data, index) => (
            <StyledMenuItem
              key={index}
              value={data}
              sx={
                checkSelectedOption(data)
                  ? {
                      backgroundColor: "#0062cc",
                      color: "white",
                    }
                  : {}
              }
            >
              {data.opt} ({data.price} $)
            </StyledMenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DropDownComponent;
