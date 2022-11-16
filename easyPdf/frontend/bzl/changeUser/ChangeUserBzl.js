import React from 'react';
import {UserAPI} from "../../api/user/UserApi";


export const changeUsername = async (user) => {
    const response = await UserAPI.changeUsername(user);
    console.log(`Response value: [${response.ok}]`)
    return response.ok;
}

export const changePassword = async (user) => {
    const response = await UserAPI.changePassword(user);
    console.log(`Response value: [${response.ok}]`)
    return response.ok;
}

export const changeEmail = async (user) => {
    const response = await UserAPI.changeMail(user);
    console.log(`Response value: [${response.ok}]`)
    return response.ok;
}
