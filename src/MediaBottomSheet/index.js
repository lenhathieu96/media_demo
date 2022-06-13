import {
  View,
  Text,
  Dimensions,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef} from 'react';
import Video from 'react-native-video';
import {Slider} from '@miblanchard/react-native-slider';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';
import ImageViewer from 'react-native-image-zoom-viewer';

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

export default function MediaBottomSheet() {
  const [isVisible, setVisible] = useState(true);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [currentVideoPosition, setCurrentVideoPosition] = useState(0);
  const [videoDuration, setVideoDuration] = useState(undefined);

  const videoRef = useRef();

  const renderMedia = ({item}) => {
    // return item.type === 'VIDEO' ? (
    return (
      <View
        style={{
          width: ITEM_WIDTH + ITEM_SPACING,
          height: 'auto',
          backgroundColor: 'black',
          flexDirection: 'row',
        }}>
        <View style={{width: ITEM_WIDTH, height}}>
          <Video
            onLoad={videoData => setVideoDuration(videoData.duration)}
            ref={videoRef}
            source={{
              uri: 'https://www.sample-videos.com/video123/mp4/480/big_buck_bunny_480p_30mb.mp4',
            }}
            style={{
              width: ITEM_WIDTH,
              height: 0.9 * height,
            }}
            resizeMode="contain"
            fullscreen
            // paused
            showOnStart
          />
          <View
            style={{
              width: ITEM_WIDTH,
              height: 0.9 * height,
              backgroundColor: 'black',
              opacity: 1,
              position: 'absolute',
              zIndex: 99999,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="home" color="white" size={40} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              justifyContent: 'space-between',
              alignItems: 'center',
              alignSelf: 'flex-end',
            }}>
            <View style={{flex: 0.2}}>
              <Text numberOfLines={1} style={{color: 'white'}}>
                00: 00
              </Text>
            </View>
            <View style={{flexGrow: 1}}>
              <Slider
                value={currentVideoPosition}
                renderThumbComponent={() => (
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 50,
                      backgroundColor: 'white',
                    }}
                  />
                )}
                minimumTrackTintColor="white"
                thumbTouchSize={{width: 30, height: 30}}
                onSlidingStart={() => setScrollEnabled(false)}
                onSlidingComplete={() => setScrollEnabled(true)}
                onValueChange={value => setCurrentVideoPosition(value)}
              />
            </View>

            <View style={{flex: 0.2, alignItems: 'flex-end'}}>
              <Text numberOfLines={1} style={{color: 'white'}}>
                00: 00
              </Text>
            </View>
          </View>
        </View>

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

  return (
    <Modal visible={true} style={styles.modal} hasBackdrop={false}>
      <View style={{width, height}}>
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
      </View>
    </Modal>
  );
}
