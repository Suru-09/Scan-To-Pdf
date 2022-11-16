import React from 'react';

import {httpsUrl} from "../../constants/HttpsUrl";

export const UserAPI = {
    logUserIn: loginUser,
    signupUser: signUserUp,
    changeUsername: changeUserName,
    changePassword: changePw,
    changeMail: changeEmail,
}

async function loginUser(user) {
    const {username, password} = user;
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
    });
}

async function signUserUp(user) {
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

async function changeUserName(user) {
  const {username, password, newUsername } = user;
  return fetch(`${httpsUrl}/db/users/change-username`, {
      method: 'UPDATE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
        newUsername: newUsername,
      })
    })
}

async function changePw(user) {
  const {username, password, newPassword } = user;
  return fetch(`${httpsUrl}/db/users/change-password`, {
      method: 'UPDATE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
        newPassword: newPassword,
      })
    })
}

async function changeEmail(user) {
  const {username, password, newEmail } = user;
  return fetch(`${httpsUrl}/db/users/change-email`, {
      method: 'UPDATE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
        newEmail: newEmail,
      })
    })
}
