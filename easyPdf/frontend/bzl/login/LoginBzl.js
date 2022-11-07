import React from 'react';
import logUserIn from "../../api/login/LoginApi";
import navigation from "../../components/navigation/Navigation";

const logUserIn = async (username, pw) => {
    const response = await logUserIn(username, pw);
    if(response.ok)
    {
        navigation.navigate('/home');
    }
}