import React from 'react';
import {httpsUrl} from "../../constants/HttpsUrl";

export const ImgAPI = {
    saveImage: saveImg,
}

const saveImg = (imageInfo) => {
    const {url, order_no, size, document_fk} = imageInfo;
    return fetch(`${httpsUrl}/db/images/`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            url: url,
            order_no: order_no,
            size: size,
            document_fk: document_fk
        })
    });
}

