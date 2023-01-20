import React , {useEffect, useState} from "react";

// React-native materials
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';


// Bzl and Api
import {colors} from "../../constants/Colors";
import {changePassword} from "../../bzl/changeUser/ChangeUserBzl";
import store from "../../redux/store";

const ChangePassword = ({navigation}) => {

    const [user, setUser] = useState({
        password: "",
        newpassword: "",
        confirmPassword: "",
    })

    const[info, setInfo] = useState({
        secureTextEntry: true,
        confirmSecureTextEntry: true,
        inputSecure: true,
        validPassword: true,
    })

    const [state, setState] = useState(null)
    useEffect(() => {
        async function loadReduxState() {
            const state = await store.getState()
            setState(state)
        }
        loadReduxState().then(() => console.log("Redux state has been retrieved!"))
    }, [state])

    const updateInputSecure = () => {
        setInfo({
            ...info,
            inputSecure: !info.inputSecure
        });
    }

    const updateSecureText = () => {
        setInfo({
            ...info,
            secureTextEntry: !info.secureTextEntry
        });
    }

    const updateConfirmSecureText = () => {
        setInfo({
            ...info,
            confirmSecureTextEntry: !info.confirmSecureTextEntry
        });
    }


    const handleNewPasswordChange = (pass) => {
        setUser({
            ...user,
            newpassword: pass
        })
    }

    const handleConfirmPasswordChange = (pass) => {

        setUser({
            ...user,
            confirmPassword: pass
        })

    }

    const handlePasswordChange = (pass) => {
        setUser({
            ...user,
            password: pass
        })
    }

    const changeHandle = async (inputUser) => {
        if (inputUser.confirmPassword === user.newpassword){
            const userId = await state.userReducer.loginUser.id;
            const neededUser = {id: userId, password: inputUser.password, new_password: inputUser.newpassword}
            changePassword(neededUser).then(r => {
                console.log(r);
                if(r)
                {
                    Alert.alert(
                    'Warning',
                    'Changes will be seen only after you log out and log in again',
                    [
                        {
                            text: 'Ok',
                            onPress: navigation.navigate('Home')

                        }
                    ]);
                }
                else
                {
                    Alert.alert('Invalid password. Try again!');
                }
            });
        }
        else{
            Alert.alert('Passwords do not match!');
        }
    }

    return(
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content"/>
            <View style={styles.header}>
                <Text style={styles.text_header}>Change Password</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.lighter_background
                }]}
            >

                <Text style={[styles.text_footer, {
                    color: colors.text,
                    marginTop: 35
                }]}>
                    New Password
                </Text>
                <View style={styles.action}>
                    <Feather
                        name="lock"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="New Password"
                        placeholderTextColor={colors.text}
                        secureTextEntry={info.inputSecure ? true : false}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(pw) => handleNewPasswordChange(pw)}
                    />
                    <TouchableOpacity
                        onPress={updateInputSecure}
                    >
                        {info.inputSecure ?
                        <Feather
                            name="eye-off"
                            color="grey"
                            size={20}
                        />
                        :
                        <Feather
                            name="eye"
                            color="grey"
                            size={20}
                        />
                        }
                    </TouchableOpacity>
                </View>

                <Text style={[styles.text_footer, {
                    color: colors.text,
                    marginTop: 20
                }]}>
                    Confirm new password
                </Text>
                <View style={styles.action}>
                    <Feather
                        name="lock"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Confirm new password"
                        placeholderTextColor={colors.text}
                        secureTextEntry={info.confirmSecureTextEntry ? true : false}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(pw) => handleConfirmPasswordChange(pw)}
                    />
                    <TouchableOpacity
                        onPress={updateConfirmSecureText}
                    >
                        {info.confirmSecureTextEntry ?
                        <Feather
                            name="eye-off"
                            color="grey"
                            size={20}
                        />
                        :
                        <Feather
                            name="eye"
                            color="grey"
                            size={20}
                        />
                        }
                    </TouchableOpacity>
                </View>

                <Text style={[styles.text_footer, {
                    color: colors.text,
                    marginTop: 35
                }]}>
                    Your Password
                </Text>
                <View style={styles.action}>
                    <Feather
                        name="lock"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Password"
                        placeholderTextColor={colors.text}
                        secureTextEntry={info.secureTextEntry ? true : false}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(pw) => handlePasswordChange(pw)}
                    />
                    <TouchableOpacity
                        onPress={updateSecureText}
                    >
                        {info.secureTextEntry ?
                        <Feather
                            name="eye-off"
                            color="grey"
                            size={20}
                        />
                        :
                        <Feather
                            name="eye"
                            color="grey"
                            size={20}
                        />
                        }
                    </TouchableOpacity>
                </View>

               <View style={styles.button}>
                    <TouchableOpacity
                        style={[styles.signIn, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 15,
                            backgroundColor: colors.teal_text,
                        }]}
                        onPress={async () => {changeHandle(user)}}
                    >

                    <Text style={[styles.textSign, {
                        color: colors.text
                    }]}>Save</Text>

                    </TouchableOpacity>
                </View>
        </Animatable.View>
        </View>
    );
}

export default ChangePassword;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });