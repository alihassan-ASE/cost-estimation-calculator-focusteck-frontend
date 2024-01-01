"use client";
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";

import ShowResponse from "../Components/ShowResponse";

const page = () => {

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

  return (
    <Box
      sx={{
        margin: "auto",
      }}
    >
      {response?.responses?.length ? <ShowResponse response={response} /> : null}
    </Box>
  );
};

export default page;
