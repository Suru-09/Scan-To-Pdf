import React from 'react';

// react-native materials
import {Icon, Surface} from "@react-native-material/core";
import {Alert, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors} from '../../constants/Colors'

// React hooks
import {useState} from 'react';

// Bzl
import {downloadPdf, deleteDocument} from "../../bzl/home/DocumentBzl";

export const Document = (props) => {
    console.log("DOCUMENT PAGE:");
    console.log(props.isBase64);

    const[info, setInfo] = useState({
        sharePressed: false,
        downloadPressed: false,
        deletePressed: false
    });

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
        console.log(downloadPdf(props.image.document_fk, "random"))
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
                    onPress: () => null
                }
            ]
        )
    }

    const deleteDoc = async () => {
        const doc_fk = props.image.document_fk;
        const resp = await deleteDocument(doc_fk);
        if(resp) {
            props.reload();
            console.log(`Document with fk: [${doc_fk}] has been deleted!`);
        }
        else {
            console.log(`Document with fk: [${doc_fk}] WAS NOT deleted!`);
        }
    }

    return(
        <View style={styles.root}>
            <Surface elevation={15} style={styles.image}>
                {props.isBase64 === true ?
                    <Image
                        style={{aspectRatio: 2 / 3, width: undefined, height: "90%", borderRadius: 3}}
                        source={{ uri: `data:image/jpeg;base64,${props.image.image_b64}` }}
                    />
                    :
                    <Image
                        style={{aspectRatio: 2 / 3, width: undefined, height: "90%", borderRadius: 3}}
                        source={ require('../../assets/empty.jpg') }
                    />
                }

            </Surface>


            <View style={styles.verticalView}>

                <Text style={{color: colors.text, fontWeight: "bold", fontSize: "20"}}>
                    {props.isBase64 === true ? props.image.name : "No document name"}
                </Text>
                <Text style={{color: colors.text, fontSize: "18", marginBottom: 20}}>
                    {props.isBase64 === true ? props.image.date.substring(0, 10) : "No document date"}
                </Text>

                <TouchableOpacity
                    disabled={!props.isBase64}
                    style={styles.touchableOpac}
                    onPressIn={handleSharePressed}
                    onPressOut={handleSharePressed}
                    onPress={handleDownloadPdf}
                >
                    <Icon style={info.sharePressed ? styles.sharePressed: null}
                        name="share-variant-outline" size={30} color={info.sharePressed ? colors.teal_text : '#ffffff'} />
                    <Text
                        style={[styles.touchText, info.sharePressed ? styles.sharePressed : null]}
                    >
                        Share
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    disabled={!props.isBase64}
                    style={styles.touchableOpac}
                    onPressIn={handleDownloadPressed}
                    onPressOut={handleDownloadPressed}
                    onPress={handleDownloadPdf}
                >
                    <Icon name="download" size={30} color={info.downloadPressed ? colors.teal_text : '#ffffff'} />
                    <Text style={[styles.touchText, info.downloadPressed ? styles.downloadPressed : null]} >Download</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={!props.isBase64}
                    style={styles.touchableOpac}
                    onPressIn={handleDeletePressed}
                    onPressOut={handleDeletePressed}
                    onPress={handleDeletePdf}
                >
                    <Icon name="delete" size={30} color={info.deletePressed ? 'red' : '#ffffff'} />
                    <Text style={[styles.touchText, info.deletePressed ? styles.deletePressed : null]} >Delete</Text>
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
        fontSize: 18,
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