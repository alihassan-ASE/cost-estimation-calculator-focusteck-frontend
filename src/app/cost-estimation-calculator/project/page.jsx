"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";

import {
  getQuestions,
  getDynamicQuestion,
  postData,
} from "../../lib/api/getProjectQuestions";

import {
  Box,
  Typography,
  Button,
  Slide,
  IconButton,
  Stack,
  Stepper,
  Step,
  StepButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  TextField,
  Grid,
  Paper,
} from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { styled } from "@mui/material/styles";

const page = () => {
  const [preQuestions, setPreQuestions] = useState([]);
  const [projectBasedQuestion, setProjectBasedQuestion] = useState([]);
  const [postQuestions, setPostQuestions] = useState([]);

  // Questions States
  const [preOption, setPreOption] = useState(0);
  const [dynamicOption, setDynamicOption] = useState(0);
  const [postOption, setPostOption] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getQuestions();
        const dynamic = await getDynamicQuestion();
        setPreQuestions(data.preProjectQuestion);
        setPostQuestions(data.postProjectQuestion);
        setProjectBasedQuestion(dynamic);
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dynamic = await getDynamicQuestion();
        setProjectBasedQuestion(dynamic);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dynamicOption]);

  let otherData = {
    opt: null,
    price: null,
  };
  const DRAWER_WIDTH = 240;
  const [saveData, setSaveData] = useState({});

  const [returnedIndexVal, setReturnedIndexVal] = useState(0);

  // For go back button
  const [currentState, setCurrentState] = useState("Pre");
  const setRefForBothVal = useRef("Seperate");
  const [formInput, setFormInput] = useState({
    userName: "",
    email: "",
    otherval: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    usernameError: null,
    emailError: null,
    otherValError: null,
  });

  const [priceVal, setPriceVal] = useState(0);

  // For Animations
  const [slideIn, setSlideIn] = useState(false);
  const [slideDirection, setSlideDirection] = useState("left");

  // For Other (Specify) Button
  const [inputField, setInputField] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const setArray = useRef([]);

  // Get Multiple Values
  const [multiple, setMultipleValues] = useState(0);

  const getMultipleValues = (data) => {
    setPriceVal(priceVal + data.price);

    if (setArray.current.length === 0) {
      setArray.current = [{ ...data }];
    } else if (setArray.current.length > 0) {
      setArray.current = [...setArray.current, { ...data }];
    }

    setMultipleValues(multiple + 1);
  };

  // Stepper

  const handleStep = async (step, label) => {
    console.log("step", step);
    console.log("Question", label);

    if (currentState === "Dynamic") {
      if (saveData.responses && saveData.responses.length > 0) {
        saveData.responses.map(async (object, index) => {
          if (
            object.label.toLowerCase() === label.question.toLowerCase() &&
            step > preQuestions.length
          ) {
            setProjectBasedQuestion(object);
            await getDynamicQuestion(object._id);
          } else if (
            object.label.toLowerCase() === label.question.toLowerCase() &&
            step <= preQuestions.length
          ) {
            setCurrentState("Pre");
            setPreOption(step);
            const dynamicQuestion = await getDynamicQuestion();
            setProjectBasedQuestion(dynamicQuestion);
          }
        });
      }
    }

    if (saveData && saveData.responses && saveData.responses.length > 0) {
      const selectedOptions = saveData.responses.slice(step);
      const updatedTotalCost = selectedOptions.reduce(
        (total, response) => total - response.selectedOption.price,
        saveData.totalCost
      );

      saveData.totalCost = updatedTotalCost;
      setPriceVal(updatedTotalCost);
      saveData.responses.length = step;
    }

    if (currentState === "Pre") {
      setPreOption(step);
    } else if (currentState === "post") {
      if (postOption < postQuestions.length) {
        postQuestions.map((data, index) => {
          if (data.label.toLowerCase() === label.question.toLowerCase()) {
            setPostOption(index);
          }
        });
      }
      if (step <= preQuestions.length) {
        preQuestions.map((data, index) => {
          if (data.label.toLowerCase() === label.question.toLowerCase()) {
            setCurrentState("Pre");
            setPreOption(index);
          }
        });
      }
    }
  };

  function saveAllData(selectedOption, question) {
    if (selectedOption.userName && selectedOption.email) {
      setSaveData({
        userName: selectedOption.userName,
        email: selectedOption.email,
        totalCost: priceVal,
        responses: saveData.responses,
      });
    } else {
      let getQuestion;
      let getIndexOfQuestion;
      if (saveData.responses && saveData.responses.length > 0) {
        saveData.responses.forEach((element, index) => {
          if (element.question === question.question) {
            getQuestion = element;
            getIndexOfQuestion = index;
          }
        });
      }

      if (currentState === "Pre" || currentState === "post") {
        if (
          question._id !== undefined &&
          question.question !== undefined &&
          question.category !== undefined &&
          question.options !== undefined &&
          selectedOption !== undefined
        ) {
          if (
            saveData.responses &&
            saveData.responses.length >= 1 &&
            getQuestion === undefined
          ) {
            if (Array.isArray(selectedOption)) {
              setSaveData({
                totalCost: priceVal,
                responses: [
                  ...saveData.responses,
                  {
                    _id: question._id,
                    question: question.question,
                    options: question.options,
                    category: question.category,
                    selectedOption: selectedOption,
                    label: question.label,
                    state: currentState,
                  },
                ],
              });
            } else {
              setPriceVal(priceVal + selectedOption.price);
              setSaveData({
                totalCost: priceVal + selectedOption.price,
                responses: [
                  ...saveData.responses,
                  {
                    _id: question._id,
                    question: question.question,
                    options: question.options,
                    category: question.category,
                    selectedOption: selectedOption,
                    label: question.label,
                    state: currentState,
                  },
                ],
              });
            }
          } else if (
            saveData.responses &&
            saveData.responses.length >= 1 &&
            getQuestion.question === question.question &&
            getQuestion.selectedOption.opt !== selectedOption.opt
          ) {
            saveData.totalCost =
              priceVal -
              getQuestion.selectedOption.price +
              selectedOption.price;
            setPriceVal(saveData.totalCost);
            saveData.responses[getIndexOfQuestion].selectedOption =
              selectedOption;
            if (currentState === "Pre") {
              setPreOption(getIndexOfQuestion + 1);
            } else if (currentState === "post") {
              setPostOption(getIndexOfQuestion + 1);
            }
          } else if (
            (saveData && !saveData.responses) ||
            saveData.responses.length === 0
          ) {
            setPriceVal(priceVal + selectedOption.price);
            setSaveData({
              totalCost: selectedOption.price,
              responses: [
                {
                  _id: question._id,
                  question: question.question,
                  options: question.options,
                  category: question.category,
                  selectedOption: selectedOption,
                  label: question.label,
                  state: currentState,
                },
              ],
            });
          }
        } else {
          console.log(
            "Something is Missing in Pre Data values or Post Data Value"
          );
        }
      } else if (currentState === "Dynamic") {
        if (
          question._id !== undefined &&
          question.question !== undefined &&
          question.options !== undefined &&
          selectedOption !== undefined &&
          (question.nextQuestion !== undefined || selectedOption.nextQuestion)
        ) {
          if (
            saveData.responses &&
            saveData.responses.length >= 1 &&
            getQuestion === undefined
          ) {
            setPriceVal(priceVal + selectedOption.price);
            setSaveData({
              totalCost: priceVal + selectedOption.price,
              responses: [
                ...saveData.responses,
                {
                  _id: question._id,
                  question: question.question,
                  options: question.options,
                  selectedOption: selectedOption,
                  nextQuestion: question.nextQuestion
                    ? question.nextQuestion
                    : selectedOption.nextQuestion,
                  label: question.label,
                  state: currentState,
                },
              ],
            });
          } else if (
            saveData.responses &&
            saveData.responses.length >= 1 &&
            getQuestion.question === question.question &&
            getQuestion.selectedOption.value !== selectedOption.value
          ) {
            saveData.totalCost =
              priceVal -
              getQuestion.selectedOption.price +
              selectedOption.price;
            setPriceVal(saveData.totalCost);
            saveData.responses[getIndexOfQuestion].selectedOption =
              selectedOption;
          }
        }
      } else {
        console.log("currentState is not Pre, dynamic, post");
      }
    }
  }

  const handleFlow = (question) => {
    saveData.responses.pop();

    if (
      Array.isArray(question.selectedOption) &&
      question.selectedOption.length > 0
    ) {
      debugger
      const subtract = question.selectedOption.reduce((total, resource) => {
        const price = resource?.price || 0;
        return total + price;
      }, 0);

      saveData.totalCost -= subtract;
      setArray.current = [];
    } else {
      saveData.totalCost -= question.selectedOption?.price || 0;
    }

    setPriceVal(saveData.totalCost);


    if (currentState === "Pre" && preOption >= 0) {
      // saveData.responses.pop();
      // saveData.totalCost = saveData.totalCost - question.selectedOption.price;
      // setPriceVal(saveData.totalCost);
      setPreOption(preOption - 1);
    } else if (currentState === "Dynamic") {
      if (saveData && saveData.responses) {
        const responsesLength = saveData.responses.length;

        if (responsesLength <= preQuestions.length) {
          setCurrentState("Pre");
          // saveData.responses.pop();
          // saveData.totalCost =
          //   saveData.totalCost - question.selectedOption.price;
          // setPriceVal(saveData.totalCost);
          setPreOption(responsesLength - 1);
        } else if (responsesLength > preQuestions.length) {
          setProjectBasedQuestion(question);
          // saveData.responses.pop();
          // saveData.totalCost =
          //   saveData.totalCost - question.selectedOption.price;
          // setPriceVal(saveData.totalCost);
        }
      }
    } else if (currentState === "post" && postOption >= 0) {
      setPostOption(postOption - 1);
      // saveData.responses.pop();
      // saveData.totalCost = saveData.totalCost - question.selectedOption.price;
      // setPriceVal(saveData.totalCost);
    }
    if (currentState === "post" && postOption === 0) {
      setCurrentState("Dynamic");
      setProjectBasedQuestion(question);
    }
  };

  console.log(saveData);
  const { question, options, nextQuestion } = projectBasedQuestion;

  let i = 0;

  const getNextDynamicQuestion = async (nextQuestion, value, question) => {
    try {
      let nextQuestionID;

      if (value === "Other (Specify)") {
        setInputField(!inputField);
      } else {
        if (Array.isArray(nextQuestion)) {
          console.log("Array", nextQuestion);
          let array = nextQuestion;
          if (array.length > i && i === 0) {
            nextQuestionID = array[i];
            i++;
          } else if (array.length > i && i > 0) {
            nextQuestionID = array[i + 1];
          }
        } else if (nextQuestion === "" || nextQuestion === undefined) {
          nextQuestionID = question.nextQuestion;
          if (setRefForBothVal.current === "Both" && nextQuestionID === "") {
            setRefForBothVal.current = "Seperate";
            nextQuestionID = "6560a181c9f7ceabb2c23848";
          }
        } else if (value === "Both" && nextQuestion) {
          nextQuestionID = nextQuestion;
          setRefForBothVal.current = "Both";
        } else {
          nextQuestionID = nextQuestion;
        }

        const projectBased = await getDynamicQuestion(nextQuestionID);
        setProjectBasedQuestion(projectBased);

        if (
          (currentState === "Dynamic" &&
            setRefForBothVal.current === "Seperate" &&
            nextQuestionID === "") ||
          nextQuestionID === undefined
        ) {
          setCurrentState("post");
          setPostOption(0);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Additional Questions
  const getPreAdditionalQuestion = () => {
    let getQuestions = preQuestions[preOption];
    let getIndexOfQuestion = preOption;

    return { getQuestions, getIndexOfQuestion };
  };

  const getPostAdditionalQuestion = () => {
    const getQuestion = postQuestions[postOption];
    return getQuestion;
  };

  const getNextQuestionFromAdditional = (option) => {
    const value = option.opt;

    if (returnedIndexVal !== -1) {
      if (value === "Other (Specify)") {
        setInputField(!inputField);
      } else if (
        currentState === "Pre" &&
        preOption === preQuestions.length - 1
      ) {
        setCurrentState("Dynamic");
      } else if (currentState === "post") {
        setCurrentState("post");
        setPostOption(postOption + 1);
      } else {
        setPreOption(preOption + 1);
      }
    }
  };

  const getActiveStep = () => {
    if (saveData.responses) {
      const saveDataLength = saveData.responses.length;
      return saveDataLength;
    }
    return 0;
  };

  const getUniqueSteps = () => {
    const uniqueSteps = new Set();

    if (saveData.responses && saveData.responses.length > 0) {
      saveData.responses.forEach((response) => {
        if (response.label) {
          uniqueSteps.add(response.label.toUpperCase());
        }
      });
    }

    const preQuestion = getPreAdditionalQuestion().getQuestions;
    const dynamicQuestion = projectBasedQuestion.question;
    const postQuestion = getPostAdditionalQuestion();
    if (preQuestion && currentState === "Pre") {
      uniqueSteps.add(preQuestion.label.toUpperCase());
    }

    if (dynamicQuestion && currentState === "Dynamic") {
      uniqueSteps.add(projectBasedQuestion.label.toUpperCase());
    }

    if (postQuestion && currentState === "post") {
      uniqueSteps.add(postQuestion.label.toUpperCase());
    }

    return Array.from(uniqueSteps).map((question) => ({
      question: question.question || question,
      completed: false,
    }));
  };

  const submitOtherVal = () => {
    if (!formInput.otherval) {
      setErrorMessage({ otherValError: "Field cannot be empty" });
    }
    if (formInput.otherval) {
      setErrorMessage({ otherValError: null });
      setInputField(!inputField);
    }
  };

  const submitForm = () => {
    if (!formInput.userName) {
      setErrorMessage({ usernameError: "Incorrect userName" });
    }
    if (!formInput.email) {
      setErrorMessage({ emailError: "Incorrect Email" });
    }
    if (formInput.userName && formInput.email) {
      setErrorMessage({ usernameError: null, emailError: null });
      setCurrentState("Submitted");
    }
  };

  if (currentState === "Submitted") {
    postData(saveData);
  }

  /* -------------------- Styles -------------------- */
  const Item = styled(Paper)(({ theme }) => ({
    // ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    // color: theme.palette.text.secondary,
  }));

  console.log("response: ", saveData);
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Main Heading */}
      <Typography variant="h4" mb={4} mt={4}>
        Project Base Question
      </Typography>
      {/* Stepper */}
      {
        <Stack direction="column" spacing={1}>
          <Stepper nonLinear activeStep={getActiveStep()} alternativeLabel>
            {getUniqueSteps().map((step, index) => (
              <Step key={index} completed={step.completed}>
                <StepButton
                  color="inherit"
                  onClick={() => {
                    console.log("In onClick", step);
                    handleStep(index, step);
                    console.log("Clicked");
                  }}
                >
                  {step.question}
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </Stack>
      }
      {/* <Grid container spacing={2} sx={{ flexDirection: { xs: "column", md: "row"} }}>
      <Grid item md={3}> */}
      {/* <Item> */}
      <List>
        <ListItemText
          // primary="Estimated Cost"
          primary={
            <React.Fragment>
              <Typography variant="h4" component="p" color="text.primary">
                Estimated Cost
              </Typography>
              <Typography variant="h5" component="p" color="text.secondary">
                {priceVal} $
              </Typography>
              {/* Other components or data */}
            </React.Fragment>
          }
        />
      </List>
      {/* </Item> */}
      {/* </Grid> */}
      {/* <Grid item md={9}>
        <Item>
        <Slide */}
      {/* direction={slideDirection}
          in={!slideIn}
          mountOnEnter
          unmountOnExit
        > */}
      <Box>
        <Stack
          direction="row"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* GO Back Button */}
          {preOption > 0 ? (
            <span>
              <IconButton
                onClick={() => {
                  const previousQuestion =
                    saveData.responses[saveData.responses.length - 1];
                  handleFlow(previousQuestion);
                }}
              >
                <ArrowBack />
              </IconButton>
            </span>
          ) : null}
        </Stack>

        {/* Main Question */}
        <Typography variant="h4" p={2} style={{ textAlign: "left" }}>
          {currentState === "Pre"
            ? getPreAdditionalQuestion()?.getQuestions?.question
            : currentState === "Dynamic"
            ? question
            : postOption < postQuestions.length
            ? getPostAdditionalQuestion()?.question
            : null}
        </Typography>

        {/* Options */}
        <Stack direction="row" sx={{ flexWrap: "wrap" }}>
          {currentState === "Pre" ? (
            getPreAdditionalQuestion()?.getQuestions?.options.map(
              (data, index) => (
                <React.Fragment key={index}>
                  <Button
                    size="large"
                    variant="outlined"
                    sx={{ maxWidth: 260, m: 1.5 }}
                    onClick={() => {
                      if (data.opt !== "Other (Specify)") {
                        saveAllData(
                          data,
                          getPreAdditionalQuestion()?.getQuestions
                        );
                        getNextQuestionFromAdditional(data);
                      } else {
                        setInputField(!inputField);
                      }
                    }}
                  >
                    {data.opt} ({data.price}$)
                  </Button>
                  {data.opt === "Other (Specify)"
                    ? inputField && (
                        <Box>
                          <TextField
                            fullWidth
                            id="fullWidth"
                            label="Other"
                            variant="outlined"
                            sx={{ width: "90%" }}
                            value={formInput.otherval}
                            onChange={(e) => {
                              setFormInput({ otherval: e.target.value });
                            }}
                            helperText={errorMessage.otherValError}
                          />
                          <Button
                            variant="contained"
                            onClick={() => {
                              otherData.price = data.price;
                              otherData.opt = formInput.otherval;

                              if (formInput.otherval !== "") {
                                saveAllData(
                                  otherData,
                                  getPreAdditionalQuestion()?.getQuestions
                                );
                                getNextQuestionFromAdditional(inputValue);
                                setInputField(false);
                                setFormInput({ otherval: "" });
                                setErrorMessage({ otherValError: null });
                              } else {
                                submitOtherVal(inputValue);
                              }
                            }}
                          >
                            Enter
                          </Button>
                        </Box>
                      )
                    : null}
                </React.Fragment>
              )
            )
          ) : currentState === "Dynamic" ? (
            options?.map((data, index) => (
              <React.Fragment key={index}>
                <Button
                  size="large"
                  variant="outlined"
                  sx={{ maxWidth: 260, m: 1.5 }}
                  onClick={() => {
                    getNextDynamicQuestion(
                      data.nextQuestion,
                      data.opt,
                      projectBasedQuestion
                    );
                    if (data.opt !== "Other (Specify)") {
                      saveAllData(data, projectBasedQuestion);
                    }
                  }}
                >
                  {data.opt} ({data.price}$)
                </Button>
                {data.opt === "Other (Specify)"
                  ? inputField && (
                      <Box>
                        <TextField
                          fullWidth
                          id="fullWidth"
                          label="Other"
                          variant="outlined"
                          sx={{ width: "90%" }}
                          value={formInput.otherval}
                          onChange={(e) => {
                            setFormInput({ otherval: e.target.value });
                          }}
                        />
                        <Button
                          variant="contained"
                          onClick={() => {
                            otherData.price = data.price;
                            otherData.opt = formInput.otherval;
                            if (formInput.otherval !== "") {
                              getNextDynamicQuestion(
                                data.nextQuestion,
                                otherData.opt,
                                projectBasedQuestion
                              );
                              saveAllData(otherData, projectBasedQuestion);
                              setInputField(false);
                              setFormInput({ otherval: "" });
                              setErrorMessage({ otherValError: null });
                            } else {
                              submitOtherVal(inputValue);
                            }
                          }}
                        >
                          Enter
                        </Button>
                      </Box>
                    )
                  : null}
              </React.Fragment>
            ))
          ) : postOption < postQuestions.length ? (
            getPostAdditionalQuestion()?.options.map((data, index) => (
              <React.Fragment key={index}>
                <Button
                  size="large"
                  variant="outlined"
                  sx={{ maxWidth: 260, m: 1.5 }}
                  onClick={() => {
                    const additionalQuestion = getPostAdditionalQuestion();

                    if (additionalQuestion.typeofselection === "single") {
                      getNextQuestionFromAdditional(data);
                      if (data.opt !== "Other (Specify)") {
                        saveAllData(data, additionalQuestion);
                      }
                    } else {
                      getMultipleValues(data);
                    }
                  }}
                >
                  {data.opt} ({data.price}$)
                </Button>
                {data.opt === "Other (Specify)"
                  ? inputField && (
                      <Box>
                        <TextField
                          fullWidth
                          id="fullWidth"
                          label="Other"
                          variant="outlined"
                          sx={{ width: "90%" }}
                          onChange={(e) => setInputValue(e.target.value)}
                        />
                        <Button
                          variant="contained"
                          onClick={() => {
                            otherData.price = data.price;
                            otherData.opt = inputValue;
                            if (formInput.otherval !== "") {
                              saveAllData(
                                otherData,
                                getPostAdditionalQuestion()
                              );
                              getNextQuestionFromAdditional(inputValue);
                              setInputField(false);
                              setFormInput({ otherval: "" });
                              setErrorMessage({ otherValError: null });
                            } else {
                              submitOtherVal(inputValue);
                            }
                          }}
                        >
                          Enter
                        </Button>
                      </Box>
                    )
                  : null}
              </React.Fragment>
            ))
          ) : currentState === "post" ? (
            <form>
              <Box>
                <TextField
                  sx={{ mb: 3 }}
                  fullWidth
                  id="outlined-basic, user-name"
                  label="Username"
                  variant="outlined"
                  value={formInput.userName}
                  onChange={(e) => {
                    setFormInput({
                      userName: e.target.value,
                      email: formInput.email,
                    });
                  }}
                  helperText={errorMessage.usernameError}
                />
                <TextField
                  sx={{ mb: 3 }}
                  fullWidth
                  id="outlined-basic, user-email"
                  label="Email"
                  variant="outlined"
                  value={formInput.email}
                  onChange={(e) => {
                    setFormInput({
                      userName: formInput.userName,
                      email: e.target.value,
                    });
                  }}
                  helperText={errorMessage.emailError}
                />
                <Button
                  variant="contained"
                  onClick={() => {
                    submitForm();
                    saveAllData(formInput);
                  }}
                >
                  Submit
                </Button>
              </Box>
            </form>
          ) : (
            <React.Fragment>
              <Typography variant="h3" component="h3">
                Thank You! We will contact you shortly
              </Typography>
            </React.Fragment>
          )}
          {multiple >= 3 && (
            <Button
              variant="contained"
              style={{ minWidth: 200 }}
              onClick={() => {
                setPostOption(postOption + 1);
                saveAllData(setArray.current, getPostAdditionalQuestion());
                setMultipleValues(0);
              }}
            >
              Next
            </Button>
          )}
        </Stack>
      </Box>
      {/* </Slide>
        </Item> */}
      {/* </Grid>
    </Grid> */}
    </Box>
  );
};

export default page;
