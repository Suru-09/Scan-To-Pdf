import React, {useCallback, useEffect} from 'react';

// expo-file-system
import {DocAPI} from "../../api/document/DocApi";
import {ImgAPI} from "../../api/image/IMGApi";

const createDocument = async (userID, docInfo) => {
    const response = await DocAPI.createDocument(userID, docInfo);
    return response;
}

const saveImages = async (imageArr, doc_fk) => {
    for(let i = 0 ; i < imageArr.length; ++i)
    {
        // TO DO: complete image parameters correctly
        console.log(doc_fk);
        const response = await ImgAPI.saveImage(
            {
            // expo-camera bug
            "image": imageArr[i].base64,
            "order_no": i + 1,
            "size": i * 10,
            "document_fk": doc_fk});
        // If any of the pages is not saved correctly then we return ok == False and the index of the
        // image from the image array
        if(response.ok === false)
        {
            // TO DO: Before return delete all images created so far
            return {"ok": false, "page_number": i};
        }
    }
    return {"ok": true};
}

export const createDocAndSaveImgs = async (user, imageArr, doc_name) => {
    console.log(`I am image array: `);
    console.log(imageArr[0].uri);
    console.log(imageArr.length);
    const doc_pk = await createDocument(user.id, {"name": doc_name, "size": 150});
    const doc_json = await doc_pk.json()
    console.log(doc_json.id)
    //console.log(`Doc_pk: ${doc_pk}`); r
    //console.log(JSON.stringify(doc_pk));
    const resp = await saveImages(imageArr, doc_json.id);

    if (resp.ok === false)
    {
        // TO DO: delete document based on the doc primary key (doc_pk)
    }

    console.log(`OK: ${resp.ok}`);
    return resp.ok;
}