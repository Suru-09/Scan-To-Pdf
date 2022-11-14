import React , {useState} from "react";

// React-native materials
import { VStack, HStack, Box} from 'react-native-flex-layout';
import { Surface, IconComponentProvider, Icon, Button, TextInput, IconButton, Text} from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import flex from "react-native-flex-layout/src/Flex";

const HomePage = () => {
    return(
        <VStack>
            <Box w='100%' h='35%' style={{ backgroundColor: '#3F4041' }}>

            </Box>
            <Box w='100%' h='65%' style={{ backgroundColor: '#2C2E30' }}>
                <VStack items="center" spacing='10%' style={ {marginTop:"20%", marginBottom:"20%",  marginHorizontal:"10%",  justifyContent: "center", alignItems: "center", display:"flex"}}>
                    <Surface
                      elevation={8}
                      style={{ width: '100%', height: '50%', backgroundColor: '#3F4041', borderRadius: 10  }}
                    />
                    <Surface
                      elevation={8}
                      style={{ width: '100%', height: '50%', backgroundColor: '#3F4041', borderRadius: 10 }}
                    />
                </VStack>
            </Box>
        </VStack>
    )
}

export default HomePage;