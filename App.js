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

  const POSITION = useRef(new Animated.ValueXY({ x: 0, y: 200 })).current;

  const rotation = POSITION.y.interpolate({
    inputRange: [-200, 200],
    outputRange: ["-360deg", "360deg"],
  });
  const borderRadius = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: [150, 0],
  });
  const bgColor = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["rgb(255,99,71)", "rgb(71,166,255)"],
  });

  const toggleUp = () => setUp((prev) => !prev);

  const moveUp = () => {
    Animated.timing(POSITION, {
      toValue: up ? 200 : -200,
      duration: 2500,
      useNativeDriver: false,
    }).start(toggleUp);
  };

  return (
    <Container>
      <Pressable onPress={moveUp}>
        <AnimatedBox
          style={{
            borderRadius,
            backgroundColor: bgColor,
            transform: [{ rotateY: rotation }, { translateY: POSITION.y }],
          }}
        />
      </Pressable>
    </Container>
  );
}
