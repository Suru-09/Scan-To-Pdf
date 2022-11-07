import React , {useState} from "react";
import { VStack } from 'react-native-flex-layout';
import { IconComponentProvider, Icon, Button, TextInput, IconButton   } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import flex from "react-native-flex-layout/src/Flex";
import {useDispatch} from "react-redux";
import {loginUser} from "../../redux/actions/userActions";
import logUserIn from "../../api/login/LoginApi";

const LoginPage = () => {
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
                    onChange={(text) => {setUser({...user, username: text})}}
                    variant="outlined" label="username" style={{ width:"100%" }}
                />
                <TextInput
                  onChange={(text) => {setUser({...user, password: text})}}
                  label="password"
                  variant="outlined"
                  style={{ width:"100%" }}
                  trailing={props => (
                    <IconButton icon={props => <Icon name="eye" {...props} />} {...props} />
                  )}
                />
                <Button
                    onPress={() => {
                        logUserIn(user.username, user.password).then(r => console.log(r));
                        dispatch(loginUser(user));
                    }}
                    title="Login" />
            </VStack>
        </IconComponentProvider>
    );
}

export default LoginPage;
