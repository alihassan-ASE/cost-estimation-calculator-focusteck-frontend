"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography, Button, Chip, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from '@mui/icons-material/Close';
import QuestionsComponent from "./Questions";

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
  count,
  setCount,
  values,
  selectedOption,
  selectedOptionPassToParent,
  deleteResource
}) => {
  let newOption;
  let resourceData;
  const [currentResource, setCurrentResource] = useState({
    resource: "",
    resourceOption: "",
    seniorityLevel: "",
    numOfResources: "",
  });

  const [getLabel, setLabel] = useState("");

  const seniorityLevelOptions = ["Mid Level", "Senior Level", "Team Lead"];
  useEffect(() => {

    if (values.length === 0 ) {
      setCurrentResource({});
      setCount(0);
    }
  
    if (values.length <= 0) {
      setShowDropdown(true)
    }
    if (selectedOption?.length ? selectedOption[index] : null) {
      setCurrentResource({
        resource: selectedOption[index]?.resource,
        resourceOption: selectedOption[index]?.resourceOption,
        seniorityLevel: selectedOption[index]?.seniorityLevel,
        numOfResources: selectedOption[index]?.numOfResources,
      });
      setShowDropdown(false);
    }
  }, [selectedOption]);

  const numOfResourcesOptions = {
    "Mid Level": [1, 2, 3, 4],
    "Senior Level": [1, 2, 3, 4, 5],
    "Team Lead": [1, 2],
  };
  const [saveButton, setSaveButton] = useState(false);
  const [showDropdown, setShowDropdown] = useState(true);

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

    setLabel(label);
  };
  newOption = useMemo(() => {
    return options.map((item) => item.typeOfResource);
  }, [options]);

  const type = useMemo(() => {
    return options[0]?.typeOfUI;
  }, [options]);

  const typeOfSelection = useMemo(() => {
    return options[0]?.typeofselection;
  }, [options]);

  useEffect(() => {
    if (
      currentResource.resourceOption &&
      currentResource.resourceOption &&
      currentResource.seniorityLevel &&
      currentResource.numOfResources
    ) {
      setSaveButton(true);
    }
  }, [currentResource]);

  return (
    <Box
      sx={{
        width: 270,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", }}>
      <CloseIcon onClick={() => { deleteResource(index) }} sx={{position: "relative",marginLeft:"auto",transition:"all 0.7s ease",fontSize:"20px",fontWeight: 'bold',borderRadius:"50%",color:"red",height:"20px",width:"20px",cursor:"pointer", "&:hover":{ backgroundColor:"red",color:"white" }}}/>
        {showDropdown && (
          <QuestionsComponent
            typeOfSelection={typeOfSelection}
            question={question}
            typeofUI={type}
            options={newOption}
            label={label ? label : "Resources"}
            disable={false}
            selectedOption={
              selectedOption?.length
                ? selectedOption[index]?.resource
                : currentResource?.resource || null
            }
            selectedOptionPassToParent={getData}
          />
        )}

        {!showDropdown && (
          <CustomButton
            onClick={() => {
              setShowDropdown(true);
              setSaveButton(true);
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontSize: 11, fontStyle: "italic" }}
            >
              Resources
            </Typography>
            <Chip
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              key="Resources"
              label={
                currentResource.resource !== ""
                  ? currentResource.resource
                  : selectedOption[index]?.resource
              }
            />
          </CustomButton>
        )}

        {showDropdown && (
          <>
            {options.find((data) => {
              if (data.typeOfResource === currentResource.resource) {
                resourceData = data.options;
              }
            })}
            <QuestionsComponent
              typeOfSelection={typeOfSelection}
              question={question}
              options={resourceData}
              typeofUI={type}
              label={label ? label : "Resource Option"}
              disable={currentResource.resource ? false : true}
              selectedOption={
                currentResource.resource &&
                  !currentResource?.resourceOption?.opt
                  ? null
                  : currentResource?.resourceOption?.opt
                    ? currentResource?.resourceOption
                    : selectedOption?.length
                      ? selectedOption[index]?.resourceOption?.opt
                      : null
              }
              selectedOptionPassToParent={getData}
            />
          </>
        )}

        {!showDropdown && (
          <CustomButton
            onClick={() => {
              setShowDropdown(true);
              setSaveButton(true);
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontSize: 11, fontStyle: "italic" }}
            >
              Resource Option
            </Typography>
            <Chip
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              key="Resource Option"
              label={
                currentResource.resourceOption !== ""
                  ? `${currentResource.resourceOption?.opt} ($ ${currentResource.resourceOption?.price})`
                  : `${selectedOption[index]?.resourceOption.opt} ($ ${selectedOption[index]?.resourceOption.price} )`
              }
            />
          </CustomButton>
        )}

        {showDropdown && (
          <QuestionsComponent
            typeOfSelection={typeOfSelection}
            question={question}
            typeofUI={"DropDown"}
            options={seniorityLevelOptions}
            label={label ? label : "Seniority Level"}
            disable={currentResource.resourceOption ? false : true}
            selectedOption={
              currentResource.resource && !currentResource.seniorityLevel
                ? null
                : currentResource.seniorityLevel
                  ? currentResource.seniorityLevel
                  : selectedOption?.length
                    ? selectedOption[index]?.seniorityLevel
                    : null
            }
            selectedOptionPassToParent={getData}
          />
        )}

        {!showDropdown && (
          <CustomButton
            onClick={() => {
              setShowDropdown(true);
              setSaveButton(true);
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontSize: 11, fontStyle: "italic" }}
            >
              Seniority Level
            </Typography>
            <Chip
              key="Seniority Level"
              label={
                currentResource.seniorityLevel !== ""
                  ? currentResource.seniorityLevel
                  : selectedOption[index]?.seniorityLevel
              }
            />
          </CustomButton>
        )}

        {showDropdown && (
          <>
            <QuestionsComponent
              typeOfSelection={typeOfSelection}
              question={question}
              typeofUI={"DropDown"}
              options={numOfResourcesOptions[currentResource.seniorityLevel]}
              label={label ? label : "Number of Resources"}
              disable={currentResource.seniorityLevel ? false : true}
              selectedOption={
                currentResource.resource && !currentResource.numOfResources
                  ? null
                  : currentResource.numOfResources
                    ? currentResource.numOfResources
                    : selectedOption?.length
                      ? selectedOption[index]?.numOfResources
                      : null
              }
              selectedOptionPassToParent={getData}
            />
          </>
        )}

        {!showDropdown && (
          <CustomButton
            onClick={() => {
              setShowDropdown(true);
              setSaveButton(true);
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontSize: 11, fontStyle: "italic" }}
            >
              Number of Resources
            </Typography>
            <Chip
              key="Number of Resources"
              label={
                currentResource.numOfResources !== ""
                  ? currentResource.numOfResources
                  : selectedOption[index]?.numOfResources
              }
            />
          </CustomButton>
        )}
      </Box>

      {/* Save Button */}
      {showDropdown ? (
        <Box sx={{ margin: "1em 0" }}>
          <Button
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
                  setShowDropdown(false);
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
                  },
                  false,
                  getLabel
                );
              } else {
                selectedOptionPassToParent(currentResource, false, getLabel);
              }
              setShowDropdown(false);
            }}
          >
            Save
          </Button>
        </Box>
      ) : null
        // ( currentResource.resource &&
        //   currentResource.resourceOption &&
        //   currentResource.seniorityLevel &&
        //   currentResource.numOfResources )
        //   ?
        //   <Button onClick={() => { deleteResource(index) }} variant="contained" sx={{ marginLeft: "10px" }}>Delete</Button> : null
      }
      
    </Box>
  );
};

export default StaffResource;
