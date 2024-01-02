import { baseUrl } from "../../../config/constants";

export const getQuestions = async () => {
  try {
    const staffQuestion = await fetch(`${baseUrl}/resources`);
    const staff = await staffQuestion.json();

    const additionalQuestion = await fetch(
      `${baseUrl}/additionalquestions/Staff`
    );
    const additional = await additionalQuestion.json();

    const staffQuestions = staff.data;
    const additionalQuestions = additional.data;
    return {
      Resources: staffQuestions,
      additionalQuestions: additionalQuestions,
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error("Failed to fetch user data");
  }
};
