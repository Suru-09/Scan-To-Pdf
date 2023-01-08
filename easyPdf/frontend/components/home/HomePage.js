import React, {useEffect, useState} from "react";

// React-native materials
import { VStack, Box} from 'react-native-flex-layout';
import {Surface, IconComponentProvider, Icon, IconButton} from "@react-native-material/core";
import { Appbar, Searchbar,  Modal, Portal, Menu,Divider, Provider} from 'react-native-paper';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import flex from "react-native-flex-layout/src/Flex";
import {ScrollView, StyleSheet, View} from "react-native";
import SettingPage from "../settingPage/SettingPage";
import {Document} from "../document/Document";

// Expo
import * as ImagePicker from "expo-image-picker/src/ImagePicker";

// redux
import store from '../../redux/store'
import {colors} from '../../constants/Colors'

// bzl
import {loadImages} from "../../bzl/home/HomeBzl";
import {img} from "react-native/Libraries/Animated/AnimatedWeb";
import {InLineDocument} from "../document/InLineDocument";

const HomePage = ({navigation}) => {
    const [images, setImages] = useState(null);
    const [state, setState] = useState(null);

    useEffect(() => {
        async function loadState() {
            const state = await store.getState();
            setState(state);
        }
        async function loadImg() {
            if(state !== null) {
                const imgs = await loadImages(state.userReducer.loginUser.id);
                console.log('wtf');
                const imgList = []
                for(const img of imgs) {
                    imgList.push(img);
                }
                console.log(imgs.document_fk);
                setImages(imgList);
            }
        }
        loadState().then(() => console.log("State has been loaded in HomePage!"));
        loadImg().then(() => console.log("Images have been loaded in HomePage!"))
    }, [state]);

    const imageArrayFromImgPicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: true,
            base64: true,
            aspect: [4, 3],
            quality: 0.5,
        });

        if(result) {
            console.log("Futute-n gura!");
            const imgs = []
            result.selected.forEach((asset) => {
                imgs.push(asset);
            })
            return imgs
        }
        return []
    }

    return(
        <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <View style={styles.root}>
                <Appbar.Header style={[styles.top]}>
                    <Appbar.Action icon="keyboard-backspace" onPress={async () =>{navigation.navigate('LoginPage')}} />
                    <Appbar.Action icon="account-circle-outline" onPress={async () =>{navigation.openDrawer()}} />
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
                    { images != null ? <Document image={images[0]}/> : null}
                </Surface>
                <Divider  color="#3F4041" width={15} style={[styles.divider]}/>

                <VStack items="center" spacing='7%'style={[styles.stack]}>
                    <ScrollView style={styles.scroll}>
                    {
                        images != null ? images.map((image) => {
                            console.log(`Eu sunt image bre!:`);
                            console.log(image.id);
                            return (
                              <Surface
                                  elevation={8}
                                  style={[styles.surfaceDoc]}
                              >
                                  <InLineDocument image={image}/>
                              </Surface>
                        )}) : null
                    }
                    </ScrollView>

                    {/*Buttons image and take to photo*/}
                    <Surface
                      elevation={8}
                      style={[styles.multiButton]}
                    >
                        <IconButton
                            onPress={async () =>{navigation.navigate('CapturePage')}}
                            icon={props => <Icon name="camera" {...props} />} />
                        <IconButton
                            onPress={async () =>{
                                    navigation.navigate('SavePage', {
                                        photosList: await imageArrayFromImgPicker()
                                    })
                                }}
                            icon={props => <Icon name="image" {...props} />} />
                    </Surface>
                </VStack>
            </View>
        </IconComponentProvider>
    )
}

const styles = StyleSheet.create({
    scroll: {
      width: "100%",
    },
    root: {
        backgroundColor: colors.darker_background
    },
    top: {
        backgroundColor: colors.darker_background,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    surfaceDoc: {
        display: "flex",
        flexWrap: "wrap",
        minHeight: 175,
        maxHeight: 180,
        flexDirection: "column",
        marginBottom: 15,
        backgroundColor: '#242424',
        borderRadius: 10,
  },
    lastDocSurface: {
        display: "flex",
        flexWrap: "wrap",
        marginBottom: '5%',
        width: '100%',
        height: '30%',
        backgroundColor: '#242424',
    },
    stack: {
        height: '50%',
        marginTop:"0%",
        marginBottom:"30%",
        marginHorizontal:"10%",
        justifyContent: "center",
        alignItems: "center",
        display:"flex",
        backgroundColor: colors.darker_background
    },
    multiButton: {
        position: "absolute",
        top: "85%",
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
        backgroundColor: '#7393B3',
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