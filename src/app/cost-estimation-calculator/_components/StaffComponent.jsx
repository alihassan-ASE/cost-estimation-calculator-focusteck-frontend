"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Card, Grid } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { styled } from "@mui/material/styles";

import StaffResource from "./StaffResource";

import question from "../../../../data/question.json";
import options from "../../../../data/options.json";
import selectedOption from "../../../../data/selectedOption.json";
import staffBase from "../../../../data/staffBase.json";

import Form from "./Form";

const CustomButton = styled(Button)({
  "&:hover": {
    border: "1px solid #0069d9",
  },
});

const StaffComponent = () => {
  const [count, setCount] = useState(0);
  const [addMore, setAddMore] = useState(false);
  const [values, setValues] = useState([]);
  const [checkResource, setCheckResource] = useState(true);

  const selectedOptionPassToParent = (data, boolVal, label) => {
    setValues((prev) => [...prev, data]);
    setAddMore(!boolVal);
  };
  const resources = selectedOption.resources;
  useEffect(() => {
    if (selectedOption.resources.length > 0) {
      setCount(selectedOption.resources.length - 1);
      // ... other logic if needed
    }
  }, [selectedOption.resources]);

  console.log("In Staff Parent => ", values);

  const resourcesLength = resources.length;

  // console.log("Count: ", count);

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
          }}
        >
          <StaffResource
            key={i}
            question={question.question}
            options={staffBase}
            index={i}
            setValues={setValues}
            values={values}
            selectedOption={selectedOption.resources}
            selectedOptionPassToParent={selectedOptionPassToParent}
          />
        </Card>
      );
    }
    return tags;
  };

  return (
    <Box sx={{ scrollBehavior: "smooth" }}>
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
                setCount((prevCount) => prevCount + 1);
                returnResources();
              }}
              style={{
                border: "1px solid #0069d9",
                marginBottom: "3em",
                padding: "3em",
                borderRadius: ".5em",
                minWidth: 100,
                height: 410,
                width: 340,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ControlPointIcon
                sx={{ fontSize: "2em" }}
                onClick={() => setAddMore(false)}
              />
            </CustomButton>
          )}
        </Box>
      </Box>

      <Button
        size="medium"
        variant="contained"
        sx={{ width: 200 }}
        disabled={values[0] ? false : true}
      >
        Next
      </Button>
    </Box>
  );
};

export default StaffComponent;
