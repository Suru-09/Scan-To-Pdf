import React from 'react';

// API imports
import {ImgAPI} from "../../api/image/IMGApi";
import {DocAPI} from "../../api/document/DocApi";

// extern
//import { zip, unzip, unzipAssets, subscribe } from "react-native-zip-archive";
import {FileSystem} from 'expo-file-system';
import {Buffer} from 'buffer';


async function getDocsIds(userId) {
    const documents = await DocAPI.getFirstThreeDocsIds(userId);
    console.log("Documents:");
    const data = await documents.json();
    console.log(data);
    return await data;
}

async function getImages(docs) {
    const image_list = []
    for (const doc of docs) {
        console.log(`Doc id: ${doc.id}`)
        const image = await ImgAPI.getImageAfterDocId(doc.id);
        const json = await image.json();
        image_list.push(json);
    }
    return image_list;
}


export const loadImages = async (userId) => {
    const docs = await getDocsIds(userId);
    const response = await getImages(docs);
    console.log(`Response value: [${response[0].ok}]`)
    //console.log(response)
    return response;
}
