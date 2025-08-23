/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {View, Text, TouchableOpacity, Dimensions} from 'react-native';

import FastImage from 'react-native-fast-image';
import SwipeableRating from 'react-native-swipeable-rating';

const WIDTH = Dimensions.get('screen').width;

class ProductOption extends React.Component {
  constructor(props) {
    super(props);

    this.item = this.props.item;
    this.width = 160;
  }

  RenderItem = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          this.props.navigation.push('Product', {
            productId: this.item.product_id,
          })
        }>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: this.width,
            height: 235,
            marginBottom: 10,
            marginTop: 7,
            marginRight: 8,
            marginLeft: 4,
            paddingHorizontal: 12,
            borderRadius: 10,
            backgroundColor: '#fff',
            shadowColor: '#261F3C',
            shadowOffset: {width: 0, height: 0.5},
            shadowOpacity: 0.3,
            shadowRadius: 1,
          }}>
          <View style={{height: 155, justifyContent: 'center'}}>
            <FastImage
              source={{
                uri: this.item.image,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
              style={{
                width: this.width,
                height: 150,
                borderRadius: 7,
              }}
            />
          </View>
          <View
            style={{
              width: this.width,
              paddingHorizontal: 10,
              backgroundColor: '#fff',
              borderRadius: 11,
            }}>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={{
                fontSize: 12.5,
                fontWeight: '500',
                marginBottom: 5,
                textTransform: 'capitalize',
                color: '#000',
              }}>
              {this.item.title}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={{
                fontSize: 12,
                fontWeight: '400',
                marginBottom: 5,
                fontStyle: 'italic',
                color: '#000',
              }}>
              {this.item.dosage}
            </Text>
            {/* <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={{
                fontSize: 12.5,
                fontWeight: '500',
                marginBottom: 5,
                textTransform: 'capitalize',
                color: '#000',
              }}>
              {this.item.size}
            </Text> */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: 5,
              }}>
              <View>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={{
                    fontSize: 13,
                    fontWeight: '300',
                    textTransform: 'capitalize',
                    color: '#000',
                  }}>
                  ${this.item.price}
                </Text>
              </View>
              <View>
                <SwipeableRating
                  rating={parseFloat(this.item.rate)}
                  allowHalves={true}
                  color="#f98f03"
                  emptyColor="#f98f03"
                  gap={-1.5}
                  size={16}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    return <this.RenderItem />;
  }
}

export default ProductOption;
