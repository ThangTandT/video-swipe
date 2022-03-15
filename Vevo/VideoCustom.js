const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');
import VideoPlayer from 'react-native-video-controls';
import React, { Component, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
export const VideoCustom = (props) => {
  console.log('VideoCustom',{index});
  const { song, index } = props;
  const [play, setPlay] = useState(false);
  useEffect(() => {
    // setTimeout(() => {
      setPlay(true)
    // }, 500);
  }, [])
  return (<VideoPlayer
    disableVolume={true}
    source={{ uri: song.media, type: song?.type || 'mp4', }}
    rate={1.0}
    volume={0.0}
    muted={false}
    paused={play}
    resizeMode="cover"
    repeat
    style={{ width: deviceWidth, height: deviceHeight}}
    tapAnywhereToPause={true}
    disableVolume={true}
    disableBack={true}
    disableFullscreen={true}
  // ignoreSilentSwitch={'ignore'}
  />)
}