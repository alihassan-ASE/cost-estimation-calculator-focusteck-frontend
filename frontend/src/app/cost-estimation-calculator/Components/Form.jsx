"use client";
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  useMediaQuery
} from "@mui/material";
import { postData } from "../../lib/api/postData";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CustomBox = styled(Box)(({ theme }) => ({
  margin: "3em auto",
  padding: "2em",
  maxWidth: 700,
  borderRadius: ".5em",
  border: "1px solid gray",
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

const CustomTextField = styled(TextField)(({ theme }) => ({
  marginBottom: "1em",
  borderRadius: "2em",
  "& .MuiFilledInput-root": {
    backgroundColor: "white"
  },
  "&:hover .MuiFilledInput-root": {
    backgroundColor: "white"
  },
  '& .MuiInputLabel-root': {
    fontSize: 13,
  },
  "& .css-e4w4as-MuiFormLabel-root-MuiInputLabel-root": {
    transform: "translate(10px, 32px) scale(1) !important",
  },
  [theme.breakpoints.down("sm")]: {
    // height: "43px"
    marginBottom: "10px"
  },
}));

const Form = ({ response, getActualResponse }) => {
  const isNarrowScreen = useMediaQuery("(max-width:425px)");
  const changeLayout = useMediaQuery("(max-width:480px)");

  const route = useRouter();


  const [submitted, setSubmitted] = useState(false);
  const [formInput, setFormInput] = useState({
    userName: "",
    email: "",
    phone: "",
    country: "",
    company: "",
    message: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    usernameError: null,
    emailError: null,
    phoneError: null,
    countryError: null,
    companyError: null,
    messageError: null,
  });

  const [checkInputVal, setCheckInputVal] = useState({
    usernameError: false,
    emailError: false,
    phoneError: false,
    countryError: false,
    companyError: false,
    messageError: false,
  });

  const submitForm = (formInput) => {

    const trimmedUserName = (formInput.userName || "").trim();
    const trimmedEmail = (formInput.email || "").trim();
    const trimmedPhone = (formInput.phone || "").trim();
    const trimmedCountry = (formInput.country || "").trim();
    const trimmedCompany = (formInput.company || "").trim();
    const trimmedMessage = (formInput.message || "").trim();
    let formIsValid = true;

    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const phoneRegex = /^[0-9]+$/;
    const countryRegex = /^[A-Za-z\s]+$/;

    if (!nameRegex.test(trimmedUserName)) {
      setErrorMessage((prevErrors) => ({
        ...prevErrors,
        usernameError: "Name should contain only alphabets",
      }));
      setCheckInputVal((prevCheckVals) => ({
        ...prevCheckVals,
        usernameError: true,
      }));
      formIsValid = false;
    }
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage((prevErrors) => ({
        ...prevErrors,
        emailError: "Invalid Email format",
      }));
      setCheckInputVal((prevCheckVals) => ({
        ...prevCheckVals,
        emailError: true,
      }));
      formIsValid = false;
    }
    if (!phoneRegex.test(trimmedPhone)) {
      setErrorMessage((prevErrors) => ({
        ...prevErrors,
        phoneError: "Phone should contain only numbers",
      }));
      setCheckInputVal((prevCheckVals) => ({
        ...prevCheckVals,
        phoneError: true,
      }));
      formIsValid = false;
    }
    if (!countryRegex.test(trimmedCountry)) {
      setErrorMessage((prevErrors) => ({
        ...prevErrors,
        countryError: "Country should contain only alphabets",
      }));
      setCheckInputVal((prevCheckVals) => ({
        ...prevCheckVals,
        countryError: true,
      }));
      formIsValid = false;
    }
    if (!trimmedCompany) {
      setErrorMessage((prevErrors) => ({
        ...prevErrors,
        companyError: "Incorrect Company",
      }));
      setCheckInputVal((prevCheckVals) => ({
        ...prevCheckVals,
        companyError: true,
      }));
      formIsValid = false;
    }
    if (!trimmedMessage) {
      setErrorMessage((prevErrors) => ({
        ...prevErrors,
        messageError: "Incorrect Message",
      }));
      setCheckInputVal((prevCheckVals) => ({
        ...prevCheckVals,
        messageError: true,
      }));
      formIsValid = false;
    }
    if (trimmedUserName.length === 0) {
      setErrorMessage((prevErrors) => ({
        ...prevErrors,
        usernameError: "Name cannot be empty",
      }));
      setCheckInputVal((prevCheckVals) => ({
        ...prevCheckVals,
        usernameError: true,
      }));
      formIsValid = false;
    }
    if (trimmedEmail.length === 0) {
      setErrorMessage((prevErrors) => ({
        ...prevErrors,
        emailError: "Email cannot be empty",
      }));
      setCheckInputVal((prevCheckVals) => ({
        ...prevCheckVals,
        emailError: true,
      }));
      formIsValid = false;
    }
    if (trimmedPhone.length === 0) {
      setErrorMessage((prevErrors) => ({
        ...prevErrors,
        phoneError: "Phone cannot be empty",
      }));
      setCheckInputVal((prevCheckVals) => ({
        ...prevCheckVals,
        phoneError: true,
      }));
      formIsValid = false;
    }
    if (trimmedCountry.length === 0) {
      setErrorMessage((prevErrors) => ({
        ...prevErrors,
        countryError: "Country cannot be empty",
      }));
      setCheckInputVal((prevCheckVals) => ({
        ...prevCheckVals,
        countryError: true,
      }));
      formIsValid = false;
    }

    if (formIsValid) {
      setSubmitted(true);

      getActualResponse(false, {
        ...formInput,
        ...response,
      });
      route.push('/thank-you', { scroll: false });
      postData({ ...response, ...formInput });
    } else {
      setSubmitted(false);
    }
  };


  return (
    <CustomBox
      sx={{
        backgroundColor: "#fff",
        maxWidth: "800px",
        maxHeight: "70vh",
        overflowY: "auto",
        display: submitted ? "none" : "block",
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: "1em", color: "#0069d9" }}>
        Get in touch to discuss your project
      </Typography>
      <form>
        <Box>
          <Box sx={{ display: "flex", gap: changeLayout ? "0em" : "1em", flexDirection: changeLayout ? "column" : "row" }}>

            <CustomTextField
              required
              id="filled-required, user-name"
              label="Name"
              variant="filled"

              style={{
                width: "100%",

              }}
              value={formInput.userName}
              onChange={(e) => {
                setFormInput({
                  userName: e.target.value,
                  email: formInput.email,
                  phone: formInput.phone,
                  country: formInput.country,
                  company: formInput.company,
                });
                setErrorMessage({
                  usernameError: null, emailError: null, phoneError: null,
                  countryError: null,
                  companyError: null,
                  messageError: null
                });
                setCheckInputVal(false);
              }}
              error={checkInputVal.usernameError}
              helperText={errorMessage.usernameError}
            />
            <CustomTextField
              required
              id="filled-required, user-email"
              label="Email"
              variant="filled"


              style={{ width: "100%" }}
              value={formInput.email}
              onChange={(e) => {
                setFormInput({
                  userName: formInput.userName,
                  email: e.target.value,
                  phone: formInput.phone,
                  userName: formInput.userName,
                  message: formInput.message,
                  company: formInput.company,
                  country: formInput.country
                });
                setErrorMessage({
                  usernameError: null, emailError: null, phoneError: null,
                  countryError: null,
                  companyError: null,
                  messageError: null
                });
                setCheckInputVal(false);
              }}
              error={checkInputVal.emailError}
              helperText={errorMessage.emailError}

            />
          </Box>

          <Box sx={{ display: "flex", gap: changeLayout ? "0em" : "1em", flexDirection: changeLayout ? "column" : "row" }}>
            <CustomTextField
              required
              id="filled-required, phone"
              label="Phone"
              variant="filled"


              style={{
                width: "100%",
              }}
              value={formInput.phone}
              onChange={(e) => {
                setFormInput({
                  phone: e.target.value,
                  userName: formInput.userName,
                  email: formInput.email,
                  message: formInput.message,
                  company: formInput.company,
                  country: formInput.country
                });
                setErrorMessage({
                  usernameError: null, emailError: null, phoneError: null,
                  countryError: null,
                  companyError: null,
                  messageError: null
                });
                setCheckInputVal(false);
              }}
              error={checkInputVal.phoneError}
              helperText={errorMessage.phoneError}
            />
            <CustomTextField
              required
              id="filled-required, country"
              label="Country"
              variant="filled"


              style={{ width: "100%" }}
              value={formInput.country}
              onChange={(e) => {
                setFormInput({
                  country: e.target.value,
                  phone: formInput.phone,
                  userName: formInput.userName,
                  email: formInput.email,
                  message: formInput.message,
                  company: formInput.company
                });
                setErrorMessage({
                  usernameError: null, emailError: null, phoneError: null,
                  countryError: null,
                  companyError: null,
                  messageError: null
                });
                setCheckInputVal(false);
              }}
              error={checkInputVal.countryError}
              helperText={errorMessage.countryError}

            />
          </Box>
          <Box>

            <CustomTextField
              required
              id="filled-required, company"
              label="Company"
              variant="filled"


              style={{ width: "100%" }}
              value={formInput.company}
              onChange={(e) => {
                setFormInput({
                  phone: formInput.phone,
                  userName: formInput.userName,
                  email: formInput.email,
                  country: formInput.country,
                  company: e.target.value,
                  message: formInput.message
                });
                setErrorMessage({
                  usernameError: null, emailError: null, phoneError: null,
                  countryError: null,
                  companyError: null,
                  messageError: null
                });
                setCheckInputVal(false);
              }}
              error={checkInputVal.companyError}
              helperText={errorMessage.companyError}
            />
          </Box>
          <Box>

            <CustomTextField
              required
              id="filled-required, message"
              label="Message"
              variant="filled"
              style={{ width: "100%" }}
              value={formInput.message}
              onChange={(e) => {
                setFormInput({
                  phone: formInput.phone,
                  userName: formInput.userName,
                  email: formInput.email,
                  country: formInput.country,
                  company: formInput.company,
                  message: e.target.value,
                });
                setErrorMessage({
                  usernameError: null, emailError: null, phoneError: null,
                  countryError: null,
                  companyError: null,
                  messageError: null
                });
                setCheckInputVal(false);
              }}
              error={checkInputVal.messageError}
              helperText={errorMessage.messageError}
            />
          </Box>

          <Box sx={{ paddingTop: isNarrowScreen ? "1em" : ".5em" }}>
            <FormControlLabel control={<Checkbox defaultChecked />} sx={{
              "& .MuiTypography-root": {
                fontSize: 13
              },
              "& .Mui-checked": {
                color: "#0045e6",
              },

            }} label="I want to receive news and updates once in a while" />
          </Box>


          <Typography variant="body1" sx={{ fontSize: "12px", padding: isNarrowScreen ? "1em 0 .7em 0" : "1em 0 1.5em 0" }}>We will add your info to our CRM for contacting you regarding your request. For more info please consult our <span style={{ color: "#0045e6", fontWeight: 600 }}>privacy policy</span></Typography>

          <Button
            sx={{ backgroundColor: "#0045e6", padding: '1em 4em', borderRadius: "3em" }}
            variant="contained"
            onClick={() => {
              submitForm(formInput);

            }}
          >
            Send Message
          </Button>

        </Box>
      </form>
    </CustomBox >
  );
};

export default Form;

