import React, {useEffect, useRef, useState} from "react";

// React-native materials
import {Box} from 'react-native-flex-layout';
import {IconComponentProvider, Button} from "@react-native-material/core";
import { Appbar } from 'react-native-paper';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";


// React-native camera
import { Camera, CameraType } from 'expo-camera';


// Bzl
import {createDocAndSaveImgs} from '../../bzl/capture/CapturePageBzl.js'
import {StyleSheet} from "react-native";


const CapturePage = ({navigation}) => {

    const[permission, requestPermission] = Camera.useCameraPermissions();
    const[photoArray, setPhotoArray] = useState([]);
    const[isCameraReady, setIsCameraReady] = useState(false);
    const cameraRef = useRef();

    const takePicture = async () => {
        console.log("Take picture\n");
        if (cameraRef.current && isCameraReady)
        {
            console.log("Camera ref\n");
            const options = {quality: 1, base64: true};
            const photo = await cameraRef.current.takePictureAsync(options);
            if(photo.uri)
            {
                console.log(`Photo URI: ${photo.uri}`);
                var isBase64 = require('is-base64');
                console.log(isBase64(photo.base64));
            }
            setPhotoArray(oldArray => [...oldArray, photo]);
        }
    }

    const onSaveDoc = () => {
        createDocAndSaveImgs({"id": 1}, photoArray, "my_doc").then();
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

            <Appbar.Header
                style={[styles.top]}
            >

                <Appbar.Action icon="home"  onPress={async () =>{navigation.navigate('Home')}}/>
                <Button
                    variant="text"
                    title='Save PDF'
                    style={{variant: "titleLarge"}}
                    color="#84CBE8"
                    uppercase={false}
                    onPress={() => {
                        navigation.navigate('SavePage', {
                            photosList: photoArray
                        })
                        console.log(photoArray[0].uri);
                        }
                    }
                />
            </Appbar.Header>

            <Box w='100%' h='100%' style={{ backgroundColor: '#2C2E30' }}>
                 <Camera ref={cameraRef}
                         type={CameraType.back}
                         style={{height: "90%"}}
                         onCameraReady={onCameraReady}
                 />
            </Box>

            <Appbar
                style={[styles.bottom]}
            >

                <Appbar.Action icon="image-multiple"  />
                <Appbar.Action icon="camera-iris" onPress={takePicture} />
                <Appbar.Action icon="magnify"  />
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
});

export default CapturePage;