import React from 'react';

// API imports
import {DocAPI} from "../../api/document/DocApi";

// expo
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export const deleteDocument = async (docId) => {
    const deletedDoc = await DocAPI.deleteDocument(docId);
    console.log(`Delete document : ${deletedDoc.ok ? 'sucessfully' : 'failed'}`);
    return deletedDoc.ok;
}

const getPdf = async (docID, pdfName) => {
    const pdf = await DocAPI.getPdf(docID, pdfName);
    const realPdf = await pdf.blob();
    return realPdf;
}

export const downloadPdf = async(docID, pdfName) => {
    console.log(`Download pdf[BZL]:`);
    const pdfBlob = await getPdf(docID, pdfName);

    try {
        const reader = new FileReader();
        reader.readAsDataURL(pdfBlob);
        reader.onload = async () => {
            const base64Data = reader.result.split(',');
            const pdfBuffer = base64Data[1];

            const path = `${FileSystem.cacheDirectory}/${pdfName}.pdf`;
            await FileSystem.writeAsStringAsync(`${path}`, pdfBuffer, {
                encoding: FileSystem.EncodingType.Base64,
            });

            await Sharing.shareAsync(path, { mimeType: 'application/pdf' });
            console.log(`Successfully downloaded file to ${FileSystem.documentDirectory + pdfName}`);
        }

    } catch (error) {
        console.error(error);
        return false;
    }
    return true;
}