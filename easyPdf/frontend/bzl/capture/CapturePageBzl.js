import React from 'react';

// expo-file-system
import {FileSystem} from 'expo-file-system';
import {DocAPI} from "../../api/document/DocApi";
import {ImgAPI} from "../../api/image/IMGApi";


const createDocument = async (docInfo) => {
    const response = await DocAPI.createDocument(docInfo);
    return response;
}

const saveImages = async (imageArr, doc_fk) => {
    for(let i = 0 ; i < imageArr.size; ++i)
    {
        const response = await ImgAPI.saveImage(imageArr[i].base64, i + 1, i * 10, doc_fk);
        if(response.ok === false)
        {
            return {"ok": false};
        }
    }
    return {"ok": true};
}

export const checkDirectoryAndSaveImage = async (user, imageArr, doc_name) => {
    const userDirectory = `${FileSystem.documentDirectory}${user.id}/`;
    FileSystem.getInfoAsync(userDirectory).then(async (dir) => {
        if (dir.exists && dir.isDirectory) {
            return await createDocAndSaveImgs(user, imageArr, doc_name);
        }
        else if (!dir.exists && !dir.isDirectory) {
            await FileSystem.makeDirectoryAsync(userDirectory);
            return await createDocAndSaveImgs(user, imageArr, doc_name);
        }
        else {
            console.log(`This is bad!`);
        }
    });
}

const createDocAndSaveImgs = async(user, imageArr, doc_name) => {
    const doc_pk = await createDocument(user.id, {"name": doc_name, "size": 150});
    const resp = await saveImages(imageArr, doc_pk);
    return resp.ok;
}