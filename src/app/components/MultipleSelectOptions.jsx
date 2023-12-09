// TODO: unexpected behaviour, need to fix
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: "none",
    minWidth: 200,
    padding: "1em 2em",
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: "3em",
    },
    "&:first-of-type": {
      borderRadius: "3em",
    },
    color: "#000000",
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "1em 2em",
    lineHeight: 1.5,
    backgroundColor: "#F8F8F9",
    borderRadius: "3em",
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
  },
}));
const MultipleComponent = ({ responseData, selectedOptionFromChild }) => {
  const [selectedFormats, setSelectedFormats] = useState([]);

  useEffect(() => {
    setSelectedFormats(responseData.responses[1].selectedOption || []);
  }, [responseData]);

  const handleFormat = (event, newFormats) => {
    const valueToAdd = newFormats[newFormats.length - 1];
    const isSelected = selectedFormats.some(
      (selected) =>
        selected.opt === valueToAdd.opt && selected.price === valueToAdd.price
    );

    let updatedSelection = [];
    if (isSelected) {
      updatedSelection = selectedFormats.filter(
        (selected) =>
          selected.opt !== valueToAdd.opt && selected.price !== valueToAdd.price
      );
    } else {
      updatedSelection = [...newFormats];
    }

    setSelectedFormats(updatedSelection);
    selectedOptionFromChild(updatedSelection);
  };

  const checkSelectedOption = (value, price) => {
    return selectedFormats.some(
      (selected) => selected.opt === value && selected.price === price
    );
  };

  return (
    <Box>
      {/* <Typography variant="h4">Tiles Multi Select</Typography> */}
      <StyledToggleButtonGroup
        value={selectedFormats}
        onChange={handleFormat}
        sx={{ display: "flex", flexWrap: "wrap" }}
      >
        {responseData.responses[1].options.map((data, index) => (
          <ToggleButton
            key={index}
            value={data}
            selected={checkSelectedOption(data.opt, data.price)}
            onClick={(event) => {
              const valueToAdd = event.currentTarget.value;
              const isSelected = checkSelectedOption(data.opt, data.price);

              let updatedSelection = [];
              if (isSelected) {
                updatedSelection = selectedFormats.filter(
                  (selected) =>
                    selected.opt !== valueToAdd.opt ||
                    selected.price !== valueToAdd.price
                );
              } else {
                updatedSelection = [...selectedFormats, valueToAdd];
              }

              setSelectedFormats(updatedSelection);
              selectedOptionFromChild(updatedSelection);
            }}
            sx={{
              m: 1.5,
              backgroundColor: checkSelectedOption(data.opt, data.price)
                ? { backgroundColor: "#0062cc", color: "white" }
                : null,
              color: checkSelectedOption(data.opt, data.price) ? "white" : null,
            }}
          >
            {data.opt} ({data.price} $)
          </ToggleButton>
        ))}
      </StyledToggleButtonGroup>
    </Box>
  );
};

export default MultipleComponent;
