import React from "react";

// React-native materials
import { VStack, Stack, Box} from 'react-native-flex-layout';
import { Surface, IconComponentProvider, Icon, Button, IconButton, Text} from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import flex from "react-native-flex-layout/src/Flex";
import {StyleSheet} from "react-native";
import { Divider } from "react-native-elements";

const Option = ({iconname, text}) =>{
    return(
        <Stack style={{flexDirection: "row"}}>
            <IconButton
            icon={props => <Icon name={iconname} size={35} color="white" />} />
            <Text variant="h4" color="white">{text}</Text>
        </Stack>
    );
}

const SettingPage = ({navigation}) => {


    return(
        <IconComponentProvider IconComponent={MaterialCommunityIcons}>

            <Box style={[styles.box]}>

                <VStack items="center" spacing='10%'style={[styles.stack]}>

                    <Surface elevation={8} style={[styles.surfaceUser]}>
                        <Stack style={{flexDirection: "row"}}>
                            <Icon name="account-circle-outline" size={45} color="white" style={{marginLeft: 10, marginRight: 20}}/>
                            <Stack style={{flexDirection: "column"}}>
                                <Text variant="h4" color="white">Username</Text>
                                <Text variant="h6" color="white">email</Text>
                            </Stack>
                        </Stack>
                    </Surface>

                    <Surface elevation={8} style={[styles.surfaceDoc]}>
                        <Option iconname="account-edit" text="Edit username"/>
                        <Divider  color="#3F4041" width={5} style={[styles.divider]}/>
                        <Option iconname="email-edit-outline" text="Edit email"/>
                        <Divider  color="#3F4041" width={5} style={[styles.divider]}/>
                        <Option iconname="pencil-lock-outline" text="Edit password"/>
                        <Divider  color="#3F4041" width={5} style={[styles.divider]}/>
                        <Option iconname="information-outline" text="About app"/>
                    </Surface>

                    <Surface elevation={8} style={[styles.surfaceDoc]}>
                        <Option iconname="help-circle-outline" text="Help"/>
                        <Divider  color="#3F4041" width={5} style={[styles.divider]}/>
                        <Option iconname="star-circle" text="Rate app"/>
                        <Divider  color="#3F4041" width={5} style={[styles.divider]}/>
                        <Button uppercase={false} color="white" variant="text" title="Sign Out" titleStyle={{fontSize: 32}}/>
                    </Surface>

                </VStack>
            </Box>
        </IconComponentProvider>

    )
}

const styles = StyleSheet.create({
    box: {
            backgroundColor: '#3F4041',
            w: '100%',
            h: '100%',

          },
    surfaceDoc: {
            width: '100%',
            height: '35%',
            backgroundColor: '#2C2E30',
            borderRadius: 0,
            alignItems: "flex-start",
          },
    surfaceUser: {
            width: '100%',
            height: '20%',
            marginTop: 20,
            backgroundColor: '#2C2E30',
            borderRadius: 0,
            alignItems: "flex-start",
            justifyContent: "center"
          },
    stack: {
            marginTop:"0%",
            marginBottom:"0%",
            marginHorizontal:"0%",
            justifyContent: "center",
            alignItems: "center",
            display:"flex"

    },
    divider: {
            width: '100%',
            orientation: "horizontal",
    },
});

export default SettingPage;