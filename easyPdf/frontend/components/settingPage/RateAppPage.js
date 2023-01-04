import React from "react";

// React-native materials
import { VStack } from 'react-native-flex-layout';
import {IconComponentProvider, Text} from "@react-native-material/core";
import flex from "react-native-flex-layout/src/Flex";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Rating } from 'react-native-elements';


const RateAppPage = () => {
    return(
        <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <VStack spacing={10} style={{ marginHorizontal:"10%", display:"flex", maxWidth:"80%", marginTop:"25%", marginBottom:"40%" }} >
                <Text style={{textAlign: "left" , color: "white" , fontSize: 32 , fontWeight: "600"}}>
                    Rate app
                </Text>
                <Rating
                    type="custom"
                    ratingCount={5}
                    fractions={1}
                    showRating
                    ratingBackgroundColor={"#3F4041"}
                    tintColor={"#303030"}
                    imageSize={60}
                    //onFinishRating={ratingCompleted}
                    style={{ paddingVertical: 10, backgroundColor: 'transparent'}}
                  />
            </VStack>
        </IconComponentProvider>
    );
}

export default RateAppPage;
