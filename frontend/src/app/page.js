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
    <Box sx={{ display: "flex", padding: "3em 0" }}>
      <Button
        sx={{ width: "300px", margin: "0 .5em" }}
        variant="contained"
        onClick={() => goToRoute("/cost-estimation-calculator")}
      >
        Start
      </Button>
    </Box>
  );
};

export default Home;