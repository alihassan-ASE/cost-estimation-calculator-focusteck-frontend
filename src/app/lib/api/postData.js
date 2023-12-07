import { baseUrl } from "../../../config/constants";


export const postData = async (data) => {
  try {
    console.log("------", data);

    if (data.responses && data.responses.length > 0) {
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
