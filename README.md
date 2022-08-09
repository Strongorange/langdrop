## 4.2 애니메이션을 직접 구현하는건 구림

    코드가 너무 길어짐

## 4.3

    Animated value 는 절대 State 에 들어가지 않고 Animated.value() 에 들어감
    Y = 20 처럼 절대 직접 수정하지 않음
    Animated.View 같이 전용 컴포넌트 사용
    crateAnimatedComponent() 사용시 모든 것을 Animated Components 로 만들 수 있음
    /
    const AnimatedBox = Animated.createAnimatedComponent(Box); => styled components 에서 Animatable Components 만들기

## 4.4

    Animated.spring, spring 등을 이용해 애니메이션 가능
    useNativeDriver:true 사용시 네이티브에서 애니메이션을 처리해 성능의 이점을 가짐
    toValue 는 움직일 값
