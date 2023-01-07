import React, {useState, useEffect} from "react";
import { StyleSheet, SafeAreaView} from "react-native";
import {ImageSlider} from "react-native-image-slider-banner";

const PdfSlider = ({ photosArray }) => {
    const [imageArray] = useState([]);

    useEffect(() => {
        async function loadImage() {
            for(const img of photosArray){
                const url = 'data:image/jpeg;base64,img.base64' + img.base64;
                imageArray.push(url);
            }
        }
        loadImage().then(() => console.log(`Photo Loaded`));

    }, [])

    return (
      <SafeAreaView style={styles.imgView}>
            <ImageSlider
                data={imageArray}
                autoPlay={false}
                preview={false}
                localImg
                caroselImageStyle={styles.slider}
                closeIconColor="#fff"
            />
      </SafeAreaView>
    );
};

export default PdfSlider;

const styles = StyleSheet.create({
    imgView: {
        display: "flex",
        flexWrap: "wrap",
        marginBottom: '5%',
        marginTop: '10%',
        width: '90%',
        height: '100%',
        justifyContent: "center",

    },
    slider: {
        display: "flex",
        width: '90%',
        height: '100%',
        marginBottom: '5%',
        marginTop: '10%',
    },

});


