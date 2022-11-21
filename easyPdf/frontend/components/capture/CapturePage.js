import React, {useEffect, useRef, useState} from "react";

// React-native materials
import { HStack, Box} from 'react-native-flex-layout';
import { AppBar, IconComponentProvider, Icon, IconButton} from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";


// React-native camera
import { Camera, CameraType } from 'expo-camera';
import {Alert, Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';



const CapturePage = () => {

    const[permission, requestPermission] = Camera.useCameraPermissions();
    const[camera, setCamera] = useState();
    const[photoArray, setPhotoArray] = useState([]);
    const[isCameraReady, setIsCameraReady] = useState(false);
    const [isPreview, setIsPreview] = useState(false);
    const cameraRef = useRef();

    const takePicture = async () => {
        console.log("Take picture\n");
        if (cameraRef.current && isCameraReady)
        {
            console.log("Camera ref\n");
            const options = {quality: 1, base64: true, exif: false, allowsEditing: true};
            const photo = await cameraRef.current.takePictureAsync(options);
            console.log("Poza: ", photo);
            if(photo.uri)
            {
                console.log(photo.uri);
                console.log("WTF");
                //Alert.alert("picture source", data);
                console.log("WTF", photo.uri);
            }
            setPhotoArray(oldArray => [...oldArray, photo.uri]);
        }
    }

    const onSaveDoc = () => {
        console.log(photoArray);
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
                     <Camera ref={cameraRef}
                             type={CameraType.back}
                             style={{height: "90%"}}
                             onCameraReady={onCameraReady}
                     />
                    <Button title="Wtf" onPress={takePicture} />
                </Box>

                <AppBar
                    position="static"
                    variant="bottom"
                    color="#3F4041"
                    leading={props => (
                      <IconButton onPress ={onSaveDoc} icon={props => <Icon name="image-multiple" {...props} />} {...props} />
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