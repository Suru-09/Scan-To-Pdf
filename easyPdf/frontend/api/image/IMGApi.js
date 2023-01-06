import React from 'react';
import {httpsUrl} from "../../constants/HttpsUrl";

export const ImgAPI = {
    saveImage: saveImg,
    deleteImage: deleteImg,
    getImageB64: getImgB64,
    getHomePageImgs: getImagesHomePage,
    getImageAfterDocId: getImageAfterDocID
}

async function saveImg(imageInfo)
{
    console.log(`Time to save image`);
    const {image, order_no, size, document_fk} = imageInfo;
    return fetch(`${httpsUrl}/db/images/`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            image: image,
            order_no: order_no,
            size: size,
            document_fk: document_fk
        })
    });
}

async function deleteImg(imageID)
{
    return fetch(`${httpsUrl}/db/images/image`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: imageID
        })
    });
}

async function getImgB64(imageID)
{
    return fetch(`${httpsUrl}/db/images/image-b64`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: imageID
        })
    });
}

async function getImagesHomePage(userId)
{
    const requestOptions = {
                method: "GET",
                headers: {
                Accept: "application/json",
                'Content-Type': 'application/json'
                },
                responseType: coreJSON,
    };
    return fetch(`${httpsUrl}/db/images/images-for-homepage` + '?id=' + userId, requestOptions);
}


async function getImageAfterDocID(docID) {
    const requestOptions = {
        method: "GET",
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json'
        },
    };
    return fetch(`${httpsUrl}/db/images/image-after-id` + '?doc_id=' + docID, requestOptions);
}