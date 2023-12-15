"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Card, Grid } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { styled } from "@mui/material/styles";
import Question from '../Components/Question/page';
import Stepper from "../Components/Stepper/page"
import { getQuestions } from '../../lib/api/getData';

import StaffResource from "./StaffResource";
import question from "../../../../data/question.json";
import options from "../../../../data/options.json";
import selectedResource from "../../../../data/selectedOption.json";


const CustomButton = styled(Button)({
  "&:hover": {
    border: "1px solid #0069d9",
  },
});

const StaffComponent = () => {

  const [count, setCount] = useState(0);
  const [addMore, setAddMore] = useState(false);
  const [values, setValues] = useState([]);
  const [buttonState, setButtonState] = useState(true);

  const [additionalQuesiton, setAdditionalQuesiton] = useState([]);
  const [staffBase, setStaffBaseResources] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentState, setCurrentState] = useState(true)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [actualResponses, setActualResponses] = useState([]);

  const [addedOption, setAddedOption] = useState([]);
  
  const [resourcesPrice , setResourcesPrice] = useState(0);
  const [optionPrice , setOptionPrice] = useState(0);
  const [totalCost , setTotalCost] = useState(0);


  useEffect(async () => {
    const resp = await getQuestions();
    const { Resources, additionalQuestions } = resp;
    setAdditionalQuesiton(additionalQuestions);
    setStaffBaseResources(Resources);

  }, []);


  const changeActiveQuestion = (obj) => {
    const { index, step } = obj;
    console.log(obj)

    setCurrentQuestionIndex(index);
    setCurrentQuestion(step);
    actualResponses.responses.splice(index - 1);

  }
  const selectedOptionPassToParent = (data, boolVal, label) => {
    setValues((prev) => [...prev, data]);
    setButtonState(true)
    setAddMore(!boolVal);

  };

  console.log("actual",actualResponses)
  // setting Response in actual Array
  const setResponseData = () => {

    const dataObj = {};
    dataObj.resources = values;
    currentState ? setActualResponses({ responses: [dataObj] })
      :
      setActualResponses((prev) => {
        return {
          responses: [...prev.responses, { ...currentQuestion, ...addedOption }],
        };
      });

  }

  const getResponsesData = (resp) => {
    console.log("Response Data",resp.selectedData);
    setAddedOption(resp);
  
  }


  const nextQuestion = () => {
    
      setCurrentState(false)
      setButtonState(true);
    let currentQuestionLocal = currentQuestion;
    let currentQuestionIndexLocal = currentQuestionIndex;
    if (!currentQuestion) {
      currentQuestionLocal = additionalQuesiton[currentQuestionIndexLocal];
      currentQuestionIndexLocal++;
    }
    else if (currentQuestionIndexLocal < additionalQuesiton.length) {
      currentQuestionLocal = additionalQuesiton[currentQuestionIndexLocal];
      currentQuestionIndexLocal++;
    }
    else {
      setCurrentQuestionIndex(currentQuestionIndexLocal++);
    }

    setCurrentQuestion(currentQuestionLocal);
    setCurrentQuestionIndex(currentQuestionIndexLocal);
    setResponseData();

  }

  const backQuestion = () => {

    if (currentQuestionIndex > 0) {

      let newArray = [...actualResponses.responses];
      let lastQuestion = newArray.pop();

      console.log("new Array", { responses: newArray });
      console.log("Back", lastQuestion.question)
      setCurrentQuestion(lastQuestion);
      setActualResponses({ responses: newArray });
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  }


  const resources = selectedResource.resources;

  const returnResources = () => {

    const tags = [];
    for (let i = 0; i <= count; i++) {
      tags.push(
        <Card
          key={i}
          style={{
            marginBottom: "3em",
            padding: "2em 1.5em",
            borderRadius: ".5em",
          }}
        >
          <StaffResource
            key={i}
            question={question.question}
            options={staffBase}
            index={i}
            setValues={setValues}
            values={values}
            selectedResource={resources}
            selectedOptionPassToParent={selectedOptionPassToParent}
          />
        </Card>
      );
    }
    return tags;
  };



  return (
    <Box>
      <Typography variant="h5" pb={2}>
        Staff Questions
      </Typography>

      {currentState ?
        <Box
          sx={{
            display: currentState,
            flexWrap: "wrap",
            gap: "2em",
            alignItems: "center",
          }}
        >
          {/* {resources[0]
          ? resources?.map((data) => returnResources())
          : returnResources()} */}

          {returnResources()}


          <Box>
            {addMore && (
              <CustomButton
                onClick={() => {
                  setAddMore(false);
                  setCount(count + 1);
                  returnResources();
                }}
                style={{
                  marginBottom: "3em",
                  padding: "3em",
                  borderRadius: ".5em",
                  minWidth: 100,
                  height: 410,
                  width: 340,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ControlPointIcon
                  sx={{ fontSize: "2em" }}
                  onClick={() => setAddMore(false)}
                />
              </CustomButton>
            )}
          </Box>
        </Box> :
        <div>
          <Question currentQuestion={currentQuestion} getResponsesData={getResponsesData} styleVal={"Tiles"} />
          <Stepper responses={actualResponses.responses} changeActiveQuestion={changeActiveQuestion} />
        </div>


      }



      {addMore && (
        <>
          {additionalQuesiton.length >= currentQuestionIndex ? <Button disabled={!buttonState} size="medium" variant="contained" sx={{ width: 200 }} onClick={nextQuestion}>
            Next
          </Button> : null}
          {currentQuestionIndex > 1 ? <Button size="medium" variant="contained" sx={{ width: 200 }} onClick={backQuestion}>
            Back
          </Button> : null}
        </>
      )}
    </Box>
  );
};

export default StaffComponent;
