import React from "react";
import {NavigationContainer} from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'

// My components
import AboutPage from "../settingPage/AboutPage";
import RateAppPage from "../settingPage/RateAppPage";
import HelpPage from "../settingPage/HelpPage";
import HomePage from "../home/HomePage";
import CustomDrawer from "../settingPage/CustomDrawer";
import ChangeEmail from "../profileEdits/ChangeEmail";
import ChangePassword from "../profileEdits/ChangePassword";
import ChangeUsername from "../profileEdits/ChangeUsername";

import {colors} from '../../constants/Colors';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return(
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            useLegacyImplementation={true}
            screenOptions={{
                drawerStyle:{backgroundColor: colors.lighter_background}, headerShown: false,
                drawerType: "back", drawerActiveBackgroundColor:'#303030',
                drawerActiveTintColor: 'blue',
                drawerLabelStyle: {
                    fontSize: 17,
                    color: colors.text,
                }
        }}
        >
            <Drawer.Screen name="Home" component={HomePage} />
            <Drawer.Screen name="ChangeEmail" component={ChangeEmail} />
            <Drawer.Screen name="ChangePassword" component={ChangePassword} />
            <Drawer.Screen name="ChangeUsername" component={ChangeUsername} />
            <Drawer.Screen name="About" component={AboutPage} />
            <Drawer.Screen name="RateApp" component={RateAppPage} />
            <Drawer.Screen name="Help" component={HelpPage} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigator;