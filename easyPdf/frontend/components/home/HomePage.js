import React , {useState} from "react";

// React-native materials
import { VStack, Box} from 'react-native-flex-layout';
import {Surface, IconComponentProvider, Icon, IconButton} from "@react-native-material/core";
import { Appbar, Searchbar,  Modal, Portal, Menu,Divider, Provider} from 'react-native-paper';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import flex from "react-native-flex-layout/src/Flex";
import {StyleSheet} from "react-native";
import SettingPage from "../settingPage/SettingPage";
import {Document} from "../document/Document";

const HomePage = ({navigation}) => {
    const [visible, setVisible] = useState(false);

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

            {/*Last created document*/}
            <Surface
              elevation={8}
              style={[styles.lastDocSurface]}
            >
                <Document/>
            </Surface>

            <Divider  color="#3F4041" width={15} style={[styles.divider]}/>

            <VStack items="center" spacing='7%'style={[styles.stack]}>
                <Surface
                  elevation={8}
                  style={[styles.surfaceDoc]}
                >
                    <Document/>
                </Surface>

                <Surface
                  elevation={8}
                  style={[styles.surfaceDoc]}
                >
                    <Document/>
                </Surface>

                {/*Buttons image and take to photo*/}
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

        </IconComponentProvider>
    )
}

const styles = StyleSheet.create({
    top: {
        backgroundColor: '#3F4041',
        flexDirection: "row",
        justifyContent: "space-between",
    },
    surfaceDoc: {
            width: '100%',
            height: '40%',
            backgroundColor: '#3F4041',
            borderRadius: 10,
          },
    lastDocSurface: {
        display: "flex",
        flexWrap: "wrap",
        marginBottom: '5%',
        width: '100%',
        height: '30%',
        backgroundColor: '#3F4041',

    },
    stack: {
        height: '50%',
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
            width: '55%',
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
    divider: {
        width: '100%',
        orientation: "horizontal",
    }
});

export default HomePage;