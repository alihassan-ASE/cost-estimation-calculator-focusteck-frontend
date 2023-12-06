"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { getQuestions } from "../../lib/api/getData";
import { postData } from "../../lib/api/postData";
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
  useTheme,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Chip,
  Grid,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowBack from "@mui/icons-material/ArrowBack";

const Staff = () => {
  const theme = useTheme();

  const [staffQuestions, setStaffQuestions] = useState([]);
  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const [activeQuestions, setActiveQuestions] = useState("staffQuestions");
  const [formInput, setFormInput] = useState({
    userName: "",
    email: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    usernameError: null,
    emailError: null,
  });
  const [resourcesList, setResourcesList] = useState({});
  const [preState, setPreState] = useState(-1);
  const [currentAdditionalQuestionIndex, setCurrentAdditionalQuestionIndex] =
    useState(0);
  const [currentResource, setCurrentResource] = useState({
    resource: "",
    resourceOption: "",
    seniorityLevel: "",
    numOfResources: "",
  });
  const setCurrentAdditionalQuestion = useRef({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getQuestions();
        const { Resources, additionalQuestions } = data;
        setStaffQuestions(Resources);
        setAdditionalQuestions(additionalQuestions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const typeOfResourceOptions = useMemo(
    () => staffQuestions.map((item) => item.typeOfResource),
    [staffQuestions]
  );

  const seniorityLevelOptions = ["Mid Level", "Senior Level", "Team Lead"];

  const numOfResourcesOptions = {
    "Mid Level": [1, 2, 3, 4],
    "Senior Level": [1, 2, 3, 4, 5],
    "Team Lead": [1, 2],
  };

  const handleResourceChange = (selectedResource) => {
    setCurrentResource({
      ...currentResource,
      resource: selectedResource,
      resourceOption: { opt: "", price: "" },
    });
  };
  const handleResourceOption = (selectedOption) => {
    staffQuestions
      .find((item) => item.typeOfResource === currentResource.resource)
      .options.map((option, index) => {
        if (selectedOption === option.opt) {
          setCurrentResource({
            ...currentResource,
            resourceOption: { ...option },
          });
        }
      });
  };

  const handleSeniorityLevelChange = (selectedSeniorityLevel) => {
    setCurrentResource({
      ...currentResource,
      seniorityLevel: selectedSeniorityLevel,
      numOfResources: "",
    });
  };

  const handleNumOfResourcesChange = (selectedNumOfResources) => {
    setCurrentResource({
      ...currentResource,
      numOfResources: selectedNumOfResources,
    });
  };

  const handleOptions = (selectedOption) => {
    setCurrentAdditionalQuestion.current = {
      _id: additionalQuestions[preState]._id,
      question: additionalQuestions[preState].question,
      options: additionalQuestions[preState].options,
      category: additionalQuestions[preState].category,
      typeofselection: additionalQuestions[preState].typeofselection,
      label: additionalQuestions[preState].label,
      selectedOption: selectedOption,
    };
  };

  const addResource = () => {
    if (
      currentResource.resource &&
      currentResource.resourceOption &&
      currentResource.seniorityLevel &&
      currentResource.numOfResources
    ) {
      const { responses } = resourcesList;

      if (responses === undefined) {
        setResourcesList({
          responses: [{ resources: [{ ...currentResource }] }],
        });
      } else {
        const data = responses[0];
        const { resources } = data;
        setResourcesList({
          responses: [{ resources: [...resources, { ...currentResource }] }],
        });
      }

      setCurrentResource({
        resource: "",
        resourceOption: { opt: "", price: "" },
        seniorityLevel: "",
        numOfResources: "",
      });
    }
  };

  function goNext() {
    if (activeQuestions === "staffQuestions") {
      if (
        currentResource.resource &&
        currentResource.resourceOption &&
        currentResource.seniorityLevel &&
        currentResource.numOfResources
      ) {
        // setPreState(0);
        setActiveQuestions("additionalQuestions");
      } else {
        alert("Please add at least one resource before proceeding.");
      }
    }
  }

  function Next() {
    const { responses } = resourcesList;
    if (
      setCurrentAdditionalQuestion.current.question &&
      setCurrentAdditionalQuestion.current.options &&
      setCurrentAdditionalQuestion.current.category &&
      setCurrentAdditionalQuestion.current.selectedOption
    ) {
      if (resourcesList.responses && resourcesList.responses.length > 1) {
        resourcesList.responses.forEach((element, index) => {
          if (
            element.question === setCurrentAdditionalQuestion.current.question
          ) {
            // console.log("Update this Question: ", element);
            element.question = setCurrentAdditionalQuestion.current.question;
            element.options = setCurrentAdditionalQuestion.current.options;
            element.category = setCurrentAdditionalQuestion.current.category;
            element.selectedOption =
              setCurrentAdditionalQuestion.current.selectedOption;
          }
        });
      }
      setResourcesList({
        responses: [...responses, { ...setCurrentAdditionalQuestion.current }],
      });
    } else {
      console.log("Something is Missing in Additional Questions");
    }
    if (activeQuestions === "additionalQuestions") {
      if (preState < additionalQuestions.length - 1) {
        setPreState(preState + 1);
      } else {
        setActiveQuestions("userData");
      }
    }
  }

  const submitForm = (formInput) => {
    if (!formInput.userName) {
      setErrorMessage({ usernameError: "Incorrect UserName" });
    }
    if (!formInput.email) {
      setErrorMessage({ emailError: "Incorrect Email" });
    }
    if (formInput.userName && formInput.email) {
      setResourcesList({
        totalCost: totalPrice,
        ...formInput,
        ...resourcesList,
      });
      setErrorMessage({ usernameError: null, emailError: null });
      setActiveQuestions("Submitted");
    }
  };
  const { responses } = resourcesList;
  let totalPrice = 0;

  if (responses) {
    totalPrice = responses[0].resources.reduce((total, resource) => {
      const price =
        resource.resourceOption?.price || resource.selectedOption?.price || 0;
      return total + price;
    }, 0);

    // For subsequent objects in responses array
    if (responses.length > 1) {
      totalPrice += responses.reduce((total, resource) => {
        const price = resource.selectedOption?.price || 0;
        return total + price;
      }, 0);
    }
  }

  if (activeQuestions === "Submitted") {
    postData(resourcesList);
  }

  /* ---------------------------- Styles ---------------------------- */
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  };

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" mb={4} mt={4}>
        Staff Questions
      </Typography>
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
                  {totalPrice} $
                </Typography>
                {/* Other components or data */}
              </React.Fragment>
            }
          />
        </ListItemButton>
      </List>
      <Box>
        {preState > 0 ? (
          <span>
            <IconButton
              onClick={() => {
                setPreState(preState - 1);
              }}
            >
              <ArrowBack />
            </IconButton>
          </span>
        ) : null}

        {activeQuestions === "staffQuestions" &&
          responses &&
          responses[0].resources.map((resource, index) => (
            <Box key={index} sx={{ display: "flex" }}>
              <Box sx={{ display: "flex" }}>
                <Typography variant="h6">Resource: </Typography>
                <Button>{resource.resource}</Button>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Typography variant="h6">Option:</Typography>
                <Button>{resource.resourceOption.opt}</Button>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Typography variant="h6">Seniority Level:</Typography>
                <Button>{resource.seniorityLevel}</Button>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Typography variant="h6">No. of Persons:</Typography>
                <Button>{resource.numOfResources}</Button>
              </Box>
            </Box>
          ))}

        {activeQuestions === "staffQuestions" && (
          <Box>
            {/* Current Resource Dropdown */}
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-chip-label">
                Resource Type
              </InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                value={currentResource.resource}
                onChange={(e) => handleResourceChange(e.target.value)}
                input={
                  <OutlinedInput
                    id="select-multiple-chip"
                    label="Resource Type"
                  />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    <Chip key={selected} label={selected} />
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {typeOfResourceOptions.map((resource, index) => (
                  <MenuItem
                    key={index}
                    value={resource}
                    style={{
                      fontWeight: theme.typography.fontWeightRegular,
                    }}
                  >
                    {resource}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {currentResource.resource && (
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">
                  Resource Option
                </InputLabel>
                <Select
                  value={currentResource.resourceOption.opt}
                  onChange={(e) => handleResourceOption(e.target.value)}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Resource Type"
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      <Chip key={selected} label={selected} />
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {staffQuestions
                    .find(
                      (item) => item.typeOfResource === currentResource.resource
                    )
                    .options.map((option, index) => (
                      <MenuItem
                        key={index}
                        value={option.opt}
                        style={{
                          fontWeight: theme.typography.fontWeightRegular,
                        }}
                      >
                        {option.opt} ({option.price} $)
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            )}

            {currentResource.resourceOption &&
              currentResource.resourceOption.opt !== "" && (
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="demo-multiple-chip-label">
                    Seniority Level
                  </InputLabel>
                  <Select
                    value={currentResource.seniorityLevel}
                    onChange={(e) => handleSeniorityLevelChange(e.target.value)}
                    input={
                      <OutlinedInput
                        id="select-multiple-chip"
                        label="Resource Type"
                      />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        <Chip key={selected} label={selected} />
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {seniorityLevelOptions.map((level, index) => (
                      <MenuItem
                        key={index}
                        value={level}
                        style={{
                          fontWeight: theme.typography.fontWeightRegular,
                        }}
                      >
                        {level}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

            {currentResource.seniorityLevel && (
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">
                  No. of Person
                </InputLabel>
                <Select
                  value={currentResource.numOfResources}
                  onChange={(e) =>
                    handleNumOfResourcesChange(parseInt(e.target.value))
                  }
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Resource Type"
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      <Chip key={selected} label={selected} />
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {numOfResourcesOptions[currentResource.seniorityLevel].map(
                    (num, index) => (
                      <MenuItem
                        key={index}
                        value={num}
                        style={{
                          fontWeight: theme.typography.fontWeightRegular,
                        }}
                      >
                        {num}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            )}

            <Box
              sx={{
                display: "flex",
                gap: "2em",
              }}
            >
              <Button variant="text" onClick={addResource}>
                Add More Resources
              </Button>
              <Button
                variant="outlined"
                className="btn"
                onClick={() => {
                  goNext();
                  addResource();
                  setPreState(preState + 1);
                }}
              >
                Next
              </Button>
            </Box>
          </Box>
        )}

        {activeQuestions === "additionalQuestions" && (
          <Box>
            <Typography variant="h4">
              {additionalQuestions[preState].question}
            </Typography>
            <Stack direction="row" sx={{ flexWrap: "wrap" }}>
              {additionalQuestions[preState].options.map((option, index) => (
                <React.Fragment key={index}>
                  <Button
                    size="large"
                    variant="outlined"
                    sx={{ maxWidth: 260, m: 1.5 }}
                    onClick={() => {
                      handleOptions(option);
                      Next();
                      setPreState(preState + 1);
                    }}
                  >
                    {option.opt} ({option.price} $)
                  </Button>
                </React.Fragment>
              ))}
            </Stack>
          </Box>
        )}
        {activeQuestions === "userData" && (
          <form>
            <Box>
              <TextField
                sx={{ mb: 3 }}
                style={{ width: 500 }}
                id="outlined-basic, user-name"
                label="Name"
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
              <br />
              <TextField
                sx={{ mb: 3 }}
                style={{ width: 500 }}
                // fullWidth
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
        )}
        {activeQuestions === "Submitted" && (
          <Typography variant="h3" component="h3">
            Thank you! We will contact you soon
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Staff;
