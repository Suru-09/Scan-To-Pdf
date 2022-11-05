import React from "react";
import {NativeRouter, Route, Routes} from "react-router-native";
import LoginPage from "../login/LoginPage";

const Navigation = () => {
    return(
        <NativeRouter>
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="" element={<LoginPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
            </Routes>
        </NativeRouter>
    )
}

export default Navigation;