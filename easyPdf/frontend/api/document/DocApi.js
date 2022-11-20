import React from 'react';
import {httpsUrl} from "../../constants/HttpsUrl";


export const DocAPI = {
    createDocument: createDoc,
}

const createDoc = (userID, docInformation) => {
    const {name, size} = docInformation;
    return fetch(`${httpsUrl}/db/documents/`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            user_fk: userID,
            size: size
        })
    });
}