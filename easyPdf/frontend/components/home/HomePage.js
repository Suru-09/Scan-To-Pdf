import React , {useState} from "react";

// React-native materials
import { VStack, HStack, Box} from 'react-native-flex-layout';
import { AppBar,Surface, IconComponentProvider, Icon, Button, TextInput, IconButton, Text} from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import flex from "react-native-flex-layout/src/Flex";
import {httpsUrl} from "../../constants/HttpsUrl";

const HomePage = ({navigation}) => {
    return(
        <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <VStack>
                <Box w='100%' h='33%' style={{ backgroundColor: '#3F4041' }}>
                    <VStack>
                        <HStack spacing={20}>
                            <IconButton
                            // onPress={}
                            icon={props => <Icon name="account-circle-outline" {...props} />}
                            color="white"
                            />
                            <IconButton icon={props => <Icon name="magnify" {...props} />}
                            style={{alignSelf: 'flex-end'}}
                            color="white"
                            />
                            <IconButton icon={props => <Icon name="dots-vertical" {...props} />}
                            color="white"
                            style={{alignSelf: 'flex-end'}}
                            />
                        </HStack>
                        <HStack>

                        </HStack>
                    </VStack>

                </Box>
                <Box w='100%' h='67%' style={{ backgroundColor: '#2C2E30' }}>
                    <VStack items="center" spacing='7%' style={ {marginTop:"20%", marginBottom:"30%",  marginHorizontal:"10%",  justifyContent: "center", alignItems: "center", display:"flex"}}>
                        <Surface
                          elevation={8}
                          style={{ width: '100%', height: '50%', backgroundColor: '#3F4041', borderRadius: 10  }}
                        />
                        <Surface
                          elevation={8}
                          style={{ width: '100%', height: '50%', backgroundColor: '#3F4041', borderRadius: 10 }}
                        />
                        <Surface
                          elevation={8}
                          style={{ width: '26%', alignSelf: 'flex-end' ,height: '10%', flexDirection: 'row', justifyContent: "center", alignItems: "center" , backgroundColor: '#84CBE8', borderRadius: 10 }}
                        >
                            <IconButton
                                onPress={async () =>{navigation.navigate('CapturePage')}}
                                icon={props => <Icon name="camera" {...props} />} />
                            <IconButton
                                onPress={async () =>{navigation.navigate('EditPage')}}
                                icon={props => <Icon name="image" {...props} />} />
                        </Surface>
                    </VStack>
                </Box>
            </VStack>
        </IconComponentProvider>
    )
}

export default HomePage;