import { baseUrl } from "../../../config/constants";

export const postData = async (data) => {

  try {
    if (data.responses && data.responses.length > 0) {
      await fetch(`${baseUrl}/postdata`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } else {
    }
  } catch (error) {
    console.log("Error", error);
  }
};

export const sendEmail =async (data)=>{
  try {

    console.log("data",data)
    // if (data.responses && data.responses.length > 0) {
    //   await fetch(`http://localhost:4500/send-email`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });
    // } else {
    // }
  } catch (error) {
    console.log("Error", error);
  }
}
