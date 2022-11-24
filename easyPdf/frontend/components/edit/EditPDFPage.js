import React , {useState} from "react";

// React-native materials
import { HStack, Box} from 'react-native-flex-layout';
import { AppBar, IconComponentProvider, Icon, Button, TextInput, IconButton, Text} from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";


const EditPage = () => {
    return(
        <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <Box>
                 <AppBar
                    position="static"
                    title=""
                    color="#3F4041"
                    trailing={props => (
                        <Button
                            variant="text"
                            uppercase={false}
                            title="Save PDF"
                        />
                    )}
                 />

                <Box w='100%' h='85%' style={{ backgroundColor: '#2C2E30' }}>
                </Box>

                <AppBar
                    position="static"
                    title=""
                    color="#3F4041"
                    leading={props => (
                      <IconButton icon={props => <Icon name="home" size="large" {...props} />} {...props} />
                    )}
                    trailing={props => (
                        <IconButton
                          icon={props => <Icon name="magnify" {...props} />}
                          {...props}
                        />
                    )}
                />
            </Box>
        </IconComponentProvider>
    )
}

export default EditPage;