import React , {useState} from "react";

// React-native materials
import {HStack, VStack} from 'react-native-flex-layout';
import {IconComponentProvider, Icon, Button, TextInput, IconButton, Text} from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import flex from "react-native-flex-layout/src/Flex";


import {useDispatch} from "react-redux";

// Bzl and Api
import {loginUser} from "../../redux/actions/userActions";
import {logUserIn} from "../../bzl/login/LoginBzl";
import {httpsUrl} from "../../constants/HttpsUrl";



const SignupPage = ({navigation}) => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        passwordVisibility: false,
        conformVisibility: false,
    })

    const dispatch = useDispatch()

    return(
        <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <VStack spacing={30} style={{ marginHorizontal:"10%",  justifyContent: "center", alignItems: "center", display:"flex", maxWidth:"80%", marginTop:"20%", marginBottom:"40%" }} >
                <Icon name="account-circle" size={50} color="black" />
                <TextInput
                    onChangeText={(text) => setUser({...user, username: text})}
                    variant="outlined" label="username" style={{ width:"100%" }}
                />
                <TextInput
                    onChangeText={(text) => setUser({...user, email: text})}
                    variant="outlined" label="e-mail" style={{ width:"100%" }}
                />
                <TextInput
                  onChangeText={(text) => {
                      setUser({...user, password: text})
                }}
                  label="password"
                  variant="outlined"
                  style={{ width:"100%" }}
                  secureTextEntry={!user.passwordVisibility}
                  trailing={props => (
                    <IconButton
                        onPress={() => setUser({...user, passwordVisibility: !user.passwordVisibility})}
                        icon={props => <Icon name={user.passwordVisibility ? 'eye-off' : 'eye'} {...props} />} {...props} />
                  )}
                />
                <TextInput
                  onChangeText={(text) => {
                      setUser({...user, confirmPassword: text})
                }}
                  label="confirm password"
                  variant="outlined"
                  style={{ width:"100%" }}
                  secureTextEntry={!user.conformVisibility}
                  trailing={props => (
                    <IconButton
                        onPress={() => setUser({...user, conformVisibility: !user.conformVisibility})}
                        icon={props => <Icon name={user.conformVisibility ? 'eye' : 'eye-off'} {...props} />} {...props} />
                  )}
                />
                <Button
                    onPress={async () => {
                        navigation.navigate('Home');
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