import React from 'react';
import {httpsUrl} from "../../constants/HttpsUrl";


export const DocAPI = {
    createDocument: createDoc,
    deleteDocument: deleteDoc,
}

async function createDoc(userID, docInformation)
{
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

async function deleteDoc(docID)
{
    return fetch(`${httpsUrl}/db/documents/doc`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: docID
        })
    });
}