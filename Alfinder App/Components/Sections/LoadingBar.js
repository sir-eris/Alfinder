import React from 'react';
import {View, StyleSheet} from 'react-native';

const LoadingBar = ({percent}) => {
  return <View style={[styles.container, {width: `${percent * 100}%`}]} />;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 10,
    top: 0,
    left: 0,
    backgroundColor: '#6755a4',
    height: 1,
  },
});

export default LoadingBar;
