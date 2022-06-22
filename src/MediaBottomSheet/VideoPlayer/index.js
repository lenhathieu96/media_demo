import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import React, {useState, useRef} from 'react';
import Video from 'react-native-video';
import {Slider} from '@miblanchard/react-native-slider';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

const {width, height} = Dimensions.get('window');

const ITEM_WIDTH = width;
const ITEM_SPACING = 10;

export default function VideoPlayer({onSeek}) {
  const [currentVideoPosition, setCurrentVideoPosition] = useState(0);
  const [videoDuration, setVideoDuration] = useState(undefined);
  const [isPaused, setPaused] = useState(true);
  const [controlEnabled, setControlEnabled] = useState(true);

  const videoRef = useRef();

  const onPressPlayBtn = () => {
    //replay video in case reach end
    if (Math.round(videoDuration) === Math.round(currentVideoPosition)) {
      videoRef.current.seek(0);
    }
    setPaused(!isPaused);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => setControlEnabled(!controlEnabled)}>
      <View style={{width: ITEM_WIDTH, height}}>
        <Video
          onLoad={videoData => {
            setVideoDuration(videoData.duration);
            //set first frame as a thumbnail on android
            if (Platform.OS === 'android') {
              videoRef.current.seek(0);
            }
          }}
          ref={videoRef}
          source={{
            uri: 'https://s3.ap-southeast-1.amazonaws.com/vng-ep-app/689fe03d-44d8-4c3b-ae8c-ce6de43d657e.mp4',
          }}
          style={{
            width: ITEM_WIDTH,
            height: 0.9 * height,
          }}
          resizeMode="contain"
          fullscreen
          paused={isPaused}
          showOnStart
          onProgress={videoData => {
            setCurrentVideoPosition(videoData.currentTime);
            // if (controlEnabled) {
            //   setTimeout(() => setControlEnabled(false), 3000);
            // }
          }}
          onEnd={() => {
            setControlEnabled(true);
            setPaused(true);
          }}
        />
        {controlEnabled && (
          <View
            style={[
              styles.controlContainer,
              {
                width: ITEM_WIDTH,
              },
            ]}>
            <View style={styles.placeHolderContainer}>
              <Icon.Button
                onPress={onPressPlayBtn}
                backgroundColor="transparent"
                name={isPaused ? 'play-circle-outline' : 'pause-circle-outline'}
                color="white"
                size={40}
              />
            </View>

            {/* Seek Bar */}

            {videoDuration && (
              <View style={styles.seekbarContainer}>
                <View style={styles.videoPositionContainer}>
                  <Text numberOfLines={1} style={styles.timerTxt}>
                    {new Date(Math.round(currentVideoPosition) * 1000)
                      .toISOString()
                      .substring(14, 19)}
                  </Text>
                </View>
                <View style={styles.seekbar}>
                  <Slider
                    value={currentVideoPosition}
                    renderThumbComponent={() => <View style={styles.thumb} />}
                    minimumTrackTintColor="white"
                    maximumValue={Math.round(videoDuration)}
                    thumbTouchSize={{width: 30, height: 30}}
                    onSlidingStart={() => onSeek(false)}
                    onSlidingComplete={value => {
                      setCurrentVideoPosition(value[0]);
                      setPaused(false);
                      setControlEnabled(false);
                      videoRef.current.seek(value[0]);
                      onSeek(true);
                    }}
                  />
                </View>
                <View style={styles.videoDurationContainer}>
                  <Text numberOfLines={1} style={styles.timerTxt}>
                    {new Date(Math.round(videoDuration) * 1000)
                      .toISOString()
                      .substring(14, 19)}
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
