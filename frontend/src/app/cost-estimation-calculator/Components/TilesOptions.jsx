import React, { useState, useEffect } from "react";
import { Button, Box, Typography, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#fff",
  border: "1px solid #fff",
  boxShadow: "0 0 5px 0 rgba(163,163,163,0.75)",
  color: "#000",
  textTransform: "none",
  fontSize: "1rem",
  padding: ".4em 1.2em",
  lineHeight: 1.5,
  fontWeight: "normal",
  borderRadius: "5px",
  minwidth: "140px",
  display: "flex",
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
  "&:active": {
    color: "#fff",
    backgroundColor: "#0045e6",
    border: "1px solid #0045e6",
  },
  "&:focus": {
    color: "#fff",
    backgroundColor: "#0045e6",
    border: "1px solid #0045e6",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: ".9rem ",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: ".7rem ",
    width: "120px",
    flexGrow: "1",
  },
}));

const TilesComponent = ({
  options,
  selectedOption,
  selectedOptionPassToParent,
}) => {

  const [selectedFormats, setSelectedFormats] = useState("");

  useEffect(() => {
    if (selectedOption && selectedOption.length > 0) {
      setSelectedFormats(selectedOption[0] || null);

      const isSelectedOptAvailable = options.some(
        (option) => option.opt === selectedOption[0]?.opt
      );
    }
  }, [selectedOption, options]);

  const checkSelectedOption = (value, price) => {
    const res =
      selectedFormats?.opt === value && selectedFormats?.price === price;
    return !!res;
  };

  return (
    <Box sx={{ display: "flex", gap: "1em", flexWrap: "wrap" }}>
      {options?.map((data, index) => (
        // <Box sx={{ display: "inline-block" }} key={index}>
        <CustomButton
          key={index}
          value={
            selectedFormats?.opt && selectedFormats?.price
              ? { opt: selectedFormats.opt, price: selectedFormats.price }
              : selectedFormats
          }
          onClick={() => {
            setSelectedFormats(data);
            selectedOptionPassToParent(data);
          }}
          sx={
            checkSelectedOption(data.opt, data.price)
              ? {
                backgroundColor: "#0045e6",
                border: "1px solid #0045e6",
                color: "white",
              }
              : {}
          }
        >
          <span>{data.opt ? data.opt : data}</span>
        </CustomButton>
        // </Box>
      ))}
    </Box>
  );
};

export default TilesComponent;
