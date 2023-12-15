"use client";
import React, { useState } from "react";
import { Box } from "@mui/material";

import Form from "../_components/Form";
import ShowResponse from "../_components/ShowResponse";

import response from "../../../../data/actualResponse.json";

const page = () => {
  const [actualResponse, setActualResponse] = useState();

  const getActualResponse = (formData) => {
    setActualResponse(formData);
  };

  console.log("Actual Response: ", actualResponse);
  return (
    <Box>
      <Form response={response} getActualResponse={getActualResponse} />
    </Box>
  );
};

export default page;
