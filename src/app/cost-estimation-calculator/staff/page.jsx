'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { getQuestions } from '../../lib/api/getData'
import { postData } from '../../lib/api/postData'

const Staff = () => {
  const [staffQuestions, setStaffQuestions] = useState([])
  const [additionalQuestions, setAdditionalQuestions] = useState([])
  const [activeQuestions, setActiveQuestions] = useState('staffQuestions')
  const [userdata, setUserData] = useState('')
  const [resourcesList, setResourcesList] = useState({})
  const [preState, setPreState] = useState(0)
  const [currentAdditionalQuestionIndex, setCurrentAdditionalQuestionIndex] =
    useState(0)
  const [currentResource, setCurrentResource] = useState({
    resource: null,
    resourceOption: null,
    seniorityLevel: null,
    numOfResources: null,
  })
  const [currentAdditionalQuestion, setCurrentAdditionalQuestion] = useState({
    question: null,
    options: null,
    category: null,
    selectedOption: null,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getQuestions();
        // console.log("Data", data);
        const { Resources, additionalQuestions } = data;
        setStaffQuestions(Resources)
        setAdditionalQuestions(additionalQuestions)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

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
      resourceOption: null,
    })
  }

  const showOptionsList = selectedResourceOption => {
    setCurrentResource({
      ...currentResource,
      resourceOption: selectedResourceOption,
    })
  }
  console.log(currentResource);

  const handleSeniorityLevelChange = selectedSeniorityLevel => {
    setCurrentResource({
      ...currentResource,
      seniorityLevel: selectedSeniorityLevel,
      numOfResources: null,
    })
  }

  const handleNumOfResourcesChange = selectedNumOfResources => {
    setCurrentResource({
      ...currentResource,
      numOfResources: selectedNumOfResources,
    })
  }

  const handleOptions = selectedOption => {
    setCurrentAdditionalQuestion({
      question: additionalQuestions[currentAdditionalQuestionIndex].question,
      options: additionalQuestions[currentAdditionalQuestionIndex].options,
      category: additionalQuestions[currentAdditionalQuestionIndex].category,
      selectedOption: selectedOption,
    })
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
        resource: null,
        resourceOption: null,
        seniorityLevel: null,
        numOfResources: null,
      })
    }
  }

  function goNext() {
    if (activeQuestions === 'staffQuestions') {
      const { responses } = resourcesList
      if (responses[0]) {
        setPreState(0);
        setActiveQuestions('additionalQuestions');
      } else {
        alert('Please add at least one resource before proceeding.')
      }
    }
  }

  function Next() {
    const { responses } = resourcesList
    if (
      currentAdditionalQuestion.question &&
      currentAdditionalQuestion.options &&
      currentAdditionalQuestion.category &&
      currentAdditionalQuestion.selectedOption &&
      responses[0]
    ) {
      setResourcesList({
        responses: [...responses, { ...currentAdditionalQuestion }],
      })
    } else {
      console.log('Something is Missing')
    }
    if (activeQuestions === 'additionalQuestions') {
      if (currentAdditionalQuestionIndex < additionalQuestions.length - 1) {
        setCurrentAdditionalQuestionIndex(currentAdditionalQuestionIndex + 1)
      } else {
        setActiveQuestions('userData')
        alert('No more additional questions.')
      }
    }
  }

  function userData(values) {
    setResourcesList({ ...values, responses: [...responses] })
    postData(resourcesList)
    alert('Thank you we will contact you soon');
    setActiveQuestions('submitted');
  }
  const { responses } = resourcesList
  const totalPrice =
    responses &&
    responses[0].resources.reduce((total, resource) => {
      const price = resource.resourceOption?.price || 0
      return total + price
    }, 0)

  console.log('In Staff', resourcesList)

  // const sendData = useMemo(() => {
  //   console.log('In function', resourcesList);
  //   if (!resourcesList.name == undefined && !resourcesList.email == undefined) {
  //     postData(resourcesList)
  //     alert('Thank you we will contact you soon')
  //     setActiveQuestions('submitted')
  //   } else {
  //     alert('User Credentials are Missing')
  //   }
  // }, []);

  return (
    <>
      <h1>
        <strong>Staff Questions</strong>
      </h1>
      {activeQuestions === 'staffQuestions' && responses && responses[0] && (
        <div>
          <p>{`Total Price: ${totalPrice}`}</p>
        </div>
      )}
      {activeQuestions === 'staffQuestions' &&
        responses &&
        responses[0].resources.map((resource, index) => (
          <div key={index}>
            <p>{`Resource ${index + 1}: ${resource.resource}, Option: ${
              resource.resourceOption.opt
            }, Seniority Level: ${resource.seniorityLevel}, No. of Persons: ${
              resource.numOfResources
            }`}</p>
          </div>
        ))}

      {activeQuestions === 'staffQuestions' && (
        <div>
          {/* Current Resource Dropdown */}
          <div>
            <label>Select Resource Type:</label>
            <select onChange={e => handleResourceChange(e.target.value)}>
              <option value="">Resource Type</option>
              {typeOfResourceOptions.map((resource, index) => (
                <option key={index} value={resource}>
                  {resource}
                </option>
              ))}
            </select>
          </div>

          {currentResource.resource && (
            <div>
              <label>Select Resource Option:</label>
              <select
                onChange={e =>
                  showOptionsList(
                    staffQuestions.find(
                      item => item.typeOfResource === currentResource.resource
                    ).options[e.target.selectedIndex]
                  )
                }
              >
                <option>Resource Option</option>
                {staffQuestions
                  .find(
                    item => item.typeOfResource === currentResource.resource
                  )
                  .options.map((option, index) => (
                    <option key={index} value={option.opt}>
                      {option.opt}
                    </option>
                  ))}
              </select>
            </div>
          )}

          {currentResource.resourceOption && (
            <div>
              <label>Select Seniority Level:</label>
              <select
                onChange={e => handleSeniorityLevelChange(e.target.value)}
              >
                <option value="">Seniority Level</option>
                {seniorityLevelOptions.map((level, index) => (
                  <option key={index} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          )}

          {currentResource.seniorityLevel && (
            <div>
              <label>Select No. of Persons:</label>
              <select
                onChange={e =>
                  handleNumOfResourcesChange(parseInt(e.target.value))
                }
              >
                <option value="">Persons</option>
                {numOfResourcesOptions[currentResource.seniorityLevel].map(
                  (num, index) => (
                    <option key={index} value={num}>
                      {num}
                    </option>
                  )
                )}
              </select>
            </div>
          )}

          <a href="#" onClick={addResource}>
            Add More Resources
          </a>
          <button className="btn" onClick={goNext}>
            Next
          </button>
        </div>
      )}

      {activeQuestions === 'additionalQuestions' && (
        <div>
          <h2>{`Question ${currentAdditionalQuestionIndex + 1} / ${
            additionalQuestions.length
          }`}</h2>
          <p>{additionalQuestions[currentAdditionalQuestionIndex].question}</p>
          <ul>
            {additionalQuestions[currentAdditionalQuestionIndex].options.map(
              (option, index) => (
                <li
                  key={index}
                  value={option.opt}
                  onClick={e => handleOptions(option)}
                >
                  <strong>{index + 1}.</strong>
                  {option.opt}
                </li>
              )
            )}
          </ul>
        </div>
      )}
      {activeQuestions === 'additionalQuestions' && (
        <button className="btn" onClick={Next}>
          Next
        </button>
      )}
      {activeQuestions === 'userData' && (
        <form>
          <label>Name*</label>
          <input
            onChange={e => setUserData({ name: e.target.value })}
            type="text"
            placeholder="Your Name"
            required
          />

          <label>Email*</label>
          <input
            onChange={e => setUserData({ ...userdata, email: e.target.value })}
            type="email"
            placeholder="Your Email"
            required
          />

          {/* <button onClick={() => userData()}>Submit</button> */}
        </form>
      )}
      {activeQuestions === 'userData' && userdata.name && userdata.email && (
        <button
          value="Submit"
          onClick={e => userData(userdata)}
          className="btn"
        >
          Submit
        </button>
      )}
      {activeQuestions === 'submitted' && (
        <h1>Thank you we will soon contact with you</h1>
      )}
    </>
  )
}

export default Staff

// import React, { useState, useEffect, useMemo } from 'react';
// import { getQuestions } from '../../lib/api/getData';

// const Staff = () => {
//   const [staffQuestions, setStaffQuestions] = useState([]);
//   const [additionalQuestions, setAdditionalQuestions] = useState([]);
//   const [activeQuestions, setActiveQuestions] = useState('staffQuestions');
//   const [resourcesList, setResourcesList] = useState([]);
//   const [preState, setPreState] = useState(0);
//   const [currentResource, setCurrentResource] = useState({
//     resource: null,
//     resourceOption: null,
//     seniorityLevel: null,
//     numOfResources: null,
//   });
//   const [answered, setAnswered] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getQuestions();
//         const { Resources, additionalQuestions } = data;
//         setStaffQuestions(Resources);
//         setAdditionalQuestions(additionalQuestions);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchData();
//   }, []);

//   const typeOfResourceOptions = useMemo(() => staffQuestions.map((item) => item.typeOfResource), [
//     staffQuestions,
//   ]);

//   const seniorityLevelOptions = ["Mid Level", "Senior Level", "Team Lead"];

//   const numOfResourcesOptions = {
//     "Mid Level": [1, 2, 3, 4],
//     "Senior Level": [1, 2, 3, 4, 5],
//     "Team Lead": [1, 2],
//   };

//   const handleResourceChange = (selectedResource) => {
//     setCurrentResource({ ...currentResource, resource: selectedResource, resourceOption: null });
//   };

//   const showOptionsList = (selectedResourceOption) => {
//     setCurrentResource({ ...currentResource, resourceOption: selectedResourceOption });
//   };

//   const handleSeniorityLevelChange = (selectedSeniorityLevel) => {
//     setCurrentResource({
//       ...currentResource,
//       seniorityLevel: selectedSeniorityLevel,
//       numOfResources: null,
//     });
//   };

//   const handleNumOfResourcesChange = (selectedNumOfResources) => {
//     setCurrentResource({ ...currentResource, numOfResources: selectedNumOfResources });
//   };

//   const addResource = () => {
//     if (
//       currentResource.resource &&
//       currentResource.resourceOption &&
//       currentResource.seniorityLevel &&
//       currentResource.numOfResources
//     ) {
//       setResourcesList([...resourcesList, { ...currentResource }]);
//       setPreState(preState + 1);
//       setCurrentResource({
//         resource: null,
//         resourceOption: null,
//         seniorityLevel: null,
//         numOfResources: null,
//       });
//     }
//   };

//   const handleOptionClick = (questionIndex, optionIndex) => {
//     const updatedAnswered = [...answered];
//     if (!updatedAnswered[questionIndex]) {
//       updatedAnswered[questionIndex] = [];
//     }
//     updatedAnswered[questionIndex][0] = optionIndex; // Assuming each question has only one correct option
//     setAnswered(updatedAnswered);
//   };

//   function goNext() {
//     if (activeQuestions === 'staffQuestions') {
//       if (resourcesList.length > 0) {
//         setPreState(0);
//         setActiveQuestions('additionalQuestions');
//       } else {
//         alert("Please add at least one resource before proceeding.");
//       }
//     } else if (activeQuestions === 'additionalQuestions') {
//       const currentQuestionIndex = answered.length;
//       if (currentQuestionIndex < additionalQuestions.length) {
//         setPreState(0);
//         setActiveQuestions('additionalQuestions');
//         setAnswered([...answered, []]);
//       } else {
//         alert("No more additional questions.");
//       }
//     }
//   }

//   return (
//     <>
//       <h1><strong>Staff Questions</strong></h1>
//       {activeQuestions === 'staffQuestions' && (
//         resourcesList.map((resource, index) => (
//           <div key={index}>
//             <p>{`Resource ${index + 1}: ${resource.resource}, Option: ${resource.resourceOption}, Seniority Level: ${resource.seniorityLevel}, No. of Resources: ${resource.numOfResources}`}</p>
//           </div>
//         ))
//       )}

//       {activeQuestions === 'staffQuestions' && (
//         <div>
//           {/* Current Resource Dropdown */}
//           <div>
//             <label>Select Resource Type:</label>
//             <select onChange={(e) => handleResourceChange(e.target.value)}>
//               <option value="">Select Resource Type</option>
//               {typeOfResourceOptions.map((resource, index) => (
//                 <option key={index} value={resource}>
//                   {resource}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {currentResource.resource && (
//             <div>
//               <label>Select Resource Option:</label>
//               <select onChange={(e) => showOptionsList(e.target.value)}>
//                 <option value="">Select Resource Option</option>
//                 {staffQuestions
//                   .find((item) => item.typeOfResource === currentResource.resource)
//                   .options.map((option, index) => (
//                     <option key={index} value={option}>
//                       {option}
//                     </option>
//                   ))}
//               </select>
//             </div>
//           )}

//           {currentResource.resourceOption && (
//             <div>
//               <label>Select Seniority Level:</label>
//               <select onChange={(e) => handleSeniorityLevelChange(e.target.value)}>
//                 <option value="">Select Seniority Level</option>
//                 {seniorityLevelOptions.map((level, index) => (
//                   <option key={index} value={level}>
//                     {level}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}

//           {currentResource.seniorityLevel && (
//             <div>
//               <label>Select No. of Resources:</label>
//               <select onChange={(e) => handleNumOfResourcesChange(parseInt(e.target.value))}>
//                 <option value="">Select No. of Resources</option>
//                 {numOfResourcesOptions[currentResource.seniorityLevel].map((num, index) => (
//                   <option key={index} value={num}>
//                     {num}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}

//           <a href="#" onClick={addResource}>
//             Add More Resources
//           </a>
//           <button className='btn' onClick={goNext}>Next</button>
//         </div>
//       )}

//       {activeQuestions === 'additionalQuestions' && (
//         additionalQuestions.map((question, index) => (
//           <div key={index}>
//             <h2>{`Question ${index + 1} / ${additionalQuestions.length}`}</h2>
//             <p>{question.question}</p>
//             <ul>
//               {question.options.map((option, optionIndex) => (
//                 <li
//                   key={optionIndex}
//                   value={option}
//                   onClick={() => handleOptionClick(index, optionIndex)}
//                 >
//                   <strong>{optionIndex + 1}.</strong> {option}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))
//       )}

//       {activeQuestions === 'additionalQuestions' && (
//         <button className='btn' onClick={goNext}>Next</button>
//       )}
//     </>
//   );
// };

// export default Staff;

// const Staff = () => {
//   const [staffQuestions, setStaffQuestions] = useState([]);
//   const [resourcesList, setResourcesList] = useState([]);
//   const [currentResource, setCurrentResource] = useState({
//     resource: null,
//     resourceOption: null,
//     seniorityLevel: null,
//     numOfResources: null,
//   });

//   console.log(" before");
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getQuestions();
//         const { Resources } = data;
//         setStaffQuestions(Resources);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchData();
//   }, []);

//   const typeOfResourceOptions = useMemo(() => staffQuestions.map((item) => item.typeOfResource), [
//     staffQuestions,
//   ]);

//   const seniorityLevelOptions = ["Mid Level", "Senior Level", "Team Lead"];

//   const numOfResourcesOptions = {
//     "Mid Level": [1, 2, 3, 4],
//     "Senior Level": [1, 2, 3, 4, 5],
//     "Team Lead": [1, 2],
//   };

//   const handleResourceChange = (selectedResource) => {
//     setCurrentResource({ ...currentResource, resource: selectedResource, resourceOption: null });
//   };

//   const showOptionsList = (selectedResourceOption) => {
//     setCurrentResource({ ...currentResource, resourceOption: selectedResourceOption });
//   };

//   const handleSeniorityLevelChange = (selectedSeniorityLevel) => {
//     setCurrentResource({
//       ...currentResource,
//       seniorityLevel: selectedSeniorityLevel,
//       numOfResources: null,
//     });
//   };

//   const handleNumOfResourcesChange = (selectedNumOfResources) => {
//     setCurrentResource({ ...currentResource, numOfResources: selectedNumOfResources });
//   };

//   const addResource = () => {
//     if (
//       currentResource.resource &&
//       currentResource.resourceOption &&
//       currentResource.seniorityLevel &&
//       currentResource.numOfResources
//     ) {
//       setResourcesList([...resourcesList, { ...currentResource }]);
//       setCurrentResource({
//         resource: null,
//         resourceOption: null,
//         seniorityLevel: null,
//         numOfResources: null,
//       });
//     }
//   };

//   return (
//     <>
//       <h1><strong>Staff Questions</strong></h1>

//       {/* Old Resources Dropdowns */}
//       {resourcesList.map((resource, index) => (
//         <div key={index}>
//           <label>{`Resource ${index + 1}:`}</label>

//           {/* Resource Type Dropdown */}
//           <select
//             value={resource.resource}
//             onChange={(e) => handleResourceChange(e.target.value)}
//           >
//             <option value="">Select Resource Type</option>
//             {typeOfResourceOptions.map((option, index) => (
//               <option key={index} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>

//           {/* Resource Option Dropdown */}
//           {resource.resource && (
//             <div>
//               <label>Select Resource Option:</label>
//               <select
//                 value={resource.resourceOption}
//                 onChange={(e) => showOptionsList(e.target.value)}
//               >
//                 <option value="">Select Resource Option</option>
//                 {staffQuestions
//                   .find((item) => item.typeOfResource === resource.resource)
//                   .options.map((option, index) => (
//                     <option key={index} value={option}>
//                       {option}
//                     </option>
//                   ))}
//               </select>
//             </div>
//           )}

//           {/* Seniority Level Dropdown */}
//           {resource.resourceOption && (
//             <div>
//               <label>Select Seniority Level:</label>
//               <select
//                 value={resource.seniorityLevel}
//                 onChange={(e) => handleSeniorityLevelChange(e.target.value)}
//               >
//                 <option value="">Select Seniority Level</option>
//                 {seniorityLevelOptions.map((level, index) => (
//                   <option key={index} value={level}>
//                     {level}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}

//           {/* No. of Resources Dropdown */}
//           {resource.seniorityLevel && (
//             <div>
//               <label>Select No. of Resources:</label>
//               <select
//                 value={resource.numOfResources}
//                 onChange={(e) => handleNumOfResourcesChange(parseInt(e.target.value))}
//               >
//                 <option value="">Select No. of Resources</option>
//                 {numOfResourcesOptions[resource.seniorityLevel].map((num, index) => (
//                   <option key={index} value={num}>
//                     {num}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}
//         </div>
//       ))}

//       {/* Current Resource Dropdown */}
//       <div>
//         <label>Select Resource Type:</label>
//         <select onChange={(e) => handleResourceChange(e.target.value)}>
//           <option value="">Select Resource Type</option>
//           {typeOfResourceOptions.map((resource, index) => (
//             <option key={index} value={resource}>
//               {resource}
//             </option>
//           ))}
//         </select>
//       </div>

//       {currentResource.resource && (
//         <div>
//           <label>Select Resource Option:</label>
//           <select onChange={(e) => showOptionsList(e.target.value)}>
//             <option value="">Select Resource Option</option>
//             {staffQuestions
//               .find((item) => item.typeOfResource === currentResource.resource)
//               .options.map((option, index) => (
//                 <option key={index} value={option}>
//                   {option}
//                 </option>
//               ))}
//           </select>
//         </div>
//       )}

//       {currentResource.resourceOption && (
//         <div>
//           <label>Select Seniority Level:</label>
//           <select onChange={(e) => handleSeniorityLevelChange(e.target.value)}>
//             <option value="">Select Seniority Level</option>
//             {seniorityLevelOptions.map((level, index) => (
//               <option key={index} value={level}>
//                 {level}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}

//       {currentResource.seniorityLevel && (
//         <div>
//           <label>Select No. of Resources:</label>
//           <select onChange={(e) => handleNumOfResourcesChange(parseInt(e.target.value))}>
//             <option value="">Select No. of Resources</option>
//             {numOfResourcesOptions[currentResource.seniorityLevel].map((num, index) => (
//               <option key={index} value={num}>
//                 {num}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}

//       <a href="#" onClick={addResource}>
//         Add More Resources
//       </a>
//     </>
//   );
// };

// export default Staff;
