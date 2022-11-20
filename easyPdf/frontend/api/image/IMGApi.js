import React from 'react';
import {httpsUrl} from "../../constants/HttpsUrl";

export const ImgAPI = {
    saveImage: saveImg,
}

const saveImg = (imageInfo) => {
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

