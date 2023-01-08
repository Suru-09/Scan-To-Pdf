import React, { useState } from 'react';
import { View, Image, Button } from 'react-native';

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
    <View style={{ flexDirection: 'column' }}>
      <Image
          style={{
            aspectRatio: 2 / 3, width: undefined, height: "90%"
          }}
          source={{ uri: 'data:image/jpeg;base64,' + images[currentIndex].base64 }}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button title="Previous" onPress={handlePrevPress} />
        <Button title="Next" onPress={handleNextPress} />
      </View>
    </View>
  );
}