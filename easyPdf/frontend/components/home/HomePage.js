import React , {useState} from "react";

// React-native materials
import { VStack, HStack, Box} from 'react-native-flex-layout';
import { AppBar,Surface, IconComponentProvider, Icon, Button, TextInput, IconButton, Text} from "@react-native-material/core";
import { Appbar, Searchbar,  Modal, Portal, Menu,Divider, Provider} from 'react-native-paper';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import flex from "react-native-flex-layout/src/Flex";
import {httpsUrl} from "../../constants/HttpsUrl";
import {StyleSheet} from "react-native";
import SettingPage from "../settingPage/SettingPage";

const HomePage = ({navigation}) => {
    const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

    return(
        <IconComponentProvider IconComponent={MaterialCommunityIcons}>

            <Appbar.Header style={[styles.top]}>
                <Appbar.Action icon="account-circle-outline" onPress={async () =>{navigation.navigate('SettingPage')}} />
                <Searchbar
                  placeholder="Search"
                  style={[styles.searchBar]}
                />
            </Appbar.Header>
            <Surface
              elevation={8}
              style={[styles.lastDocSurface]}
            />
            <Box style={[styles.box]}>

                <VStack items="center" spacing='7%'style={[styles.stack]}>

                    <Surface
                      elevation={8}
                      style={[styles.surfaceDoc]}
                    />
                    <Surface
                      elevation={8}
                      style={[styles.surfaceDoc]}
                    />
                    <Surface
                      elevation={8}
                      style={[styles.multiButton]}
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
            <Provider>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.menuDoc}>
                      <Menu.Item title="Name of Scan" titleStyle={{fontSize: 32, color: 'white'}} />
                        <Divider  bold={true}/>
                      <Menu.Item icon="download" title="Download to device" titleStyle={{fontSize: 20, color: 'white'}} />
                        <Divider bold={true}/>
                      <Menu.Item icon="file-export-outline" title="Export PDF"  titleStyle={{fontSize: 20, color: 'white'}}/>
                      <Menu.Item icon="book-lock-outline" title="Protect PDF" titleStyle={{fontSize: 20, color: 'white'}} />
                        <Divider bold={true}/>
                      <Menu.Item icon="book-edit-outline" title="Edit PDF"  titleStyle={{fontSize: 20, color: 'white'}}/>
                    </Modal>
                </Portal>
            </Provider>
        </IconComponentProvider>

    )
}

const styles = StyleSheet.create({
    top: {
            backgroundColor: '#3F4041',
            flexDirection: "row",
            justifyContent: "space-between",

          },
    box: {
            backgroundColor: '#2C2E30',
            w: '100%',
            h: '100%',

          },
    surfaceDoc: {
            width: '100%',
            height: '35%',
            backgroundColor: '#3F4041',
            borderRadius: 10,
          },
    lastDocSurface: {
            width: '100%',
            height: '25%',
            backgroundColor: '#3F4041',
            borderRadius: 0,

    },
    stack: {
            marginTop:"0%",
            marginBottom:"30%",
            marginHorizontal:"10%",
            justifyContent: "center",
            alignItems: "center",
            display:"flex"

    },
    multiButton: {
        width: '26%',
        alignSelf: 'flex-end' ,
        height: '8%',
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center" ,
        backgroundColor: '#84CBE8',
        borderRadius: 10,
    },
    searchBar: {
            margin: 20,
            height: 35,
            width: 170,
            alignSelf: "center",
            textAlign: "center",
            multiline: false,
            backgroundColor: '#2C2E30',
            iconColor: '#FFFFFF',
          },
    menuDoc: {
        backgroundColor: '#2C2E30',
        padding: 10,
        position: 'absolute',
        flexDirection: 'column',
        alignSelf: "center",
        opacity: 75,
    },
});

export default HomePage;