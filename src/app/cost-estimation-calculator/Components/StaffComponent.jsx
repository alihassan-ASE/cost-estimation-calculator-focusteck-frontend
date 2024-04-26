"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  Grid,
  useMediaQuery,
  Slide,
  Table,
  TableBody,
  TableHead,
  TableContainer,
  TableRow,
  Paper,
  Modal,
  Breadcrumbs,
  Link,
  ButtonGroup,
  TableCell,
  tableCellClasses,
  CircularProgress
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { styled, keyframes } from "@mui/material/styles";

import { getQuestions } from "../../lib/api/getData";
import Question from "../Components/Question/page";
import Stepper from "../Components/Stepper/page";
import StaffResource from "./StaffResource";
import ShowSummary from "./ShowSummary";
import QuestionsProgress from "./QuestionsProgress";

/* ---------------- Languages Icons ---------------- */
// Frontend
import reactIcon from "../../../icons/frontend/react.png"
import angularIcon from "../../../icons/frontend/angular.png"
import vueIcon from "../../../icons/frontend/vue.png"
import svelteIcon from "../../../icons/frontend/svelte.png"
import jQueryIcon from "../../../icons/frontend/jquery.png"
import emberIcon from "../../../icons/frontend/ember.png"
import backboneIcon from "../../../icons/frontend/backbone.png"
import semanticIcon from "../../../icons/frontend/semantic.png"
import foundationIcon from "../../../icons/frontend/foundation.png"
import preactIcon from "../../../icons/frontend/preact.png"
import aureliaIcon from "../../../icons/frontend/aurelia.svg"

// UI/UX
import AdobeIcon from "../../../icons/ui-ux/xd.png"
import figmaIcon from "../../../icons/ui-ux/figma.png"
import invisionIcon from "../../../icons/ui-ux/invision.png"
import sketchIcon from "../../../icons/ui-ux/sketch.png"
import zeplinIcon from "../../../icons/ui-ux/zeplin.png"
import axureIcon from "../../../icons/ui-ux/axure.png"
import marvelIcon from "../../../icons/ui-ux/marvel.png"

// Data Engineer
import airflowIcon from "../../../icons/engineer/airflow.png"
import cassandraIcon from "../../../icons/engineer/cassandra.png"
import elasticsearchIcon from "../../../icons/engineer/elasticsearch.svg"
import informaticaIcon from "../../../icons/engineer/informatica.png"
import kafkaIcon from "../../../icons/engineer/kafka.png"
import mysqlIcon from "../../../icons/engineer/mysql.png"
import prestoIcon from "../../../icons/engineer/presto.png"
import snowflakeIcon from "../../../icons/engineer/snowflake.png"
import sparkIcon from "../../../icons/engineer/spark.png"
import talendIcon from "../../../icons/engineer/talend.png"
import hadoopIcon from "../../../icons/engineer/hadoop.png"

// Automation
import appiumIcon from "../../../icons/automation/appium.png"
import cucumberIcon from "../../../icons/automation/cucumber.png"
import junitIcon from "../../../icons/automation/junit.png"
import postmanIcon from "../../../icons/automation/postman.png"
import seleniumIcon from "../../../icons/automation/selenium.png"
import testcompleteIcon from "../../../icons/automation/testcomplete.svg"
import testngIcon from "../../../icons/automation/testng.png"

// Backend
import cakeIcon from "../../../icons/backend/cake.png"
import djangoIcon from "../../../icons/backend/django.jpg"
import expressIcon from "../../../icons/backend/express.png"
import featherIcon from "../../../icons/backend/feather.svg"
import laravelIcon from "../../../icons/backend/laravel.png"
import meteorIcon from "../../../icons/backend/meteor.svg"
import netIcon from "../../../icons/backend/net.png"
import nextIcon from "../../../icons/backend/next.svg"
import nodeIcon from "../../../icons/backend/node.png"
import rorIcon from "../../../icons/backend/ror.png"
import sailsIcon from "../../../icons/backend/sails.png"
import flaskIcon from "../../../icons/backend/flask.png"

// Devops
import archimateIcon from "../../../icons/devops/archimate.png"
import awsIcon from "../../../icons/devops/zachman.png"
import togafIcon from "../../../icons/devops/togaf.svg"


// Quality Assurance
import manualIcon from "../../../icons/quality-assurance/manual.png"
import automationIcon from "../../../icons/quality-assurance/automation.png"
import bothIcon from "../../../icons/quality-assurance/both.png"

/* ------------------------------------------------- */

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#fff",
  border: "1px solid #005DBD",
  color: "#005DBD",
  borderRadius: "4px",
  marginLeft: "auto",
  textTransform: 'capitalize',
  padding: '15px 26px',
  "&:hover": {
    border: "1px solid #005DBD",
    color: "#fff",
    backgroundColor: "#005DBD"
  },
}));

const CustomNextButton = styled(Button)(({ theme }) => ({
  border: "1px solid #005DBD",
  backgroundColor: "#005DBD",
  color: "#fff",
  maxWidth: "341px",
  width: "130px",
  marginLeft: "auto",
  padding: "15px 48.5px",
  fontSize: "14px",
  fontWeight: 400,
  textTransform: 'capitalize',
  fontFamily: ["Aeonik", "Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
    ","
  ),
}));

const CustomBackButton = styled(Button)(({ theme }) => ({
  color: "#ACACAC",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  marginLeft: '50px !important',
  backgroundColor: '#005DBD',
  justifyContent: "normal",
  minWidth: "min-content",
  border: "2px solid #005DBD",
  padding: ".2em",
  "&:hover svg": {
    transform: "translateX(-5px)"
  },
  "&:hover": {
    boxShadow: "0 0 7px rgba(12, 61, 255, 0.8)",
    backgroundColor: '#0045e6',
  },
  "&.Mui-disabled": {
    background: "#0045e6",
    color: "#eaeaea",
  },
  "&:focus": {
    outline: "none",
    boxShadow: "0 0 5px rgba(0, 93, 189, 0.8)",
  },
  [theme.breakpoints.down("md")]: {
    right: "-32px",
  },
  [theme.breakpoints.down("sm")]: {
    right: "-52px",
  },
}));

const CustomCostBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#005DBD",
  padding: "30px 25px",
  borderRadius: "20px",
  minWidth: "250px",
  maxWidth: '433px',
  margin: "1em 0",
  height: '134px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  [theme.breakpoints.down("sm")]: {
    padding: "1em",
  },
}));

const CustomNormalTypography = styled(Typography)(({ theme }) => ({
  fontFamily: ["Aeonik", "Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
    ","
  ),
}));

const CustomTypography = styled(Typography)(({ theme }) => ({
  color: "#fff",
  fontSize: "60px",
  fontWeight: 500,
  lineHeight: '50px',
  fontFamily: ["Aeonik", "Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
    ","
  ),
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontFamily: ["Aeonik", "Poppins", "Helvetica", "Arial", "Lucida", "sans-serif"].join(
    ","
  ),
  [`&.${tableCellClasses.head}`]: {
    color: "black",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const CustomBox = styled(Box)(({ theme }) => ({
  padding: "0 2em",
  [theme.breakpoints.down("sm")]: {
    margin: "0",
    padding: "0 0.5em"
  },
}))




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
  const changeGap = useMediaQuery("(max-width:600px)");
  const isNarrowStaff = useMediaQuery("(max-width:680px)");
  const [resource, setResource] = useState([]);
  const [lastQuestionSelectedOption, setLastQuestionSelectedOption] = useState(
    []
  );
  const [back, setBack] = useState(false)
  const [slideIn, setSlideIn] = useState(true);
  const [stepperState, setStepperState] = useState(false);
  const dataObj = {};
  const [displayQuestion, setDisplayQuestion] = useState(true);
  const [openModal, setopenModal] = useState(false);
  const [i, setI] = useState(null)
  const [editMode, setEditMode] = useState(false);
  const [addMore, setAddMore] = useState(true);
  const [clicked, setClicked] = useState();
  const [deleteResources, setDeleteResource] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [addTransition, setAddTransition] = useState(false);
  const [editTransition, setEditTransition] = useState(false)

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

  const newRowTransition = keyframes`
  0% {
   transform: translateY(-25px);
   opacity: 0;
  }
  50% {
    background-color: rgba(25, 118, 210, 0.1);
  }
  100%{
    transform: translateY(0px),
    z-index:1
    background-color: #fff;
  }
  `;

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    textAlign: "center",
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const CustomCard = styled(Card)(({ theme }) => ({
    minHeight: 370,
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
      setCurrentQuestionIndex(data.responses.length);
      setCurrentState(false);
      setTotalCost(data.totalCost)

      if (Array.isArray(data.responses[0].resources) && data.responses[0].resources.length > 0) {
        setResource(data.responses[0].resources);
        setValues(data.responses[0].resources)
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
  }, [addedOption])

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
    }
    if (values.length) {

      for (const key in imageIcons) {
        if (key === values[i]?.resourceOption?.opt) {
          values[i].resourceOption = { ...values[i]?.resourceOption, icon: imageIcons[key] }
        }
      }
      setResource(values);
    }
  }, [values]);

  const deleteResource = (index) => {
    setDeleteResource(true);
    setAddTransition(false)
    setEditTransition(false)

    if (values) {
      if (index >= 0 && index < values.length) {
        const newValues = values.filter((_, i) => i !== index);
        setValues(newValues);
        setResource(newValues)
        setResource(newValues)
      } else {
        if (index > 0) {
          setCount(count - 1);
        }
      }
    }
  };
  let imageIcons = {
    // Frontend
    'React': reactIcon,
    'Angular': angularIcon,
    'Vue': vueIcon,
    'Svelte': svelteIcon,
    'jQuery': jQueryIcon,
    'Ember.js': emberIcon,
    'Backbone.js': backboneIcon,
    'Semantic-UI': semanticIcon,
    'Foundation': foundationIcon,
    'Preact': preactIcon,
    'Aurelia': aureliaIcon,

    // Data Engineer
    'Apache Hadoop': hadoopIcon,
    'Apache Spark': sparkIcon,
    'Apache Kafka': kafkaIcon,
    'Snowflake': snowflakeIcon,
    'Airflow': airflowIcon,
    'Talend': talendIcon,
    'Informatica': informaticaIcon,
    'Apache Cassandra': cassandraIcon,
    'Elasticsearch': elasticsearchIcon,
    'Presto': prestoIcon,
    'MySQL': mysqlIcon,

    //UI/UX
    'Figma': figmaIcon,
    'Sketch': sketchIcon,
    'Adobe XD': AdobeIcon,
    'INvision': invisionIcon,
    'Zeplin': zeplinIcon,
    'Marvel': marvelIcon,
    'Axure Rp': axureIcon,

    // Automation
    'Selenium': seleniumIcon,
    'JUnint': junitIcon,
    'TestNG': testngIcon,
    'APPium': appiumIcon,
    'Cucumber': cucumberIcon,
    'TestComplete': testcompleteIcon,
    'Postman': postmanIcon,

    //Backend
    'Django': djangoIcon,
    'ASP.NET Core': netIcon,
    'Laravel': laravelIcon,
    'Ruby on Rails': rorIcon,
    'Flask': flaskIcon, //not found
    'Cake php': cakeIcon,
    'NextJs': nextIcon,
    'Meteor': meteorIcon,
    'Node.js': nodeIcon,
    'Express.js': expressIcon,
    'Feather.js': featherIcon,
    'sail.js': sailsIcon,

    //DevOps
    'TOGAF (The Open Group Architecture Framework)': togafIcon,
    'Zachman Framework,AWS Well-Architected Framework': awsIcon,
    'Archimate': archimateIcon,

    //Quality Assurance
    'Automation': automationIcon,
    'Manual': manualIcon,
    'Both': bothIcon,
  }

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
    setBack(true);
    setAddTransition(false)
    setDeleteResource(false);
    setStartAnimation(false)
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

  useEffect(() => {
    if (isNarrowScreen) {
      setOrientation("horizontal");
    } else {
      setOrientation("vertical");
    }
  }, [isNarrowScreen]);

  // receiving selected option from child Component
  const selectedOptionPassToParent = (data) => {
    for (const key in imageIcons) {
      if (key === data?.resourceOption?.opt) {
        data.resourceOption = { ...data.resourceOption, icon: imageIcons[key] }
      }
    }

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
    setEditTransition(true)
  }

  // setting Response in actual Array
  const setResponseData = () => {
    if (values.length) {
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
    setBack(true);
    setDeleteResource(false)
    setStartAnimation(false)


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
      setCurrentQuestion(true)
      actualResponses.totalCost = totalCost;
    }
  }, [nextQuestion]);

  const [dropDownVal, setDropDownVal] = useState(false)

  const handleModal = () => {
    setopenModal(true)
    setDropDownVal(true)
    setBack(false)
    setDeleteResource(false)
    setStartAnimation(false)
    setEditTransition(false)

  }
  const handleClose = () => {
    setopenModal(false)
    setI(null)
    setEditMode(false)
    setDropDownVal(false)
    setBack(false)
    setStartAnimation(true)
    setAddTransition(false)
  }
  const editResource = (index) => {
    setI(index)
    setAddTransition(false)
    setEditIndex(index)
    // setCount(index)
    setEditTransition(false)
    setEditMode(true)
    setopenModal(true)
    setDropDownVal(true)
    setBack(false)
  }

  return (

    <CustomBox>
      {additionalQuesiton.length && staffBase.length || !displayQuestion || !actualResponses.length ? (
        <Box
          sx={{
            maxWidth: "1285px",
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          {
            currentState || displayQuestion ?
              <Box sx={{ marginBottom: '30px' }}>
                <Typography variant="h1" sx={{
                  fontSize: '60px',
                  fontWeight: 700,
                  marginBottom: '20px'
                }}>Estimate Team Cost</Typography>
                <div role="presentation">
                  <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="black" href="/">Home</Link>
                    <Link underline="hover" color="black" href="/cost-estimation-calculator">Cost Estimation Calculator</Link>
                    <Link underline="hover" color="black" href="/cost-estimation-calculator/staff">Team</Link>
                  </Breadcrumbs>
                </div>
              </Box>
              : <></>
          }
          {
            openModal ?
              <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

                sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
              >
                <CustomCard>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box>
                      <CloseIcon sx={{
                        marginBottom: "15px",
                        fontSize: 20,
                        float: "right",
                        "&:hover": {
                          cursor: "pointer",
                        }
                      }} onClick={handleClose} />
                    </Box>
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
                      dropDownVal={dropDownVal}
                    />
                  </Box>
                </CustomCard>
              </Modal>
              : null
          }
          {currentState ? (
            <>
              <Box>
                <Typography variant="h5"
                  sx={{
                    fontSize: "30px",
                    margin: '60px 0 30px 0',
                    textAlign: "left",
                    fontWeight: 700
                  }}>
                  Please select a team as per your requirements
                </Typography>
                <Box
                  sx={{
                    display: "flex",

                    gap: '1em',
                    maxWidth: 970,
                    flexWrap: isNarrowStaff ? "wrap" : "nowrap",
                    marginBottom: "20px"
                  }}>
                  <CustomButton
                    variant="default"
                    onClick={() => {
                      setCount(count + 1);
                      handleModal()
                      // setI(count + 1)
                      setAddTransition(true)
                    }}
                  >
                    + &nbsp; Add New Requirements
                  </CustomButton>
                </Box>

                <TableContainer component={Paper} sx={{ maxWidth: 970, marginRight: "auto" }}>
                  <Table
                    sx={{
                      minWidth: 700,
                      "& .MuiTableCell-root.MuiTableCell-head": {
                        backgroundColor: "#fff",
                        color: "#000"
                      },
                    }}
                    aria-label="customized table">
                    <TableHead>
                      <StyledTableCell sx={{ textAlign: "center", minWidth: '100px', fontSize: '12.82px', fontWeight: 700, padding: "20px 15px", lineHeight: "15.39[x" }}>Image</StyledTableCell>
                      <StyledTableCell sx={{ textAlign: "center", minWidth: '100px', fontSize: '12.82px', fontWeight: 700, padding: "20px 15px", lineHeight: "15.39[x" }}>Framework</StyledTableCell>
                      <StyledTableCell sx={{ textAlign: "center", minWidth: '100px', fontSize: '12.82px', fontWeight: 700, padding: "20px 15px", lineHeight: "15.39[x" }}>Specialist</StyledTableCell>
                      <StyledTableCell sx={{ textAlign: "center", minWidth: '100px', fontSize: '12.82px', fontWeight: 700, padding: "20px 15px", lineHeight: "15.39[x" }}>Seniority Level</StyledTableCell>
                      <StyledTableCell sx={{ textAlign: "center", minWidth: '100px', fontSize: '12.82px', fontWeight: 700, padding: "20px 15px", lineHeight: "15.39[x" }}>Number Of Resources</StyledTableCell>
                      <StyledTableCell sx={{ textAlign: "center", minWidth: '100px', fontSize: '12.82px', fontWeight: 700, padding: "20px 15px", lineHeight: "15.39[x" }}>Actions</StyledTableCell>
                    </TableHead>
                    <TableBody
                    // sx={{ width: "100%" }}
                    >
                      {
                        resource.length === 0
                          ? <StyledTableRow>
                            <StyledTableCell component="th" scope="row" colSpan={6} sx={{ textAlign: "center" }}>
                              No Resources to Show
                            </StyledTableCell>
                          </StyledTableRow>
                          : resource.map((row, index) => (
                            < StyledTableRow key={index}
                              sx={{
                                backgroundColor: "#fff",
                                zIndex: 1,
                                opacity: 1,
                                width: "100%",
                                "&:hover": {
                                  backgroundColor: "rgba(0, 0, 0, 0.04)"
                                },
                                animation: index === count && !back && addTransition && !deleteResources
                                  ? `${newRowTransition} .5s ease`
                                  : editIndex === index && editTransition && !addTransition && !back
                                    ? `${newRowTransition} .5s ease`
                                    : 'none',
                              }}
                            >
                              <StyledTableCell
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center"
                                }}
                              >
                                {row.resourceOption?.icon
                                  ?
                                  <div style={{
                                    padding: ".5em", backgroundColor: "#fff",
                                    boxShadow: "0px 0px 3px 1px rgba(199,199,199,1)",
                                    borderRadius: "3px",
                                    width: "32px",
                                    height: "32px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                  }}>
                                    <img src={row.resourceOption?.icon?.src} style={{
                                      width: "30px",
                                      height: "30px",
                                    }} />
                                  </div>
                                  : <div style={{
                                    backgroundColor: "#fff",
                                    height: "40px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                  }}></div>}
                              </StyledTableCell>
                              <StyledTableCell sx={{ textAlign: "center", }}>
                                {row.resourceOption?.opt}
                              </StyledTableCell>
                              <StyledTableCell sx={{ textAlign: "center", }} scope="row">
                                {row.resource}
                              </StyledTableCell>
                              <StyledTableCell sx={{ textAlign: "center", }}>{row.seniorityLevel}</StyledTableCell>
                              <StyledTableCell sx={{ textAlign: "center", }}>{row.numOfResources}</StyledTableCell>
                              <StyledTableCell sx={{ textAlign: "center", }}>
                                <ButtonGroup variant="contained" aria-label="Basic button group" sx={{
                                  border: "0.55px solid #D5D5D5",
                                  backgroundColor: "#FAFBFD",
                                  borderRadius: '6px',
                                  boxShadow: 'none',
                                  height: '30px',
                                  borderColor: "#D5D5D5",

                                  "&.MuiButtonGroup-root .MuiButtonGroup-firstButton": {
                                    borderColor: "#D5D5D5",
                                  }
                                }}>
                                  <Button
                                    sx={{
                                      backgroundColor: "#FAFBFD",
                                      borderColor: "#D5D5D5",
                                      "&:hover": {
                                        backgroundColor: "#9c9c9c3b",
                                      }
                                    }}
                                    onClick={() => {
                                      editResource(index)
                                    }}>
                                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <g opacity="0.6">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.18966 8.95752L6.86609 9.28173L7.19785 7.01472L13.1733 1.1863C13.7233 0.649813 14.6151 0.649813 15.1651 1.1863C15.7151 1.72279 15.7151 2.59262 15.1651 3.12911L9.18966 8.95752Z" stroke="black" stroke-width="1.09901" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12.5089 1.83423L14.5007 3.77703" stroke="black" stroke-width="1.09901" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12.7599 9.02703V13.6062C12.7599 14.112 12.3396 14.5221 11.821 14.5221H2.43156C1.91299 14.5221 1.49261 14.112 1.49261 13.6062V4.44782C1.49261 3.94202 1.91299 3.53198 2.43156 3.53198H7.12628" stroke="black" stroke-width="1.09901" stroke-linecap="round" stroke-linejoin="round" />
                                      </g>
                                    </svg>
                                  </Button>
                                  <Button
                                    sx={{
                                      backgroundColor: "#FAFBFD",
                                      borderColor: "#D5D5D5",
                                      "&:hover": {
                                        backgroundColor: "#9c9c9c3b",
                                      }
                                    }}
                                    onClick={() => {
                                      deleteResource(index)
                                    }}>
                                    <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.548 14.4308H4.66085C4.03857 14.4308 3.53412 13.9387 3.53412 13.3318V3.44067H13.6747V13.3318C13.6747 13.9387 13.1703 14.4308 12.548 14.4308Z" stroke="#EF3826" stroke-width="1.09901" stroke-linecap="round" stroke-linejoin="round" />
                                      <path d="M6.91446 11.1338V6.73779" stroke="#EF3826" stroke-width="1.09901" stroke-linecap="round" stroke-linejoin="round" />
                                      <path d="M10.2942 11.1338V6.73779" stroke="#EF3826" stroke-width="1.09901" stroke-linecap="round" stroke-linejoin="round" />
                                      <path d="M1.28076 3.4408H15.9283" stroke="#EF3826" stroke-width="1.09901" stroke-linecap="round" stroke-linejoin="round" />
                                      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.2939 1.24268H6.91372C6.29144 1.24268 5.78699 1.73472 5.78699 2.34169V3.4407H11.4207V2.34169C11.4207 1.73472 10.9162 1.24268 10.2939 1.24268Z" stroke="#EF3826" stroke-width="1.09901" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>

                                  </Button>
                                </ButtonGroup>
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>

              <Box
                sx={{
                  marginTop: "20px",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  gap: '1em',
                  maxWidth: 970,
                }}
              >
                <CustomNextButton
                  variant="contained"
                  sx={{
                    '&.MuiButton-contained.Mui-disabled': {
                      border: "1px solid #959595",
                      backgroundColor: "rgba(94, 94, 94, 0.12)",
                      color: "rgba(0, 0, 0, 0.26)"
                    }
                  }}
                  onClick={() => {
                    nextQuestion();
                    setAddMore(false)
                    setEditIndex(null)
                  }}
                  disabled={resource[0] ? false : true}
                >
                  Next
                </CustomNextButton>
              </Box>
            </>
          ) : (
            <>
              <Box>
                {displayQuestion
                  ?
                  <Grid
                    container
                    sx={{
                      "&.MuiGrid-root.MuiGrid-container": {
                        justifyContent: "space-between"
                      },
                      "&.css-11lq3yg-MuiGrid-root": {
                        justifyContent: "space-between",
                        flex: 1
                      }
                    }}
                  >
                    <Grid item
                      lg={7} md={12} sm={12} xs={12}
                    >
                      <QuestionsProgress currentQuestion={currentQuestionIndex + 1} totalQuestions={additionalQuesiton.length + 1} />
                    </Grid>
                    <Grid item lg={4.6} md={12} sm={12} xs={12}>
                      <CustomCostBox>
                        <CustomNormalTypography
                          variant="h6"
                          sx={{ color: "#fff", fontSize: "1.1em" }}
                        >
                          Estimated Cost
                        </CustomNormalTypography>
                        <CustomTypography>${totalCost}.00</CustomTypography>
                      </CustomCostBox>
                    </Grid>
                  </Grid>
                  : null}
              </Box>

              {displayQuestion
                ?
                <Grid container spacing={{ xs: 3, sm: 3, md: 3, lg: 3, xl: 3 }}
                  sx={{ overflow: "hidden" }}
                >
                  <Grid item lg={3.9} md={12} sm={12} xs={12}>

                    {actualResponses.length || actualResponses.responses ? (
                      <Stepper
                        responses={actualResponses.responses}
                        changeActiveQuestion={changeActiveQuestion}
                      />
                    ) : null}
                  </Grid>
                  <Grid item lg={8} md={12} sm={12} xs={12}
                    sx={{
                    }}>
                    <Box sx={{
                      height: "100%",
                      backgroundColor: '#F7F7F7',
                      marginTop: '67.5px',
                      paddingBottom: '50px'
                    }}>
                      <Box
                        sx={{
                          display: "flex", alignItems: "center",
                          padding: '48px 0 0 0',
                          gap: changeGap && actualResponses.length > 0 ? "2.9em" : "0",
                          marginBottom: '40px'
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            position: "relative",
                          }}
                        >
                          {currentQuestionIndex > 0 && (
                            <CustomBackButton onClick={backQuestion}>
                              <svg style={{
                                textAlign: "center",
                                fontSize: "1.6em",
                                alignItems: "center",
                                justifyContent: "center",
                                display: "flex",
                                width: "100%",
                                paddingRight: '5px',
                                transition: "all 0.3s ease-in-out",
                                ":hover": {
                                  cursor: "pointer",
                                },
                              }} width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.623712 7.37629C0.436241 7.18876 0.330925 6.93445 0.330925 6.66929C0.330925 6.40412 0.436241 6.14982 0.623712 5.96229L6.28071 0.305288C6.37296 0.209778 6.4833 0.133596 6.60531 0.0811868C6.72731 0.0287778 6.85853 0.00119152 6.99131 3.77123e-05C7.12409 -0.0011161 7.25577 0.0241859 7.37867 0.0744668C7.50156 0.124748 7.61321 0.199001 7.70711 0.292893C7.801 0.386786 7.87525 0.498438 7.92553 0.621334C7.97581 0.744231 8.00112 0.87591 7.99996 1.00869C7.99881 1.14147 7.97122 1.27269 7.91881 1.39469C7.8664 1.5167 7.79022 1.62704 7.69471 1.71929L2.74471 6.66929L7.69471 11.6193C7.87687 11.8079 7.97766 12.0605 7.97539 12.3227C7.97311 12.5849 7.86794 12.8357 7.68253 13.0211C7.49712 13.2065 7.24631 13.3117 6.98411 13.314C6.72192 13.3162 6.46931 13.2154 6.28071 13.0333L0.623712 7.37629Z" fill="white" />
                              </svg>
                            </CustomBackButton>
                          )}
                        </Box>
                        <Box
                          sx={{ paddingLeft: actualResponses.responses.length > 0 ? "20px" : "50px", }}
                        >
                          <Typography sx={{ color: "#000", fontSize: "24px", fontWeight: 700, minWidth: "100px", }}>
                            Question No: {actualResponses.responses.length + 1}
                          </Typography>
                        </Box>
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
                            <div style={{
                              margin: "0 50px",
                              backgroundColor: '#fff',
                              border: '1px solid #E3EAEF',
                              borderRadius: '10px',
                              padding: '26px 34px'
                            }} >

                              <Question
                                questionNumber={actualResponses.responses.length}
                                currentQuestion={currentQuestion}
                                getResponsesData={getResponsesData}
                                selectedOption={lastQuestionSelectedOption}
                              />

                            </div>
                          </Slide>
                          : ""}
                    </Box>
                  </Grid>
                </Grid >
                :
                <Box
                  sx={{
                    maxWidth: "1520px",
                    marginRight: "auto",
                    marginLeft: "auto",
                  }}
                >
                  <ShowSummary name={"Team"} response={actualResponses ? actualResponses : []} />
                </Box>}
            </>
          )}
        </Box >
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
    </CustomBox >
  );

}
export default StaffComponent;