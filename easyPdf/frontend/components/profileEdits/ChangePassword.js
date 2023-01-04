import React from "react";

// React-native materials
import { VStack } from 'react-native-flex-layout';
import { IconComponentProvider, Icon, Button, TextInput, IconButton, Text} from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import flex from "react-native-flex-layout/src/Flex";

// Bzl and Api
import {changePassword} from "../../bzl/changeUser/ChangeUserBzl";

// hooks
import {useEffect, useState} from 'react'

// redux
import store from '../../redux/store.js'
import {Alert} from "react-native";


const ChangePassword = ({navigation}) => {
    const [user, setUser] = useState({
        password: "",
        newPassword: "",
        confirmPassword: "",
    })
    const [visual, setVisual] = useState({
        oldPasswordVisibility: false,
        newPasswordVisibility: false,
        confirmPasswordVisibility: false,
    })
    const [state, setState] = useState(null)
    useEffect(() => {
        async function loadReduxState() {
            const state = await store.getState()
            setState(state)
        }
        loadReduxState().then(() => console.log("Redux state has been retrieved!"))
    }, [state])

    return(
        <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <VStack spacing={30} style={{ marginHorizontal:"10%",  justifyContent: "center", alignItems: "center", display:"flex", maxWidth:"80%", marginTop:"40%", marginBottom:"40%" }} >
                <Icon name="account-circle" size={50} color="black" />
                <TextInput
                  onChangeText={(text) => {
                      setUser({...user, password: text})
                  }}
                  label="old password"
                  placeholder="old password"
                  value={user.password}
                  variant="outlined"
                  style={{ width:"100%" }}
                  secureTextEntry={!visual.oldPasswordVisibility}
                  trailing={props => (
                    <IconButton
                        onPress={() => setVisual({...visual, oldPasswordVisibility: !visual.oldPasswordVisibility})}
                        icon={props => <Icon name={visual.oldPasswordVisibility ? 'eye-off' : 'eye'} {...props} />} {...props} />
                  )}
                />
                <TextInput
                  onChangeText={(text) => {
                      setUser({...user, newPassword: text})
                  }}
                  label="new password"
                  placeholder="new password"
                  value={user.newPassword}
                  variant="outlined"
                  style={{ width:"100%" }}
                  secureTextEntry={!visual.newPasswordVisibility}
                  trailing={props => (
                    <IconButton
                        onPress={() => setVisual({...visual, newPasswordVisibility: !visual.newPasswordVisibility})}
                        icon={props => <Icon name={visual.newPasswordVisibility ? 'eye-off' : 'eye'} {...props} />} {...props} />
                  )}
                />
                <TextInput
                  onChangeText={(text) => {
                      setUser({...user, confirmPassword: text})
                  }}
                  label="confirm password"
                  placeholder="confirm password"
                  value={user.confirmPassword}
                  variant="outlined"
                  style={{ width:"100%" }}
                  secureTextEntry={!visual.confirmPasswordVisibility}
                  trailing={props => (
                    <IconButton
                        onPress={() => setVisual({...visual, confirmPasswordVisibility: !visual.confirmPasswordVisibility})}
                        icon={props => <Icon name={visual.confirmPasswordVisibility ? 'eye-off' : 'eye'} {...props} />} {...props} />
                  )}
                />
                <Button
                    onPress={async () => {
                        console.log(await state.userReducer.loginUser)
                        const userId = await state.userReducer.loginUser.id;
                        const neededUser = {id: userId, password: user.password, new_password: user.newPassword}
                        console.log(`I am the neededUser: ${neededUser}`);
                        console.log(neededUser);
                        changePassword(neededUser).then(r => {
                            console.log(r);
                            r ? navigation.navigate('Home') : Alert.alert('Invalid password. Enter password again!');
                        });

                    }}
                    title="Save"
                />
            </VStack>
        </IconComponentProvider>
    );
}

export default ChangePassword;
