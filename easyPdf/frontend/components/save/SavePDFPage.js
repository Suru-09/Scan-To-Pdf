import React from "react";
import {Alert, Image, StyleSheet, TextInput, View} from 'react-native';

// React-native materials
import {Box} from 'react-native-flex-layout';
import { IconComponentProvider, Icon, Button} from "@react-native-material/core";
import { Appbar } from 'react-native-paper';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// redux
import store from "../../redux/store";
import {useDispatch} from "react-redux";
import {reloadHome} from "../../redux/actions/reloadHomeActions";

// bzl
import {ImageViewer} from "./ImageViewer";
import {createDocAndSaveImgs} from '../../bzl/capture/CapturePageBzl'
import {useEffect, useState} from "react";
import {colors} from '../../constants/Colors'


const SavePage = ({navigation, route }) => {
    const dispatch = useDispatch();

    const [documentName, setDocumentName] = useState('')
    const [photosList, setPhotosList] = useState(route.params.photosList);

    const [state, setState] = useState(null)
    useEffect(() => {
        async function loadReduxState() {
            const state = await store.getState()
            setState(state)
        }
        loadReduxState().then(() => console.log("Redux state has been retrieved!"))
    }, [state])

    const save = async () => {
        if(documentName !== '' && photosList.length > 0) {
            await createDocAndSaveImgs(state.userReducer.loginUser, photosList, documentName);
        }
        dispatch(reloadHome(true));
        setTimeout(() => {  navigation.navigate('Home') }, 200);
    }

    const navigateToCapture = async () => {
        await route.params.resetCapture();
        await Alert.alert(
            'WARNING',
            'Are you sure you want to go back to capture page? you will lose your photos!',
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
            <View style={styles.root}>
                <Appbar.Header
                style={[styles.top]}
                >
                 <Appbar.Action
                     icon="keyboard-backspace" onPress={async () =>{await navigateToCapture()}}
                 />
                <TextInput
                   color={"black"}
                   mode="flat"
                   placeholder="Scan name"
                   style={[styles.nameInput]}
                   trailing={props => <Icon name="square-edit-outline" {...props}/>}
                   onChangeText={(text) => setDocumentName(text)}
                />
                <Button
                    variant="text"
                    title='Save PDF'
                    onPress={async () => {
                        await save()
                    }}
                    color={colors.teal_text}
                    uppercase={false}
                />
             </Appbar.Header>


                <Box style={[styles.box]} >
                    <ImageViewer  images={photosList} navToCapture={navigateToCapture} ></ImageViewer>
               </Box>

            </View>
        </IconComponentProvider>
    )
}

const styles = StyleSheet.create({
    // bottom: {
    //         backgroundColor: '#3F4041',
    //         position: 'absolute',
    //         alignSelf: "flex-end",
    //         left: 0,
    //         right: 0,
    //         bottom: 0,
    //         flexDirection: "row",
    //         justifyContent: "space-evenly",
    //         height: "10%",
    //       },
    top: {
        backgroundColor: '#3F4041',
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
   },
    box: {
        marginTop: 20,
        height: "84%",
        width: "100%",
        alignSelf: "flex-end"
    },
    nameInput: {
            margin: 25,
            height: 35,
            width: 130,
            alignSelf: "center",
            textAlign: "center",
            multiline: false,
            backgroundColor: colors.teal_text,
          },
    root: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: "space-between",
    }
});

export default SavePage;