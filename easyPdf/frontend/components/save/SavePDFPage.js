import React from "react";
import {Image, StyleSheet} from 'react-native';

// React-native materials
import {Box} from 'react-native-flex-layout';
import { IconComponentProvider, Icon, Button} from "@react-native-material/core";
import { Appbar, TextInput } from 'react-native-paper';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import {useSwipe} from "../hooks/Swipe";

// redux
import store from "../../redux/store";

// bzl
import {createDocAndSaveImgs} from '../../bzl/capture/CapturePageBzl'
import {useEffect, useState} from "react";



const SavePage = ({navigation, route }) => {
    const [documentName, setDocumentName] = useState('')
    const [photosList] = useState(route.params.photosList);
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

    const save = () => {
        if(documentName !== '' && photosList.length > 0) {
            createDocAndSaveImgs(state.userReducer.loginUser, photosList, documentName)
        }
    }

    return(
        <IconComponentProvider IconComponent={MaterialCommunityIcons}>

             <Appbar.Header
                style={[styles.top]}
             >
                <TextInput
                   onChangeText={(text) => {
                        setDocumentName(text)
                   }}
                   mode="flat"
                   placeholder="Scan name" style={[styles.nameInput]}
                   trailing={props => <Icon name="square-edit-outline" {...props} />}
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
                {/*<ImageSlider photosArray={photosList}/>*/}

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
            backgroundColor: '#2C2E30',
            w: '100%',
            h: '100%',

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