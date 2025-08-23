/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';
// import Styles from '../../Assets/Styles/Main.js';

import SwipeableRating from 'react-native-swipeable-rating';

class ReviewItem extends React.Component {
  state = {};
  render() {
    return (
      // <TouchableHighlight>
      <View style={[Styles.reviewContainer, this.props.style]}>
        <View style={Styles.reviewHeader}>
          <View>
            <Text style={Styles.reviewSubject}>{this.props.data.title}</Text>
          </View>
          <View>
            <Text style={Styles.date}>{this.props.data.date}</Text>
          </View>
        </View>
        <View style={Styles.reviewHeader}>
          <View>
            <Text style={Styles.nickname}>{this.props.data.nickname}</Text>
          </View>
          <View>
            <SwipeableRating
              rating={parseFloat(this.props.data.rate)}
              size={18}
              gap={-1}
              allowHalves={true}
              color={'#F98F03'}
              emptyColor={'#F98F03'}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
          <Text
            numberOfLines={5}
            ellipsizeMode={'tail'}
            style={Styles.bodyText}>
            {this.props.data.body}
          </Text>
          {/* <Text>more</Text> */}
        </View>
      </View>
      // </TouchableHighlight>
    );
  }
}

const Styles = StyleSheet.create({
  reviewContainer: {
    width: 265,
    minHeight: 160,
    padding: 10,
    marginLeft: 7,
    marginRight: 3,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  reviewSubject: {
    fontWeight: '500',
  },
  date: {
    fontSize: 11,
    color: '#555',
    marginTop: 2,
    textAlign: 'right',
  },
  nickname: {
    fontSize: 13,
    color: '#222',
  },
  bodyText: {
    color: '#333',
  },
});

export default ReviewItem;
