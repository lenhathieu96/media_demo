import {View, Dimensions, FlatList, Animated} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  gestureHandlerRootHOC,
  PanGestureHandler,
} from 'react-native-gesture-handler';

import Modal from 'react-native-modal';

import styles from './styles';
import VideoPlayer from './VideoPlayer';
import ZoombaleImage from './ZoomableImage';

const MEDIA_URL = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1630149462161-2fe69fa964ee?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60',
    type: 'IMAGE',
  },
  {
    id: 2,
    url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
    thumbUrl: '',
    type: 'VIDEO',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1593642532009-6ba71e22f468?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60',
    thumbUrl: '',
    type: 'IMAGE',
  },
  {
    id: 4,
    url: 'https://vjs.zencdn.net/v/oceans.mp4',
    thumbUrl: '',
    type: 'VIDEO',
  },
  {
    id: 5,
    url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
    thumbUrl: '',
    type: 'VIDEO',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1630157051334-e302a5fe8947?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60',
    thumbUrl: '',
    type: 'IMAGE',
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60',
    thumbUrl: '',
    type: 'IMAGE',
  },
];
const {width, height} = Dimensions.get('window');

const ITEM_WIDTH = width;
const ITEM_SPACING = 10;
const END_POINT = 0.2 * height;

export default function MediaBottomSheet() {
  const [isVisible, setVisible] = useState(true);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    animation.addListener(animate => {
      if (animate.value >= END_POINT) {
        setVisible(false);
      }
    });
    return () => {
      animation.removeAllListeners();
    };
  }, []);

  const opacity = animation.interpolate({
    inputRange: [0, END_POINT],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const scale = animation.interpolate({
    inputRange: [0, END_POINT],
    outputRange: [1, 0.95],
    extrapolate: 'clamp',
  });

  const resetToInitial = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const renderMedia = ({item}) => {
    // return item.type === 'VIDEO' ? (
    // style={{width, height, opacity, transform: [{scale: 0.95}]}}>
    return (
      <View
        style={[
          styles.itemContainer,
          {
            width: ITEM_WIDTH + ITEM_SPACING,
          },
        ]}>
        <ZoombaleImage
          source={{
            uri: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60',
          }}
        />
        {/* Seperator */}
        <View style={{width: ITEM_SPACING}} />
      </View>
    );
    // ) : (
    //   <Image
    //     source={{uri: item.url}}
    //     style={{width, height}}
    //     resizeMode="contain"
    //   />
    // );
  };

  const ModalContent = gestureHandlerRootHOC(() => (
    <PanGestureHandler
      enabled={false}
      onGestureEvent={Animated.event(
        [{nativeEvent: {translationY: animation}}],
        {
          useNativeDriver: true,
        },
      )}
      onEnded={resetToInitial}>
      <Animated.View
        style={{
          opacity,
          transform: [{scale}],
        }}>
        <FlatList
          scrollEnabled={scrollEnabled}
          style={{width: ITEM_WIDTH + ITEM_SPACING}}
          data={MEDIA_URL}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderMedia}
          horizontal
          pagingEnabled
          bounces={false}
          showsHorizontalScrollIndicator={false}
        />
      </Animated.View>
    </PanGestureHandler>
  ));

  return (
    <Modal visible={isVisible} style={styles.modal} hasBackdrop={false}>
      <ModalContent />
    </Modal>
  );
}
