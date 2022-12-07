import React , {useState} from "react";

// React-native materials
import { VStack, HStack } from 'react-native-flex-layout';
import { IconComponentProvider, Icon, Button, TextInput, IconButton, Text} from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import flex from "react-native-flex-layout/src/Flex";

// redux
import {useDispatch} from "react-redux";

// Bzl and Api
import {loginUser} from "../../redux/actions/userActions";
import {logUserIn} from "../../bzl/login/LoginBzl";
import {httpsUrl} from "../../constants/HttpsUrl";
import {Alert} from "react-native";


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
                        logUserIn(user).then(response => {
                            console.log(response);
                            if (response.ok)
                            {
                                dispatch(loginUser(response.loggedUser));
                                navigation.navigate('Home');
                            }
                            else
                            {
                                // TO DO: handle error log in maybe with an alert pop-up(invalid whatever).
                                Alert.alert(
                                    "Username or password are incorrect!Try again."
                                );
                            }
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
