"use client";
import React, { useState } from "react";
import { Box } from "@mui/material";

import response from "../../../../response.json";
import Form from "../Components/Form";

const page = () => {
  const [actualResponse, setActualResponse] = useState();

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
