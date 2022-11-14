import React , {useState} from "react";

// React-native materials
import { VStack } from 'react-native-flex-layout';
import { IconComponentProvider, Icon, Button, TextInput, IconButton, Text} from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import flex from "react-native-flex-layout/src/Flex";


import {useDispatch} from "react-redux";
// Bzl and Api
import {loginUser} from "../../redux/actions/userActions";
import {logUserIn} from "../../bzl/login/LoginBzl";
import {httpsUrl} from "../../constants/HttpsUrl";
import {useIsFocused} from "@react-navigation/native";
import {Keyboard} from "react-native";


const ChangeEmail = ({navigation}) => {
    const [user, setUser] = useState({
        email: "",
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
                        navigation.navigate('Home');
                    }}
                        // dispatch(loginUser(user));
                        // console.log(httpsUrl);
                    title="Save"
                />
            </VStack>
        </IconComponentProvider>
    );
}

export default ChangeEmail;
