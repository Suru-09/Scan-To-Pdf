import React from 'react';

// expo-file-system
import {FileSystem} from 'expo-file-system';
import {DocAPI} from "../../api/document/DocApi";
import {ImgAPI} from "../../api/image/IMGApi";


const createDocument = async (docInfo) => {
    const response = await DocAPI.createDocument(docInfo);
    return response;
}

const saveImages = async (imageUrlArr, doc_fk) => {
    for(let i = 0 ; i < imageUrlArr.size; ++i)
    {
        await ImgAPI.saveImage(imageUrlArr[i], i + 1, i * 10, doc_fk);
    }
    return {"ok": true};
}

export const checkDirectoryAndSaveImage = async (user, imageUrlArr, doc_name) => {
    const userDirectory = `${FileSystem.documentDirectory}${user.id}/`
    const imageUri = `${userDirectory}${photo.uri}`;
    FileSystem.getInfoAsync(userDirectory).then(async (dir) => {
        if (dir.exists && dir.isDirectory) {
            await FileSystem.copyAsync(imageUri).then((result) => {
                console.log(`The given image has been copied!: ${result}`);
            });

            const doc_pk =
                await createDocument(user.id, {"name": doc_name, "size": 150});
            const resp = await saveImages(imageUrlArr, doc_pk);
            return resp.ok;
        } else if (!dir.exists && !dir.isDirectory) {

        } else {
            console.log(`This is bad!`);
        }
    });
}