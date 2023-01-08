import React from 'react';

// react-native materials
import {Icon, Surface} from "@react-native-material/core";
import {Alert, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors} from '../../constants/Colors'

// React hooks
import {useState} from 'react';

// Bzl
import {downloadPdf, deleteDocument} from "../../bzl/home/DocumentBzl";

export const InLineDocument = (image) => {
    console.log("IN LINE DOCUMENT PAGE:");
    //console.log(image["image"]);

    const[info, setInfo] = useState({
        sharePressed: false,
        downloadPressed: false,
        deletePressed: false
    });

    const [response, setResponse] = useState(false);

    const handleSharePressed = () => {
        setInfo({
            ...info,
            sharePressed: !info.sharePressed
        });
    };

    const handleDownloadPressed = () => {
        setInfo({
            ...info,
            downloadPressed: !info.downloadPressed
        });
    };

    const handleDeletePressed = () => {
        setInfo({
            ...info,
            deletePressed: !info.deletePressed
        });
    };

    const handleDownloadPdf = async () => {
        console.log(downloadPdf(image["image"].document_fk, "random"))
    }

    const handleDeletePdf = async() => {
        Alert.alert(
            'WARNING',
            'Are you sure you want to delete this document?',
            [
                {
                    text: 'Yes',
                    onPress: await deleteDoc
                },
                {
                    text: 'No',
                    onPress: () => setResponse(false)
                }
            ]
        )
    }

    const deleteDoc = async () => {
        const doc_fk = image["image"].document_fk;
        const resp = await deleteDocument(doc_fk);
        if(resp) {
            console.log(`Document with fk: [${doc_fk}] has been deleted!`);
        }
        else {
            console.log(`Document with fk: [${doc_fk}] WAS NOT deleted!`);
        }
    }

    return(
        <SafeAreaView style={styles.root}>
            <Surface elevation={15} style={styles.image}>
                <Image
                    style={{aspectRatio: 2 / 3, width: undefined, height: "90%", borderRadius: 3}}
                    source={{ uri: `data:image/jpeg;base64,${image["image"].image_b64}` }}
                />
            </Surface>

            <View style={styles.verticalView}>

                <Text style={{color: colors.text, fontWeight: "bold", fontSize: "17"}}>
                    {image["image"].name}
                </Text>
                <Text style={{color: colors.text, fontSize: "17"}}>
                    {image["image"].date.substring(0, 10)}
                </Text>

                <View style={styles.horizontalView}>
                    <TouchableOpacity
                        style={styles.touchableOpac}
                        onPressIn={handleSharePressed}
                        onPressOut={handleSharePressed}
                        onPress={handleDownloadPdf}
                    >
                        <Icon style={info.sharePressed ? styles.sharePressed: null}
                            name="share-variant-outline" size={30} color={info.sharePressed ? colors.teal_text : '#ffffff'} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.touchableOpac}
                        onPressIn={handleDownloadPressed}
                        onPressOut={handleDownloadPressed}
                        onPress={handleDownloadPdf}
                    >
                        <Icon name="download" size={30} color={info.downloadPressed ? colors.teal_text : '#ffffff'} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.touchableOpac}
                        onPressIn={handleDeletePressed}
                        onPressOut={handleDeletePressed}
                        onPress={handleDeletePdf}
                    >
                        <Icon name="delete" size={30} color={info.deletePressed ? 'red' : '#ffffff'} />
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    image: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        flexGrow: 2,
        backgroundColor: 'transparent',
    },
    root: {
        marginTop: "7%",
        marginLeft: "10%",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        backgroundColor: 'transparent',
        justifyContent: "space-between",
    },
    horizontalView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: "10%",
    },
    verticalView: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        marginLeft: 35,
    },
    touchableOpac: {
        display: "flex",
        flexDirection: "row",
        marginRight: 15,
    },
    touchText: {
        color: 'white',
        fontSize: 18
    },
    sharePressed: {
        color: colors.teal_text,
    },
    downloadPressed: {
        color: colors.teal_text,
    },
    deletePressed: {
        color: 'red',
    }
});