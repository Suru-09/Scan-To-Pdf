import React from "react";
import {HStack, VStack} from 'react-native-flex-layout';
import { IconComponentProvider, Icon, Button  } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TextInput, IconButton, Text } from "@react-native-material/core";
import flex from "react-native-flex-layout/src/Flex";

const LoginPage = () => {
    return(
        <VStack spacing={30} style={{ marginHorizontal:"10%",  justifyContent: "center", alignItems: "center", display:"flex", maxWidth:"80%", marginTop:"40%", marginBottom:"40%" }} >
            <Icon name="account" size={35} color="black" />
            <TextInput variant="outlined" label="username" style={{ width:"100%" }} />
            <TextInput
              label="password"
              variant="outlined"
              style={{ width:"100%" }}
              trailing={props => (
                <IconButton icon={props => <Icon name="key" {...props} />} {...props} />
              )}
            />
            <Button title="Login" uppercase={false} color="blue" />
            <HStack spacing={3} style={{ maxHeight:"10%"}}>
                <Text variant="subtitle2" style={{ marginTop:"3%" }}>Don't have an account?</Text>
                <Button variant="text" title="Sign Up" color="blue" uppercase={false} compact={true} style={{ height:"10%" }}/>

            </HStack>

        </VStack>
    );

}

export default () => (
  <IconComponentProvider IconComponent={MaterialCommunityIcons}>
    <LoginPage/>
  </IconComponentProvider>
);