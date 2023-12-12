 const Responses = [
  {
  "_id": "6560a181c9f7ceabb2c23844",
  "question": "What type of industry does your project belong to?",
  "options": [
    {
      "opt": "Healthcare",
      "price": 20
    },
    {
      "opt": "Finance",
      "price": 20
    },
    {
      "opt": "E-commerce",
      "price": 20
    },
    {
      "opt": "Education",
      "price": 20
    },
    {
      "opt": "Entertainment",
      "price": 20
    },
    {
      "opt": "Travel and Hospitality",
      "price": 20
    },
    {
      "opt": "Real Estate",
      "price": 20
    },
    {
      "opt": "Manufacturing",
      "price": 20
    },
    {
      "opt": "Technology/IT",
      "price": 20
    },
    {
      "opt": "Other (Specify)",
      "price": 20
    }
  ],
  "category": "Project",
  "selectedOption": {
    "opt": "Healthcare",
    "price": 20
  },
  "label": "type of industry",
  "state": "Pre"
},
{
  "_id": "6560a181c9f7ceabb2c23845",
  "question": "Choose your system type",
  "options": [
    {
      "opt": " Accounting system",
      "price": 20
    },
    {
      "opt": "Blockchain-based system",
      "price": 20
    },
    {
      "opt": "Cloud migration",
      "price": 20
    },
    {
      "opt": "Collaboration and communication system",
      "price": 20
    },
    {
      "opt": " Customer relationship management (CRM) system",
      "price": 20
    },
    {
      "opt": " Data migration",
      "price": 20
    },
    {
      "opt": " E-commerce application",
      "price": 20
    },
    {
      "opt": "Electronic health records (EHRS) system",
      "price": 20
    },
    {
      "opt": "Enterprise resource planning (ERP) system",
      "price": 28
    },
    {
      "opt": " Human resource management (HRMS) system",
      "price": 25
    },
    {
      "opt": " Inventory Management solution",
      "price": 10
    },
    {
      "opt": "IoT solution",
      "price": 20
    },
    {
      "opt": "Learning management system",
      "price": 10
    },
    {
      "opt": "Loyalty program solution",
      "price": 20
    },
    {
      "opt": " Marketplace ",
      "price": 5
    },
    {
      "opt": "Mobile client portal",
      "price": 10
    },
    {
      "opt": "Project management system",
      "price": 15
    },
    {
      "opt": "Technical migration integration",
      "price": 20
    },
    {
      "opt": "Other (Specify)",
      "price": 30
    }
  ],
  "category": "Project",
  "selectedOption": {
    "opt": "Blockchain-based system",
    "price": 20
  },
  "label": "system type",
  "state": "Pre"
},
{
  "_id": "6560a181c9f7ceabb2c23846",
  "question": "What is the Type of Project?",
  "options": [
    {
      "opt": "Web App Development",
      "nextQuestion": "6560a181c9f7ceabb2c23847",
      "price": 5
    },
    {
      "opt": "Android App Development",
      "nextQuestion": "6560a181c9f7ceabb2c23848",
      "price": 10
    },
    {
      "opt": "Both",
      "nextQuestion": "6560a181c9f7ceabb2c23849",
      "price": 20
    }
  ],
  "selectedOption": {
    "opt": "Android App Development",
    "nextQuestion": "6560a181c9f7ceabb2c23848",
    "price": 10
  },
  "nextQuestion": "6560a181c9f7ceabb2c23848",
  "label": "project type",
  "state": "Dynamic"
},
{
  "_id": "6560a181c9f7ceabb2c23848",
  "question": "What is the target platform for the mobile app?",
  "options": [
    {
      "opt": "iOS",
      "nextQuestion": "",
      "price": 10
    },
    {
      "opt": "Android",
      "nextQuestion": "",
      "price": 15
    },
    {
      "opt": "Cross-platform (e.g., React Native, Flutter)",
      "nextQuestion": "",
      "price": 10
    }
  ],
  "selectedOption": {
    "opt": "Android",
    "nextQuestion": "",
    "price": 15
  },
  "nextQuestion": "6560a181c9f7ceabb2c2384f",
  "label": "target platform",
  "state": "Dynamic"
},
{
  "_id": "6560a181c9f7ceabb2c2384f",
  "question": "What is the expected app download and installation process?",
  "options": [
    {
      "opt": "App Store/Google Play",
      "nextQuestion": "",
      "price": 10
    },
    {
      "opt": "Enterprise distribution",
      "nextQuestion": "",
      "price": 10
    },
    {
      "opt": "Other (Specify)",
      "nextQuestion": "",
      "price": 20
    }
  ],
  "selectedOption": {
    "opt": "Enterprise distribution",
    "nextQuestion": "",
    "price": 10
  },
  "nextQuestion": "6560a181c9f7ceabb2c23850",
  "label": "download and installation process",
  "state": "Dynamic"
},
{
  "_id": "6560a181c9f7ceabb2c23850",
  "question": "Is there a need for offline functionality in the mobile app?",
  "options": [
    {
      "opt": "Yes",
      "nextQuestion": "",
      "price": 15
    },
    {
      "opt": "No",
      "nextQuestion": "",
      "price": 20
    }
  ],
  "selectedOption": {
    "opt": "No",
    "nextQuestion": "",
    "price": 20
  },
  "nextQuestion": "6560a181c9f7ceabb2c23851",
  "label": "offline functionality",
  "state": "Dynamic"
}]

export default Responses;