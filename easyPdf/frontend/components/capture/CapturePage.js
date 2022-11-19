import React , {useState} from "react";

// React-native materials
import { HStack, Box} from 'react-native-flex-layout';
import { AppBar, IconComponentProvider, Icon, IconButton} from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";


const CapturePage = () => {
    return(
        <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <Box>
                 <AppBar
                    position="static"
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

                <Box w='100%' h='85%' style={{ backgroundColor: '#2C2E30' }}>
                </Box>

                <AppBar
                    position="static"
                    variant="bottom"
                    color="#3F4041"
                    leading={props => (
                      <IconButton icon={props => <Icon name="image-multiple" {...props} />} {...props} />
                    )}
                    trailing={props => (
                        <HStack style={{alignItems: 'center'}}>
                            <IconButton
                              icon={props => <Icon name="circle" size='big' {...props} />}
                              {...props}
                            />
                            <IconButton
                              icon={props => <Icon name="magnify" {...props} />}
                              {...props}
                            />
                        </HStack>
                    )}
                />
            </Box>
        </IconComponentProvider>
    )
}

export default CapturePage;