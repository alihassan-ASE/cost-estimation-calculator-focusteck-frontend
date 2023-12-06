export const postData = async (data) => {
  try {
    console.log("------", data);

    if (data.responses && data.responses.length > 0) {
      await fetch("http://localhost:4500/postdata", {
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
