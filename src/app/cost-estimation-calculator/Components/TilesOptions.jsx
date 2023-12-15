import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomButton = styled(Button)({
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
});

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
    <Box>
      {options?.map((data, index) => (
        <Box sx={{ display: "inline-block", m: 1.5 }} key={index}>
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
