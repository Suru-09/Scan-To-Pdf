import React from 'react';

// react-native materials
import { VStack, HStack, Box} from 'react-native-flex-layout';
import {Icon, IconButton, Surface} from "@react-native-material/core";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

export const Document = () => {
    return(
        <View style={styles.root}>
            <Surface elevation={15} style={styles.image}>
                <Image style={{aspectRatio: 2 / 3, width: '70%', height: undefined, borderRadius: 3}}
                    source={{ uri:
                            'https://upload.wikimedia.org/wikipedia/commons/c/c9/Moon.jpg'
                     }}
                />
            </Surface>


            <View style={styles.verticalView}>
                <TouchableOpacity  style={styles.touchableOpac}>
                    <Icon name="share-variant-outline" size={30} color="#ffffff" />
                    <Text style={{color: 'white', fontSize: 18}}> Share</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchableOpac}>
                    <Icon name="download" size={30} color="#ffffff" />
                    <Text style={{color: 'white', fontSize: 18}} >Download</Text>
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
    }
});