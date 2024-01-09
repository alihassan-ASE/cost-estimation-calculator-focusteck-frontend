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
    display: "flex",
    boxShadow: "0 0 5px 0 rgba(163,163,163,0.75)",
    gap: "1em",
    border: "none",
    minwidth: "140px",
    fontSize: "1rem",
    padding: ".4em 1.2em",
    fontWeight: "normal",
    border: "1px solid #fff",
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: "5px",
    },
    "&:first-of-type": {
      borderRadius: "5px",
    },
    color: "#000000",
    textTransform: "none",
    lineHeight: 1.5,
    backgroundColor: "#fff",
    borderRadius: "5px",
    [theme.breakpoints.down("md")]: {
      fontSize: ".9rem ",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: ".7rem ",
    },
    fontFamily: ["Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
      ","
    ),
  },
  gap: "1em",
}));

const StyleToggleButton = styled(ToggleButton)(({ theme }) => ({
  backgroundColor: "#fff",
  border: "1px solid #fff",
  color: "#000",
  textTransform: "none",
  fontSize: "0.9rem",
  padding: ".3em 1em",
  lineHeight: 1.5,
  fontWeight: "normal",
  borderRadius: "5px",
  minwidth: "140px",
  display: "flex",
  gap: "1em",
  flexWrap: "wrap",
  transition:
    "background-color 600ms cubic-bezier(0.4, 0, 0.2, 1) 100ms, box-shadow 600ms cubic-bezier(0.4, 0, 0.2, 1) 100ms,border-color 600ms cubic-bezier(0.4, 0, 0.2, 1) 100ms,color 600ms cubic-bezier(0.4, 0, 0.2, 1) 100ms",
  fontFamily: ["Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
    ","
  ),
  "&:hover": {
    color: "#fff",
    backgroundColor: "#0045e6",
    border: "1px solid #0045e6",
  },
  "&.Mui-selected": {
    backgroundColor: "#0045e6",
    border: "1px solid #0045e6",
    color: "white",
    "& span.price": {
      color: "#fff",
    },
  },
  "&.Mui-selected:hover": {
    color: "#fff",
    backgroundColor: "#0045e6",
    border: "1px solid #0045e6",
  },
  "& span.price": {
    color: "#005DBD",
    transition: "all 0.5s ease-in-out"
  },
  "&:hover span.price": {
    color: "white",
  },
  "&:focus span.price": {
    color: "white",
  },
  [theme.breakpoints.down("sm")]: {
    width: "110px",
    flexGrow: "1",
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
            <span>{data.opt}</span>
          </StyleToggleButton>
        ))}
      </StyledToggleButtonGroup>
    </Box>
  );
};

export default MultipleComponent;
