import React, { useEffect, useRef, useState } from "react";
import { Animated, TouchableOpacity, Easing, Pressable } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Box = styled.View`
  background-color: tomato;
  width: 200px;
  height: 200px;
`;

const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function App() {
  const [up, setUp] = useState(false);
  const Y_POSITION = useRef(new Animated.Value(200)).current;
  const opacityValue = Y_POSITION.interpolate({
    inputRange: [-200, -100, 100, 200],
    outputRange: [1, 0.2, 0.2, 1],
  });
  const borderRadius = Y_POSITION.interpolate({
    inputRange: [-300, 300],
    outputRange: [150, 0],
  });

  const toggleUp = () => setUp((prev) => !prev);

  const moveUp = () => {
    Animated.timing(Y_POSITION, {
      toValue: up ? 200 : -200,
      duration: 2500,
      useNativeDriver: true,
    }).start(toggleUp);
  };

  return (
    <Container>
      <Pressable onPress={moveUp}>
        <AnimatedBox
          style={{
            opacity: opacityValue,
            borderRadius,
            transform: [{ translateY: Y_POSITION }],
          }}
        />
      </Pressable>
    </Container>
  );
}
