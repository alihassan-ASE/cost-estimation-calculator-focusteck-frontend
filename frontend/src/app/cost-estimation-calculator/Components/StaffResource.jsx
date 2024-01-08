"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography, Button, Chip, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from '@mui/icons-material/Close';
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
    if (label === "Resources") {
      setCurrentResource({ resource: data });
    } else if (label === "Resource Option") {
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
    <Box>
      {
        newOption.length
          ?
          <Box
            sx={{
              // width: 290,
              width: "100%"
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>

              <QuestionsComponent
                typeOfSelection={typeOfSelection}
                question={question}
                typeofUI={type}
                options={newOption}
                label={label ? label : "Resources"}
                disable={false}
                selectedOption={currentResource?.resource}
                selectedOptionPassToParent={getData}
              />

              {
                showDropDown ?
                  <>
                    {
                      options.find((data) => {
                        if (data.typeOfResource === currentResource.resource) {
                          resourceData = data.options;
                        }
                      })
                    }
                    < QuestionsComponent
                      typeOfSelection={typeOfSelection}
                      question={question}
                      typeofUI={type}
                      options={resourceData}
                      label={label ? label : "Resource Option"}
                      disable={currentResource.resource ? false : true}
                      selectedOption={currentResource?.resourceOption}
                      selectedOptionPassToParent={getData}
                    />
                  </>
                  : null
              }

              {
                showDropDown ?

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
                  : null}

              {
                showDropDown ?
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
                  : null}


            </Box>

            {/* Save Button */}
            <Box sx={{ margin: "1em 0 0 0", display: "flex", justifyContent: "flex-end" }}>
              <Button
                sx={{
                  minWidth: "120px",
                  marginLeft: "auto",
                  color: "#000",
                  backgroundColor: "#fff",
                  border: "1px solid #fff",
                  "&:hover": {
                    color: "#fff",
                    backgroundColor: "#0045e6",
                    border: "1px solid #0045e6",
                  },
                  "&:active": {
                    color: "#fff",
                    backgroundColor: "#0045e6",
                    border: "1px solid #0045e6",
                  },
                  "&:focus": {
                    color: "#fff",
                    backgroundColor: "#0045e6",
                    border: "1px solid #0045e6",
                  },
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
