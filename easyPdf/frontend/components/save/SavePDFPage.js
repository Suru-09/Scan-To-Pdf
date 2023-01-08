import React from "react";
import {Alert, Image, StyleSheet, TextInput} from 'react-native';

// React-native materials
import {Box} from 'react-native-flex-layout';
import { IconComponentProvider, Icon, Button} from "@react-native-material/core";
import { Appbar } from 'react-native-paper';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";


import  PdfSlider  from './PDFSlider'
import {useSwipe} from "../hooks/Swipe";

// redux
import store from "../../redux/store";

// bzl
import {ImageViewer} from "./ImageViewer";
import {createDocAndSaveImgs} from '../../bzl/capture/CapturePageBzl'
import {useEffect, useState} from "react";
import {colors} from '../../constants/Colors'


const SavePage = ({navigation, route }) => {
    const [documentName, setDocumentName] = useState('')
    const [photosList, setPhotosList] = useState(route.params.photosList);
    const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 15);

    const [state, setState] = useState(null)
    useEffect(() => {
        async function loadReduxState() {
            const state = await store.getState()
            setState(state)
        }
        loadReduxState().then(() => console.log("Redux state has been retrieved!"))
    }, [state])

    const onSwipeLeft = () => {
        console.log('Swipe left');
    }

    const onSwipeRight = () => {
        console.log('Swipe right');
    }

    const save = async () => {
        if(documentName !== '' && photosList.length > 0) {
            await createDocAndSaveImgs(state.userReducer.loginUser, photosList, documentName);
        }
    }

    const navigateToHome = async () => {
        await Alert.alert(
            'WARNING',
            'Are you sure you want to go back to home page? you will lose your photos!',
            [
                {
                    text: 'Yes',
                    onPress: await goToCapture
                },
                {
                    text: 'No',
                    onPress: null
                }
            ]
        )
    }

    const goToCapture = async () => {
        setPhotosList([]);
        navigation.navigate('CapturePage');
    }

    return(
        <IconComponentProvider IconComponent={MaterialCommunityIcons}>

             <Appbar.Header
                style={[styles.top]}
             >
                 <Appbar.Action
                     icon="keyboard-backspace" onPress={async () =>{await navigateToHome()}}
                 />
                <TextInput
                   color={colors.text}
                   mode="flat"
                   placeholder="Scan name"
                   style={[styles.nameInput]}
                   trailing={props => <Icon name="square-edit-outline" {...props}/>}
                   onChangeText={(text) => setDocumentName(text)}
                />
                <Button
                    variant="text"
                    title='Save PDF'
                    onPress={() => {
                        save()
                    }}
                    color="#84CBE8"
                    uppercase={false}
                    style={{variant: "titleLarge"}}
                />
             </Appbar.Header>


            <Box style={[styles.box]}  onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} >
                {/*<PdfSlider photosArray={photosList}/>*/}
                <ImageViewer images={photosList}></ImageViewer>

            </Box>

            <Appbar
                style={[styles.bottom]}
            >
                <Appbar.Action icon="crop-rotate"  />
                <Appbar.Action icon="file-image-plus-outline"  />
                <Appbar.Action icon="eraser"  />
                <Appbar.Action icon="delete-outline"  />
            </Appbar>
        </IconComponentProvider>
    )
}

const styles = StyleSheet.create({
    bottom: {
            backgroundColor: '#3F4041',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            flexDirection: "row",
            justifyContent: "space-evenly",
          },
    top: {
            backgroundColor: '#3F4041',
            flexDirection: "row",
            justifyContent: "space-between",

          },
    box: {
            // marginTop: "10%",
            // marginBottom: "10%",
            // display: "flex",
            // flexWrap: "wrap",
            // height: "80%",
            // flexDirection: "row",
            // backgroundColor: 'transparent',
            // justifyContent: "center",
            // alignItems: "center",
            // position: "absolute"

          },
    nameInput: {
            margin: 25,
            height: 35,
            width: 130,
            alignSelf: "center",
            textAlign: "center",
            multiline: false,
            backgroundColor: '#2C2E30',
          },
});

export default SavePage;