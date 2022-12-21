import React, { useState, useRef } from "react";
import { Image, PanResponder, Animated } from "react-native";

const ImageSlider = ({ photosArray }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
          // Only set pan responder if the user has moved the finger more than
          // a certain distance in the x-axis
          return Math.abs(gestureState.dx) > 5;
      },
      onPanResponderMove: (evt, gestureState) => {
            // Update the position of the image as the user moves their finger
            pan.setValue({ x: gestureState.dx, y: 0 });
      },
      onPanResponderRelease: (evt, gestureState) =>
         {
          // If the user has swiped more than 1/4 the width of the image,
          // move to the next image. Otherwise, return to the previous position
          if (Math.abs(gestureState.dx) > 150) {
              if (gestureState.dx > 0)
              {
                  currentIndex - 1 >= 0 ? setCurrentIndex(currentIndex - 1) : console.log(`Wtf -1 ${currentIndex}`);
              }
              else
              {
                  currentIndex + 1 <= photosArray.length ? setCurrentIndex(currentIndex + 1) : console.log(`Wtf + 1 ${currentIndex}`);
              }
          }
          else
          {
              Animated.spring(pan, {
                  toValue: { x: 0, y: 0 },
                  friction: 5,
                  useNativeDriver: true,
              }).start();
          }
          },
    })
  ).current;

  console.log(`From ImageSlider: ${currentIndex}`);
  const currentPhoto = photosArray[currentIndex];

  // Use the pan values to move the image left or right as the user swipes
  const panStyle = {
    transform: [{ translateX: pan.x }],
  };

  return (
    <Animated.View userNativeDriver="true" style={[panStyle]} {...panResponder.panHandlers}>
      <Image
        source={{ uri: `data:image/jpeg;base64,${currentPhoto.base64}` }}
        style={{ width: 600, height: 300 }}
      />
    </Animated.View>
  );
};

export default ImageSlider;




