"use client";
import React, { useState } from "react";
import { Box, Typography, Button, Card } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { styled } from "@mui/material/styles";

import StaffResource from "./StaffResource";

import question from "../../../../data/question.json";
import options from "../../../../data/options.json";
import selectedOption from "../../../../data/selectedOption.json";
import staffBase from "../../../../data/staffBase.json";

const CustomButton = styled(Button)({
  "&:hover": {
    border: "1px solid #0069d9",
  },
});

const StaffComponent = () => {
  const [count, setCount] = useState(0);
  const [addMore, setAddMore] = useState(false);
  const [values, setValues] = useState([]);

  const selectedOptionPassToParent = (data, boolVal, label) => {
    setValues((prev) => [...prev, data]);
    setAddMore(!boolVal);
  };
  console.log("In Staff Parent => ", values);
  
  const resources = selectedOption.resources;

  const returnResources = () => {
    const tags = [];
    for (let i = 0; i <= count; i++) {
      tags.push(
        <Card
          key={i}
          style={{
            marginBottom: "3em",
            padding: "2em 1.5em",
            borderRadius: ".5em",
            // MaxWidth: 300,
            // minWidth: 300,
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <StaffResource
            key={i}
            question={question.question}
            options={staffBase}
            index={i}
            setValues={setValues}
            values={values}
            selectedOption={resources}
            selectedOptionPassToParent={selectedOptionPassToParent}
          />
        </Card>
      );
    }
    return tags;
  };

  return (
    <Box>
      <Typography variant="h5" pb={2}>
        Staff Questions
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2em",
          alignItems: "center",
        }}
      >
        {returnResources()}
        <Box>
          {addMore && (
            <CustomButton
              onClick={() => {
                setAddMore(false);
                setCount(count + 1);
                returnResources();
              }}
              style={{
                marginBottom: "3em",
                padding: "3em",
                borderRadius: ".5em",
                minWidth: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ControlPointIcon onClick={() => setAddMore(false)} />
            </CustomButton>
          )}
        </Box>
      </Box>

      {addMore && (
        <Button size="medium" variant="contained" sx={{ width: 200 }}>
          Next
        </Button>
      )}
    </Box>
  );
};

export default StaffComponent;