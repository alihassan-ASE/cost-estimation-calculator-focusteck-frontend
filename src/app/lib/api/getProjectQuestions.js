import { baseUrl } from "../../../config/constants";

export const getQuestions = async () => {
  try {
    const pre = await fetch(`${baseUrl}/additionalquestions/Project/pre`);
    const post = await fetch(`${baseUrl}/additionalquestions/Project/post`);
    const preQuestions = await pre.json();
    const postQuestions = await post.json();
    const preProjectQuestion = preQuestions.data;
    const postProjectQuestion = postQuestions.data;

    return { preProjectQuestion, postProjectQuestion };
  } catch (error) {
    console.error("Error fetching additional question data:", error);
    throw new Error("Failed to fetch Additional Question Data");
  }
};

export const getDynamicQuestion = async (_id) => {
  let questions;
  try {
    questions = await fetch(`${baseUrl}/question/${_id?_id:""}`);
    const projectQuestions = await questions.json();
    const projectBased = projectQuestions.data;
    return projectBased;
  } catch (error) {
    console.error("Error fetching Project Question data:", error);
    throw new Error("Failed to fetch Project Question Data");
  }
};


export const postData = async (data) => {
  try {
    if (
      data.userName &&
      data.email &&
      data.totalCost &&
      data.responses &&
      data.responses.length > 0
    ) {
      await fetch(`${baseUrl}/postdata`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } else {
      console.log("Data Not Found", data);
    }
  } catch (error) {
    console.log("Error", error);
  }
};
