import React from 'react';
import {UserAPI} from "../../api/login/LoginApi";


export const logUserIn = async (user) => {
    const response = await UserAPI.logUserIn(user);
    console.log(`Si aia a fost: ${response.ok}`)
    if(response.ok)
    {
        const banana = 5;
        console.log(`Wtf ${banana}`);
    }
}
