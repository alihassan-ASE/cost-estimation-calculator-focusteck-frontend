"use client";
import React, { useState } from "react";
import { Box } from "@mui/material";

import Form from "../Components/Form";

const page = () => {
  const [actualResponse, setActualResponse] = useState({});

  let response =
    typeof window !== "undefined"
      ? window.localStorage.getItem("Response")
      : false;

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
    <Box>
      <Form response={response} getActualResponse={getActualResponse} />
    </Box>
  );
};

export default page;
