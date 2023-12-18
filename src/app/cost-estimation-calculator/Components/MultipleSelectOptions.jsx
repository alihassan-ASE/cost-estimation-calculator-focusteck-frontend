// TODO: Styling => need to fix
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
    ],
  },
}));

const StyleToggleButton = styled(ToggleButton)(({ theme }) => ({
  "&:hover": {
    backgroundColor: "#0069d9",
    borderColor: "#0062cc",
    boxShadow: "none",
    color: "white",
    transition:
      "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  },
  "&.Mui-selected": {
    backgroundColor: "#0062cc",
    color: "white",
  },
  "&.Mui-selected:hover": {
    backgroundColor: "#0069d9",
    color: "white",
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

const MultipleComponent = ({
  options,
  selectedOption,
  selectedOptionPassToParent,
}) => {
  const [selectedFormats, setSelectedFormats] = useState([]);

  useEffect(() => {
    setSelectedFormats(selectedOption || []);
  }, [selectedOption]);

  const handleFormat = (event, newFormats) => {
    setSelectedFormats(newFormats);
    selectedOptionPassToParent(newFormats);
  };

  const checkSelectedOption = (value, price) => {
    return selectedFormats?.some(
      (selected) => selected.opt === value && selected.price === price
    );
  };
  return (
    <Box>
      <StyledToggleButtonGroup
        value={selectedFormats}
        sx={{ display: "flex", flexWrap: "wrap" }}
      >
        {options?.map((data, index) => (
          <StyleToggleButton
            key={index}
            value={data}
            selected={checkSelectedOption(data.opt, data.price)}
            onClick={() => {
              const isSelected = checkSelectedOption(data.opt, data.price);
              let updatedSelection = [];

              if (isSelected) {
                updatedSelection = selectedFormats.filter(
                  (selected) =>
                    selected.opt !== data.opt || selected.price !== data.price
                );
              } else {
                updatedSelection = [...selectedFormats, data];
              }
              handleFormat(null, updatedSelection);
            }}
          >
            <span>{data.opt}</span>&nbsp;
            <span className="price">($ {data.price})</span>
          </StyleToggleButton>
        ))}
      </StyledToggleButtonGroup>
    </Box>
  );
};

export default MultipleComponent;
