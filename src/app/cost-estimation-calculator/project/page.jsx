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
  const [saveData, setSaveData] = useState({});

  // State for Checking the index of the Dynamic questions. If state is set to -1, then the dynamic questions have ended and the Post Questions will start.
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

  // // Stepper
  // const handleStep = (step, label) => {
  //   console.log("In handleStep getting Params", step, label);
  //   console.log("In Handle", currentState);
  //   let getQuestion;
  //   let getIndexOfQuestion;
  //   // let additionalQuestion;
  //   let additionalQuestionIndex;
  //   if (step !== undefined && label !== undefined) {
  //     ProjectQuestions.forEach((data, index) => {
  //       if (data.question === label.question) {
  //         getQuestion = data;
  //         getIndexOfQuestion = index;
  //       }
  //     });
  //     // if (!getQuestion && !getIndexOfQuestion) {
  //     //    const index = getPreSequenceLength().sequence.findIndex(data =>
  //     //     data === label.id
  //     //   );
  //     //   additionalQuestionIndex = index;

  //     //   if(!getIndexOfQuestion){
  //     //     const index = getPostSequenceLength().sequence.findIndex(data =>
  //     //       data === label.id);
  //     //       additionalQuestionIndex = index;
  //     //   }
  //     // }
  //   }

  //   console.log("In handleStep", getQuestion, getIndexOfQuestion);
  //   if (currentState === "Pre") {
  //     if(getQuestion){
  //       setCurrentState('Dynamic');
  //       setDynamicOption(getIndexOfQuestion);
  //     }
  //     if (preOption !== step && !getQuestion) {
  //       setPreOption(step);
  //     }

  //   } else if (currentState === "Dynamic") {
  //     if (!getQuestion  && step < preSequenceLength) {
  //       setCurrentState("Pre");
  //       setPreOption(step);
  //     }
  //     else {
  //       console.log("In Dynamic for Post", additionalQuestionIndex);
  //       setCurrentState('post');
  //       setPostOption(step)
  //     }
  //     if (dynamicOption !== step && getQuestion !== undefined) {
  //       setDynamicOption(getIndexOfQuestion);
  //     }
  //   } else if (currentState === "post") {
  //     if (postOption !== step && !getQuestion) {
  //       setPostOption(step);
  //     }
  //     if (!getQuestion) {
  //       setCurrentState("Pre");
  //       setPreOption(step);
  //     } else {
  //       setCurrentState("Dynamic");
  //       setDynamicOption(getIndexOfQuestion);
  //     }
  //   }
  // };

  // const priceTotal = value => {
  //   // setPriceVal(priceVal + value);
  // }

  function saveAllData(selectedOption, question) {
    // console.log(selectedOption);
    if (selectedOption.opt === "Other (Specify)") {
      // console.log("Other Coming");
    }
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
          // priceVal !==undefined
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

  // const getPreSequenceLength = () => {
  //   const Sequence = AdditionalQuestionSequence.find(
  //     data => data.order === 'pre' && data.category === 'Project'
  //   )
  //   return Sequence
  // }

  // const getPostSequenceLength = () => {
  //   const Sequence = AdditionalQuestionSequence.find(
  //     data => data.order === 'post' && data.category === 'Project'
  //   )
  //   return Sequence
  // }

  const handleFlow = (question) => {
    if (currentState === "Pre" && preOption >= 0) {
      saveData.responses.pop();
      saveData.totalCost = saveData.totalCost - question.selectedOption.price;
      setPriceVal(saveData.totalCost);
      setPreOption(preOption - 1);
    } else if (currentState === "Dynamic") {
      if (saveData && saveData.responses) {
        const responsesLength = saveData.responses.length;

        if (responsesLength <= preQuestions.length) {
          setCurrentState("Pre");
          setPreOption(responsesLength - 1);
        } else if (responsesLength > preQuestions.length) {
          setProjectBasedQuestion(question);
          saveData.responses.pop();
          saveData.totalCost =
            saveData.totalCost - question.selectedOption.price;
          setPriceVal(saveData.totalCost);
        }
      }
    } else if (currentState === "post" && postOption >= 0) {
      setPostOption(postOption - 1);
      saveData.responses.pop();
      saveData.totalCost = saveData.totalCost - question.selectedOption.price;
      setPriceVal(saveData.totalCost);
    }
    if (currentState === "post" && postOption === 0) {
      setCurrentState("Dynamic");
      setProjectBasedQuestion(question);
    }
  };

  // const preSequenceLength = getPreSequenceLength().sequence.length
  const { question, options, nextQuestion } = projectBasedQuestion;

  // const handleSlide = () => {
  //   setSlideDirection(slideDirection === "left" ? "right" : "left");
  //   setSlideIn(slideIn === true ? false : true);
  // };

  // const handleStep = (index, step) => () => {
  //   console.log("Step", step);
  //   const { _id, question, state } = step;
  //   console.log("Hello in Stepper", _id, question, state);
  //   const getID = AdditionalQuestions.find((data) => data._id === id);
  //   const getIndexDynamic = ProjectQuestions.findIndex(
  //     (data) => data.label === questionLabel
  //   );

  //   console.log("GEt getID: ", getID);
  //   console.log("GEt Index Dynamic: ", getIndexDynamic);
  //   console.log("State Val: ", stateVal);
  //   console.log("Label from Response: ", questionLabel);

  //   if (getID) {
  //     if (stateVal === "Pre") {
  //       const getIndexAdditional = getPreSequenceLength().sequence.findIndex(
  //         (data) => data === getID._id
  //       );
  //       console.log("Index Val In Pre: ", getIndexAdditional);
  //       setActiveStep(index);
  //       setCurrentState("Pre");
  //       setPreOption(getIndexAdditional);
  //     } else if (stateVal === "Post") {
  //       const getIndexAdditional = getPostSequenceLength().sequence.findIndex(
  //         (data) => data === getID._id
  //       );
  //       console.log("Index Val In Post: ", getIndexAdditional);
  //       setActiveStep(index);
  //       setCurrentState("Post");
  //       setPostOption(getIndexAdditional);
  //       console.log("IN POST HAndle Step");
  //     }
  //   }
  //   if (getIndexDynamic !== -1) {
  //     if (stateVal === "Dynamic") {
  //       setActiveStep(index);
  //       setCurrentState("Dynamic");
  //       setDynamicOption(getIndexDynamic);
  //       console.log("DynamicOption: ", dynamicOption);
  //       console.log("ActiveStep: ", activeStep);
  //     }
  //   }
  // };
  const getNextDynamicQuestion = async (nextQuestion, value, question) => {
    try {
      let nextQuestionID;
      if (value === "Other (Specify)") {
        setInputField(!inputField);
      } else {
        if (nextQuestion === "" || nextQuestion === undefined) {
          nextQuestionID = question.nextQuestion;
          if (setRefForBothVal.current === "Both" && nextQuestionID === "") {
            setRefForBothVal.current = "Seperate";
            nextQuestionID = "6560a181c9f7ceabb2c23848";
          }
        } else if (
          setRefForBothVal.current === "Both" &&
          nextQuestionID === ""
        ) {
          nextQuestionID = "6560a181c9f7ceabb2c23848";
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

  // const getActiveStep = () => {
  //   if (saveData.responses) {
  //     const saveDataLength = saveData.responses.length
  //     return saveDataLength
  //   }
  //   return 0
  // }

  // const getUniqueSteps = () => {
  //   const uniqueSteps = new Set()

  //   if (saveData.responses && saveData.responses.length > 0) {
  //     saveData.responses.forEach(response => {
  //       // console.log(response);
  //       if (response.question) {
  //         // const question = response.question;
  //         // const id = response._id;
  //         uniqueSteps.add(response.question)
  //       }
  //     })
  //   }
  //   if (
  //     getPreAdditionalQuestion().getQuestions?.question &&
  //     currentState === 'Pre'
  //   ) {
  //     uniqueSteps.add(getPreAdditionalQuestion().getQuestions.question)
  //   }

  //   if (
  //     ProjectQuestions[dynamicOption]?.question &&
  //     currentState === 'Dynamic'
  //   ) {
  //     uniqueSteps.add(ProjectQuestions[dynamicOption].question)
  //   }

  //   if (getPostAdditionalQuestion()?.question && currentState === 'post') {
  //     uniqueSteps.add(getPostAdditionalQuestion().question)
  //   }

  //   return Array.from(uniqueSteps).map(question => ({
  //     question,
  //     // id: question.id,
  //     id:
  //       getPreAdditionalQuestion().getQuestions._id ||
  //       getPostAdditionalQuestion()._id ||
  //       ProjectQuestions[dynamicOption]._id,
  //     // state: question.state,
  //     completed: false,
  //   }))
  // }

  // const combinedSteps = getUniqueSteps();

  const submitOtherVal = () => {
    if (!formInput.otherval) {
      setErrorMessage({ otherValError: "Field cannot be empty" });
    }
    if (formInput.otherval) {
      setErrorMessage({ otherValError: null });
      setInputField(!inputField);
      return;
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

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Main Heading */}
      <Typography variant="h4" mb={4} mt={4}>
        Project Base Question
      </Typography>
      {/* Stepper */}
      {/* {
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
        }  */}
      {/* <Grid container spacing={2} sx={{ flexDirection: { xs: "column", md: "row"} }}>
      <Grid item md={3}> */}
      {/* <Item> */}
      <List>
        <ListItemButton component="a" href="#estimated-cost">
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
        </ListItemButton>
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
                            // value={inputValue}
                            onChange={(e) => {
                              // setInputValue(e.target.value);
                              setFormInput({ otherval: e.target.value });
                            }}
                            helperText={errorMessage.otherValError}
                          />
                          <Button
                            variant="contained"
                            onClick={() => {
                              otherData.price = data.price;
                              otherData.opt = formInput.otherval;
                              {
                                formInput.otherval === ""
                                  ? submitOtherVal()
                                  : getNextQuestionFromAdditional(inputValue);
                              }
                              saveAllData(
                                otherData,
                                getPreAdditionalQuestion()?.getQuestions
                              );
                              setInputField(false);
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
                    // {
                    //   data.value !== "Other (Specify)"
                    //     : null;
                    // }
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
                          onChange={(e) => {
                            // setInputValue(e.target.value);
                            setFormInput({ otherval: e.target.value });
                          }}
                        />

                        <Button
                          variant="contained"
                          onClick={() => {
                            otherData.price = data.price;
                            otherData.opt = formInput.otherval;
                            getNextDynamicQuestion(
                              data.nextQuestion,
                              otherData.opt,
                              projectBasedQuestion
                            );
                            saveAllData(otherData, projectBasedQuestion);
                            setInputField(false);
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
                            saveAllData(otherData, getPostAdditionalQuestion());
                            getNextQuestionFromAdditional(inputValue);
                            setInputField(false);
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
