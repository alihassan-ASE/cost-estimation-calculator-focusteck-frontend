"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Select,
  typographyClasses,
  Chip,
  Grid,
} from "@mui/material";

import QuestionsComponent from "./Questions";

const StaffResource = ({
  question,
  options,
  label,
  index,
  setValues,
  values,
  selectedResource,
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
  useEffect(() => {
    setCurrentResource({
      resource: selectedResource[index]?.resource,
      resourceOption: selectedResource[index]?.resourceOption,
      seniorityLevel: selectedResource[index]?.seniorityLevel,
      numOfResources: selectedResource[index]?.numOfResources,
    });
    setShowDropdown(false);
  }, []);

  const numOfResourcesOptions = {
    "Mid Level": [1, 2, 3, 4],
    "Senior Level": [1, 2, 3, 4, 5],
    "Team Lead": [1, 2],
  };
  const [saveButton, setSaveButton] = useState(true);
  const [showDropdown, setShowDropdown] = useState(true);

  const getData = (data, label) => {
    console.count("Triggered getData");
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

    newOption = useMemo(() => {
      return options.map((item) => item.typeOfResource);
    }, [options]);
  
  return (
    <Grid container spacing={2} sx={{ height: 360, alignItems: "center" }}>
      <Grid item lg={4} sx={{ minWidth: 300, maxWidth: 300 }}>
        <Box>
          {showDropdown && (
            <QuestionsComponent
              question={question}
              options={newOption}
              styleVal={"DropDown"}
              label={label ? label : "Resources"}
              disable={false}
              selectedResource={
                selectedResource[index]?.resource || currentResource.resource
              }
              getData={getData}
            />
          )}

          {!showDropdown && (
            <Button
              onClick={() => {
                setShowDropdown(true);
                setSaveButton(true);
              }}
              sx={{
                minWidth: 270,
                gap: 0.5,
                margin: ".5em .5em 1.5em .5em",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1em",
                border: "1px solid #ebebeb",
                padding: ".5em 1em",
                borderRadius: "2px",
                gap: ".5em",
              }}
            >
              <Typography
                variant="body1"
                sx={{ fontSize: 11, fontStyle: "italic" }}
              >
                Resources
              </Typography>
              <Chip
                key="Resources"
                label={
                  selectedOption[index]?.resource || currentResource.resource
                }
              />
            </Button>
          )}

          {showDropdown && (
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
                disable={
                  currentResource.resource || selectedResource[index]?.resource
                    ? false
                    : true
                }
                styleVal={"DropDown"}
                selectedResource={
                  currentResource.resource &&
                  !currentResource?.resourceOption?.opt
                    ? null
                    : currentResource?.resourceOption?.opt
                    ? currentResource?.resourceOption?.opt
                    : selectedResource[index]?.resourceOption?.opt
                }
                getData={getData}
              />
            </>
          )}

          {!showDropdown && (
            <Button
              onClick={() => {
                setShowDropdown(true);
                setSaveButton(true);
              }}
              sx={{
                width: 270,
                margin: ".5em .5em 1.5em .5em",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid #ebebeb",
                padding: ".5em 1em",
                borderRadius: "2px",
                gap: ".5em",
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
                  `${selectedOption[index]?.resourceOption.opt} (${selectedOption[index]?.resourceOption.price} $)` ||
                  `${currentResource.resourceOption?.opt} (${currentResource.resourceOption?.price} $)`
                }
              />
            </Button>
          )}

          {showDropdown && (
            <QuestionsComponent
              question={question}
              options={seniorityLevelOptions}
              label={label ? label : "Seniority Level"}
              disable={
                currentResource.resourceOption ||
                selectedResource[index]?.resourceOption
                  ? false
                  : true
              }
              styleVal={"DropDown"}

              selectedResource={
                currentResource.resource && !currentResource.seniorityLevel
                  ? null
                  : currentResource.seniorityLevel
                  ? currentResource.seniorityLevel
                  : selectedResource[index]?.seniorityLevel
              }
              getData={getData}
            />
          )}

          {!showDropdown && (
            <Button
              onClick={() => {
                setShowDropdown(true);
                setSaveButton(true);
              }}
              sx={{
                minWidth: 270,
                gap: 0.5,
                margin: ".5em .5em 1.5em .5em",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1em",
                border: "1px solid #ebebeb",
                padding: ".5em 1em",
                borderRadius: "2px",
                gap: ".5em",
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
                  selectedOption[index]?.seniorityLevel ||
                  currentResource.seniorityLevel
                }
              />
            </Button>
          )}

          {showDropdown && (
            <>
              <QuestionsComponent
                question={question}
                options={numOfResourcesOptions[currentResource.seniorityLevel]}
                label={label ? label : "Number of Resources"}
                disable={
                  currentResource.seniorityLevel ||
                  selectedResource[index]?.seniorityLevel
                    ? false
                    : true
                }
                styleVal={"DropDown"}
                selectedResource={
                  currentResource.resource && !currentResource.numOfResources
                    ? null
                    : currentResource.numOfResources
                    ? currentResource.numOfResources
                    : selectedResource[index]?.numOfResources
                }
                getData={getData}
              />
            </>
          )}

          {!showDropdown && (
            <Button
              onClick={() => {
                setShowDropdown(true);
                setSaveButton(true);
              }}
              sx={{
                width: 270,
                gap: 0.5,
                margin: ".5em .5em 1.5em .5em",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1em",
                border: "1px solid #ebebeb",
                padding: ".5em 1em",
                borderRadius: "2px",
                gap: ".5em",
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
                  selectedOption[index]?.numOfResources ||
                  currentResource.numOfResources
                }
              />
            </Button>
          )}
        </Box>

        {/* Save Button */}
        {currentResource.resource &&
        currentResource.resourceOption &&
        currentResource.seniorityLevel &&
        currentResource.numOfResources &&
        saveButton &&
        showDropdown ? (
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
                } else if (selectedResource[index]) {
                  selectedOptionPassToParent(
                    {
                      resource: selectedResource[index].resource,
                      resourceOption: selectedResource[index].resourceOption,
                      seniorityLevel: selectedResource[index].seniorityLevel,
                      numOfResources: selectedResource[index].numOfResources,
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
      </Grid>
    </Grid>
  );
};

export default StaffResource;
