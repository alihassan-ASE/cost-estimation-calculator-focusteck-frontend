export const getQuestions = async () => {

    try {
      const pre = await fetch("http://localhost:4500/additionalquestions/Project/pre");
      const post = await fetch("http://localhost:4500/additionalquestions/Project/post");
      const preQuestions = await pre.json();
      const postQuestions = await post.json();
      const preProjectQuestion = preQuestions.data;
      const postProjectQuestion = postQuestions.data;
      return {preProjectQuestion, postProjectQuestion};
    } catch (error) {
      console.error("Error fetching additional question data:", error);
      throw new Error("Failed to fetch Additional Question Data");
    }
  }


export const getDynamicQuestion = async (ID) => {
    let questions; 
    console.log('In getApi: ', ID);
    const id = ID ? ID : "6560a181c9f7ceabb2c23846";
    try {
      questions = await fetch(`http://localhost:4500/question/${id}`);
      
      const projectQuestions = await questions.json();
      const projectBased = projectQuestions.data;
      console.log(projectBased);
      return projectBased;

    } catch (error) {
        console.error("Error fetching Project Question data:", error);
        throw new Error("Failed to fetch Project Question Data");
    }
}


export const postData = async (data) => {
  try {

    if (data.userName && data.email && data.totalCost && data.responses && data.responses.length>0) {
        await fetch('http://localhost:4500/postdata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            },
            body: JSON.stringify(data),
        });
    }
    else {
        console.log("Data Not Found", data);
    }
  } catch (error) {
    console.log('Error', error);
  }
}