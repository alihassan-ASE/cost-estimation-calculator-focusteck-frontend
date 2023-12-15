"use client";
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

import StaffComponent from "../Components/StaffComponent";


import QuestionsComponent from "@/app/cost-estimation-calculator/Components/Questions";

const page = () => {
  // const [selectedData, setSelectedData] = useState([]);

  // const selectedOptionPassToParent = (data) => {
  //   setSelectedData([data]);
  // };
  // console.log("Selected Option: ", selectedData);
  return (
    <Box sx={{ margin: "2em" }}>
      <StaffComponent />
    </Box>
  );
};

export default page;
