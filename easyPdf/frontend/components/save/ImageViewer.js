import React, { useState } from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Button} from '@react-native-material/core';
import {Ionicons} from "@expo/vector-icons";

import {colors} from '../../constants/Colors';

export const ImageViewer = (props) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = props.images;

    const handleNextPress = () => {
        if (currentIndex + 1 < images.length) {
            setCurrentIndex(currentIndex + 1);
        }
    }

    const handlePrevPress = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    }

    return (
        <View style={{  }}>
            {
                images && images.length > 0 ?
                    <Image
                        style={{
                        aspectRatio: 2 / 3, width: "100%", height: undefined
                        }}
                        source={{ uri: 'data:image/jpeg;base64,' + images[currentIndex].base64 }}
                    />
                    :
                    null
            }
            <View style={styles.buttonsView}>
                <TouchableOpacity
                    style={styles.prevTouch}
                    onPress={handlePrevPress}
                >
                    <Ionicons name={"arrow-back"} size={30} color={colors.text}/>
                    <Text  style={styles.prevText} color={colors.teal_text}>
                        Prev
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.nextTouch}
                     onPress={handleNextPress}
                >
                    <Text  style={styles.nextText}  color={colors.teal_text}>
                        Next
                    </Text>
                    <Ionicons name={"arrow-forward"} size={30} color={colors.text}/>
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    prevText: {
        fontSize: 18,
        fontWeight: "bold"
    },
    nextText: {
        fontSize: 18,
        fontWeight: "bold"
    },
    root: {
        flexDirection: 'column',
        justifyContent: "space-between"
    },
    prevTouch: {
        display: "flex",
        flexDirection: "row",
        marginLeft: "5%",
        justifyContent: "center",
        width: "30%",
        backgroundColor: colors.teal_text,
        alignItems: "center"
    },
    nextTouch: {
        display: "flex",
        flexDirection: "row",
        marginRight: "5%",
        justifyContent: "center",
        width: "30%",
        backgroundColor: colors.teal_text,
        alignItems: "center"
    },
    buttonsView: {
        marginTop: "5%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: "5%",
        backgroundColor: 'transparent'
    }
})