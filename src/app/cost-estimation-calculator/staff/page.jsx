'use client'

import React, { useState, useEffect, useMemo, useRef } from 'react'
import { getQuestions } from '../../lib/api/getData'
import { postData } from '../../lib/api/postData'
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
} from '@mui/material'

const Staff = () => {
  const theme = useTheme()

  const [staffQuestions, setStaffQuestions] = useState([])
  const [additionalQuestions, setAdditionalQuestions] = useState([])
  const [activeQuestions, setActiveQuestions] = useState('staffQuestions')
  const [formInput, setFormInput] = useState({
    userName: '',
    email: '',
  })
  const [errorMessage, setErrorMessage] = useState({
    usernameError: null,
    emailError: null,
  })
  const [resourcesList, setResourcesList] = useState({})
  const [preState, setPreState] = useState(0)
  const [currentAdditionalQuestionIndex, setCurrentAdditionalQuestionIndex] =
    useState(0)
  const [currentResource, setCurrentResource] = useState({
    resource: '',
    resourceOption: '',
    seniorityLevel: '',
    numOfResources: '',
  })
  const setCurrentAdditionalQuestion = useRef({
    question: '',
    options: '',
    category: '',
    selectedOption: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getQuestions()
        // console.log('Data', data)
        const { Resources, additionalQuestions } = data
        setStaffQuestions(Resources)
        setAdditionalQuestions(additionalQuestions)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  console.log(additionalQuestions)
  const typeOfResourceOptions = useMemo(
    () => staffQuestions.map(item => item.typeOfResource),
    [staffQuestions]
  )

  const seniorityLevelOptions = ['Mid Level', 'Senior Level', 'Team Lead']

  const numOfResourcesOptions = {
    'Mid Level': [1, 2, 3, 4],
    'Senior Level': [1, 2, 3, 4, 5],
    'Team Lead': [1, 2],
  }

  const handleResourceChange = selectedResource => {
    setCurrentResource({
      ...currentResource,
      resource: selectedResource,
      resourceOption: '',
    })
  }

  const handleSeniorityLevelChange = selectedSeniorityLevel => {
    setCurrentResource({
      ...currentResource,
      seniorityLevel: selectedSeniorityLevel,
      numOfResources: '',
    })
  }

  const handleNumOfResourcesChange = selectedNumOfResources => {
    setCurrentResource({
      ...currentResource,
      numOfResources: selectedNumOfResources,
    })
  }

  const handleOptions = selectedOption => {
    setCurrentAdditionalQuestion.current = {
      _id: additionalQuestions[currentAdditionalQuestionIndex]._id,
      question: additionalQuestions[currentAdditionalQuestionIndex].question,
      options: additionalQuestions[currentAdditionalQuestionIndex].options,
      category: additionalQuestions[currentAdditionalQuestionIndex].category,
      typeofselection:
        additionalQuestions[currentAdditionalQuestionIndex].typeofselection,
      label: additionalQuestions[currentAdditionalQuestionIndex].label,
      selectedOption: selectedOption,
    }
  }

  const addResource = () => {
    if (
      currentResource.resource &&
      currentResource.resourceOption &&
      currentResource.seniorityLevel &&
      currentResource.numOfResources
    ) {
      const { responses } = resourcesList

      if (responses === undefined) {
        setResourcesList({
          responses: [{ resources: [{ ...currentResource }] }],
        })
      } else {
        const data = responses[0]
        const { resources } = data
        setResourcesList({
          responses: [{ resources: [...resources, { ...currentResource }] }],
        })
      }

      setPreState(preState + 1)
      setCurrentResource({
        resource: '',
        resourceOption: '',
        seniorityLevel: '',
        numOfResources: '',
      })
    }
  }

  function goNext() {
    if (activeQuestions === 'staffQuestions') {
      if (
        currentResource.resource &&
        currentResource.resourceOption &&
        currentResource.seniorityLevel &&
        currentResource.numOfResources
      ) {
        setPreState(0)
        setActiveQuestions('additionalQuestions')
      } else {
        alert('Please add at least one resource before proceeding.')
      }
    }
  }

  function Next() {
    const { responses } = resourcesList
    if (
      setCurrentAdditionalQuestion.current.question &&
      setCurrentAdditionalQuestion.current.options &&
      setCurrentAdditionalQuestion.current.category &&
      setCurrentAdditionalQuestion.current.selectedOption
    ) {
      setResourcesList({
        responses: [...responses, { ...setCurrentAdditionalQuestion.current }],
      })
    } else {
      console.log('Something is Missing')
    }
    if (activeQuestions === 'additionalQuestions') {
      if (currentAdditionalQuestionIndex < additionalQuestions.length - 1) {
        setCurrentAdditionalQuestionIndex(currentAdditionalQuestionIndex + 1)
      } else {
        setActiveQuestions('userData')
      }
    }
  }

  const submitForm = (formInput) => {
    if (!formInput.userName) {
      setErrorMessage({ usernameError: 'Incorrect UserName' })
    }
    if (!formInput.email) {
      setErrorMessage({ emailError: 'Incorrect Email' })
    }
    if (formInput.userName && formInput.email) {
      console.log("hello")
      setCurrentResource({
        ...formInput,
        ...resourcesList,
      })
      setErrorMessage({ usernameError: null, emailError: null });
      setActiveQuestions('Submitted');

    }
  }
  const { responses } = resourcesList
  const totalPrice =
    responses &&
    responses[0].resources.reduce((total, resource) => {
      const price = resource.resourceOption?.price || 0
      return total + price
    }, 0)

  if(activeQuestions === 'Submitted'){
    postData(resourcesList);
  }

  /* ---------------------------- Styles ---------------------------- */
  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  }

  return (
    <>
      <Typography variant="h5" mt={2} mb={5}>
        <strong>Staff Questions</strong>
      </Typography>
      {/* {activeQuestions === 'staffQuestions' && responses && responses[0] && (
        <Box>
          <p>{`Total Price: ${totalPrice}`}</p>
        </Box>
      )} */}

      {activeQuestions === 'staffQuestions' &&
        responses &&
        responses[0].resources.map((resource, index) => (
          <Box key={index} sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="h6">Resource: </Typography>
              <Button>{resource.resource}</Button>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="h6">Option:</Typography>
              <Button>{resource.resourceOption}</Button>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="h6">Seniority Level:</Typography>
              <Button>{resource.seniorityLevel}</Button>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="h6">No. of Persons:</Typography>
              <Button>{resource.numOfResources}</Button>
            </Box>
          </Box>
        ))}

      {activeQuestions === 'staffQuestions' && (
        <Box>
          {/* Current Resource Dropdown */}
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-chip-label">Resource Type</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              value={currentResource.resource}
              onChange={e => handleResourceChange(e.target.value)}
              input={
                <OutlinedInput
                  id="select-multiple-chip"
                  label="Resource Type"
                />
              }
              renderValue={selected => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  <Chip key={selected} label={selected} />
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {typeOfResourceOptions.map((resource, index) => (
                <MenuItem
                  key={index}
                  value={resource}
                  style={{ fontWeight: theme.typography.fontWeightRegular }}
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
                value={currentResource.resourceOption}
                onChange={e =>
                  setCurrentResource({
                    ...currentResource,
                    resourceOption: e.target.value,
                  })
                }
                input={
                  <OutlinedInput
                    id="select-multiple-chip"
                    label="Resource Type"
                  />
                }
                renderValue={selected => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    <Chip key={selected} label={selected} />
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {staffQuestions
                  .find(
                    item => item.typeOfResource === currentResource.resource
                  )
                  .options.map((option, index) => (
                    <MenuItem
                      key={index}
                      value={option.opt}
                      style={{
                        fontWeight: theme.typography.fontWeightRegular,
                      }}
                    >
                      {option.opt}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}

          {currentResource.resourceOption && (
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-chip-label">
                Seniority Level
              </InputLabel>
              <Select
                value={currentResource.seniorityLevel}
                onChange={e => handleSeniorityLevelChange(e.target.value)}
                input={
                  <OutlinedInput
                    id="select-multiple-chip"
                    label="Resource Type"
                  />
                }
                renderValue={selected => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    <Chip key={selected} label={selected} />
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {seniorityLevelOptions.map((level, index) => (
                  <MenuItem
                    key={index}
                    value={level}
                    style={{ fontWeight: theme.typography.fontWeightRegular }}
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
                onChange={e =>
                  handleNumOfResourcesChange(parseInt(e.target.value))
                }
                input={
                  <OutlinedInput
                    id="select-multiple-chip"
                    label="Resource Type"
                  />
                }
                renderValue={selected => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
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
                      style={{ fontWeight: theme.typography.fontWeightRegular }}
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
              display: 'flex',
              gap: '2em',
            }}
          >
            <Button variant="text" onClick={addResource}>
              Add More Resources
            </Button>
            <Button
              variant="outlined"
              className="btn"
              onClick={() => {
                goNext()
                addResource()
              }}
            >
              Next
            </Button>
          </Box>
        </Box>
      )}

      {activeQuestions === 'additionalQuestions' && (
        <Box>
          <Typography variant="h4">
            {additionalQuestions[currentAdditionalQuestionIndex].question}
          </Typography>
          <Stack direction="row" sx={{ flexWrap: 'wrap' }}>
            {additionalQuestions[currentAdditionalQuestionIndex].options.map(
              (option, index) => (
                <React.Fragment key={index}>
                  <Button
                    variant="outlined"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      margin: 20,
                    }}
                    onClick={() => {
                      handleOptions(option)
                      Next()
                    }}
                  >
                    {option.opt}
                  </Button>
                </React.Fragment>
              )
            )}
          </Stack>
        </Box>
      )}
      {activeQuestions === 'userData' && (
        <form>
          <Box>
            <TextField
              sx={{ mb: 3 }}
              style={{ width: 500 }}
              id="outlined-basic, user-name"
              label="userName"
              variant="outlined"
              value={formInput.userName}
              onChange={e => {
                setFormInput({
                  userName: e.target.value,
                  email: formInput.email,
                })
                console.log(
                  'userName: ',
                  formInput.userName,
                  'email: ',
                  formInput.email
                )
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
              onChange={e => {
                setFormInput({
                  userName: formInput.userName,
                  email: e.target.value,
                })
                console.log(
                  'userName: ',
                  formInput.userName,
                  'email: ',
                  formInput.email
                )
              }}
              helperText={errorMessage.emailError}
            />
            <br />
            <Button
              variant="contained"
              onClick={() => {
                submitForm(formInput)
              }}
            >
              Submit
            </Button>
          </Box>
        </form>
      )}
      {activeQuestions === 'Submitted' && (
        <Typography variant="h3" component="h3">
          Thank you! We will contact you soon
        </Typography>
      )}
    </>
  )
}

export default Staff
