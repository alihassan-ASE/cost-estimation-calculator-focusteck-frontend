"use client";
import React, { useEffect, useState } from "react";
import { Box, TextField, Button, InputLabel, Typography } from "@mui/material";
import { postData } from "../../lib/api/postData";
import { styled } from "@mui/material/styles";
import ShowResponse from "./ShowResponse";
import { useRouter } from "next/navigation";

const CustomBox = styled(Box)(({ theme }) => ({
  margin: "3em auto",
  padding: "3em",
  maxWidth:700,
  borderRadius: ".5em",
  boxShadow:
    "4px 4px 10px 1px rgba(0,105,217,0.27), -5px -5px 14px 2px rgba(189,189,189,1)",
  justifyContent: "center",

  [theme.breakpoints.down("md")]: {
    margin: "3em auto",
    padding: "2em",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "2em 0.5em",
    padding: "1em",
  },
}));

const Form = ({ response, getActualResponse }) => {
  const [auth , setAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if responses exist, if not, redirect to '/cost-estimation-calculator'
    if (!response?.responses.length) {
      router.push('/');
    } else {
      setAuth(true); // Set authentication status
    }
  }, [ ]);

  const [submitted, setSubmitted] = useState(false);
  const [formInput, setFormInput] = useState({
    userName: "",
    email: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    usernameError: null,
    emailError: null,
  });

  const [checkInputVal, setCheckInputVal] = useState(false);

  const submitForm = (formInput) => {
    const trimmedUserName = formInput.userName.trim();
    const trimmedEmail = formInput.email.trim();

    if (!trimmedUserName) {
      setErrorMessage({ usernameError: "Incorrect Name" });
      setCheckInputVal(true);
      setSubmitted(false);
    }
    if (!trimmedEmail) {
      setErrorMessage({ emailError: "Incorrect Email" });
      setCheckInputVal(true);
      setSubmitted(false);
    }

    if (trimmedUserName && trimmedEmail) {
      if (
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(trimmedEmail) &&
        /^(?!\s+$).*/.test(trimmedUserName)
      ) {
        setErrorMessage({ usernameError: null, emailError: null });
        setCheckInputVal(false);
        setSubmitted(true);

        getActualResponse({
          ...formInput,
          ...response,
        });

        postData({ ...response, ...formInput });
      } else if (!/^(?!\s+$).*/.test(trimmedUserName)) {
        setErrorMessage({ usernameError: "Incorrect Name", emailError: "" });
        setCheckInputVal(true);
        setSubmitted(false);
      } else if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(trimmedEmail)
      ) {
        setErrorMessage({ usernameError: "", emailError: "Incorrect Email Format" });
        setCheckInputVal(true);
        setSubmitted(false);
      }
    }
  };

  return (
    <Box>
      {
        auth ?
        <CustomBox
        sx={{
          display: submitted ? "none" : "block",
        }}
      >
        <Typography variant="h5" sx={{ margin: "1em 0", color: "#0069d9" }}>
          Leave us your contact information
        </Typography>
        <form>
          <Box>
            <InputLabel>Enter Your Name</InputLabel>
            <TextField
              sx={{ mb: 3, borderRadius: "2em" }}
              style={{
                width: "100%",
              }}
              id="outlined-basic, user-name"
              variant="outlined"
              value={formInput.userName}
              onChange={(e) => {
                setFormInput({
                  userName: e.target.value,
                  email: formInput.email,
                });
                setErrorMessage({ usernameError: null, emailError: null });
                setCheckInputVal(false);
              }}
              error={checkInputVal}
              helperText={errorMessage.usernameError}
            />
            {/* <br /> */}
            <InputLabel>Enter Your Email</InputLabel>
            <TextField
              sx={{ mb: 3 }}
              style={{ width: "100%" }}
              id="outlined-basic, user-email"
              variant="outlined"
              value={formInput.email}
              onChange={(e) => {
                setFormInput({
                  userName: formInput.userName,
                  email: e.target.value,
                });
                setErrorMessage({ usernameError: null, emailError: null });
                setCheckInputVal(false);
              }}
              error={checkInputVal}
              helperText={errorMessage.emailError}
            />
            <br />
            <Button
              variant="contained"
              onClick={() => {
          
                  submitForm(formInput);
               
              }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </CustomBox>
      :null
      }
      {submitted ? (
        <ShowResponse response={{ ...response, ...formInput }} />
      ) : null}
    </Box>
  );
};

export default Form; 
