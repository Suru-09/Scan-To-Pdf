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

// redux
import {useDispatch} from "react-redux";
import {colors} from '../../constants/Colors'

// Bzl and Api
import {loginUser} from "../../redux/actions/userActions";
import {logUserIn} from "../../bzl/login/LoginBzl";
import {httpsUrl} from "../../constants/HttpsUrl";



const LoginPage = ({navigation}) => {
    const dispatch = useDispatch()

    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const[info, setInfo] = useState({
        secureTextEntry: true,
        inputChanged: false,
        validUser: true,
        validPassword: true,
        userNameMinLength: 3,
        passwordMinLength: 3,
    })

    const updateSecureText = () => {
        setInfo({
            ...info,
            secureTextEntry: !info.secureTextEntry
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

    const handlePasswordChange = (val) => {
        if( val.trim().length >= info.passwordMinLength ) {
            setInfo({
                ...info,
                password: val,
                validPassword: true
            });
        } else {
            setInfo({
                ...info,
                password: val,
                validPassword: false
            });
        }
        setUser({
            ...user,
            password: val,
        })
    }

    const handleValidUser = (val) => {
        if( val.trim().length >= info.userNameMinLength ) {
            setInfo({
                ...info,
                validUser: true
            });
        } else {
            setInfo({
                ...info,
                validUser: false
            });
        }
    }

    const loginHandle = async (inputUser) => {
        logUserIn(inputUser).then(response => {
            console.log(response);
            if (response.ok)
            {
                dispatch(loginUser(response.loggedUser));
                navigation.navigate('Home');
            }
            else
            {
                Alert.alert(
                    "Username or password are incorrect!Try again."
                );
            }
        });
        console.log(httpsUrl);
    }

    return(
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content"/>
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome!</Text>
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
                        onChangeText={(text) => {textInputChange(text)}}
                        onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
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
                { info.validUser ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>Username must be at least {info.userNameMinLength} characters long.</Text>
                    </Animatable.View>
                }


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


                { info.validPassword ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>Password must at least {info.passwordMinLength} characters long.</Text>
                    </Animatable.View>
                }


                <TouchableOpacity>
                    <Text style={{color: colors.text, marginTop:15}}>Forgot password?</Text>
                </TouchableOpacity>

                <View style={styles.button}>
                    <TouchableOpacity
                        style={[styles.signIn, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 15,
                            backgroundColor: colors.teal_text,
                        }]}
                        onPress={async () => {loginHandle(user)}}
                    >

                    <Text style={[styles.textSign, {
                        color: colors.text
                    }]}>Sign In</Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignupPage')}
                        style={[styles.signIn, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: colors.text
                        }]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
        </Animatable.View>
        </View>
    );

}

export default LoginPage;

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
