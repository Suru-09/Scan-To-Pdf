import React , {useState} from "react";

// React-native materials
import { VStack } from 'react-native-flex-layout';
import { IconComponentProvider, Icon, Button, TextInput, IconButton   } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import flex from "react-native-flex-layout/src/Flex";


import {useDispatch} from "react-redux";

// Bzl and Api
import {loginUser} from "../../redux/actions/userActions";
import {logUserIn} from "../../bzl/login/LoginBzl";
import {httpsUrl} from "../../constants/HttpsUrl";


const LoginPage = ({navigation}) => {
    const [user, setUser] = useState({
        username: "",
        password: "",
    })

    const dispatch = useDispatch()

    return(
        <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <VStack spacing={30} style={{ marginHorizontal:"10%",  justifyContent: "center", alignItems: "center", display:"flex", maxWidth:"80%", marginTop:"40%", marginBottom:"40%" }} >
                <Icon name="home" size={35} color="black" />
                <TextInput
                    onChangeText={(text) => setUser({...user, username: text})}
                    variant="outlined" label="username" style={{ width:"100%" }}
                />
                <TextInput
                  onChangeText={(text) => {
                      setUser({...user, password: text})
                }}
                  label="password"
                  variant="outlined"
                  style={{ width:"100%" }}
                  trailing={props => (
                    <IconButton icon={props => <Icon name="eye" {...props} />} {...props} />
                  )}
                />
                <Button
                    onPress={async () => {
                        logUserIn(user).then(r => {
                            // TO DO: Add a warning for not being able to log in instead of null
                            r ? navigation.navigate('Home') : null;
                        });
                        dispatch(loginUser(user));
                        console.log(httpsUrl);
                    }}
                    title="Login" />
            </VStack>
        </IconComponentProvider>
    );
}

export default LoginPage;
