import React from 'react';
import {UserAPI} from "../../api/user/UserApi";


export const logUserIn = async (user) => {
    const response = await UserAPI.logUserIn(user);
    console.log(`Response value: [${response.ok}]`)
    return response.ok;
}
