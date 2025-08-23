/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {View, Text, Image, Dimensions, TouchableHighlight} from 'react-native';

import FastImage from 'react-native-fast-image';
import SwipeableRating from 'react-native-swipeable-rating';

const WIDTH = Dimensions.get('screen').width;

class ProductCollection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      height: 0,
    };

    this.item = this.props.item;
    this.index = this.props.index ? this.props.index : '';
    this.width = this.props.width ? this.props.width : 150;

    // this.width = WIDTH - 25;
    // this.item = this.props.item;
  }

  componentDidMount = async () => {
    Image.getSize(this.item.image, (width, height) => {
      this.setState({width: width, height: height});
    });
  };

  RenderItem = () => {
    return (
      <TouchableHighlight
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
            marginBottom: 15,
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
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={{
                fontSize: 13,
                fontWeight: '500',
                marginBottom: 5,
                textTransform: 'capitalize',
                color: '#000',
              }}>
              {this.item.title}
            </Text>
            {/* {this.item.dosage !== '0' ? (
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={{
                  fontSize: 11,
                  fontWeight: '400',
                  marginBottom: 5,
                  fontStyle: 'italic',
                  color: '#000',
                }}>
                {this.item.dosage} CBD
              </Text>
            ) : null} */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: 8,
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

            <View style={{width: '100%', marginBottom: 7}}>
              <View style={{marginHorizontal: 0}}>
                <Text
                  numberOfLines={2}
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    lineHeight: 19,
                    color: '#555',
                  }}>
                  {this.item.description}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
    // return (
    //   <View
    //     style={{
    //       justifyContent: 'space-around',
    //       alignItems: 'center',
    //       marginBottom: 25,
    //       borderRadius: 10,
    //       paddingBottom: 15,
    //       width: this.width,
    //       backgroundColor: '#FFF',
    //       shadowColor: '#261F3C',
    //       shadowOffset: {width: 0, height: 0.5},
    //       shadowOpacity: 0.3,
    //       shadowRadius: 1,
    //     }}>
    //     <View style={{width: this.width}}>
    //       <View
    //         style={{
    //           width: '100%',
    //           justifyContent: 'center',
    //           alignItems: 'center',
    //           marginBottom: 10,
    //         }}>
    //         <FastImage
    //           source={{
    //             uri: this.item.image,
    //             priority: FastImage.priority.normal,
    //           }}
    //           resizeMode={
    //             this.state.width < 800
    //               ? FastImage.resizeMode.contain
    //               : FastImage.resizeMode.cover
    //           }
    //           style={{
    //             width: '100%',
    //             height: 300,
    //             borderTopLeftRadius: 10,
    //             borderTopRightRadius: 10,
    //           }}
    //         />
    //         <View
    //           style={{
    //             position: 'absolute',
    //             bottom: 15,
    //             left: 20,
    //             height: 17,
    //             paddingHorizontal: 5,
    //             borderRadius: 20,
    //             backgroundColor: '#F7ECE1',
    //           }}>
    //           <Text
    //             numberOfLines={1}
    //             ellipsizeMode={'tail'}
    //             style={{
    //               marginBottom: 4,
    //               fontSize: 11,
    //               lineHeight: 17,
    //               color: '#000',
    //               fontWeight: '500',
    //               textTransform: 'uppercase',
    //               fontStyle: 'italic',
    //             }}>
    //             {this.item.brand_name}
    //           </Text>
    //         </View>

    //         <View
    //           style={{
    //             position: 'absolute',
    //             display: 'flex',
    //             flexDirection: 'column',
    //             bottom: 15,
    //             right: 10,
    //           }}>
    //           {this.item.vegan ? (
    //             <View
    //               style={{
    //                 backgroundColor: '#fff',
    //                 borderRadius: 20,
    //                 marginRight: 5,
    //                 marginBottom: 2,
    //               }}>
    //               <Image
    //                 source={require('./../../../Assets/photos/icons/checked-green.png')}
    //                 style={{width: 28, height: 28}}
    //               />
    //             </View>
    //           ) : null}
    //           {this.item.cruelty ? (
    //             <View
    //               style={{
    //                 backgroundColor: '#fff',
    //                 borderRadius: 20,
    //                 marginRight: 5,
    //                 marginBottom: 2,
    //               }}>
    //               <Image
    //                 source={require('./../../../Assets/photos/icons/checked-blue.png')}
    //                 style={{width: 28, height: 28}}
    //               />
    //             </View>
    //           ) : null}
    //           {this.item.gluten ? (
    //             <View
    //               style={{
    //                 backgroundColor: '#fff',
    //                 borderRadius: 20,
    //                 marginRight: 5,
    //                 marginBottom: 2,
    //               }}>
    //               <Image
    //                 source={require('./../../../Assets/photos/icons/checked.png')}
    //                 style={{width: 28, height: 28}}
    //               />
    //             </View>
    //           ) : null}
    //         </View>
    //       </View>
    //       <View style={{alignItems: 'center'}}>
    //         <View
    //           style={{
    //             width: WIDTH - 30,
    //             marginBottom: 12,
    //           }}>
    //           <View
    //             style={{
    //               paddingTop: 4,
    //               marginHorizontal: 8,
    //               marginBottom: 7,
    //             }}>
    //             <Text
    //               style={{
    //                 fontSize: 16,
    //                 fontWeight: '500',
    //                 color: '#000',
    //               }}>
    //               {this.item.title}{' '}
    //               <Text
    //                 style={{fontSize: 13, color: '#333', fontStyle: 'italic'}}>
    //                 ({this.item.dosage})
    //               </Text>
    //             </Text>
    //           </View>
    //           <View style={{marginLeft: 9, marginBottom: 7}}>
    //             <Text
    //               style={{
    //                 fontSize: 13,
    //                 fontWeight: '300',
    //                 textTransform: 'uppercase',
    //                 color: '#333',
    //               }}>
    //               {this.item.type}
    //             </Text>
    //           </View>
    //           <View style={{alignItems: 'center'}}>
    //             <View
    //               style={{
    //                 width: WIDTH - 45,
    //                 flexDirection: 'row',
    //                 justifyContent: 'space-between',
    //                 alignItems: 'center',
    //               }}>
    //               <View>
    //                 <Text
    //                   style={{
    //                     left: 2,
    //                     fontSize: 15,
    //                     fontWeight: '300',
    //                     color: '#000',
    //                     textTransform: 'uppercase',
    //                   }}>
    //                   ${this.item.price}
    //                 </Text>
    //               </View>
    //               <View style={{flexDirection: 'column'}}>
    //                 <View
    //                   style={{
    //                     flexDirection: 'row',
    //                     justifyContent: 'flex-end',
    //                   }}>
    //                   <Text
    //                     style={{fontSize: 12, color: '#333', marginRight: 3}}>
    //                     {this.item.rate} / 5.0
    //                   </Text>
    //                 </View>
    //                 <View>
    //                   <SwipeableRating
    //                     rating={parseFloat(this.item.rate)}
    //                     size={19}
    //                     gap={-1}
    //                     swipeable={false}
    //                     allowHalves={true}
    //                     color={'#f98f03'}
    //                     emptyColor={'#f98f03'}
    //                   />
    //                 </View>
    //               </View>
    //             </View>
    //           </View>
    //         </View>
    //       </View>
    //     </View>

    // <View style={{width: '100%', marginBottom: 23}}>
    //   <View style={{marginHorizontal: 10}}>
    //     <Text
    //       style={{
    //         left: 2,
    //         marginBottom: 7,
    //         fontSize: 15,
    //         fontWeight: '400',
    //       }}>
    //       Description
    //     </Text>
    //     <Text
    //       numberOfLines={2}
    //       style={{
    //         fontSize: 14,
    //         fontWeight: '400',
    //         lineHeight: 19,
    //         color: '#555',
    //       }}>
    //       {this.item.description}
    //     </Text>
    //   </View>
    // </View>

    //     <View style={{justifyContent: 'center', alignItems: 'center'}}>
    //       <TouchableHighlight
    //         underlayColor="#fff"
    //         onPress={() =>
    //           this.props.navigation.navigate('Product', {
    //             productId: this.item.product_id,
    //           })
    //         }>
    //         <View
    //           style={{
    //             width: WIDTH - 120,
    //             height: 37,
    //             justifyContent: 'center',
    //             alignItems: 'center',
    //             borderRadius: 20,
    //             backgroundColor: '#261F3C',
    //           }}>
    //           <Text style={{color: '#fff', fontSize: 14, fontWeight: '500'}}>
    //             VIEW PRODUCT
    //           </Text>
    //         </View>
    //       </TouchableHighlight>
    //     </View>
    //   </View>
    // );
  };

  render() {
    return <this.RenderItem />;
  }
}

export default ProductCollection;
