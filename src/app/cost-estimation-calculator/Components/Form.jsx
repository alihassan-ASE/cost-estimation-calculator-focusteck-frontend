"use client";
import React, { useState } from "react";
import { Box, TextField, Button, InputLabel } from "@mui/material";
import { postData } from '../../lib/api/postData';
import ShowResponse from "./ShowResponse";

const Form = ({ response, getActualResponse }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formInput, setFormInput] = useState({
    userName: "",
    email: "",
  });

  console.log("Response in Form" , response)

  const [errorMessage, setErrorMessage] = useState({
    usernameError: null,
    emailError: null,
  });

  const [checkInputVal, setCheckInputVal] = useState(false);
  const submitForm = (formInput) => {
    if (!formInput.userName) {
      setErrorMessage({ usernameError: "Incorrect Name" });
      setCheckInputVal(true);
      setSubmitted(false);
    }
    if (!formInput.email) {
      setErrorMessage({ emailError: "Incorrect Email" });
      setCheckInputVal(true);
      setSubmitted(false);
    }
    if (formInput.userName && formInput.email) {

      setErrorMessage({ usernameError: null, emailError: null });
      setCheckInputVal(false);
      setSubmitted(true);

      getActualResponse({
        ...formInput,
        ...response,
      });
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: submitted ? "none" : "block",
          margin: "3em",
          padding: "5em 3em",
          border: "1px solid #cfcfcf",
          width: "min-content",
          borderRadius: ".5em",
          justifyContent: "center",
          margin: "auto",
        }}
      >
        <form>
          <Box>
            <InputLabel>Enter Your Name</InputLabel>
            <TextField
              sx={{ mb: 3 }}
              style={{ width: 500 }}
              id="outlined-basic, user-name"
              variant="outlined"
              value={formInput.userName}
              onChange={(e) => {
                setFormInput({
                  userName: e.target.value,
                  email: formInput.email,
                });
              }}
              error={checkInputVal}
              helperText={errorMessage.usernameError}
            />
            {/* <br /> */}
            <InputLabel>Enter Your Email</InputLabel>
            <TextField
              sx={{ mb: 3 }}
              style={{ width: 500 }}
              id="outlined-basic, user-email"
              variant="outlined"
              value={formInput.email}
              onChange={(e) => {
                setFormInput({
                  userName: formInput.userName,
                  email: e.target.value,
                });
              }}
              error={checkInputVal}
              helperText={errorMessage.emailError}
            />
            <br />
            <Button
              variant="contained"
              onClick={() => {
                submitForm(formInput);
                postData({ ...response, ...formInput })
              }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
      {submitted ? <ShowResponse response={{ ...response, ...formInput }} /> : null}
    </Box>
  );
};

export default Form;
