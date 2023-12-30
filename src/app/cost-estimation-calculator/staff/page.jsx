"use client";
import React, { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";

import StaffComponent from "../Components/StaffComponent";

const page = () => {
  const staffPageRef = useRef(null);
  useEffect(() => {
    if (staffPageRef.current) {
      staffPageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <Box ref={staffPageRef} sx={{ padding: "1em 0" }}>
      <StaffComponent />
    </Box>
  );
};

export default page;
