import React from 'react';
import {UserAPI} from "../../api/user/UserApi";


export const updateRating = async (userID, userRating) => {
    const response = await UserAPI.updateRating(userID, userRating);
    console.log(`UpdateRating response: [${response.ok}]`)
    return response.ok;
}

export const getRating = async(userID) => {
    const response = await UserAPI.getRating(userID);
    const json = await response.json();
    console.log(json);
    return json;
}