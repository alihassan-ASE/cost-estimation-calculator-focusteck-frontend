"use client";
import React, { useState, useEffect } from "react";
import ShowSummary from "../Components/ShowSummary";
import Stepper from "../Components/Stepper/page";
import { Button, Box, Grid, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";

const page = () => {
  const [actualResponse, setActualResponse] = useState({});
  const [orientation, setOrientation] = useState("horizontal");
  const isNarrowScreen = useMediaQuery("(max-width:600px)");
  useEffect(() => {
    if (isNarrowScreen) {
      setOrientation("horizontal");
    } else {
      setOrientation("vertical");
    }
  }, [isNarrowScreen]);

  const [auth, setAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!response?.responses.length) {
      router.push("/");
    } else {
      setAuth(true);
    }
  }, []);

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
      {response?.responses.length ? (
        <Grid
          sx={{ padding: "2em" }}
          container
          spacing={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
        >
          <Grid item lg={8} md={9} sm={8} xs={12}>
            <ShowSummary response={response} />
          </Grid>
          <Grid item lg={4} md={3} sm={4} xs={12}>
            <Stepper
              responses={response.responses}
              orientation={orientation}
              changeActiveQuestion={null}
            />
          </Grid>
        </Grid>
      ) : null}
    </Box>
  );
};

export default page;
