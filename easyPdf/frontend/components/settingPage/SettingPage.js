import React from "react";

// React-native materials
import {StyleSheet} from "react-native";


import { View } from 'react-native';



// hooks
import {useEffect, useState} from "react";
import store from '../../redux/store.js'

const SettingPage = ({navigation}) => {

    const [currentUser, setUser] = useState({username: "Empty", email: "empty@gmail.com"})
    const [state, setState] = useState(null)
    useEffect(() => {
        async function loadReduxState() {
            const state = await store.getState();
            setState(state);
        }
        async function loadUser() {
            if(state != null) {
                const user = await state.userReducer.loginUser;
                setUser(user);
            }
        }
        loadReduxState().then(r => console.log("State has been set!"));
        loadUser().then(r => console.log("User has been set!"));

    }, [state, currentUser]);

    return(
        <View></View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });

export default SettingPage;