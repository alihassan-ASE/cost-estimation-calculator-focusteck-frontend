import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomButton = styled(Button)(({ theme }) => ({
  color: "#000000",
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "1em 2em",
  lineHeight: 1.5,
  backgroundColor: "#F8F8F9",
  borderRadius: "3em",
  minwidth: "140px",
  display: "flex",
  flexWrap: "wrap",
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
  [theme.breakpoints.down("md")]: {
    fontSize: 14,
    padding: ".7em 1.3em",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: 11,
    padding: ".7em 1.7em",
    width: "140px",
  },
}));

const TilesComponent = ({
  options,
  selectedOption,
  selectedOptionPassToParent,
}) => {
  const checkSelectedOption = (value, price) => {
    const res = selectedOption?.find(
      (data) => data.opt === value && data.price === price
    );
    return !!res;
  };

  return (
    <Box sx={{ display: "flex", gap: "1em", flexWrap: "wrap" }}>
      {options?.map((data, index) => (
        <Box sx={{ display: "inline-block" }} key={index}>
          <CustomButton
            onClick={() => {
              selectedOptionPassToParent(data);
              // selectedOption[0] = data;
            }}
            sx={
              checkSelectedOption(data.opt, data.price)
                ? {
                    backgroundColor: "#0062cc",
                    color: "white",
                  }
                : {}
            }
          >
            {data.opt} ($ {data.price})
          </CustomButton>
        </Box>
      ))}
    </Box>
  );
};

export default TilesComponent;
