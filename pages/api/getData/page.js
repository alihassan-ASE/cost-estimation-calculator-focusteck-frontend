// // pages/api/getData.js
// import { connectToDB } from "../../../src/app/utils/database";
// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   phone: String
// });

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     try {
//       await connectToDB();
//       const User = mongoose.models.users || mongoose.model('users', userSchema);
//       const data = await User.find();
//       // console.log(data);
//       res.status(200).json(data);
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   } else {
//     res.status(405).json({ error: "Method Not Allowed" });
//   }
// }





// pages/api/getData.js
// import { connectToDB } from "../../../src/app/utils/database";
import allStaffQuestions from '../../../src/app/questionsData/staffBase.json';
import additionalQuestions from '../../../src/app/questionsData/additionalQuestions.json';
// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   phone: String
// });


export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // await connectToDB();
      // const User = mongoose.models.users || mongoose.model('users', userSchema);
      // const data = await User.find();
      const staffAddtionalQuestions = additionalQuestions.data.filter((questions)=>questions.category === 'Staff');
      res.status(200).json({Resources: allStaffQuestions, additionalQuestions: staffAddtionalQuestions});
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
