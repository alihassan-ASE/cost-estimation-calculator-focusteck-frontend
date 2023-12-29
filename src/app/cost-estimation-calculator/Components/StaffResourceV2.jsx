"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography, Button, Chip, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import QuestionsComponent from "./Questions";

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

const StaffResourceV2 = ({
  question,
  options,
  index,
  setValues,
  count,
  setCount,
  values,
  selectedOption,
  selectedOptionPassToParent,
  deleteResource,
  questionState,
  setQuestionState,
}) => {
  let newOption;
  // const [questionState, setQuestionState] = useState(0);

  const seniorityLevelOptions = ["Mid Level", "Senior Level", "Team Lead"];
  const numOfResourcesOptions = {
    "Mid Level": [1, 2, 3, 4],
    "Senior Level": [1, 2, 3, 4, 5],
    "Team Lead": [1, 2],
  };

  const [option, setOption] = useState();
  const [resourceOption, setResourceOption] = useState();

  const getData = (data, label) => {
    setOption(data);

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

  useEffect(() => {
    setResourceOption(options.map((item) => item.typeOfResource));
  }, options);

  const type = useMemo(() => {
    return options[0]?.typeOfUI;
  }, [options]);

  const typeOfSelection = useMemo(() => {
    return options[0]?.typeofselection;
  }, [options]);

  const nextQuestion = () => {
    selectedOptionPassToParent(
      option,
      resourceOption,
      questionState,
      setQuestionState
    );

    setQuestionState(questionState + 1);
    setOption();
    options.find((data) => {
      if (data.typeOfResource === option) {
        newOption = data.options;
      }
    });
    if (newOption) {
      setResourceOption(newOption);
    } else {
      for (const key in numOfResourcesOptions) {
        if (key === option) {
          setResourceOption(numOfResourcesOptions[key]);
          break;
        } else if (questionState === 1) {
          setResourceOption(seniorityLevelOptions);
        }
      }
    }
  };

  const [currentResource, setCurrentResource] = useState({
    resource: "",
    resourceOption: "",
    seniorityLevel: "",
    numOfResources: "",
  });


  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <QuestionsComponent
          typeOfSelection={typeOfSelection}
          question={question}
          typeofUI={type}
          options={resourceOption}
          selectedOption={selectedOption}
          selectedOptionPassToParent={getData}
          label={
            !currentResource.resource
              ? "Resources"
              : !currentResource.resourceOption
              ? "Resource Option"
              : !currentResource.seniorityLevel
              ? "Seniority Level"
              : !currentResource.numOfResources
              ? "Number of Resources"
              : null
          }
        />
      </Box>

      <Box
        sx={{
          margin: "2em 1em",
        }}
      >
        <CustomNextButton
          size="medium"
          variant="contained"
          onClick={() => {
            nextQuestion();
          }}
          disabled={option ? false : true}
        >
          Next
        </CustomNextButton>
      </Box>
    </Box>
  );
};

export default StaffResourceV2;
