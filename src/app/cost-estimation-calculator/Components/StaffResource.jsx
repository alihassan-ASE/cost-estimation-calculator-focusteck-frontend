"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography, Button, Chip, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import QuestionsComponent from "./Questions";
import CircularProgress from "@mui/material/CircularProgress";


const CustomButton = styled(Button)(({ theme }) => ({
  flex: 1,
  margin: " .5em",
  display: "flex",
  justifyContent: "space-between",
  gap: "1em",
  border: "1px solid #ebebeb",
  padding: "1em 1em",
  borderRadius: "2px",
}));

const CustomDropDownHeading = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  lineHeight: "21px",
  fontWeight: 400,
  marginBottom: "8px"
}));

const StaffResource = ({
  question,
  options,
  label,
  index,
  setValues,
  values,
  selectedOption,
  selectedOptionPassToParent,
  selectedSave,
  dropDownVal
}) => {
  let resourceData;
  const [currentResource, setCurrentResource] = useState({
    resource: "",
    resourceOption: "",
    seniorityLevel: "",
    numOfResources: "",
  });
  const [saveButton, setSaveButton] = useState(false);
  const [showDropDown, setShowDropDown] = useState();

  useEffect(() => {
    setShowDropDown(dropDownVal)
  })

  const seniorityLevelOptions = ["Mid Level", "Senior Level", "Team Lead"];
  const numOfResourcesOptions = {
    "Mid Level": [1, 2, 3, 4],
    "Senior Level": [1, 2, 3, 4, 5],
    "Team Lead": [1, 2],
  };


  useEffect(() => {
    if (selectedOption?.length ? selectedOption[index] : null) {
      setCurrentResource({
        resource: selectedOption[index]?.resource,
        resourceOption: selectedOption[index]?.resourceOption,
        seniorityLevel: selectedOption[index]?.seniorityLevel,
        numOfResources: selectedOption[index]?.numOfResources,
      });
    }
  }, [selectedOption]);

  useEffect(() => {
    if (
      currentResource.resource &&
      currentResource.resourceOption &&
      currentResource.seniorityLevel &&
      currentResource.numOfResources
    ) {
      setSaveButton(true);
    }
  }, [currentResource]);


  const getData = (data, label) => {
    if (label === "Specialist") {
      setCurrentResource({ resource: data });
    } else if (label === "Framework") {
      setCurrentResource({ ...currentResource, resourceOption: data });
    } else if (label === "Seniority Level") {
      setCurrentResource({
        ...currentResource,
        seniorityLevel: data,
        numOfResources: "",
      });
    } else if (label === "Number of Resources") {
      setCurrentResource({ ...currentResource, numOfResources: data });
    }
  };

  const newOption = useMemo(() => {
    return options.map((item) => item.typeOfResource);
  }, [options]);

  const type = useMemo(() => {
    return options[0]?.typeOfUI;
  }, [options]);

  const typeOfSelection = useMemo(() => {
    return options[0]?.typeofselection;
  }, [options]);

  return (
    <Box
      sx={{
        // width: 290,
        // width: "100%"
        // maxWidth: 700,
        padding: "0 21px 0 21px"
      }}
    >
      <Typography variant="h4"
        sx={{
          fontSize: "30px",
          fontWeight: 700,
          lineHeight: "40px",
          textAlign: "center",
          textTransform: "capitalize",
          marginBottom: '35px'
        }}>
        Please Select A Team as per your requirements
      </Typography>
      {
        newOption.length
          ?
          <Box
            sx={{
              // maxWidth: 700
            }}
          >

            <Box sx={{ display: "flex", flexDirection: "column", rowGap: "30px" }}>
              <Box>
                <CustomDropDownHeading variant="h6">Specialist</CustomDropDownHeading>
                <QuestionsComponent
                  typeOfSelection={typeOfSelection}
                  question={question}
                  typeofUI={type}
                  options={newOption}
                  label={label ? label : "Specialist"}
                  disable={false}
                  selectedOption={currentResource?.resource}
                  selectedOptionPassToParent={getData}
                />
              </Box>

              {
                showDropDown ?
                  <Box>
                    {
                      options.find((data) => {
                        if (data.typeOfResource === currentResource.resource) {
                          resourceData = data.options;
                        }
                      })
                    }
                    <CustomDropDownHeading variant="h6">Framework</CustomDropDownHeading>

                    < QuestionsComponent
                      typeOfSelection={typeOfSelection}
                      question={question}
                      typeofUI={type}
                      options={resourceData}
                      label={label ? label : "Framework"}
                      disable={currentResource.resource ? false : true}
                      selectedOption={currentResource?.resourceOption}
                      selectedOptionPassToParent={getData}
                    />
                  </Box>
                  : null
              }

              {
                showDropDown ?
                  <Box>
                    <CustomDropDownHeading variant="h6">Seniority Level</CustomDropDownHeading>

                    <QuestionsComponent
                      typeOfSelection={typeOfSelection}
                      question={question}
                      typeofUI={"DropDown"}
                      options={seniorityLevelOptions}
                      label={label ? label : "Seniority Level"}
                      disable={currentResource.resourceOption ? false : true}
                      selectedOption={currentResource?.seniorityLevel}
                      selectedOptionPassToParent={getData}
                    />
                  </Box>
                  : null}

              {
                showDropDown ?
                  <Box>
                    <CustomDropDownHeading variant="h6">Number of Resources</CustomDropDownHeading>

                    <QuestionsComponent
                      typeOfSelection={typeOfSelection}
                      question={question}
                      typeofUI={"DropDown"}
                      options={numOfResourcesOptions[currentResource.seniorityLevel]}
                      label={label ? label : "Number of Resources"}
                      disable={currentResource.seniorityLevel ? false : true}
                      selectedOption={currentResource?.numOfResources}
                      selectedOptionPassToParent={getData}
                    />
                  </Box>
                  : null}


            </Box>

            {/* Save Button */}
            <Box sx={{ margin: "32px 0 0 0", display: "flex", justifyContent: "center" }}>
              <Button
                sx={{
                  minWidth: "120px",
                  textTransform: "capitalize",
                  color: "#fff",
                  backgroundColor: "#005DBD",
                  border: "1px solid #005DBD",
                  padding: '15px 46.5',
                  "&:hover": {
                    color: "#000",
                    backgroundColor: "#fff",
                    border: "1px solid #fff",
                  },
                  "&:active": {
                    color: "#000",
                    backgroundColor: "#fff",
                    border: "1px solid #fff",
                  },
                  "&:focus": {
                    color: "#000",
                    backgroundColor: "#fff",
                    border: "1px solid #fff",
                  },
                  '&.MuiButton-contained.Mui-disabled': {
                    border: "1px solid #959595",
                    backgroundColor: "rgba(94, 94, 94, 0.12)",
                    color: "rgba(0, 0, 0, 0.26)"
                  }
                }}
                disabled={
                  currentResource.resource &&
                    currentResource.resourceOption &&
                    currentResource.seniorityLevel &&
                    currentResource.numOfResources &&
                    saveButton
                    ? false
                    : true
                }
                variant="contained"
                onClick={() => {
                  setSaveButton(false);
                  if (
                    index !== undefined &&
                    values.length > index &&
                    currentResource.resource &&
                    currentResource.resourceOption &&
                    currentResource.seniorityLevel &&
                    currentResource.numOfResources
                  ) {
                    const existingResource = values[index];
                    if (
                      existingResource?.resource !== currentResource.resource ||
                      existingResource?.resourceOption !==
                      currentResource.resourceOption ||
                      existingResource?.seniorityLevel !==
                      currentResource.seniorityLevel ||
                      existingResource?.numOfResources !==
                      currentResource.numOfResources
                    ) {
                      const updatedValues = [...values];
                      updatedValues[index] = {
                        ...existingResource,
                        resource: currentResource.resource,
                        resourceOption: currentResource.resourceOption,
                        seniorityLevel: currentResource.seniorityLevel,
                        numOfResources: currentResource.numOfResources,
                      };
                      setValues(updatedValues);
                    }
                  } else if (
                    selectedOption?.length ? selectedOption[index] : null
                  ) {
                    selectedOptionPassToParent(
                      {
                        resource: selectedOption[index].resource,
                        resourceOption: selectedOption[index].resourceOption,
                        seniorityLevel: selectedOption[index].seniorityLevel,
                        numOfResources: selectedOption[index].numOfResources,
                      }
                    );
                  } else {
                    selectedOptionPassToParent(currentResource);
                  }
                  selectedSave(false)
                }}
              >
                Save
              </Button>
            </Box>


          </Box >
          : <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "60vh"
            }}
          >
            <CircularProgress />
          </Box>
      }
    </Box>
  );
};

export default StaffResource;
