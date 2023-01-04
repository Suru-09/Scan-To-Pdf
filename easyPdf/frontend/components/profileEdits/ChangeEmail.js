import React from "react";

// React-native materials
import { VStack } from 'react-native-flex-layout';
import { IconComponentProvider, Icon, Button, TextInput, IconButton, Text} from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import flex from "react-native-flex-layout/src/Flex";
import {Alert} from "react-native";

// redux
import store from "../../redux/store";

// bzl
import {changeEmail} from "../../bzl/changeUser/ChangeUserBzl";

import {useEffect, useState} from "react";


const ChangeEmail = ({navigation}) => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const [visual, setVisual] = useState({
        passwordVisibility: false,
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
                    onChangeText={(text) => setUser({...user, email: text})}
                    variant="outlined" label="new email" style={{ width:"100%" }}
                    placeholder="new email"
                    value={user.email}
                />
                <TextInput
                  onChangeText={(text) => {
                      setUser({...user, password: text})
                  }}
                  label="enter password"
                  placeholder="enter password"
                  value={user.password}
                  variant="outlined"
                  style={{ width:"100%" }}
                  secureTextEntry={!visual.passwordVisibility}
                  trailing={props => (
                    <IconButton
                        onPress={() => setVisual({...visual, passwordVisibility: !visual.passwordVisibility})}
                        icon={props => <Icon name={visual.passwordVisibility ? 'eye-off' : 'eye'} {...props} />} {...props} />
                  )}
                />
                <Button
                    onPress={async () => {
                        const userId = await state.userReducer.loginUser.id;
                        const neededUser = {id: userId, password: user.password, new_email: user.email}
                        console.log(`I am the neededUser: ${neededUser}`);
                        console.log(neededUser);
                        changeEmail(neededUser).then(r => {
                            console.log(r);
                            r ? navigation.navigate('Home') : Alert.alert('Invalid password. Enter password again!');;
                        });

                    }}
                    title="Save"
                />
            </VStack>
        </IconComponentProvider>
    );
}

export default ChangeEmail;
