import React from 'react';

import {httpsUrl} from "../../constants/HttpsUrl";

export const UserAPI = {
    logUserIn: async (user) => {
      const {username ,password} = user;
      return fetch(`${httpsUrl}/db/users/login`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username,
            password: password
          })
        })
    },
    signupUser: async(user) => {
      const {username, email, password } = user;
      return fetch(`${httpsUrl}/db/users/`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            first_name: "Portocala",
            last_name: "Portocala",
            username: username,
            password: password,
            email: email,
          })
        })
    }
}


