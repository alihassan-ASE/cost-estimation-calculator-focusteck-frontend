export const getQuestions = async () => {
  try {
    const staffQuestion = await fetch("/api/getData/getData");
    const additionalQuestion = await fetch("https://a1fb-182-180-118-76.ngrok.io/additionalquestions/Staff");
    const staff = await staffQuestion.json();
    const additional = await additionalQuestion.json();
    const staffQuestions = staff.data;
    const additionalQuestions = additional.data;
    return {Resources: staffQuestions, additionalQuestions: additionalQuestions};
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error("Failed to fetch user data");
  }
}