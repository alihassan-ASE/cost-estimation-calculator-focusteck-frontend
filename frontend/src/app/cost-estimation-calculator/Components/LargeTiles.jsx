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
  width: "200px",
  height: "200px",
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
    fontSize: "1rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
    width: "270px"
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
                ? "#0045e6"
                : "#fff",
              border: checkSelectedOption(data.opt, data.price)
                ? "1px solid #0045e6"
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
