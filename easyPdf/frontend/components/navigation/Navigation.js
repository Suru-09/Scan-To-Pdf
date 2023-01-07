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
import CapturePage from "../capture/CapturePage";
import SavePage from "../save/SavePDFPage";
import SettingPage from "../settingPage/SettingPage";
import AboutPage from "../settingPage/AboutPage";
import RateAppPage from "../settingPage/RateAppPage";
import HelpPage from "../settingPage/HelpPage";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return(
        <NavigationContainer >
            <Stack.Navigator screenOptions={{contentStyle:{backgroundColor:'#303030'}, headerShown: false}}>
                <Stack.Screen name="LoginPage" component={LoginPage} />
                <Stack.Screen name="SignupPage" component={SignupPage} />
                <Stack.Screen name="ChangeEmail" component={ChangeEmail} />
                <Stack.Screen name="ChangePassword" component={ChangePassword} />
                <Stack.Screen name="ChangeUsername" component={ChangeUsername} />
                <Stack.Screen name="CapturePage" component={CapturePage} />
                <Stack.Screen name="About" component={AboutPage} />
                <Stack.Screen name="RateApp" component={RateAppPage} />
                <Stack.Screen name="Help" component={HelpPage} />
                <Stack.Screen name="SavePage" component={SavePage} initialParams={{ photosList: []}} />
                <Stack.Screen name="SettingPage" component={SettingPage} />
                <Stack.Screen name="Home" component={HomePage}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;