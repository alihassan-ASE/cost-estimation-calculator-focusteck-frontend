"use client";
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  useMediaQuery,
  InputLabel,
  Input,
  InputBase,
  OutlinedInput,
  FormControl
} from "@mui/material";
import { postData } from "../../lib/api/postData";
import { alpha, styled } from '@mui/material/styles';
import { useRouter } from "next/navigation";

const CustomBox = styled(Box)(({ theme }) => ({
  margin: "3em 0",
  padding: "33px 39px",
  maxWidth: 700,
  borderRadius: "10px",
  // border: "1px solid gray",
  boxShadow: "0px 4px 64px 0px #0000001A",
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

const InputField = styled(TextField)(({ theme }) => ({
  'label + &': {
    marginTop: 0,
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: "#F9F9F9",
    border: '1px solid',
    borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
    fontSize: 16,
    width: '100%',
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    fontFamily: ["Aeonik", "Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
      ","
    ),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
    '&::placeholder': {
      color: '#616161',
      fontSize: "12.87px",
      fontWeight: 400,
      lineHeight: "15.45px",
      letterSpacing: "0.009em"
    }
  },
}));

const CustomInputLabel = styled(InputLabel)(({ theme }) => ({
  fontSize: "12.87px",
  fontWeight: 400,
  lineHeight: "15.45px",
  color: "#000"
}));

const CustomTextField = styled(TextField)(({ theme }) => ({
  marginBottom: "1em",
  borderRadius: "2em",
  width: "100%",
  marginBottom: "0px",
  "&.MuiFormControl-root .MuiFormHelperText-root": {
    marginLeft: "0px"
  },
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
    // country: "",
    company: "",
    message: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    usernameError: null,
    emailError: null,
    phoneError: null,
    // countryError: null,
    companyError: null,
    messageError: null,
  });

  const [checkInputVal, setCheckInputVal] = useState({
    usernameError: false,
    emailError: false,
    phoneError: false,
    // countryError: false,
    companyError: false,
    messageError: false,
  });

  const submitForm = (formInput) => {

    const trimmedUserName = (formInput.userName || "").trim();
    const trimmedEmail = (formInput.email || "").trim();
    const trimmedPhone = (formInput.phone || "").trim();
    // const trimmedCountry = (formInput.country || "").trim();
    const trimmedCompany = (formInput.company || "").trim();
    const trimmedMessage = (formInput.message || "").trim();
    let formIsValid = true;

    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const phoneRegex = /^[0-9]+$/;
    // const countryRegex = /^[A-Za-z\s]+$/;

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
    // if (!countryRegex.test(trimmedCountry)) {
    //   setErrorMessage((prevErrors) => ({
    //     ...prevErrors,
    //     countryError: "Country should contain only alphabets",
    //   }));
    //   setCheckInputVal((prevCheckVals) => ({
    //     ...prevCheckVals,
    //     countryError: true,
    //   }));
    //   formIsValid = false;
    // }
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
    // if (trimmedCountry.length === 0) {
    //   setErrorMessage((prevErrors) => ({
    //     ...prevErrors,
    //     countryError: "Country cannot be empty",
    //   }));
    //   setCheckInputVal((prevCheckVals) => ({
    //     ...prevCheckVals,
    //     countryError: true,
    //   }));
    //   formIsValid = false;
    // }

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
        maxWidth: "600px",
        // maxHeight: "70vh",
        // overflowY: "auto",
        display: submitted ? "none" : "block",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h5" sx={{
          marginBottom: "25px", color: "#000", width: "447px",
          textAlign: "center", fontSize: "16px", fontWeight: 400, lineHeight: "20px"
        }}>
          Lorem Ipsum is simply dummy text of the typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </Typography>
      </Box>
      <form>
        <Box sx={{ display: "flex", flexDirection: "column", gap: '25px' }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: '7.36px' }}>
            <CustomInputLabel htmlFor="user-name">
              Name*
            </CustomInputLabel>
            <CustomTextField
              required
              id="outlined-required, user-name"
              variant="outlined"
              placeholder="Name"
              size="small"
              value={formInput.userName}
              onChange={(e) => {
                setFormInput({
                  userName: e.target.value,
                  email: formInput.email,
                  phone: formInput.phone,
                  // country: formInput.country,
                  company: formInput.company,
                });
                setErrorMessage({
                  usernameError: null, emailError: null, phoneError: null,
                  // countryError: null,
                  companyError: null,
                  messageError: null
                });
                setCheckInputVal(false);
              }}
              error={checkInputVal.usernameError}
              helperText={errorMessage.usernameError}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: '7.36px' }}>
            <CustomInputLabel>
              Email Address*
            </CustomInputLabel>
            <CustomTextField
              required
              id="outlined-required, user-email"
              variant="outlined"
              placeholder="Email Address"
              size="small"
              value={formInput.email}
              onChange={(e) => {
                setFormInput({
                  userName: formInput.userName,
                  email: e.target.value,
                  phone: formInput.phone,
                  userName: formInput.userName,
                  message: formInput.message,
                  company: formInput.company,
                  // country: formInput.country
                });
                setErrorMessage({
                  usernameError: null, emailError: null, phoneError: null,
                  // countryError: null,
                  companyError: null,
                  messageError: null
                });
                setCheckInputVal(false);
              }}
              error={checkInputVal.emailError}
              helperText={errorMessage.emailError}

            />
          </Box>
          {/* </Box> */}

          <Box sx={{ display: "flex", gap: changeLayout ? "0em" : "7.36px", flexDirection: changeLayout ? "column" : "row", }}>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: '7.36px' }}>
              <CustomInputLabel htmlFor="company">
                Company*
              </CustomInputLabel>
              <CustomTextField
                required
                id="outlined-required, company"
                variant="outlined"
                placeholder="Company"
                size="small"
                value={formInput.company}
                onChange={(e) => {
                  setFormInput({
                    phone: formInput.phone,
                    userName: formInput.userName,
                    email: formInput.email,
                    // country: formInput.country,
                    company: e.target.value,
                    message: formInput.message
                  });
                  setErrorMessage({
                    usernameError: null, emailError: null, phoneError: null,
                    // countryError: null,
                    companyError: null,
                    messageError: null
                  });
                  setCheckInputVal(false);
                }}
                error={checkInputVal.companyError}
                helperText={errorMessage.companyError}
              />
            </Box>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: '7.36px' }}>
              <CustomInputLabel htmlFor="phone">
                Phone Number*
              </CustomInputLabel>
              <CustomTextField
                required
                id="outlined-required, phone"
                variant="outlined"
                placeholder="0000 0000000"
                size="small"
                value={formInput.phone}
                onChange={(e) => {
                  setFormInput({
                    phone: e.target.value,
                    userName: formInput.userName,
                    email: formInput.email,
                    message: formInput.message,
                    company: formInput.company,
                    // country: formInput.country
                  });
                  setErrorMessage({
                    usernameError: null, emailError: null, phoneError: null,
                    // countryError: null,
                    companyError: null,
                    messageError: null
                  });
                  setCheckInputVal(false);
                }}
                error={checkInputVal.phoneError}
                helperText={errorMessage.phoneError}
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: '7.36px' }}>
            <CustomInputLabel htmlFor="message">
              Message*
            </CustomInputLabel>
            <CustomTextField
              required
              id="outlined-required, message"
              placeholder="Message"
              variant="outlined"
              size="small"
              value={formInput.message}
              onChange={(e) => {
                setFormInput({
                  phone: formInput.phone,
                  userName: formInput.userName,
                  email: formInput.email,
                  // country: formInput.country,
                  company: formInput.company,
                  message: e.target.value,
                });
                setErrorMessage({
                  usernameError: null, emailError: null, phoneError: null,
                  // countryError: null,
                  companyError: null,
                  messageError: null
                });
                setCheckInputVal(false);
              }}
              error={checkInputVal.messageError}
              helperText={errorMessage.messageError}
            />
          </Box>



        </Box>
        <Box sx={{ padding: isNarrowScreen ? "15px 0" : "25px 0" }}>
          <FormControlLabel control={<Checkbox defaultChecked />} sx={{
            "& .MuiTypography-root": {
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "10px"
            },
            "& .Mui-checked": {
              color: "#005DBD",
            },

          }} label="I want to receive news and updates once in a while" />
        </Box>


        <Typography variant="body1" sx={{ fontSize: "12px", fontWeight: 400, lineHeight: "13px" }}>We will add your info to our CRM for contacting you regarding your request. For more info please consult our <span style={{ color: "#005DBD", fontWeight: 600 }}>Privacy Policy</span></Typography>

        <Box sx={{ display: "flex", justifyContent: 'center' }}>
          <Button
            sx={{
              backgroundColor: "#005DBD", padding: '15px 25px', borderRadius: "4px", width: "215px", textAlign: "center",
              marginTop: "20px"
            }}
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

