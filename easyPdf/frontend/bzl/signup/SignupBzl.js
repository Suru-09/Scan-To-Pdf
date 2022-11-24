import React from 'react';
import {UserAPI} from "../../api/user/UserApi";


export const signUserUp = async (user) => {
    const response = await UserAPI.signupUser(user);
    console.log(`Response value: [${response.ok}]`)
    return response.ok;
}
