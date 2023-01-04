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
        username: username,
        password: password,
        email: email,
      })
    })
}

async function changeUserName(user) {
  const {id, password, new_username } = user;
  return fetch(`${httpsUrl}/db/users/change-username`, {
      method: 'UPDATE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        password: password,
        new_username: new_username,
      })
    })
}

async function changePw(user) {
  const {id, password, new_password } = user;
  return fetch(`${httpsUrl}/db/users/change-password`, {
      method: 'UPDATE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        password: password,
        new_password: new_password,
      })
    })
}

async function changeEmail(user) {
  const {id, password, new_email } = user;
  return fetch(`${httpsUrl}/db/users/change-email`, {
      method: 'UPDATE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        password: password,
        new_email: new_email,
      })
    })
}
