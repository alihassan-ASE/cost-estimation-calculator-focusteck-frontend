"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Box, Button } from "@mui/material";
const Home = () => {
  const route = useRouter();

  const goToRoute = (param) => {
    route.push(param);
  };

  return (
    <Box sx={{ margin: "3em" }}>
      <Button
        sx={{ width: "300px" }}
        variant="contained"
        onClick={() => goToRoute("/cost-estimation-calculator")}
      >
        Start
      </Button>
    </Box>
  );
};

export default Home;
