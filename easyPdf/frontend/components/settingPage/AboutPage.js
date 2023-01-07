import React , {useState} from "react";

// React-native materials
import { VStack } from 'react-native-flex-layout';
import { Text} from "@react-native-material/core";
import {colors} from "../../constants/Colors";
import flex from "react-native-flex-layout/src/Flex";
import {View} from "react-native";

const AboutPage = () => {
    return(
        <View style={{backgroundColor: colors.darker_background, height: "100%"}}>
            <VStack spacing={30}
                style={{ marginHorizontal:"10%",  justifyContent: "center", display:"flex", maxWidth:"80%",
                    marginTop:"25%", marginBottom:"40%", backgroundColor:colors.darker_background }}
            >
                <Text style={{textAlign: "left" , color: "white" , fontSize: 32 , fontWeight: "600"}}>
                    About
                </Text>
                <Text style={{textAlign: "left" , color: "white" , fontSize: 20 , fontWeight: "600"}}>
                    This app is a PDF format document creator, conferring the ability of turning physical documents in
                    digital format just by taking a few photos.
                </Text>
                <Text style={{textAlign: "left", color: "white" , fontSize: 20, fontWeight: "600"}}>
                    This app requires access from your camera and device storage.
                </Text>
                <Text style={{textAlign: "left", color: "white" , fontSize: 20, fontWeight: "600"}}>
                    This app is created for intellectual purposes and is not meant for commercial use.
                </Text>
                <Text style={{textAlign: "left", color: "white" , fontSize: 20, fontWeight: "600"}}>
                    This app does not require a special licence or permit to use, but it is covered by intellectual property rights.
                </Text>
            </VStack>
        </View>

    );
}

export default AboutPage;
