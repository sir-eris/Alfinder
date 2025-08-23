/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {View, Text, Image, TouchableHighlight} from 'react-native';

import FastImage from 'react-native-fast-image';
import SwipeableRating from 'react-native-swipeable-rating';

// const WIDTH = Dimensions.get('screen').width;

class ProductCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      height: 0,
    };

    this.item = this.props.item;
    this.index = this.props.index ? this.props.index : '';
    this.width = this.props.width ? this.props.width : 150;
    // WIDTH / 2 - 14
    // WIDTH / 1.5
  }

  componentDidMount = async () => {
    // Image.getSize(this.item.image, (width, height) => {
    //   this.setState({width: width, height: height});
    // });
  };

  RenderItem = () => {
    return (
      <TouchableHighlight
        style={{marginLeft: this.props.index === 0 ? 7 : 0}}
        underlayColor="#fff"
        onPress={() =>
          this.props.navigation.push('Product', {
            productId: this.item.product_id,
          })
        }>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: this.width,
            marginBottom: 10,
            marginTop: 4,
            marginRight: 6,
            marginLeft: 6,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            backgroundColor: '#fff',
            shadowColor: '#555',
            shadowOffset: {width: 0, height: 1.5},
            shadowOpacity: 0.23,
            shadowRadius: 3.5,
          }}>
          <View style={{width: this.width, height: this.width + 10}}>
            <FastImage
              source={{
                uri: this.item.image,
                priority: FastImage.priority.normal,
              }}
              resizeMode={
                this.state.width < 800
                  ? FastImage.resizeMode.contain
                  : FastImage.resizeMode.cover
              }
              style={{
                // aspectRatio: 1 / 1.2,
                width: this.width,
                height: this.width + 20,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            />

            <View
              style={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                bottom: 12,
                right: 5,
              }}>
              {this.item.vegan ? (
                <View
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    marginRight: 5,
                    marginBottom: 2,
                  }}>
                  <Image
                    source={require('./../../../Assets/photos/icons/checked-green.png')}
                    style={{width: 20, height: 20}}
                  />
                </View>
              ) : null}
              {this.item.cruelty ? (
                <View
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    marginRight: 5,
                    marginBottom: 2,
                  }}>
                  <Image
                    source={require('./../../../Assets/photos/icons/checked-blue.png')}
                    style={{width: 20, height: 20}}
                  />
                </View>
              ) : null}
              {this.item.gluten ? (
                <View
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    marginRight: 5,
                    marginBottom: 2,
                  }}>
                  <Image
                    source={require('./../../../Assets/photos/icons/checked.png')}
                    style={{width: 20, height: 20}}
                  />
                </View>
              ) : null}
            </View>

            <View
              style={{
                position: 'absolute',
                bottom: 12,
                left: 12,
                height: 17,
                paddingHorizontal: 5,
                borderRadius: 20,
                backgroundColor: '#F7ECE1',
              }}>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={{
                  marginBottom: 4,
                  fontSize: 10,
                  lineHeight: 17,
                  color: '#000',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  fontStyle: 'italic',
                }}>
                {this.item.brand_name}
              </Text>
            </View>
          </View>

          <View
            style={{
              width: this.width,
              paddingHorizontal: 10,
              backgroundColor: '#fff',
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              paddingTop: 5,
            }}>
            <Text
              numberOfLines={2}
              ellipsizeMode={'tail'}
              style={{
                fontSize: 13,
                fontWeight: '400',
                marginBottom: 5,
                textTransform: 'capitalize',
                color: '#000',
              }}>
              {this.item.title}
            </Text>
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
      </TouchableHighlight>
    );
  };

  render() {
    return <this.RenderItem />;
  }
}

export default ProductCard;
