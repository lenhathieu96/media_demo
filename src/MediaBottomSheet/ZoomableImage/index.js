import {View, Text, Dimensions, Animated} from 'react-native';
import React, {useState, createRef} from 'react';
import {
  PanGestureHandler,
  PinchGestureHandler,
  State,
} from 'react-native-gesture-handler';

import styles from './styles';

const {width, height} = Dimensions.get('window');

const ITEM_WIDTH = width;

export default function ZoombaleImage({source}) {
  const panRef = createRef();
  const pichRef = createRef();

  const [panEnabled, setPanEnabled] = useState(false);
  const [scale] = useState(new Animated.Value(1));
  const [translateX] = useState(new Animated.Value(0));
  const [translateY] = useState(new Animated.Value(0));

  const onPinchEvent = Animated.event(
    [
      {
        nativeEvent: {scale},
      },
    ],
    {useNativeDriver: true},
  );

  const onPanEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
          translationX: translateX,
        },
      },
    ],
    {useNativeDriver: true},
  );

  const handlePinchStateChange = ({nativeEvent}) => {
    // enabled pan only after pinch-zoom
    if (nativeEvent.state === State.ACTIVE) {
      setPanEnabled(true);
    }

    // when scale < 1, reset scale back to original (1)
    const nScale = nativeEvent.scale;
    if (nativeEvent.state === State.END) {
      if (nScale < 1) {
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();

        setPanEnabled(false);
      }
    }
  };

  return (
    <View style={{width: ITEM_WIDTH, height}}>
      <PanGestureHandler
        enabled={panEnabled}
        onGestureEvent={onPanEvent}
        simultaneousHandlers={[pichRef]}>
        <Animated.View>
          <PinchGestureHandler
            onGestureEvent={onPinchEvent}
            simultaneousHandlers={[panRef]}
            onHandlerStateChange={handlePinchStateChange}>
            <Animated.Image
              source={source}
              style={[
                styles.image,
                {
                  transform: [{scale}, {translateX}, {translateY}],
                },
              ]}
              resizeMode="contain"
            />
          </PinchGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}
