import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Easing, PanResponder, View } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import icons from "./icons";

const BLACK_COLOR = "#1e272e";
const GREY = "#485460";
const GREEN = "#2ecc71";
const RED = "#e74c3c";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

const Container = styled.View`
  flex: 1;
  background-color: ${BLACK_COLOR};
`;

const Edge = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const WordContainer = styled(Animated.createAnimatedComponent(View))`
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
  background-color: ${GREY};
  border-radius: 50px;
`;

const Word = styled.Text`
  font-size: 38px;
  color: ${(props) => props.color};
  font-weight: 500;
`;

const Center = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const IconCard = styled(Animated.createAnimatedComponent(View))`
  background-color: white;
  padding: 10px 20px;
  border-radius: 10px;
  position: absolute;
`;

const CheckCard = styled(IconCard)`
  justify-content: center;
  align-items: center;
  width: ${SCREEN_WIDTH / 4}px;
  height: ${SCREEN_WIDTH / 4}px;
  border-radius: 50%;
`;

export default function App() {
  // State
  const [index, setIndex] = useState(0);

  // Values
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const edgeOpacity = useRef(new Animated.Value(1)).current;
  const checkScale = useRef(new Animated.Value(1)).current;
  const checkOpacity = useRef(new Animated.Value(0)).current;

  const scaleOne = position.y.interpolate({
    inputRange: [-170, -10],
    outputRange: [1.8, 1],
    extrapolate: "clamp",
  });
  const scaleTwo = position.y.interpolate({
    inputRange: [10, 170],
    outputRange: [1, 1.8],
    extrapolate: "clamp",
  });

  // Animations
  const onPressIn = Animated.spring(scale, {
    toValue: 0.9,
    useNativeDriver: true,
  });

  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });
  const goHome = Animated.spring(position, {
    toValue: 0,
    useNativeDriver: true,
  });
  const onDropScale = Animated.timing(scale, {
    toValue: 0,
    useNativeDriver: true,
    easing: Easing.linear,
    duration: 100,
  });

  const visibleScale = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });

  const onDropOpacity = Animated.timing(opacity, {
    toValue: 0,
    useNativeDriver: true,
    easing: Easing.linear,
    duration: 100,
  });

  const visibleOpacity = Animated.spring(opacity, {
    toValue: 1,
    useNativeDriver: true,
  });

  const onDropPositionToHome = Animated.timing(position, {
    toValue: 0,
    useNativeDriver: true,
    duration: 100,
    easing: Easing.linear,
  });

  const showEdge = Animated.spring(edgeOpacity, {
    toValue: 1,
    useNativeDriver: true,
  });

  const showCheckOpacity = Animated.spring(checkOpacity, {
    toValue: 1,
    useNativeDriver: true,
  });

  const increaseCheckScale = Animated.spring(checkScale, {
    toValue: 3,
    useNativeDriver: true,
  });

  const closeCheckOpacity = Animated.spring(checkOpacity, {
    toValue: 0,
    useNativeDriver: true,
  });

  const decreaseCheckScale = Animated.spring(checkScale, {
    toValue: 1,
    useNativeDriver: true,
  });

  // Pan Responders
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        onPressIn.start();
      },
      onPanResponderMove: (_, { dx, dy }) => {
        position.setValue({
          x: dx,
          y: dy,
        });
      },
      onPanResponderRelease: (_, { dy }) => {
        if (dy < -200) {
          Animated.sequence([
            Animated.parallel([onDropOpacity, onDropScale]),
            onDropPositionToHome,
          ]).start(whenCorrect);
        } else if (dy > 200) {
          Animated.sequence([
            Animated.parallel([onDropOpacity, onDropScale]),
            onDropPositionToHome,
          ]).start(nextIcon);
        } else {
          Animated.parallel([onPressOut, goHome]).start();
        }
      },
    })
  ).current;

  //fuctions
  const nextIcon = () => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.spring(opacity, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
    setIndex((prev) => prev + 1);
  };

  const showQuiz = () => {
    Animated.parallel([showEdge, visibleOpacity, visibleScale]).start();
  };

  const closeCheck = () => {
    Animated.parallel([closeCheckOpacity, decreaseCheckScale]).start(showQuiz);
  };

  const showCheck = () => {
    Animated.parallel([showCheckOpacity, increaseCheckScale]).start(closeCheck);
  };

  const whenCorrect = () => {
    Animated.parallel([
      Animated.timing(edgeOpacity, {
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start(showCheck);
    setIndex((prev) => prev + 1);
  };

  return (
    <Container>
      <Edge>
        <WordContainer
          style={{ opacity: edgeOpacity, transform: [{ scale: scaleOne }] }}
        >
          <Word color={GREEN}>알아</Word>
        </WordContainer>
      </Edge>
      <Center>
        <CheckCard
          style={{
            borderRadius: 60,
            opacity: checkOpacity,
            transform: [{ scale: checkScale }],
          }}
        >
          <Ionicons name={icons[327]} color={GREEN} size={60} />
        </CheckCard>
        <IconCard
          {...panResponder.panHandlers}
          style={{
            opacity,
            transform: [...position.getTranslateTransform(), { scale }],
          }}
        >
          <Ionicons name={icons[index]} color={GREY} size={76} />
        </IconCard>
      </Center>
      <Edge>
        <WordContainer
          style={{ opacity: edgeOpacity, transform: [{ scale: scaleTwo }] }}
        >
          <Word color={RED}>몰라</Word>
        </WordContainer>
      </Edge>
    </Container>
  );
}
