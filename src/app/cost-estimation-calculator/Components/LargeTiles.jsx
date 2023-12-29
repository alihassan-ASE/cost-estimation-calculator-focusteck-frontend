import React, { useState, useEffect, useRef } from "react";
import { Button, Box, Typography, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#fff",
  border: "1px solid #fff",
  boxShadow: "0 0 5px 0 rgba(163,163,163,0.75)",
  color: "#000",
  textTransform: "none",
  fontSize: "1.2rem",
  padding: "2em 1em",
  display: "flex",
  flexGrow: 1,
  flexWrap: "wrap",
  lineHeight: 1.5,
  fontWeight: "normal",
  borderRadius: "5px",
  minwidth: "140px",
  minHeight: "140px",
  transition:
    "background-color 600ms cubic-bezier(0.4, 0, 0.2, 1) 100ms, box-shadow 600ms cubic-bezier(0.4, 0, 0.2, 1) 100ms,border-color 600ms cubic-bezier(0.4, 0, 0.2, 1) 100ms,color 600ms cubic-bezier(0.4, 0, 0.2, 1) 100ms",
  fontFamily: ["Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
    ","
  ),
  "&:hover": {
    color: "#fff",
    backgroundColor: "#005DBD",
    border: "1px solid #005DBD",
  },
  "&:active": {
    color: "#fff",
    backgroundColor: "#005DBD",
    border: "1px solid #005DBD",
  },
  "&:focus": {
    color: "#fff",
    backgroundColor: "#005DBD",
    border: "1px solid #005DBD",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "1rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: ".8rem",
  },
}));

const LargeTiles = ({
  options,
  selectedOption,
  selectedOptionPassToParent,
}) => {
  const [selectedFormats, setSelectedFormats] = useState("");
  const buttonRefs = useRef([]);

  useEffect(() => {
    if (selectedOption && selectedOption.length > 0) {
      setSelectedFormats(selectedOption[0] || null);

      const isSelectedOptAvailable = options.some(
        (option) => option.opt === selectedOption[0]?.opt
      );
    }
  }, [selectedOption, options]);

  useEffect(() => {
    let maxWidth = 0;
    let maxHeight = 0;

    buttonRefs.current.forEach((buttonRef) => {
      if (buttonRef) {
        const { offsetWidth, offsetHeight } = buttonRef;
        if (offsetWidth > maxWidth) {
          maxWidth = offsetWidth;
        }
        if (offsetHeight > maxHeight) {
          maxHeight = offsetHeight;
        }
      }
    });

    const finalWidth = maxWidth > 140 ? maxWidth : 140;
    const finalHeight = maxHeight > 140 ? maxHeight : 140;

    buttonRefs.current.forEach((buttonRef) => {
      if (buttonRef) {
        buttonRef.style.minWidth = `${finalWidth}px`;
        buttonRef.style.minHeight = `${finalHeight}px`;
      }
    });
  }, [options]);

  const checkSelectedOption = (value, price) => {
    const res =
      selectedFormats?.opt === value && selectedFormats?.price === price;
    return !!res;
  };

  return (
    <Box sx={{ display: "flex", gap: "1em", flexWrap: "wrap" }}>
      {options?.map((data, index) => (
        <Box key={index}>
          <CustomButton
            // ref={(el) => (buttonRefs.current[index] = el)}
            value={
              selectedFormats?.opt && selectedFormats?.price
                ? { opt: selectedFormats.opt, price: selectedFormats.price }
                : selectedFormats
            }
            onClick={() => {
              setSelectedFormats(data);
              selectedOptionPassToParent(data);
            }}
            sx={{
              backgroundColor: checkSelectedOption(data.opt, data.price)
                ? "#005DBD"
                : "#fff",
              border: checkSelectedOption(data.opt, data.price)
                ? "1px solid #005DBD"
                : "1px solid #fff",
              color: checkSelectedOption(data.opt, data.price)
                ? "#fff"
                : "#000",
              flexGrow: 1,
              minWidth: 0,
            }}
          >
            {data.opt ? data.opt : data}
          </CustomButton>
        </Box>
      ))}
    </Box>
  );
};

export default LargeTiles;
