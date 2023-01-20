import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text, Alert} from 'react-native';
import {Button} from '@react-native-material/core';
import {Ionicons} from "@expo/vector-icons";

import {colors} from '../../constants/Colors';
import * as ImageManipulator from "expo-image-manipulator";
import {Appbar} from "react-native-paper";

export const ImageViewer = (props, route) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [images, setImages] = useState(props.images);
    const [rotation, setRotation] = useState(90);

    useEffect(() => {
        console.log("Image viewer has been rendered!");
    }, [images, rotation]);

    const handleNextPress = () => {
        if (currentIndex + 1 < images.length) {
            setCurrentIndex(currentIndex + 1);
        }
        setRotation(90);
    }

    const handlePrevPress = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
        setRotation(90);
    }

    const updateCurrentImage = (imageB64) => {
        if(currentIndex < images.length && currentIndex >= 0){
            images[currentIndex].base64 = imageB64;
        }
    }

    const rotateCurrentImage90Degrees = async () => {
        console.log("Rotating image");
        console.log(`Current index: ${currentIndex}`);
        console.log(`Image length: ${images.length}`);
        if (currentIndex >= 0 && currentIndex < images.length) {
            console.log("Rotating image INSIDE");
            await ImageManipulator.manipulateAsync(images[currentIndex].uri,
                [{rotate: rotation}],
                {base64: true}
            ).then(
                ({base64}) => {
                    updateCurrentImage(base64);
                    setRotation(rotation + 90);
                }
            )
        }
    }

    const dropDocument = async () => {
        await props.navToCapture();
    }

    const dropCurrentImage = async () => {
        if (images.length === 1)
        {
           await dropDocument();
        }
        else
        {
            images.splice(currentIndex, 1);
            setRotation(0);
            setRotation(90);
        }
    }


    return (
        <View style={styles.root}>
            {
                images && images.length > 0 ?
                    <Image
                        style={{
                            aspectRatio: 2 / 3, width: "90%",
                            height: undefined, alignSelf: "center", marginTop: 10
                        }}
                        source={{uri: 'data:image/jpeg;base64,' + images[currentIndex].base64}}
                    />
                    :
                    null
            }
            <View style={styles.buttonsView}>
                <TouchableOpacity
                    style={styles.prevTouch}
                    onPress={handlePrevPress}
                >
                    <Ionicons name={"md-chevron-back-circle-sharp"} size={40} color={colors.text}/>
                    {/*<Text  style={styles.prevText} color={colors.teal_text}>*/}
                    {/*    Prev*/}
                    {/*</Text>*/}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.nextTouch}
                    onPress={handleNextPress}
                >
                    {/*<Text  style={styles.nextText}  color={colors.teal_text}>*/}
                    {/*    Next*/}
                    {/*</Text>*/}
                    <Ionicons name={"md-chevron-forward-circle-sharp"} size={40} color={colors.text}/>
                </TouchableOpacity>

            </View>
            <Appbar
                style={[styles.bottom]}
            >
                <Appbar.Action icon="crop-rotate" size={30}
                    onPress={async () => await rotateCurrentImage90Degrees()}
                />
                <Appbar.Action icon="eraser"  size={30}
                    onPress={async () => await dropCurrentImage()}
                />
                <Appbar.Action icon="delete-outline" size={30}
                    onPress={async () => await dropDocument()}
                />
            </Appbar>
        </View>
    );
}

const styles = StyleSheet.create({
    prevText: {
        fontSize: 18,
        fontWeight: "bold"
    },
    nextText: {
        fontSize: 18,
        fontWeight: "bold"
    },
    root: {
        height: "100%",
        flexDirection: 'column',
        justifyContent: "space-between"
    },
    prevTouch: {
        display: "flex",
        flexDirection: "row",
        marginLeft: "5%",
        justifyContent: "center",
        width: "30%",
        backgroundColor: 'transparent',
        alignItems: "center"
    },
    nextTouch: {
        display: "flex",
        flexDirection: "row",
        marginRight: "5%",
        justifyContent: "center",
        width: "30%",
        backgroundColor: 'transparent',
        alignItems: "center"
    },
    buttonsView: {
        marginTop: "5%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: "5%",
        backgroundColor: 'transparent'
    },
    bottom: {
        backgroundColor: '#3F4041',
        alignSelf: "flex-end",
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
        height: "12%"
    }
})