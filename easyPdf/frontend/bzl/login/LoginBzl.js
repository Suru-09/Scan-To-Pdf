import React from 'react';

// API imports
import {UserAPI} from "../../api/user/UserApi";

export const logUserIn = async (user) => {
    const response = await UserAPI.logUserIn(user);
    const userReturned = await response.json();
    console.log(`Response value: [${response.ok}]`)
    return {"ok": response.ok, "loggedUser": userReturned};
}
