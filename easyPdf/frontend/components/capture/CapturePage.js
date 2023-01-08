import React, {useEffect, useRef, useState} from "react";

// React-native materials
import {Box} from 'react-native-flex-layout';
import {IconComponentProvider} from "@react-native-material/core";
import {Button, Text, TouchableOpacity, View} from "react-native";
import { Appbar } from 'react-native-paper';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {StyleSheet} from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import {colors} from "../../constants/Colors";


// Expo camera
import { Camera, CameraType } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';


const CapturePage = ({navigation}) => {

    const[permission, requestPermission] = Camera.useCameraPermissions();
    const [preview, setPreview] = useState(false);
    const[photoArray, setPhotoArray] = useState([]);
    const[isCameraReady, setIsCameraReady] = useState(false);
    const cameraRef = useRef();

    const takePicture = async () => {
        console.log("Take picture\n");
        if (cameraRef.current && isCameraReady && preview === false)
        {
            console.log("Camera ref\n");
            const options = {quality: 0.5, base64: true, exif: true};
            setPreview(true);
            const photo = await cameraRef.current.takePictureAsync(options);
            cameraRef.current.pausePreview();
            if(photo.uri)
            {
                console.log(`Photo URI: ${photo.uri}`);
                var isBase64 = require('is-base64');
                console.log(isBase64(photo.base64));
            }
            ImageManipulator.manipulateAsync(photo.uri, [], {
                base64:true}).then(
                ({exif ,base64}) => {
                    console.log(exif);
                    photo.base64 = base64;
                }
            )
            setPhotoArray(oldArray => [...oldArray, photo]);
        }
    }

    const dropImage = () => {
        console.log("Dropping last picture taken!");
        setPhotoArray(photoArray.splice(-1));
        cameraRef.current.resumePreview();
    }

    const continueTakingPhotos = () => {
        setPreview(false);
        cameraRef.current.resumePreview();
    }

    // The idea is something like:
    /*
    *   Temporary URI ----> Save the Image to LocalStorage of the phone
    *   We must check how FileSystem.copyAsync() -- > works
    *   Also check for extra permissions ?
    *   Ideally we should make a folder for our application and subfolders for users.
    *   EasyPdf ----> user_1
    *           ----> user_2
    *           .....
    *           ----> user_n
    *   Send the real URI to the DB with the details(ID) of the current logged user(take it from Redux).
    *   POST & GET form to db in (IMGApi.js from frontend).
    *   Handle POST & GET for image in database.
    *
    *   URI for saving user:    FileSystem.documentDirectory + '${userLogged.id}/'.
    */


    useEffect(  () => {
        async function reqPerm() {
            await requestPermission();
        }
        reqPerm().then(r => console.log(r));
    }, [])

    const onCameraReady = () => {
        setIsCameraReady(true);
    }

    return(
        <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <View style={styles.root}>
                <View style={styles.top}>
                    <Appbar.Header>
                        <Appbar.Action icon="home"
                           size={26}
                           style={{
                               marginRight: "63%",
                           }}
                           onPress={async () =>{navigation.navigate('Home')}}
                        />
                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                color: colors.text,
                            }}
                            onPress={() => {
                                navigation.navigate('SavePage', {
                                    photosList: photoArray
                                })
                                //console.log(photoArray[0].uri);
                                }
                            }
                        >
                            <FontAwesome5Icon name="save" size={20} color={colors.text}> </FontAwesome5Icon>
                            <Text
                                style={{
                                    fontSize: 17, fontWeight: "bold",
                                    color: colors.text,
                                    marginLeft: 10,
                                }}
                            >
                                Save PDF
                            </Text>
                        </TouchableOpacity>
                    </Appbar.Header>
                </View>


                <Box style={styles.mid}>
                     <Camera ref={cameraRef}
                             type={CameraType.back}
                             style={{height: "100%"}}
                             onCameraReady={onCameraReady}
                     />
                </Box>

                <Appbar
                    style={[styles.bottom]}
                >

                    <Appbar.Action icon="file-image-remove" size={26} onPress={dropImage} />
                    <Appbar.Action icon="camera-iris" size={64} onPress={takePicture} />
                    <Appbar.Action icon="check" size={26}  onPress={continueTakingPhotos} />
                </Appbar>
            </View>
        </IconComponentProvider>
    )
}

const styles = StyleSheet.create({
    root: {
        display: "flex",
        flexDirection: "column",
        //justifyContent: "space-start",
    },
    bottom: {
        backgroundColor: '#3F4041',
        flexDirection: "row",
        justifyContent: "space-evenly",
        height:"12%",
        width: "100%",
    },
    mid: {
        justifyContent: "center",
        height: "76%",
        width: "100%",
    },
    top: {
        left: 0,
        width: "100%",
        backgroundColor: '#3F4041',
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
   },
});

export default CapturePage;