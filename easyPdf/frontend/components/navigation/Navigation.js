import React from "react";
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// My components
import LoginPage from "../login/LoginPage";
import HomePage from "../home/HomePage";
import SignupPage from "../signup/SignupPage";
import ChangeEmail from "../profileEdits/ChangeEmail";
import ChangePassword from "../profileEdits/ChangePassword";
import ChangeUsername from "../profileEdits/ChangeUsername";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return(
        <NavigationContainer >
            <Stack.Navigator screenOptions={{contentStyle:{backgroundColor:'#FFFFFF'}}}>
                <Stack.Screen name="LoginPage" component={ChangePassword} />
                <Stack.Screen name="SignupPage" component={SignupPage} />
                <Stack.Screen name="ChangeEmail" component={ChangeEmail} />
                <Stack.Screen name="ChangePassword" component={ChangePassword} />
                <Stack.Screen name="ChangeUsername" component={ChangeUsername} />
                <Stack.Screen name="Home" component={HomePage}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;