import React from 'react';


export const UserAPI = {
  logUserIn: async (user) => {
    // const {username ,password} = user;
    const username = "admin";
    const password = "admin";
      return fetch(`https://b7be-79-114-103-200.eu.ngrok.io/api/messages/db/users/login`, {
        method: 'POST',
        headers: {
          // "X-CSRFToken": cookie.load('csrftoken'),
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
  }
}
