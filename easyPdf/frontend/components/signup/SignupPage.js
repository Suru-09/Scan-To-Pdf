import React , {useState} from "react";

// React-native materials
import {HStack, VStack} from 'react-native-flex-layout';
import {IconComponentProvider, Icon, Button, TextInput, IconButton, Text} from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import flex from "react-native-flex-layout/src/Flex";

// Redux
import {useDispatch} from "react-redux";

// Bzl and Api
import {signUserUp} from "../../bzl/signup/SignupBzl";

const SignupPage = ({navigation}) => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const [visual, setVisual] = useState({
        passwordVisibility: false,
        confirmPasswordVisibility: false,
    })

    const dispatch = useDispatch()

    return(
        <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <VStack spacing={30} style={{ marginHorizontal:"10%",  justifyContent: "center", alignItems: "center", display:"flex", maxWidth:"80%", marginTop:"20%", marginBottom:"40%" }} >
                <Icon name="account-circle" size={50} color="black" />
                <TextInput
                    onChangeText={(text) => setUser({...user, username: text})}
                    variant="outlined" label="username" style={{ width:"100%" }}
                    value={user.username}
                />
                <TextInput
                    onChangeText={(text) => setUser({...user, email: text})}
                    variant="outlined" label="e-mail" style={{ width:"100%" }}
                    value={user.email}
                />
                <TextInput
                  onChangeText={(text) => {
                      setUser({...user, password: text})
                }}
                  value={user.password}
                  label="password"
                  variant="outlined"
                  style={{ width:"100%" }}
                  secureTextEntry={!visual.passwordVisibility}
                  trailing={props => (
                    <IconButton
                        onPress={() => setVisual({...visual, passwordVisibility: !visual.passwordVisibility})}
                        icon={props => <Icon name={visual.passwordVisibility ? 'eye-off' : 'eye'} {...props} />} {...props} />
                  )}
                />
                <TextInput
                  onChangeText={(text) => {
                      setUser({...user, confirmPassword: text})
                }}
                  value={user.confirmPassword}
                  label="confirm password"
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
                        signUserUp(user).then(r => {
                            // TO DO: Add a warning for not being able to log in instead of null
                            // BE CAREFUL if user already exists database will return HTTP_409 CONFLICT
                            // It is not an URL conflict !!!!
                            r ? navigation.navigate('LoginPage') : null;
                        })
                    }}
                    title="Sign up" />
                <HStack spacing={3}>
                    <Text variant="subtitle2">Already have an account?</Text>
                    <Button variant="text" uppercase={false}
                        onPress={async () =>{navigation.navigate('LoginPage')}}
                        title="Login"/>
                </HStack>
            </VStack>
        </IconComponentProvider>
    );
}

export default SignupPage;