import React from "react";
import {NativeRouter, Route, Routes} from "react-router-native";

// My components
import LoginPage from "../login/LoginPage";
import HomePage from "../home/HomePage";

const Navigation = () => {
    return(
        <NativeRouter>
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="" element={<LoginPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/home" element={<HomePage/>}/>
            </Routes>
        </NativeRouter>
    )
}

export default Navigation;