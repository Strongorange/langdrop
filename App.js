import React, { useRef, useState } from "react";
import { Animated, Dimensions, PanResponder, View } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #00a8ff;
`;

const Card = styled(Animated.createAnimatedComponent(View))`
  width: 260px;
  height: 260px;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 20px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
`;

export default function App() {
  // Values
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.Value(0)).current;
  const rotation = position.interpolate({
    inputRange: [-250, 259],
    outputRange: ["-15deg", "15deg"],
    extrapolate: "clamp", //inupt range 를 넘는 범위에서 동작하지 않게해주는 역할
  });

  // Animations
  const onPressIn = Animated.spring(scale, {
    toValue: 0.95,
    useNativeDriver: true,
  });

  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });

  const goCenter = Animated.spring(position, {
    toValue: 0,
    useNativeDriver: true,
  });

  // Pan Responders
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => onPressIn.start(),
      onPanResponderMove: (_, { dx, dy }) => {
        position.setValue(dx);
      },
      onPanResponderRelease: (_, { dx }) => {
        if (dx < -290) {
          console.log("dismiss to the left");
          Animated.spring(position, {
            toValue: -500,
            useNativeDriver: true,
          }).start();
        } else if (dx > 290) {
          console.log("dismiss to the right");
          Animated.spring(position, {
            toValue: 500,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.parallel([onPressOut, goCenter]).start();
        }
      },
    })
  ).current;

  return (
    <Container>
      <Card
        style={{
          transform: [
            { scale },
            { translateX: position },
            { rotateZ: rotation },
          ],
        }}
        {...panResponder.panHandlers}
      >
        <Ionicons name="pizza" color="#192a56" size={98} />
      </Card>
    </Container>
  );
}
