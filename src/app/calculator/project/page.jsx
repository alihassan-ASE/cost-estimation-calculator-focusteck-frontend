"use client";
import React, { useMemo, useState, useEffect, useRef } from "react";

import ProjectQuestions from "../../../../data/projectBase.json";
import { AdditionalQuestions } from "../../../../data/additionalQuestions.js";
import AdditionalQuestionSequence from "../../../../data/additionalQuestionSequence.json";
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
} from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";

const page = () => {
  let otherData = {
    opt: null,
    price: null,
  };
  const DRAWER_WIDTH = 240;
  const [saveData, setSaveData] = useState({});

  // Questions States
  const [preOption, setPreOption] = useState(0);
  const [dynamicOption, setDynamicOption] = useState(0);
  const [postOption, setPostOption] = useState(0);

  // State for Checking the index of the Dynamic questions. If state is set to -1, then the dynamic questions have ended and the Post Questions will start.
  const [returnedIndexVal, setReturnedIndexVal] = useState(0);

  // For go back button
  const [currentState, setCurrentState] = useState("Pre");
  const setRefForBothVal = useRef("Seperate");
  const [formInput, setFormInput] = useState({
    username: null,
    email: null,
  });
  const [errorMessage, setErrorMessage] = useState({
    usernameError: null,
    emailError: null,
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
    console.log(data);
    setPriceVal(priceVal + data.price);    

    if (setArray.current.length === 0) {
      console.log("Hello inside");
      setArray.current = [{ ...data }];
    } else if (setArray.current.length > 0) {
      setArray.current = [...setArray.current, { ...data }];
    }

    console.log(setArray.current);
    setMultipleValues(multiple + 1);
    console.log("MultipeValue State after: ", setMultipleValues.current);
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

  const priceTotal = (value) => {
    // setPriceVal(priceVal + value);
  };

  function saveAllData(selectedOption, question) {
    console.log(selectedOption, "-----------");
    // if (selectedOption === "Other (Specify)") {
    //   selectedOption = selectedOption.opt
    //     ? othersValue
    //     : selectedOption.value
    //     ? othervalue
    //     : undefined;
    // }
    if (selectedOption.username && selectedOption.email) {
      setSaveData({
        username: selectedOption.username,
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
      // console.log(getQuestion, getIndexOfQuestion, selectedOption);
      // console.log("Coming", question);
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
            if(Array.isArray(selectedOption)){
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
            }
            else {

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
          } else if (saveData && !saveData.responses) {
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
                  nextQuestionID: question.nextQuestion
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

  console.log(saveData);
  const getPreSequenceLength = () => {
    const Sequence = AdditionalQuestionSequence.find(
      (data) => data.order === "pre" && data.category === "Project"
    );
    return Sequence;
  };

  const getPostSequenceLength = () => {
    const Sequence = AdditionalQuestionSequence.find(
      (data) => data.order === "post" && data.category === "Project"
    );
    return Sequence;
  };

  const preSequenceLength = getPreSequenceLength().sequence.length;
  const { question, options, nextQuestion } = ProjectQuestions[dynamicOption];

  // const handleSlide = () => {
  //   setSlideDirection(slideDirection === "left" ? "right" : "left");
  //   setSlideIn(slideIn === true ? false : true);
  // };

  // Go Back Button
  const handleFlow = (question) => {
    // const findPreviousData = ProjectQuestions.find(data => data.nextQuestion === question.id || data.options.nextQuestion === question.id)
    // // console.log("FIndPrevious DatA: ", findPreviousData)
    // // console.log(question, "-------");
    if (currentState === "Pre" && preOption >= 0) {
      setPreOption(preOption - 1);
    } else if (currentState === "Dynamic") {
      if (dynamicOption > 0) {
        console.log("Current Dynamic Option: ", dynamicOption);
        const length = question.length - 1;
        console.log(dynamicOption, length);
        setDynamicOption(dynamicOption - 1);
      } else if (dynamicOption === 0) {
        setCurrentState("Pre");
        setPreOption(preSequenceLength - 1);
        console.log("PreOption val: ", preOption);
        // handleFlow();
      }
    } else if (currentState === "post") {
      if (postOption > 0) {
        setPostOption(postOption - 1);
      } else if (postOption === 0) {
        setCurrentState("Dynamic");
        // console.log("Before", dynamicOption);
        setReturnedIndexVal(ProjectQuestions.length - 1);
        setDynamicOption(ProjectQuestions.length - 1);
        // console.log("After", dynamicOption);
        // handleFlow();
      }
    }
  };
  // console.log(dynamicOption);

  console.log("Outside", currentState);

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

  const getNextDynamicQuestion = (nextQuestionID, value) => {
    let indexVal;
    // console.log(value);
    if (value === "Both") {
      setRefForBothVal.current = "Both";
      setDynamicOption(dynamicOption + 1);
      // indexVal = dynamicOption;
    } else if (
      setRefForBothVal.current === "Both" &&
      dynamicOption < ProjectQuestions.length - 1
    ) {
      setDynamicOption(dynamicOption + 1);
      // indexVal = dynamicOption;
    } else if (nextQuestionID && value !== "Other (Specify)") {
      indexVal = ProjectQuestions.findIndex(
        (eachQuestion) => eachQuestion._id === nextQuestionID
      );
    } else if (!nextQuestionID && value !== "Other (Specify)") {
      indexVal = ProjectQuestions.findIndex(
        (eachQuestion) => eachQuestion._id === nextQuestion
      );
    } else if (value === "Other (Specify)") {
      setInputField(!inputField);
    }

    if (indexVal !== -1 && indexVal !== undefined) {
      setDynamicOption(indexVal);
      // handleSlide();
    } else if (indexVal === -1 && !nextQuestionID) {
      setReturnedIndexVal(indexVal);
      setCurrentState("post");
    }
    return indexVal;
  };

  // Additional Questions
  const getPreAdditionalQuestion = () => {
    let getQuestion;
    let getIndexOfQuestion;
    const additionalQuestion = getPreSequenceLength().sequence;
    AdditionalQuestions.forEach((data, index) => {
      if (data._id === additionalQuestion[preOption]) {
        getQuestion = data;
        getIndexOfQuestion = index;
      }
    });
    // let getQuestion = AdditionalQuestions.find(
    //   (data) => data._id === additionalQuestion[preOption]
    // );
    return { getQuestion, getIndexOfQuestion };
  };

  const getPostAdditionalQuestion = () => {
    const additionalQuestion = getPostSequenceLength().sequence;
    let getQuestion = AdditionalQuestions.find(
      (data) => data._id === additionalQuestion[postOption]
    );
    return getQuestion;
  };

  const getNextQuestionFromAdditional = (option) => {
    const value = option.opt;

    if (returnedIndexVal !== -1) {
      if (value === "Other (Specify)") {
        setInputField(!inputField);
      } else if (preOption === preSequenceLength - 1) {
        setCurrentState("Dynamic");
      } else {
        setPreOption(preOption + 1);
      }
    } else {
      setCurrentState("post");
      setPostOption(postOption + 1);
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
        // console.log(response);
        if (response.question) {
          // const question = response.question;
          // const id = response._id;
          uniqueSteps.add(response.question);
        }
      });
    }
    if (
      getPreAdditionalQuestion().getQuestion?.question &&
      currentState === "Pre"
    ) {
      uniqueSteps.add(getPreAdditionalQuestion().getQuestion.question);
    }

    if (
      ProjectQuestions[dynamicOption]?.question &&
      currentState === "Dynamic"
    ) {
      uniqueSteps.add(ProjectQuestions[dynamicOption].question);
    }

    if (getPostAdditionalQuestion()?.question && currentState === "post") {
      uniqueSteps.add(getPostAdditionalQuestion().question);
    }

    return Array.from(uniqueSteps).map((question) => ({
      question,
      // id: question.id,
      id:
        getPreAdditionalQuestion().getQuestion._id ||
        getPostAdditionalQuestion()._id ||
        ProjectQuestions[dynamicOption]._id,
      // state: question.state,
      completed: false,
    }));
  };

  // const combinedSteps = getUniqueSteps();

  const submitForm = () => {
    console.log("Hello");
    if (!formInput.username) {
      setErrorMessage({ usernameError: "Incorrect UserName" });
      console.log("For useName");
    }
    if (!formInput.email) {
      setErrorMessage({ emailError: "Incorrect Email" });
      console.log("For Email");
    }
    if (formInput.username && formInput.email) {
      setErrorMessage({ usernameError: null, emailError: null });
      setCurrentState("Submitted");
      console.log("For Submit");
    }
  };

  return (
    <Box>
      <Drawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            top: ["48px", "56px", "64px"],
            height: "auto",
            bottom: 0,
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* Side Bar */}
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
          <ListItemButton component="a" href="#estimated-hours">
            <ListItemText primary="Estimated Hours" />
          </ListItemButton>
          <ListItemButton component="a" href="#expected-team">
            <ListItemText primary="Expected Team" />
          </ListItemButton>
        </List>
      </Drawer>

      {/* Main Heading */}
      <Typography variant="h4" mb={4}>
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
      <Slide
        direction={slideDirection}
        in={!slideIn}
        mountOnEnter
        unmountOnExit
      >
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
                <IconButton onClick={() => handleFlow(getUniqueSteps())}>
                  <ArrowBack />
                </IconButton>
              </span>
            ) : null}
          </Stack>

          {/* Main Question */}
          <Typography variant="h4" mt={2} mb={5}>
            {currentState === "Pre"
              ? getPreAdditionalQuestion().getQuestion.question
              : currentState === "Dynamic"
              ? question
              : postOption < getPostSequenceLength().sequence.length
              ? getPostAdditionalQuestion().question
              : null}
          </Typography>

          {/* Options */}
          <Stack direction="row" sx={{ flexWrap: "wrap" }}>
            {currentState === "Pre" ? (
              getPreAdditionalQuestion().getQuestion.options.map(
                (data, index) => (
                  <React.Fragment key={index}>
                    <Button
                      size="large"
                      variant="outlined"
                      sx={{ maxWidth: 260, m: 1.5 }}
                      onClick={() => {
                        getNextQuestionFromAdditional(data);
                        {
                          data.opt !== "Other (Specify)"
                            ? saveAllData(
                                data,
                                getPreAdditionalQuestion().getQuestion
                                // data.price
                                // priceTotal(data.price)
                              )
                            : null;
                        }

                        priceTotal(data.price);
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
                              value={inputValue}
                              onChange={(e) => {
                                setInputValue(e.target.value);
                              }}
                            />
                            <Button
                              variant="contained"
                              onClick={() => {
                                otherData.price = data.price;
                                otherData.opt = inputValue;
                                saveAllData(
                                  otherData,
                                  getPreAdditionalQuestion().getQuestion
                                  // data.price
                                  // priceTotal(data.price)
                                );
                                getNextQuestionFromAdditional(inputValue);
                                priceTotal(data.price);
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
              options.map((data, index) => (
                <React.Fragment key={index}>
                  <Button
                    size="large"
                    variant="outlined"
                    sx={{ maxWidth: 260, m: 1.5 }}
                    onClick={() => {
                      // console.log("Next Dynamic Question");
                      getNextDynamicQuestion(data.nextQuestion, data.value);
                      {
                        data.opt !== "Other (Specify)"
                          ? saveAllData(data, ProjectQuestions[dynamicOption])
                          : null;
                      }
                      priceTotal(data.price);
                    }}
                  >
                    {data.value} ({data.price}$)
                  </Button>
                  {data.value === "Other (Specify)"
                    ? inputField && (
                        <Box>
                          <TextField
                            fullWidth
                            id="fullWidth"
                            label="Other"
                            variant="outlined"
                            sx={{ width: "90%" }}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                          />

                          <Button
                            variant="contained"
                            onClick={() => {
                              otherData.price = data.price;
                              otherData.opt = inputValue;
                              getNextDynamicQuestion(
                                data.nextQuestion,
                                inputValue
                              );
                              saveAllData(
                                otherData,
                                ProjectQuestions[dynamicOption]
                              );
                              setInputField(!inputField);
                              priceTotal(data.price);

                              // console.log(
                              //   "NextQuestion: ",
                              //   data.nextQuestion
                              // );
                            }}
                          >
                            Enter
                          </Button>
                        </Box>
                      )
                    : null}
                </React.Fragment>
              ))
            ) : postOption < getPostSequenceLength().sequence.length ? (
              getPostAdditionalQuestion().options.map((data, index) => (
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
                          console.log("Hello in");
                        }
                      } else {
                        getMultipleValues(data);

                        // if (setMultipleValues.current >= 3) {
                        //   // console.log('Hello');
                        //   if (data.opt !== "Other (Specify)") {
                        //     saveAllData(setArray.current, additionalQuestion);
                        //     console.log("Hello in");
                        //   }
                        // }
                      }

                      priceTotal(data.price);
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
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                          />
                          <Button
                            variant="contained"
                            onClick={() => {
                              otherData.price = data.price;
                              otherData.opt = inputValue;
                              saveAllData(
                                otherData,
                                getPostAdditionalQuestion()
                              );
                              getNextQuestionFromAdditional(inputValue);
                              priceTotal(data.price);
                            }}
                          >
                            Enter
                          </Button>
                        </Box>
                      )
                    : null}
                </React.Fragment>
              ))
            ) : (
              <React.Fragment>
                {currentState === "post" ? (
                  <form>
                    <Box>
                      <TextField
                        sx={{ mb: 3 }}
                        fullWidth
                        id="outlined-basic, user-name"
                        label="Username"
                        variant="outlined"
                        value={formInput.username}
                        onChange={(e) => {
                          setFormInput({
                            username: e.target.value,
                            email: formInput.email,
                          });
                          console.log(
                            "UserName: ",
                            formInput.username,
                            "email: ",
                            formInput.email
                          );
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
                            username: formInput.username,
                            email: e.target.value,
                          });
                          console.log(
                            "UserName: ",
                            formInput.username,
                            "email: ",
                            formInput.email
                          );
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
                    <Typography varient="h4">Details</Typography>
                    <Typography varient="h5">
                      Name: {saveData.username}
                    </Typography>
                    <Typography varient="h5">
                      Email: {saveData.email}
                    </Typography>
                  </React.Fragment>
                )}
              </React.Fragment>
            )}
            {multiple >= 3 && (
              <Button
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
      </Slide>
    </Box>
  );
};

export default page;
