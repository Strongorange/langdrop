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

## 4.5

    .start() 콜백함수로 toggleUp 을 이용해 up state를 바꾸면 State 를 바꾸어 재렌더링이 일어나 Y 값이 0으로 초기화 됨
    !!!!!!!!!재렌더링이 일어나도 value 를 유지하기위해 useRef 사용 const Y = useRef(new Animated.Value(0)).current; 를 사용하면 재렌더링 시에도 Y 값 유지

## 4.6

    interpolation => [-300, 0, 300] 의 인풋을 가지고 [1, 0, 1] 의 아웃풋을 내는 개념
    이를 이용해 opacity, borderradius 가 위치에 따라 바뀌는 애니메이션을 추가!

## 4.7

    interpolation input 은 숫자,ouput 은 string 등 다양하게 됨!
    nativeDriver 가 못 하는 animation 도 존재 이럴때는 JS 를 선택해야 함
    Animated.ValueXY 를 사용해 X, Y 축 양쪽을 이제 바꿀 수 있음

## 4.8

    toValue 에 {x: xx , y: xx} 식으로 따로 값 지정 가능
    POSITION.getTranslateTransform() 을 사용해 쉽게 transfrom 값 얻기 가능 "..." 을 사용해 배열의 값만 뽑아옴
