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


const ChangePassword = ({navigation}) => {
    const [user, setUser] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    })
    const [visual, setVisual] = useState({
        oldPasswordVisibility: false,
        newPasswordVisibility: false,
        confirmPasswordVisibility: false,
    })

    const dispatch = useDispatch()

    return(
        <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <VStack spacing={30} style={{ marginHorizontal:"10%",  justifyContent: "center", alignItems: "center", display:"flex", maxWidth:"80%", marginTop:"40%", marginBottom:"40%" }} >
                <Icon name="account-circle" size={50} color="black" />
                <TextInput
                  onChangeText={(text) => {
                      setUser({...user, oldPassword: text})
                  }}
                  label="old password"
                  placeholder="old password"
                  value={user.oldPassword}
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

export default ChangePassword;
