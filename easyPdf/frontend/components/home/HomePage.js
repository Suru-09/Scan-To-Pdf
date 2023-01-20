import React, {useEffect, useState} from "react";

// React-native materials
import { IconComponentProvider} from "@react-native-material/core";
import {Appbar, Divider, IconButton, Searchbar, Surface} from 'react-native-paper';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {ScrollView, View, StyleSheet} from "react-native";
import {ActivityIndicator} from "react-native";
import {Document} from "../document/Document";

// Expo
import * as ImagePicker from "expo-image-picker/src/ImagePicker";

// redux
import store from '../../redux/store'
import {colors} from '../../constants/Colors'
import {useSelector} from "react-redux";

// bzl
import {loadImages} from "../../bzl/home/HomeBzl";
import {InLineDocument} from "../document/InLineDocument";
import {VStack} from "react-native-flex-layout";
import {Icon} from "react-native-elements";
import {useIsFocused} from "@react-navigation/native";

const HomePage = ({navigation}) => {
    const [isLoading, setLoading] = useState(true);
    const [images, setImages] = useState(null);
    const [state, setState] = useState(null);
    const isFocused = useIsFocused();
    const [reload, setReload] = useState(false);

    const reloadPage = () => {
        setReload(!reload);
    }

    useEffect(() => {
        const  loadState = async () => {
            const state = await store.getState();
            setState(state);
        }

        async function loadImg() {
            if(state !== null) {
                const imgs = await loadImages(state.userReducer.loginUser.id);
                console.log('wtf');
                const imgList = []
                if (imgs) {
                    for(const img of imgs) {
                        imgList.push(img);
                    }
                    console.log(imgs.document_fk);
                    setImages(imgList);
                }
                setLoading(false);
            }
        }
        loadState().then(() => {
            loadImg().then(() => console.log("Use Effect done in HomePage!"))
        });

    }, [state, isFocused, reload]);

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

    const goToLogin = async () => {
        setImages(null);
        navigation.navigate('LoginPage');
    }

    return(
        <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <View style={styles.root}>
                <Appbar.Header style={[styles.top]}>
                    <Appbar.Action icon="keyboard-backspace" onPress={async () =>{goToLogin()}} />
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
                    { images != null && images.length > 0 ?
                        <Document image={images[0]} isBase64={true} reload={reloadPage}/>
                        :
                            isLoading === false ?
                                <Document isBase64={false} reload={reloadPage}/>
                                :
                                <ActivityIndicator
                                    size={"large"}
                                    style={{
                                        paddingLeft: "45%",
                                        top: "50%",
                                    }}
                                    color={colors.text}
                                />
                    }
                </Surface>
                <Divider  color="#3F4041" width={15} style={[styles.divider]}/>

                <VStack items="center" spacing='7%' style={[styles.stack]}>
                    <ScrollView style={styles.scroll}>
                    {
                        images != null && images.length > 1 ? images.slice(1).map((image) => {
                            return (
                              <Surface
                                  elevation={8}
                                  style={[styles.surfaceDoc]}
                              >
                                  <InLineDocument image={image} isBase64={true} reload={reloadPage}/>
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
    );
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