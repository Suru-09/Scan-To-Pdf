import React from 'react';
import {UserAPI} from "../../api/user/UserApi";


export const logUserIn = async (user) => {
    const response = await UserAPI.logUserIn(user);
    const userReturned = await response.json();
    console.log(`Response value: [${response.ok}]`)
    return {"ok": response.ok, userReturned};
}
