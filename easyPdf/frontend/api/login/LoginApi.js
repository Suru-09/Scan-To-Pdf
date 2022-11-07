import React from 'react';

const  logUserIn = async (username, pw) => {
    return fetch('db/users/login', {
      method: 'POST',
      headers: {
        // "X-CSRFToken": cookie.load('csrftoken'),
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: pw
      })
    })
}

export default logUserIn;