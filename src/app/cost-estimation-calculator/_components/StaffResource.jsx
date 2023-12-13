"use client";
import React, {
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback,
} from "react";
import {
  Box,
  Typography,
  Button,
  Select,
  typographyClasses,
  Chip,
} from "@mui/material";

import QuestionsComponent from "./Question";

const StaffResource = ({
  question,
  options,
  label,
  index,
  setValues,
  values,
  selectedOption,
  selectedOptionPassToParent,
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

  const numOfResourcesOptions = {
    "Mid Level": [1, 2, 3, 4],
    "Senior Level": [1, 2, 3, 4, 5],
    "Team Lead": [1, 2],
  };
  const [saveButton, setSaveButton] = useState(true);
  const [showDropdown, setShowDropdown] = useState(true);

  const getData = (data, label) => {
    if (label === "Resources") {
      setCurrentResource({ resource: data });
    } else if (label === "Resource Option") {
      setCurrentResource({ ...currentResource, resourceOption: data });
    } else if (label === "Seniority Level") {
      setCurrentResource({ ...currentResource, seniorityLevel: data });
    } else if (label === "Number of Resources") {
      setCurrentResource({ ...currentResource, numOfResources: data });
    }
    if (
      currentResource.resourceOption &&
      currentResource.resourceOption &&
      currentResource.seniorityLevel &&
      currentResource.numOfResources
    ) {
      setSaveButton(true);
    }

    setLabel(label);
  };
  // console.log("Current Resource: ", currentResource);
  // console.log("ShowDropDown: ", showDropdown);

  if (options[0].typeOfResource) {
    newOption = useMemo(() => {
      return options.map((item) => item.typeOfResource);
    }, [options]);
  }

  return (
    <Box>
      <Box>
        {showDropdown && (
          <QuestionsComponent
            question={question}
            options={newOption}
            label={label ? label : "Resources"}
            selectedOption={
              selectedOption[index]?.resource || currentResource.resource
            }
            getData={getData}
          />
        )}
        {!showDropdown && currentResource.resource && (
          <Box
            onClick={() => {
              setShowDropdown(true);
              setSaveButton(true);
            }}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 0.5,
              margin: ".5em .5em",
            }}
          >
            <Chip key="Resources" label={currentResource.resource} />
          </Box>
        )}

        {(selectedOption[index]?.resourceOption && showDropdown) ||
          (currentResource.resource && showDropdown && (
            <>
              {options.find((data) => {
                if (data.typeOfResource === currentResource.resource) {
                  resourceData = data.options;
                }
              })}
              <QuestionsComponent
                question={question}
                options={resourceData}
                label={label ? label : "Resource Option"}
                selectedOption={
                  selectedOption[index]?.resourceOption ||
                  currentResource.resourceOption
                }
                getData={getData}
              />
            </>
          ))}
        {!showDropdown && currentResource.resourceOption && (
          <Box
            onClick={() => {
              setShowDropdown(true);
              setSaveButton(true);
            }}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 0.5,
              margin: ".5em .5em",
            }}
          >
            <Chip
              key="Resource Option"
              label={`${currentResource.resourceOption?.opt} (${currentResource.resourceOption?.price} $)`}
            />
          </Box>
        )}

        {(selectedOption[index]?.seniorityLevel && showDropdown) ||
          (currentResource.resourceOption && showDropdown && (
            <QuestionsComponent
              question={question}
              options={seniorityLevelOptions}
              label={label ? label : "Seniority Level"}
              selectedOption={
                selectedOption[index]?.seniorityLevel ||
                currentResource.seniorityLevel
              }
              getData={getData}
            />
          ))}
        {!showDropdown && currentResource.seniorityLevel && (
          <Box
            onClick={() => {
              setShowDropdown(true);
              setSaveButton(true);
            }}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 0.5,
              margin: ".5em .5em",
            }}
          >
            <Chip
              key="Seniority Level"
              label={currentResource.seniorityLevel}
            />
          </Box>
        )}

        {(selectedOption[index]?.numOfResources && showDropdown) ||
          (currentResource.seniorityLevel && showDropdown && (
            <>
              <QuestionsComponent
                question={question}
                options={numOfResourcesOptions[currentResource.seniorityLevel]}
                label={label ? label : "Number of Resources"}
                selectedOption={
                  selectedOption[index]?.numOfResources ||
                  currentResource.numOfResources
                }
                getData={getData}
              />
            </>
          ))}

        {!showDropdown && currentResource.resource && (
          <Box
            onClick={() => {
              setShowDropdown(true);
              setSaveButton(true);
            }}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 0.5,
              margin: ".5em .5em",
            }}
          >
            <Chip
              key="Number of Resources"
              label={currentResource.numOfResources}
            />
          </Box>
        )}
      </Box>

      {(currentResource.resource &&
        currentResource.resourceOption &&
        currentResource.seniorityLevel &&
        currentResource.numOfResources &&
        saveButton) ||
      (selectedOption[index] && saveButton) ? (
        <Box sx={{ margin: "1em 0" }}>
          <Button
            variant="outlined"
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
                console.log("In IF");
                if (
                  existingResource?.resource !== currentResource.resource ||
                  existingResource?.resourceOption !==
                    currentResource.resourceOption ||
                  existingResource?.seniorityLevel !==
                    currentResource.seniorityLevel ||
                  existingResource?.numOfResources !==
                    currentResource.numOfResources
                ) {
                  console.log("Updating The Value");
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
              } else if (selectedOption[index]) {
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
      ) : null}
    </Box>
  );
};

export default StaffResource;
