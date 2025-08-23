/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {
  View,
  Text,
  Alert,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-ionicons';
import FastImage from 'react-native-fast-image';

const WIDTH = Dimensions.get('screen').width;

class OrderDetailsScreen extends React.Component {
  constructor(props) {
    super(props);

    const {params} = this.props.navigation.state;
    this.products = params ? params.orderDetail : null;
  }

  // _renderOrderBrands = (brand, index) => {
  //   const products = brand.products.data;

  //   return (
  //     <View
  //       key={index}
  //       style={{justifyContent: 'center', alignItems: 'center'}}>
  //       <View
  //         style={{
  // marginBottom: 15,
  // width: WIDTH - 12,
  // borderRadius: 7,
  // backgroundColor: '#FFF',
  // shadowColor: '#aaa',
  // shadowOffset: {width: 0, height: 2},
  // shadowOpacity: 0.6,
  // shadowRadius: 4,
  //         }}>
  //         <View
  //           style={{
  //             flexDirection: 'row',
  //             justifyContent: 'space-between',
  //             alignItems: 'center',
  //             marginTop: 10,
  //             marginBottom: 15,
  //             marginHorizontal: 10,
  //           }}>
  //           <Text
  //             numberOfLines={1}
  //             ellipsizeMode={'tail'}
  //             style={{fontSize: 15, fontWeight: '600'}}>
  //             {brand.seller}
  //           </Text>
  //           <Text
  //             numberOfLines={1}
  //             ellipsizeMode={'tail'}
  //             style={{fontSize: 15, fontWeight: '600'}}>
  //             {brand.status}
  //           </Text>
  //         </View>
  //         {brand.status === 'SHIPPED' ? (
  //           <View>
  //             <Text>{brand.tracking_number}</Text>
  //             <Text>{brand.shipping_carrier}</Text>
  //           </View>
  //         ) : null}
  //         <View>
  //           {products.map((item, i) => this._renderOrderProducts(item, i))}
  //         </View>
  //       </View>
  //     </View>
  //   );
  // };

  _renderOrderProducts = (item, index) => {
    return (
      <View
        key={index}
        style={{
          justifyContent: 'center',
          marginBottom: 5,
          marginHorizontal: 7,
          paddingVertical: 10,
          paddingHorizontal: 7,
          borderColor: '#aaa',
          borderTopWidth: index === 0 ? 0 : 0.4,
          width: WIDTH - 12,
          borderRadius: 7,
          backgroundColor: '#FFF',
          shadowColor: '#aaa',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.6,
          shadowRadius: 4,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            width: WIDTH - 20,
          }}>
          <FastImage
            style={{
              width: 80,
              height: 90,
              backgroundColor: '#fff',
              borderRadius: 2,
            }}
            key={index}
            source={{
              uri: item.images,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View
            style={{
              flex: 1,
              padding: 3,
              justifyContent: 'space-between',
              marginLeft: 10,
            }}>
            <View style={{marginBottom: 10}}>
              <Text
                numberOfLines={2}
                ellipsizeMode={'tail'}
                style={{maxWidth: WIDTH - 155, fontWeight: '500'}}>
                {item.title}
              </Text>
            </View>
            <View style={{marginRight: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 2,
                }}>
                <Text style={{fontSize: 12, color: 'gray'}}>PRICE</Text>
                <Text>${item.price}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 12, color: 'gray'}}>QTY.</Text>
                <Text>{item.count}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{height: 45}} />
        <View
          style={{
            height: 40,
            justifyContent: 'center',
            borderBottomWidth: 0.4,
            borderColor: '#aaa',
            marginBottom: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 5,
              marginHorizontal: 10,
            }}>
            <TouchableOpacity
              style={{position: 'absolute', left: 0}}
              onPress={() => this.props.navigation.goBack(null)}>
              <Image
                source={require('./../../Assets/photos/icons/double-left.png')}
                style={{width: 25, height: 25}}
              />
            </TouchableOpacity>
            <Text style={{fontSize: 20}}>Order Detail</Text>
          </View>
        </View>

        <View style={{flex: 1}}>
          <FlatList
            style={{flex: 1, paddingTop: 15}}
            data={this.products}
            renderItem={({item, index}) =>
              this._renderOrderProducts(item, index)
            }
            keyExtractor={item => item.brand_id}
          />
        </View>
      </View>
    );
  }
}

export default OrderDetailsScreen;
