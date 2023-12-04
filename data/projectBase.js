export const ProjectQuestions = [
  {
    _id: '6560a181c9f7ceabb2c23846',
    question: 'What is the Type of Project?',
    label: 'Type of Project',
    options: [
      {
        value: 'Web App Development',
        nextQuestion: '6560a181c9f7ceabb2c23847',
        price: 5,
      },
      {
        value: 'Android App Development',
        nextQuestion: '6560a181c9f7ceabb2c23848',
        price: 10,
      },
      {
        value: 'Both',
        nextQuestion: '6560a181c9f7ceabb2c23849',
        price: 20,
      },
    ],
  },
  {
    _id: '6560a181c9f7ceabb2c23847',
    question: 'What is the complexity of the web app?',
    label: 'Complexity',
    options: [
      {
        value: 'Simple (Static content)',
        nextQuestion: '',
        price: 10,
      },
      {
        value: 'Moderate (Interactive features)',
        nextQuestion: '',
        price: 5,
      },
      {
        value: 'Complex (Advanced features, e.g., e-commerce)',
        nextQuestion: '',
        price: 8,
      },
    ],
    nextQuestion: '6560a181c9f7ceabb2c2384a',
  },
  {
    _id: '6560a181c9f7ceabb2c2384a',
    question: 'What is the preferred technology stack?',
    label: 'Technology Stack',
    options: [
      {
        value: 'LAMP (Linux, Apache, MySQL, PHP)',
        nextQuestion: '',
        price: 10,
      },
      {
        value: 'MEAN (MongoDB, Express.js, Angular, Node.js)',
        nextQuestion: '',
        price: 20,
      },
      {
        value: 'MERN (MongoDB, Express.js, React, Node.js)',
        nextQuestion: '',
        price: 20,
      },
      {
        value: 'Django (Python, Django, PostgreSQL)',
        nextQuestion: '',
        price: 25,
      },
      {
        value: 'Ruby on Rails (Ruby, Ruby on Rails, PostgreSQL)',
        nextQuestion: '',
        price: 10,
      },
      {
        value: 'ASP.NET (Microsoft ASP.NET, C#, SQL Server)',
        nextQuestion: '',
        price: 10,
      },
      {
        value: 'Flask (Python, Flask, SQLAlchemy)',
        nextQuestion: '',
        price: 25,
      },
      {
        value: 'Laravel (PHP, Laravel, MySQL)',
        nextQuestion: '',
        price: 30,
      },
      {
        value: 'Express.js (Node.js, Express.js, MongoDB)',
        nextQuestion: '',
        price: 10,
      },
      {
        value: 'Angular + .NET Core (Angular, C#, .NET Core, SQL Server)',
        nextQuestion: '',
        price: 40,
      },
      {
        value: 'Flask + React (Python, Flask, React, SQLAlchemy)',
        nextQuestion: '',
        price: 53,
      },
      {
        value:
          'Ruby on Rails + Vue.js (Ruby, Ruby on Rails, Vue.js, PostgreSQL)',
        nextQuestion: '',
        price: 33,
      },
      {
        value: 'Other (Specify)',
        nextQuestion: '',
        price: 20,
      },
    ],
    nextQuestion: '6560a181c9f7ceabb2c2384b',
  },
  {
    _id: '6560a181c9f7ceabb2c2384b',
    question: ' What is the preferred hosting environment?',
    label: 'Hosting Environment',
    options: [
      {
        value: 'OnPrem Server',
        nextQuestion: '',
        price: 10,
      },
      {
        value: 'Cloud Server (e.g., AWS, Azure, GCP, Alibaba Cloud)',
        nextQuestion: '',
        price: 20,
      },
    ],
    nextQuestion: '6560a181c9f7ceabb2c2384c',
  },
  {
    _id: '6560a181c9f7ceabb2c2384c',
    question:
      'Are there any third-party APIs that need to be integrated into the web app?',
    label: 'Third Party APIs',
    options: [
      {
        value: 'Yes',
        nextQuestion: '',
        price: 10,
      },
      {
        value: 'No',
        nextQuestion: '',
        price: 5,
      },
    ],
    nextQuestion: '6560a181c9f7ceabb2c2384d',
  },
  {
    _id: '6560a181c9f7ceabb2c2384d',
    question:
      'How often do you anticipate making updates or adding new features to the web app?',
    label: 'Updates and New features',
    options: [
      {
        value: 'Rarely',
        nextQuestion: '',
        price: 50,
      },
      {
        value: 'Occasionally',
        nextQuestion: '',
        price: 10,
      },
      {
        value: 'Frequently',
        nextQuestion: '',
        price: 12,
      },
    ],
    nextQuestion: '',
  },
  {
    _id: '6560a181c9f7ceabb2c23848',
    question: 'What is the target platform for the mobile app?',
    label: 'Target Platform',
    options: [
      {
        value: 'iOS',
        nextQuestion: '',
        price: 10,
      },
      {
        value: 'Android',
        nextQuestion: '',
        price: 15,
      },
      {
        value: 'Cross-platform (e.g., React Native, Flutter)',
        nextQuestion: '',
        price: 10,
      },
    ],
    nextQuestion: '6560a181c9f7ceabb2c2384f',
  },
  {
    _id: '6560a181c9f7ceabb2c2384f',
    question: 'What is the expected app download and installation process?',
    label: 'Installation Process',
    options: [
      {
        value: 'App Store/Google Play',
        nextQuestion: '',
        price: 10,
      },
      {
        value: 'Enterprise distribution',
        nextQuestion: '',
        price: 10,
      },
      {
        value: 'Other (Specify)',
        nextQuestion: '',
        price: 20,
      },
    ],
    nextQuestion: '6560a181c9f7ceabb2c23850',
  },
  {
    _id: '6560a181c9f7ceabb2c23850',
    question: 'Is there a need for offline functionality in the mobile app?',
    label: 'Offline Functionality',
    options: [
      {
        value: 'Yes',
        nextQuestion: '',
        price: 15,
      },
      {
        value: 'No',
        nextQuestion: '',
        price: 20,
      },
    ],
    nextQuestion: '6560a181c9f7ceabb2c23851',
  },
  {
    _id: '6560a181c9f7ceabb2c23851',
    question: 'What type of app analytics and reporting is required?',
    label: 'App Analytics',
    options: [
      {
        value: 'Basic usage statistics',
        nextQuestion: '',
        price: 30,
      },
      {
        value: 'Advanced Analytics',
        nextQuestion: '',
        price: 35,
      },
      {
        value: 'Custom reporting',
        nextQuestion: '',
        price: 40,
      },
    ],
    nextQuestion: '6560a181c9f7ceabb2c23852',
  },
  {
    _id: '6560a181c9f7ceabb2c23852',
    question:
      'Are there any specific hardware integrations required for the mobile app?',
    label: 'Hardware Integration',
    options: [
      {
        value: 'Camera',
        nextQuestion: '',
        price: 15,
      },
      {
        value: 'GPS',
        nextQuestion: '',
        price: 15,
      },
      {
        value: 'Sensors',
        nextQuestion: '',
        price: 15,
      },
      {
        value: 'None',
        nextQuestion: '',
        price: 15,
      },
      {
        value: 'Other (Specify)',
        nextQuestion: '',
        price: 15,
      },
    ],
    nextQuestion: '6560a181c9f7ceabb2c23853',
  },
  {
    _id: '6560a181c9f7ceabb2c23853',
    question: 'What is the preferred monetization model for the mobile app?',
    label: 'Monetization Model',
    options: [
      {
        value: 'Freemium',
        nextQuestion: '',
        price: 15,
      },
      {
        value: 'In-app purchases',
        nextQuestion: '',
        price: 15,
      },
      {
        value: 'Ad-supported',
        nextQuestion: '',
        price: 15,
      },
      {
        value: 'Paid app',
        nextQuestion: '',
        price: 15,
      },
    ],
    nextQuestion: '',
  },
]
