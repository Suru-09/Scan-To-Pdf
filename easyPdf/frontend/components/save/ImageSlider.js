import React, {useState} from "react";

import { View, Image, StyleSheet} from "react-native";
import { useSwipe } from "../hooks/Swipe";

const ImageSlider = ( {photosArray} ) => {
    const [currentPhoto, setCurrentPhoto] = useState(photosArray[0])

    return (
        <Image
               source={{uri: `data:image/jpeg;base64,${currentPhoto.base64}`}}
               style={{width: 600, height: 300}}
        />
    )
}

export default ImageSlider;