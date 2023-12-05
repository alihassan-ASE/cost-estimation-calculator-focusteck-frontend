import React from 'react';

export const postData = async (data) => {
  try {

    if (data) {
        await fetch('https://a1fb-182-180-118-76.ngrok.io/postdata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {userName: '', email: '', responses: [data.responses]},
        });
    }
    else {
        console.log("Data Not Found", data);
    }
  } catch (error) {
    console.log('Error', error);
  }
}


// export function getStaticprops(data){
//     return {
//         props: data
//     }
// }

