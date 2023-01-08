import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {colors} from '../../constants/Colors'

// hooks
import {useEffect, useState} from "react";

import store from "../../redux/store";

const CustomDrawer = props => {
    const [currentUser, setUser] = useState({username: "Empty", email: "empty@gmail.com"})
    const [state, setState] = useState(null);

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


  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: colors.teal_text}}>
        <ImageBackground
          //source={require('../assets/images/menu-bg.jpeg')}
          style={{padding: 20}}>
          <Image
            //source={require('../assets/images/user-profile.jpg')}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
          />
          <Text
            style={{
              color: colors.text,
              fontSize: 18,
              marginBottom: 5,
            }}>
              {currentUser.username}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <FontAwesome5
                style={{marginLeft: 5, marginRight: 5}}
                name="envelope" size={20} color={colors.text} />
            <Text
              style={{
                color: colors.text,
                fontSize: 18,
              }}>
              {currentUser.email}
            </Text>
          </View>
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: colors.lighter_background, paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: colors.teal_text}}>
        <TouchableOpacity onPress={() => {props.navigation.navigate('LoginPage')}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons color="white" name="exit-outline" size={22} />
            <Text
              style={{
                color: colors.text,
                fontSize: 15,
                marginLeft: 15,
                fontWeight: "bold",
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;