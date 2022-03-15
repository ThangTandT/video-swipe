const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");
import VideoPlayer from "react-native-video-controls";
import React, { Component, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
  TouchableOpacity,
} from "react-native";
import { usableFullScreenHeight } from "./values";
export const VideoCustom = (props) => {
  const { song, paused, index } = props;
  console.log("VideoCustom -> index", index);
  return (
    <VideoPlayer
      disableVolume={true}
      source={{ uri: song.media }}
      rate={1.0}
      volume={0.0}
      muted={false}
      paused={paused}
      resizeMode="cover"
      repeat
      style={{ width: deviceWidth, height: usableFullScreenHeight }}
      tapAnywhereToPause={true}
      disableBack={true}
      disableFullscreen={true}
      onError={(error) => console.log("index -> error", index, error)}
      // ignoreSilentSwitch={'ignore'}
    />
  );
};
