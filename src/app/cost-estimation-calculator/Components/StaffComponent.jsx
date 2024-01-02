"use client";
import React, { useEffect, useState, useMemo, useSyncExternalStore } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  Grid,
  useMediaQuery,
  Slide,
  Table,
  TableBody, TableHead, TableContainer, TableRow, Paper, Modal
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Question from "../Components/Question/page";
import Stepper from "../Components/Stepper/page";
import { getQuestions } from "../../lib/api/getData";
import StaffResource from "./StaffResource";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CircularProgress from "@mui/material/CircularProgress";
import ShowSummary from "./ShowSummary";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

const CustomNextButton = styled(Button)(({ theme }) => ({
  width: 150,
  fontFamily: [
    "Proxima Nova",
    "Poppins",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  [theme.breakpoints.down("md")]: {
    fontSize: 14,
    padding: ".7em 1.3em",
  },
  [theme.breakpoints.down("sm")]: {
    width: 100,
    fontSize: 10,
    padding: ".7em 1.7em",
  },
}));

const CustomBackButton = styled(Button)(({ theme }) => ({
  padding: 0,
  color: "#ACACAC",
  height: "50px",
  width: "50px",
  borderRadius: "50%",
  justifyContent: "normal",
  minWidth: "min-content",
  border: "2px solid #ACACAC",
  padding: ".2em",
  "&:hover svg": {
    transform: "translateX(-5px)"
  },
  "&:hover": {
    boxShadow: "0 0 5px rgba(0, 93, 189, 0.8)",
  },
  "&.Mui-disabled": {
    background: "#4f9ef0",
    color: "#eaeaea",
  },
  "&:focus": {
    outline: "none",
    boxShadow: "0 0 5px rgba(0, 93, 189, 0.8)",
  },
}));

const CustomButton = styled(Button)(({ theme }) => ({
  border: "1px solid #0069d9",
  // padding: "3em",
  maxWidth: "341px",
  width: "280px",
  borderRadius: ".5em",
  marginLeft: "auto",
  [theme.breakpoints.down("md")]: {
    width: "280px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "270px",
  },
}));

const CustomCostBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#1E1D28",
  padding: "2em",
  borderRadius: "10px",
  minWidth: "250px",
  margin: "1em 0",
  [theme.breakpoints.down("sm")]: {
    padding: "1em",
    minWidth: "230px"
  },
}));

const CustomNormalTypography = styled(Typography)(({ theme }) => ({
  fontFamily: ["Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
    ","
  ),
}));

const CustomTypography = styled(Typography)(({ theme }) => ({
  color: "#fff",
  fontSize: "2em",
  fontFamily: ["Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
    ","
  ),
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  textAlign: "center",
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StaffComponent = () => {
  const [count, setCount] = useState(0);
  const [values, setValues] = useState([]);
  const [buttonState, setButtonState] = useState(true);

  const [additionalQuesiton, setAdditionalQuesiton] = useState([]);
  const [staffBase, setStaffBaseResources] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentState, setCurrentState] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [actualResponses, setActualResponses] = useState({});

  const [isOptionSelected, setIsOptionSelected] = useState(true);

  const [addedOption, setAddedOption] = useState([]);

  const [isNextClicked, setIsNextClicked] = useState(false);
  const [isStepperClicked, setIsStepperClicked] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [orientation, setOrientation] = useState("horizontal");
  const isNarrowScreen = useMediaQuery("(max-width:1200px)");
  const isNarrowStaff = useMediaQuery("(max-width:680px)");
  const [resource, setResource] = useState([]);
  const [lastQuestionSelectedOption, setLastQuestionSelectedOption] = useState(
    []
  );
  const [slideIn, setSlideIn] = useState(true);
  const [stepperState, setStepperState] = useState(false);
  const dataObj = {};
  const [displayQuestion, setDisplayQuestion] = useState(true);
  const [openModal, setopenModal] = useState(false);
  const [i, setI] = useState(0)
  const [editMode, setEditMode] = useState(false);
  const [addMore, setAddMore] = useState(true);
  const [clicked, setClicked] = useState();
  const bounceAnimation = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.1);
  }
  60% {
    transform: scale(.9);
  }
`;

  const CustomCard = styled(Card)(({ theme }) => ({
    height: 370,
    width: "50%",
    minWidth: "270px",
    padding: "2em 1.5em",
    borderRadius: ".5em",
    margin: "3em 0",
    transform: "translate(-50 %, -50 %)",
    position: "absolute",
    animation: openModal ? `${bounceAnimation} .5s ease` : 'none',
    [theme.breakpoints.down("md")]: {
      margin: "2em 0 ",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "1em 0",
      padding: "2em 1em",
    },
  }));

  // Setting Staff Resources and Questions
  useEffect(() => {

    let data = localStorage.getItem("Response");
    data = JSON.parse(data);

    
    if (data) {

      setActualResponses(data);      
      setDisplayQuestion(false);
      setCurrentQuestionIndex(data.responses.length - 1);
      setCurrentState(false);
      setTotalCost(data.totalCost)

      if (Array.isArray(data.responses[0].resources) && data.responses[0].resources.length > 0) {
        console.log("Setting resources...");
        setResource(data.responses[0].resources);
      } else {
        console.log("No valid resources found in data.");
      }

    }

  }, []);

  useEffect(() => {
    getQuestions().then((resp) => {
      const { Resources, additionalQuestions } = resp;
      setAdditionalQuesiton(additionalQuestions);
      setStaffBaseResources(Resources);
    });
  }, [])

  useEffect(() => {
    setopenModal(false)
  }, [clicked])

  useEffect(() => {
    if (resource.length) {
      nextQuestion();
    }

  }, [ addedOption])

  useEffect(() => {
    if (isNarrowScreen) {
      setOrientation("horizontal");
    } else {
      setOrientation("vertical");
    }
  }, [isNarrowScreen]);

  //calling Handle Price function on next button click and on stepper
  useEffect(() => {
    if (actualResponses !== null) {
      if (isNextClicked) {
        handlePrice("next");
        setIsNextClicked(false);
      } else if (isStepperClicked) {
        handlePrice("stepper");
        setIsStepperClicked(false);
      }
    }
  }, [actualResponses, isNextClicked, isStepperClicked]);


  useEffect(() => {
    if (values?.length > 0) {
      setCount(values?.length - 1);
      console.log("value")
    }
    if(values.length){
      setResource(values);
    }
  }, [values]);

  const deleteResource = (index) => {
    if (values) {
      if (index >= 0 && index < values.length) {
        const newValues = values.filter((_, i) => i !== index);
        setValues(newValues);
        setResource(newValues)
      } else {
        if (index > 0) {
          setCount(count - 1);
        }
      }
    }
  };

  // Function To Handling Price
  const handlePrice = (type) => {
    switch (type) {
      case "stepper":
      case "next": {
        let totalPrice = 0;

        if (actualResponses.responses.length >= 0) {
          actualResponses.responses.forEach((response, index) => {
            if (index === 0) {
              if (response.resources && response.resources.length > 0) {
                response.resources.forEach((resource) => {
                  if (
                    resource.resourceOption &&
                    resource.resourceOption.price
                  ) {
                    totalPrice += resource.resourceOption.price;
                  }
                });
              }
            } else {
              if (response.selectedData && response.selectedData.length > 0) {
                response.selectedData.forEach((select) => {
                  if (select.price) {
                    totalPrice += select.price;
                  }
                });
              }
            }
          });
        }

        setTotalCost(totalPrice);

        break;
      }
    }
  };

  // Changing active question on stepper
  const changeActiveQuestion = (obj) => {

    const { index, step } = obj;

    setDisplayQuestion(true);

    if (index == 1) {
      setCurrentState(true);
      setAddMore(true)
    }

    setCurrentQuestionIndex(index - 1);
    setCurrentQuestion(step);
    actualResponses.responses.splice(index - 1);
    setLastQuestionSelectedOption(step.selectedData);
    setIsStepperClicked(true);
    slider();


  };

  // receiving selected option from child Component
  const selectedOptionPassToParent = (data) => {

    setValues((prev) => [...prev, data]);
    setButtonState(true);
    setEditMode(false)
    setopenModal(false)
    setIsOptionSelected(false);
    setResource((prev) => [...prev, data]);
    setClicked(false)
  };

  const selectedSave = (bool) => {
    setopenModal(bool)
    setEditMode(false)
  }

  // setting Response in actual Array
  const setResponseData = () => {

  if(values.length){
    dataObj.resources = values;
    setResource(dataObj.resources);
  }
    currentState
      ? setActualResponses({ responses: [dataObj] })
      : setActualResponses((prev) => {
        return {
          responses: [
            ...prev.responses,
            { ...currentQuestion, ...addedOption },
          ],
        };
      });
  };

  // Getting Response from child Component(Question Component)
  const getResponsesData = (resp) => {
    setIsOptionSelected(false);
    setAddedOption(resp);
  };

  console.log("Values",values);
  console.log("actual responses",actualResponses)

  // Handling Next Quesiton
  const nextQuestion = () => {

    setCurrentState(false);
    setButtonState(true);
    setStepperState(true);

    let currentQuestionLocal = currentQuestion;
    let currentQuestionIndexLocal = currentQuestionIndex;
    if (!currentQuestion) {
      currentQuestionLocal = additionalQuesiton[currentQuestionIndexLocal];
      currentQuestionIndexLocal++;
    } else if (currentQuestionIndexLocal < additionalQuesiton.length) {
      currentQuestionLocal = additionalQuesiton[currentQuestionIndexLocal];
      currentQuestionIndexLocal++;
    } else {
      setCurrentQuestionIndex(currentQuestionIndexLocal++);
    }

    setCurrentQuestion(currentQuestionLocal);
    setCurrentQuestionIndex(currentQuestionIndexLocal);
    setResponseData();
    setIsNextClicked(true);
    setLastQuestionSelectedOption([]);
    slider();
  };

  const slider = function () {
    setSlideIn(false);
    setTimeout(() => {
      setSlideIn(true);
    }, 250);
  };

  // Handling Back Question and Calculating Price on Back Button
  const backQuestion = () => {
    setDisplayQuestion(true);

    let lastQuestion;
    if (actualResponses.responses && actualResponses.responses.length === 1) {
      setCurrentState(true);
      setAddMore(true)
    }

    if (currentQuestionIndex > 0) {
      let newArray = [...actualResponses.responses];
      lastQuestion = newArray.pop();
      if (lastQuestion) {
        setCurrentQuestion(lastQuestion);
        setActualResponses({ responses: newArray });
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        setLastQuestionSelectedOption(lastQuestion.selectedData);
        setIsOptionSelected(false);
      }

      if (actualResponses.responses.length >= 0) {
        let totalPriceToSubtract = 0;
        if (lastQuestion) {
          if (lastQuestion.resources?.length) {
            if (lastQuestion.resources && lastQuestion.resources.length > 0) {
              lastQuestion.resources.forEach((resource) => {
                if (resource.resourceOption && resource.resourceOption.price) {
                  totalPriceToSubtract += resource.resourceOption.price;
                }
              });
            }
          } else {
            if (
              lastQuestion.selectedData &&
              lastQuestion.selectedData.length > 0
            ) {
              lastQuestion.selectedData.forEach((select) => {
                if (select.price) {
                  totalPriceToSubtract += select.price;
                }
              });
            }
          }
          setTotalCost((prev) => prev - totalPriceToSubtract);
        }
      }
    }

    slider();
  };

  useEffect(() => {
    if (currentQuestionIndex > additionalQuesiton.length && additionalQuesiton.length != 0) {
      setDisplayQuestion(false);
      setCurrentQuestion(true)
      actualResponses.totalCost = totalCost;
    }
  }, [nextQuestion]);

  const [dropDownVal, setDropDownVal] = useState(false)

  const handleModal = () => {
    setopenModal(true)
    setDropDownVal(true)
  }

  const handleClose = () => {
    setopenModal(false)
    setI(0)
    setEditMode(false)
    setDropDownVal(false)

  }

  const editResource = (index) => {
    setI(index)
    setEditMode(true)
    setopenModal(true)
    setDropDownVal(true)
  }


  return (
    <Box >
      {additionalQuesiton.length && staffBase.length || !displayQuestion || !actualResponses.length ? (
        <Box
          sx={{
            maxWidth: "1520px",
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          {
            openModal ?
              <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

                sx={{ display: "flex", justifyContent: "center" }}
              >
                <CustomCard>
                  <StaffResource
                    question={currentQuestion}
                    options={staffBase}
                    count={count}
                    setCount={setCount}
                    setValues={setValues}
                    index={editMode ? i : count}
                    values={values}
                    selectedOption={resource}
                    selectedOptionPassToParent={selectedOptionPassToParent}
                    selectedSave={selectedSave}
                    deleteResource={deleteResource}
                    dropDownVal={dropDownVal}
                  />
                </CustomCard>
              </Modal>
              : null
          }
          {currentState ? (
            <>
              <Box sx={{ padding: "3em 1em" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "auto",
                    marginRight: "auto",
                    gap: '1em',
                    maxWidth: 800,
                    flexWrap: isNarrowStaff ? "wrap" : "nowrap",
                    marginBottom: ".5em"
                  }}>
                  <Typography variant="h5" sx={{ padding: ".5em 0", fontSize: "1.3em", }}>
                    Please Select Staff Resources as per your requirement
                  </Typography>
                  <Box>
                    <CustomButton
                      onClick={() => {
                        setCount(count + 1);
                        handleModal()
                        setI(count)
                      }}
                    >
                      Add New Resource
                    </CustomButton>
                  </Box>
                </Box>

                <TableContainer component={Paper} sx={{ maxWidth: 800, margin: "auto" }}>
                  <Table
                    sx={{
                      minWidth: 700,
                      "& .MuiTableCell-root.MuiTableCell-head": {
                        backgroundColor: "#0045e6",
                        color: "#fff"
                      }
                    }}
                    aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Resources</StyledTableCell>
                        <StyledTableCell>Resources Option</StyledTableCell>
                        <StyledTableCell>Seniority Level</StyledTableCell>
                        <StyledTableCell>Number Of Resources</StyledTableCell>
                        <StyledTableCell>Actions</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        resource?.length === 0
                          ? <StyledTableRow>
                            <StyledTableCell component="th" scope="row" colSpan={5}>
                              No Resources to Show
                            </StyledTableCell>
                          </StyledTableRow>
                          : resource.map((row, index) => (
                            < StyledTableRow key={index} >
                              <StyledTableCell sx={{ textAlign: "center", }} component="th" scope="row">
                                {row.resource}
                              </StyledTableCell>
                              <StyledTableCell sx={{ textAlign: "center", }}>{row.resourceOption?.opt}</StyledTableCell>
                              <StyledTableCell sx={{ textAlign: "center", }}>{row.seniorityLevel}</StyledTableCell>
                              <StyledTableCell sx={{ textAlign: "center", }}>{row.numOfResources}</StyledTableCell>
                              <StyledTableCell sx={{ textAlign: "center", }}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", padding: " 0 .3em", gap: ".5em" }}>
                                  <ModeEditIcon sx={{
                                    color: "rgb(99, 115, 129)",
                                    fontSize: 20,
                                    padding: ".5em",
                                    backgroundColor: "#F4F6F8",
                                    borderRadius: "50%",
                                    transition: "background-color 600ms cubic-bezier(0.4, 0, 0.2, 1) 100ms, color 600ms cubic-bezier(0.4, 0, 0.2, 1) 100ms",
                                    "&:hover": {
                                      backgroundColor: "#0045e6",
                                      color: "#fff",
                                      cursor: "pointer"
                                    }
                                  }} onClick={() => { editResource(index) }} />
                                  <DeleteIcon sx={{
                                    color: "rgb(99, 115, 129)", fontSize: 20, padding: ".5em", backgroundColor: "#F4F6F8",
                                    borderRadius: "50%",
                                    transition: "background-color 600ms cubic-bezier(0.4, 0, 0.2, 1) 100ms, color 600ms cubic-bezier(0.4, 0, 0.2, 1) 100ms",
                                    "&:hover": {
                                      backgroundColor: "#0045e6",
                                      color: "#fff",
                                      cursor: "pointer"
                                    }
                                  }} onClick={() => {
                                    setCount(index)
                                    deleteResource(index)
                                  }} />
                                </Box>
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>

              <Box
                sx={{
                  margin: "1em 3em",
                  width: "80%",
                  display: "flex",
                  justifyContent: "flex-end"
                }}
              >
                <CustomNextButton
                  sx={{ width: 150, backgroundColor: "#0045e6", "&:hover": { backgroundColor: "#0045e6" }, color: "white" }}
                  onClick={() => {
                    nextQuestion();
                    setAddMore(false)
                  }}
                  disabled={values[0] ? false : true}
                >
                  Next
                </CustomNextButton>
              </Box>
            </>
          ) : (
            <Grid container spacing={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }} sx={{ maxWidth: "100%" }}>
              <Grid item lg={8} md={12} sm={12} xs={12}>
                <Box sx={{
                  display: "flex", gap: "1em", alignItems: "center",
                  paddingTop: "1.9em",
                }}>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "1em",
                      alignItems: "center",
                      margin: "1em 0",
                    }}
                  >
                    {currentQuestionIndex > 0 && (
                      <CustomBackButton onClick={backQuestion}>
                        <KeyboardBackspaceIcon
                          sx={{
                            color: "#ACACAC",
                            // border: "2px solid #ACACAC",
                            // borderRadius: "50%",
                            padding: ".3em",
                            borderRadius: "50%",

                            // ":hover": {
                            //   cursor: "pointer",
                            //   backgroundColor: "#0069d9",
                            //   border: "2px solid #fff",
                            //   color: "#fff",
                            // },
                          }}
                        />
                      </CustomBackButton>
                    )}
                  </Box>
                  {
                    displayQuestion
                      ?
                      <Box

                      >
                        <Typography sx={{ color: "#0045e6", fontSize: "1.2em" }}>
                          Question {actualResponses.responses.length}
                        </Typography>
                      </Box>
                      : null
                  }
                </Box>

                {
                  slideIn ?
                    <Slide
                      direction="down"
                      in={slideIn}
                      timeout={{
                        enter: 1500,
                        exit: 0,
                      }}
                      appear={true}
                      onEnter={(node) => {
                        node.style.transform = "translateY(-50px)";
                      }}
                    >
                      <div style={{ padding: "0 4.7%" }}>
                        {
                          displayQuestion
                            ?
                            <Question
                              currentQuestion={currentQuestion}
                              getResponsesData={getResponsesData}
                              selectedOption={lastQuestionSelectedOption}
                            />
                            : <ShowSummary response={actualResponses} />
                        }
                      </div>
                    </Slide>
                    : ""}
              </Grid>
              <Box sx={{
                borderRight: orientation === "vertical" ? "1px solid grey" : "0",
                borderTop: orientation !== "vertical" ? "1px solid grey" : "0",
                width: orientation !== "vertical" ? "90%" : "0",
                margin: orientation !== "vertical" ? "auto" : "0",
                marginTop: "5%",
                height: orientation === "vertical" ? "90vh" : 0

              }}></Box>
              <Grid item lg={3.9} md={12} sm={12} xs={12}>
                {actualResponses.length || actualResponses.responses ? (
                  <div style={{
                    padding: orientation !== "vertical" ? "0 7.4%" : 0
                  }}>
                    <Stepper
                      responses={actualResponses.responses}
                      changeActiveQuestion={changeActiveQuestion}
                      orientation={orientation}
                    />
                    {
                      displayQuestion
                        ?
                        <Box sx={{ padding: "1em 0" }}>
                          <CustomCostBox>
                            <CustomNormalTypography
                              variant="h6"
                              sx={{ color: "#fff", fontSize: "1.1em" }}
                            >
                              Estimated Cost
                            </CustomNormalTypography>
                            <CustomTypography>$ {totalCost}</CustomTypography>
                          </CustomCostBox>
                        </Box>
                        : null
                    }
                  </div>
                ) : null}
              </Grid>
            </Grid>
          )}
        </Box>
      ) : (
        <Box
          sx={{
            margin: "5em 2em",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      )
      }
    </Box >
  );
};

export default StaffComponent;