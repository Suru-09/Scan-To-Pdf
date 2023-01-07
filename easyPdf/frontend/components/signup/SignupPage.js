import React , {useState} from "react";

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
import {signUserUp} from "../../bzl/signup/SignupBzl";
import {colors} from "../../constants/Colors";
import {httpsUrl} from "../../constants/HttpsUrl";

const SignupPage = ({navigation}) => {

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const[info, setInfo] = useState({
        secureTextEntry: true,
        confirmSecureTextEntry: true,
        inputChanged: false,
        validUser: true,
        validPassword: true,
    })

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

    const textInputChange = (val) => {
        if( val.trim().length >= info.userNameMinLength ) {
            setInfo({
                ...info,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setInfo({
                ...info,
                check_textInputChange: false,
                isValidUser: false
            });
        }
        setUser({
            ...user,
            username: val,
        })
    }

    const handlePasswordChange = (pass) => {
        setUser({
            ...user,
            password: pass
        })
    }

    const handleConfirmPasswordChange = (pass) => {
        setUser({
            ...user,
            confirmPassword: pass
        })
    }

    const handleEmailChange = (email) => {
        setUser({
            ...user,
            email: email
        })
    }

    const signUpHandle = async (inputUser) => {
        signUserUp(inputUser).then(response => {
            console.log(response);
            if (response)
            {
                Alert.alert("You have been succesully registered! Go to login.");
            }
        });
        console.log(httpsUrl);
    }

    return(
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content"/>
            <View style={styles.header}>
                <Text style={styles.text_header}>Register Now!</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.lighter_background
                }]}
            >
                <Text style={[styles.text_footer, {
                    color: colors.text
                    }]}
                >Username</Text>

                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Username"
                        placeholderTextColor={colors.text}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(text) => {textInputChange(text)}}
                    />
                        {info.inputChanged ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null
                        }
                </View>

                <Text style={[styles.text_footer, {
                    color: colors.text,
                    marginTop: 20,
                    }]}
                >Email</Text>

                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Email"
                        placeholderTextColor={colors.text}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(text) => {handleEmailChange(text)}}
                    />
                        {info.inputChanged ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null
                        }
                </View>

                <Text style={[styles.text_footer, {
                    color: colors.text,
                    marginTop: 35
                }]}>
                    Password
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

                <Text style={[styles.text_footer, {
                    color: colors.text,
                    marginTop: 20
                }]}>
                    Confirm password
                </Text>
                <View style={styles.action}>
                    <Feather
                        name="lock"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Confirm password"
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

                <View style={styles.button}>
                    <TouchableOpacity
                        style={[styles.signIn, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 15,
                            backgroundColor: colors.teal_text,
                        }]}
                        onPress={async () => {signUpHandle(user)}}
                    >

                    <Text style={[styles.textSign, {
                        color: colors.text
                    }]}>Sign Up</Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('LoginPage')}
                        style={[styles.signIn, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: colors.text
                        }]}>Login</Text>
                    </TouchableOpacity>
                </View>
        </Animatable.View>
        </View>
    );
}

export default SignupPage;

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