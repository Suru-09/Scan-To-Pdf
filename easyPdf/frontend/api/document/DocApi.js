import React from 'react';
import {httpsUrl} from "../../constants/HttpsUrl";


export const DocAPI = {
    createDocument: createDoc,
    deleteDocument: deleteDoc,
    getFirstThreeDocsIds: getFirstThreeDocsID,
    getPdf: getPDF,
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

async function getFirstThreeDocsID(userId)
{
    const requestOptions = {
                method: "GET",
                headers: {
                Accept: "application/json",
                'Content-Type': 'application/json'
                }
    };
    return fetch(`${httpsUrl}/db/documents/first-three-docs-ids` + '?user_id=' + userId, requestOptions);
}

async function getPDF(docId, pdfName)
{
    const requestOptions = {
                method: "GET",
                headers: {
                Accept: "application/json",
                'Content-Type': 'application/json'
                }
    };
    return fetch(`${httpsUrl}/db/documents/pdf?doc_id=${docId}` + '&pdf_name=' + pdfName, requestOptions);
}