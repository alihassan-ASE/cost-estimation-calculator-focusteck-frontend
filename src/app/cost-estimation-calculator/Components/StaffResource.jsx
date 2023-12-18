"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography, Button, Chip, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import QuestionsComponent from "./Questions";

const CustomButton = styled(Button)(({ theme }) => ({
  flex: 1,
  gap: 0.5,
  margin: ".5em",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1em",
  border: "1px solid #ebebeb",
  padding: ".5em 1em",
  borderRadius: "2px",
  gap: ".5em",
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
    if (selectedOption?.length ? selectedOption[index] : null) {
      setCurrentResource({
        resource: selectedOption[index]?.resource,
        resourceOption: selectedOption[index]?.resourceOption,
        seniorityLevel: selectedOption[index]?.seniorityLevel,
        numOfResources: selectedOption[index]?.numOfResources,
      });
      setShowDropdown(false);
    }
  }, []);

  const numOfResourcesOptions = {
    "Mid Level": [1, 2, 3, 4],
    "Senior Level": [1, 2, 3, 4, 5],
    "Team Lead": [1, 2],
  };
  const [saveButton, setSaveButton] = useState(false);
  const [showDropdown, setShowDropdown] = useState(true);

  // console.log("save Buttom : ", saveButton);

  const getData = (data, label) => {
    if (label === "Resources") {
      setCurrentResource({ resource: data });
    } else if (label === "Resource Option") {
      setCurrentResource({ ...currentResource, resourceOption: data });
    } else if (label === "Seniority Level") {
      setCurrentResource({ ...currentResource, seniorityLevel: data });
    } else if (label === "Number of Resources") {
      setCurrentResource({ ...currentResource, numOfResources: data });
      setSaveButton(true);
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

  console.log("index ", index);
  console.log("selectedOption ", selectedOption);
  return (
    <Box
      sx={{
        width: 270,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {showDropdown && (
          <QuestionsComponent
            question={question}
            options={newOption}
            styleVal={"DropDown"}
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
                selectedOption?.length
                  ? selectedOption[index]?.resource
                  : currentResource.resource || null
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
              question={question}
              options={resourceData}
              label={label ? label : "Resource Option"}
              disable={currentResource.resource ? false : true}
              styleVal={"DropDown"}
              selectedOption={
                currentResource.resource &&
                !currentResource?.resourceOption?.opt
                  ? null
                  : currentResource?.resourceOption?.opt
                  ? currentResource?.resourceOption?.opt
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
                selectedOption?.length
                  ? `${selectedOption[index]?.resourceOption.opt} ($ ${selectedOption[index]?.resourceOption.price} )`
                  : `${currentResource.resourceOption?.opt} ($ ${currentResource.resourceOption?.price})` ||
                    null
              }
            />
          </CustomButton>
        )}

        {showDropdown && (
          <QuestionsComponent
            question={question}
            options={seniorityLevelOptions}
            label={label ? label : "Seniority Level"}
            disable={currentResource.resourceOption ? false : true}
            styleVal={"DropDown"}
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
                selectedOption?.length
                  ? selectedOption[index]?.seniorityLevel
                  : currentResource.seniorityLevel || null
              }
            />
          </CustomButton>
        )}

        {showDropdown && (
          <>
            <QuestionsComponent
              question={question}
              options={numOfResourcesOptions[currentResource.seniorityLevel]}
              label={label ? label : "Number of Resources"}
              disable={currentResource.seniorityLevel ? false : true}
              styleVal={"DropDown"}
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
                selectedOption?.length
                  ? selectedOption[index]?.numOfResources
                  : currentResource.numOfResources || null
              }
            />
          </CustomButton>
        )}
      </Box>

      {/* Save Button */}

      <Box sx={{ margin: "1em 0" }}>
        <Button
          disabled={saveButton ? false : true}
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
            } else if (selectedOption?.length ? selectedOption[index] : null) {
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
    </Box>
  );
};

export default StaffResource;
