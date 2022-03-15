
const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');
import VideoPlayer from 'react-native-video-controls';
import React, { Component, useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import data from './data';
import { VideoCustom } from './VideoCustom';
let verticalScrollOffset = 0;


const windowSize = Dimensions.get('window');

export const FlatListVideo = (props) => {
  // const { song, index } = props;
  // const [play, setPlay] = useState(false);
  // useEffect(() => {
  //   console.log('FlatListVideo',{index});
  //   // setTimeout(() => {
  //     setPlay(true)
  //   // }, 500);
  // }, [])

  const [playVideoIndex, setPlayVideoIndex] = useState(0);

  useEffect(() => {
    verticalScrollOffset = 0;
  }, []);

  const onScrollPlayList = useCallback(
    (ev: any) => {
      const currentOffset = ev.nativeEvent.contentOffset.y;
      const position = ev.nativeEvent.contentOffset;
      const index = Math.round(
        position.y / windowSize.height,
      );
      console.log('playVideoIndex', index);
      setPlayVideoIndex(index)

      let direction = 'stay';
      if (currentOffset > verticalScrollOffset) {
        direction = 'up';
      } else if (currentOffset < verticalScrollOffset) {
        direction = 'down';
      }
      verticalScrollOffset = currentOffset;

      console.log({direction});
    },[])

  const renderItem = ({item, index}) => {
    return <VideoCustom paused={playVideoIndex !== index} song={item}/>
  }

  const loadMoreVerticalItems = () => {
   
  };

  return (<View style={{backgroundColor: 'red'}}>
     <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={data}
        bounces={false}
        // scrollEnabled={false}
        maxToRenderPerBatch={2}
        onMomentumScrollEnd={onScrollPlayList}
        // bounces={false}
          scrollEventThrottle={16}
          pagingEnabled
          removeClippedSubviews={true}
          // initialNumToRender How many items to render in the initial batch
          initialNumToRender={1}
          // maxToRenderPerBatch={1}
          // initialScrollIndex set to 0 disables the "scroll to top" optimization that keeps items always rendered
          initialScrollIndex={0}
          // onEndReachedThreshold - a value of 0.5 will trigger onEndReached when the end of the content is within half the visible length of the list.
          onEndReachedThreshold={0.5}
          // onEndReached is called once when the scroll position gets with onEndReachedThreshold of the rendered content
          onEndReached={loadMoreVerticalItems}
      />
  </View>)
}