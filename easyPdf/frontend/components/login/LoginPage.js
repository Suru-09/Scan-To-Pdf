import React , {useState} from "react";

// React-native materials
import { VStack, HStack } from 'react-native-flex-layout';
import { IconComponentProvider, Icon, Button, TextInput, IconButton, Text} from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import flex from "react-native-flex-layout/src/Flex";


import {useDispatch} from "react-redux";
// Bzl and Api
import {loginUser} from "../../redux/actions/userActions";
import {logUserIn} from "../../bzl/login/LoginBzl";
import {httpsUrl} from "../../constants/HttpsUrl";

import store from "../../redux/store";

const state = store.getState();


const LoginPage = ({navigation}) => {
    const [user, setUser] = useState({
        username: "",
        password: "",
    })

    const [visual, setVisual] = useState({
        passwordVisibility: false,
    })

    const dispatch = useDispatch()

    return(
        <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <VStack spacing={30} style={{ marginHorizontal:"10%",  justifyContent: "center", alignItems: "center", display:"flex", maxWidth:"80%", marginTop:"40%", marginBottom:"40%" }} >
                <Icon name="account-circle" size={50} color="black" />
                <TextInput
                    onChangeText={(text) => setUser({...user, username: text})}
                    variant="outlined" label="username" style={{ width:"100%" }}
                    placeholder="username"
                    value={user.username}
                />
                <TextInput
                  onChangeText={(text) => {
                      setUser({...user, password: text})
                  }}
                  label="password"
                  placeholder="password"
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
                        logUserIn(user).then(r => {
                            // TO DO: Add a warning for not being able to log in instead of null
                            console.log(r);
                            r.ok ? dispatch(loginUser(r.loggedUser)) : null;
                            r.ok ? navigation.navigate('Home') : null;
                        });
                        console.log(httpsUrl);
                    }}
                    title="Login"
                />

                <HStack spacing={3}>
                    <Text variant="subtitle2">Don't have an account?</Text>
                    <Button variant="text" uppercase={false}
                        onPress={async () =>{navigation.navigate('SignupPage')}}
                        title="Sign Up"
                    />
                </HStack>
            </VStack>
        </IconComponentProvider>
    );
}

export default LoginPage;
