import React from "react";
import { VStack } from 'react-native-flex-layout';
import { IconComponentProvider, Icon, Button  } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TextInput, IconButton } from "@react-native-material/core";
import flex from "react-native-flex-layout/src/Flex";

const LoginPage = () => {
    return(
        <VStack spacing={30} style={{ marginHorizontal:"10%",  justifyContent: "center", alignItems: "center", display:"flex", maxWidth:"80%", marginTop:"40%", marginBottom:"40%" }} >
            <Icon name="home" size={35} color="black" />
            <TextInput variant="outlined" label="username" style={{ width:"100%" }} />
            <TextInput
              label="password"
              variant="outlined"
              style={{ width:"100%" }}
              trailing={props => (
                <IconButton icon={props => <Icon name="eye" {...props} />} {...props} />
              )}
            />
            <Button title="Login" />

        </VStack>
    );

}

export default () => (
  <IconComponentProvider IconComponent={MaterialCommunityIcons}>
    <LoginPage/>
  </IconComponentProvider>
);