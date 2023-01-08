import React from "react";

// React-native materials
import {VStack, Stack, Box} from 'react-native-flex-layout';
import { Surface, IconComponentProvider, Icon, Button, IconButton, Text} from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import flex from "react-native-flex-layout/src/Flex";
import {StyleSheet} from "react-native";
import { Divider } from "react-native-elements";

// constants
import {colors} from '../../constants/Colors'
import {useEffect, useState} from "react";
import store from "../../redux/store";

const Option = ({iconname, text}) =>{
    return(
        <Stack style={{flexDirection: "row", marginLeft: 5}}>
            <Icon name={iconname} size={35} color="white" />
            <Text variant="h6" color="white">{text}</Text>
        </Stack>
    );
}

const HelpPage = () => {
    const [currentUser, setUser] = useState({username: "Empty", email: "empty@gmail.com"})
    const [state, setState] = useState(null);

    useEffect(() => {
        async function loadReduxState() {
            const state = await store.getState();
            setState(state);
        }
        async function loadUser() {
            if(state != null) {
                const user = await state.userReducer.loginUser;
                setUser(user);
            }
        }
        loadReduxState().then(r => console.log("State has been set!"));
        loadUser().then(r => console.log("User has been set!"));

    }, [state, currentUser]);

    return(
        <IconComponentProvider IconComponent={MaterialCommunityIcons}>

                <VStack items="center" spacing='10%'style={[styles.stack]}>

                    <Surface elevation={8} style={[styles.surfaceUser]}>
                        <Stack style={{flexDirection: "row"}}>
                            <Icon name="account-circle-outline" size={45} color="white" style={{marginLeft: 10, marginRight: 20}}/>
                            <Stack style={{flexDirection: "column"}}>
                                <Text variant="h4" color="white">{currentUser.username}</Text>
                                <Text variant="h6" color="white">{currentUser.email}</Text>
                            </Stack>
                        </Stack>
                    </Surface>

                    <Surface elevation={8} style={[styles.surfaceDoc]}>
                        <Text style={{textAlign: "left" , color: "white" , fontSize: 24 , fontWeight: "600", marginLeft: 10,}}>
                            Commonly asked questions
                        </Text>
                        <Divider  color="#303030" width={10} style={[styles.divider]}/>
                        <Option iconname="comment-question-outline" text="  Can't capture?"/>
                        <Divider  color="#303030" width={2} style={[styles.divider]}/>
                        <Text style={{textAlign: "left" , color: "white" , fontSize: 16 , fontWeight: "400", marginLeft: 40, marginRight: 10}}>
                            Make sure you have enabled camera usage rights for this app
                        </Text>
                        <Divider  color="#303030" width={10} style={[styles.divider]}/>
                        <Option iconname="comment-question-outline" text="  Can't upload photo?"/>
                        <Divider  color="#303030" width={2} style={[styles.divider]}/>
                        <Text style={{textAlign: "left" , color: "white" , fontSize: 16 , fontWeight: "400", marginLeft: 40, marginRight: 10}}>
                            Make sure you have enabled data access rights for this app
                        </Text>
                    </Surface>

                </VStack>

        </IconComponentProvider>

    )
}

const styles = StyleSheet.create({
    surfaceDoc: {
        width: '90%',
        height: '42%',
        backgroundColor: '#2C2E30',
        borderRadius: 3,
        alignItems: "flex-start",
    },
    surfaceUser: {
        width: '100%',
        height: '20%',
        marginTop: 150,
        backgroundColor: '#2C2E30',
        borderRadius: 0,
        alignItems: "flex-start",
        justifyContent: "center"
    },
    stack: {
        display:"flex",
        height: "100%",
        marginTop:"0%",
        marginBottom:"0%",
        marginHorizontal:"0%",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: colors.darker_background,
    },
    divider: {
            width: '100%',
            orientation: "horizontal",
    },
});

export default HelpPage;