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
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.Value(0)).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => onPressIn(),
      onPanResponderMove: (_, { dx, dy }) => {
        position.setValue(dx);
      },
      onPanResponderRelease: () => {
        onPressOut();
        Animated.spring(position, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  const onPressIn = () =>
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();

  const onPressOut = () =>
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();

  return (
    <Container>
      <Card
        style={{ transform: [{ scale }, { translateX: position }] }}
        {...panResponder.panHandlers}
      >
        <Ionicons name="pizza" color="#192a56" size={98} />
      </Card>
    </Container>
  );
}
