"use client";
import React, { useState } from "react";
import { Box } from "@mui/material";

import Form from "../Components/Form";

const page = () => {
  const [actualResponse, setActualResponse] = useState({});

  let response = window.localStorage.getItem("Response");

  if (response) {
    try {
      response = JSON.parse(response);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      response = {};
    }
  }

  const getActualResponse = (formData) => {
    setActualResponse(formData);
  };

  return (
    <Box sx={{ margin: "3em" }}>
      <Form response={response} getActualResponse={getActualResponse} />
    </Box>
  );
};

export default page;
