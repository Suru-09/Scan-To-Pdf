import React from 'react';

// react-native materials
import {Icon, Surface} from "@react-native-material/core";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

export const Document = (image) => {
    console.log("DOCUMENT PAGE:");
    console.log(image["image"].image_b64);

    return(
        <View style={styles.root}>
            <Surface elevation={15} style={styles.image}>
                <Image
                    style={{aspectRatio: 2 / 3, width: '70%', height: undefined, borderRadius: 3}}
                    source={{ uri: `data:image/jpeg;base64,${image["image"].image_b64}` }}
                />
            </Surface>


            <View style={styles.verticalView}>
                <TouchableOpacity  style={styles.touchableOpac}>
                    <Icon name="share-variant-outline" size={30} color="#ffffff" />
                    <Text style={styles.touchText}> Share</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchableOpac}>
                    <Icon name="download" size={30} color="#ffffff" />
                    <Text style={styles.touchText} >Download</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchableOpac}>
                    <Icon name="delete" size={30} color="#ffffff" />
                    <Text style={styles.touchText} >Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        display: "flex",
        flexDirection: "row",
        width: '40%',
        backgroundColor: 'transparent',
    },
    root: {
        marginTop: "5%",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        backgroundColor: 'transparent',
        justifyContent: "center",
    },
    verticalView: {
        flexDirection: "column",
        marginTop: "9%",
    },
    touchableOpac: {
        marginBottom: 10,
        display: "flex",
        flexDirection: "row",
    },
    touchText: {
        color: 'white',
        fontSize: 18
    }
});