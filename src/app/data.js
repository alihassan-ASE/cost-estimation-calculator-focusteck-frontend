// export const dummydata = {
//     questions: [
//         {
//             id: 1,
//             question: "What is capital of france",
//             answers: ['Madrid', 'paris', 'rome'],
//             correctAnswer: 'Paris'
//         },
//         {
//             id: 2,
//             question: "What is your name",
//             answers: ['Madrid', 'Ali', 'rome'],
//             correctAnswer: 'Ali'
//         },
//         {
//             id: 3,
//             question: "Where you live",
//             answers: ['Madrid', 'paris', 'Pakistan'],
//             correctAnswer: 'Pakistan'
//         },
//         {
//             id: 4,
//             question: "In Pakistan where you live",
//             answers: ['Madrid', 'paris', 'Lahore'],
//             correctAnswer: 'Lahore'
//         }
//     ]
// };



// data.js file
export const dummydata = {
    questions: [
      {
        id: 1,
        question: "What is the capital of Pakistan",
        options: [
          { answer: "Islamabad", nextQuestion: 2 },
          { answer: "Lahore", nextQuestion: 3 },
          { answer: "Karachi", nextQuestion: 1 },
        ],
      },
      {
        id: 2,
        question: "In Karachi, Where do you live",
        options: [
          { answer: "Karachi 1", nextQuestion: 0 },
          { answer: "Karachi 2", nextQuestion: 2 },
          { answer: "Karachi 3", nextQuestion: 3 },
        ],
      },
      {
        id: 3,
        question: "In Islamabad, where do you live",
        options: [
          { answer: "Islamabad 1", nextQuestion: 3 },
          { answer: "Islamabad 2", nextQuestion: 2},
          { answer: "Islamabad 3", nextQuestion: 1 },
        ],
      },
      {
        id: 4,
        question: "In Lahore, where do you live",
        options: [
          { answer: "Lahore 1", nextQuestion: null },
          { answer: "Lahore 2", nextQuestion: null },
          { answer: "Lahore 3", nextQuestion: null },
        ],
      },
    ],
  };
  