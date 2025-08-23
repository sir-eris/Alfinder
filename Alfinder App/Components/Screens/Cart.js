/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {
  View,
  Text,
  Alert,
  Modal,
  Image,
  Button,
  // FlatList,
  Animated,
  TextInput,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {CONFIG} from './../App/Config';

import Icon from 'react-native-ionicons';
import FastImage from 'react-native-fast-image';
import Carousel from 'react-native-snap-carousel';

const WIDTH = CONFIG.width;
const HEIGHT = CONFIG.height;
const COLORS = CONFIG.cardColors;

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: true,

      modalOpacity: new Animated.Value(0),
      modalDisplay: 'none',
      emptyCartModal: false,

      loadingCoupon: false,
      cartIsEmpty: true,
      loading: true,
      checkOutModal: false,

      cartPrice: 0,
      cartCount: 0,
      // cartbrands: [],
      cartProducts: [],
      cartCouponPrice: '',
      couponCode: '',

      loadingAddresses: true,
      noAddresses: true,
      addresses: [],

      loadingPaymentMethods: true,
      noPaymentMethods: true,
      paymentMethods: [],

      loadingPayment: false,

      toasterDisplay: 'none',
      toasterOpacity: new Animated.Value(0),
      toasterText: '',
    };
  }

  componentDidMount = async () => {
    await this._getAppKey();
    await this._getcartAsync();
  };

  _getAppKey = async () => {
    try {
      const val = await AsyncStorage.getItem('AlfinderUserToken');
      const value = await JSON.parse(val);
      if (value === null || value === '') {
        this.props.navigation.navigate('Welcome');
      } else {
        if (value.token === null || value.token === '') {
          this.props.navigation.navigate('Welcome');
        } else {
          this.authToken = value.token;
        }
      }
    } catch (e) {
      throw e;
    }
  };

  _onRefresh() {
    this.setState({refreshing: true});
    setTimeout(() => this._getcartAsync(), 800);
  }

  _GetSetUserProfile = async () => {
    try {
      let response = await fetch(
        'https://alfinder.com/alfinder/public/api/user/profile',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: this.authToken,
          },
        },
      );
      if (response.status === 200) {
        const responseJson = await response.json();
        this.setState({
          paymentMethods: responseJson.data.paymentProfiles,
          loadingPaymentMethods: false,
          noPaymentMethods: !responseJson.data.hasOwnProperty(
            'paymentProfiles',
          ),
          addresses: responseJson.data.shipToList,
          loadingAddresses: false,
          noAddresses: !responseJson.data.hasOwnProperty('shipToList'),
        });
      } else if (response.status === 401) {
        try {
          await AsyncStorage.removeItem('AlfinderUserToken');
          this.props.navigation.navigate('Welcome');
        } catch (e) {
          throw e;
        }
      } else {
        Alert.alert('Please Try Again');
      }
    } catch (error) {
      throw error;
    }
  };

  _getcartAsync = async () => {
    try {
      let response = await fetch(
        'https://alfinder.com/alfinder/public/api/user/cart/get',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: this.authToken,
          },
        },
      );
      if (response.status === 200) {
        let responseJson = await response.json();
        this.setState({
          cartPrice: responseJson.data.total_price,
          cartCount: responseJson.data.product_count,
          cartIsEmpty: responseJson.data.product_count === 0 ? true : false,
          cartProducts: responseJson.data.products.data,
          loading: false,
          refreshing: false,
        });
      } else if (response.status === 401) {
        try {
          await AsyncStorage.removeItem('AlfinderUserToken');
          this.props.navigation.navigate('Welcome');
        } catch (e) {
          throw e;
        }
      } else {
        Alert.alert('Please Try Again');
      }
    } catch (error) {
      throw error;
    }
  };

  _emptyCartAsync = async () => {
    try {
      let response = await fetch(
        'https://alfinder.com/alfinder/public/api/user/cart/empty',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: this.authToken,
          },
        },
      );
      if (response.status === 200) {
        let responseJson = await response.json();
        if (responseJson.data.code === 7) {
          this._closeClearCartModal();
          this._getcartAsync();
        } else {
          Alert.alert(responseJson.data.message);
        }
      } else if (response.status === 401) {
        try {
          await AsyncStorage.removeItem('AlfinderUserToken');
          this.props.navigation.navigate('Welcome');
        } catch (e) {
          throw e;
        }
      } else {
        Alert.alert('Please Try Again');
      }
    } catch (error) {
      throw error;
    }
  };

  _removeFromCartAsync = async id => {
    try {
      let response = await fetch(
        'https://alfinder.com/alfinder/public/api/user/cart/remove',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: this.authToken,
          },
          body: JSON.stringify({
            product_id: id,
          }),
        },
      );
      if (response.status === 200) {
        let responseJson = await response.json();
        switch (responseJson.data.code) {
          case 7:
            this._getcartAsync();
            break;
          case 4:
            this._getcartAsync();
            break;
          case 2:
            this._getcartAsync();
            break;
          default:
            this._getcartAsync();
            break;
        }
      } else if (response.status === 401) {
        try {
          await AsyncStorage.removeItem('AlfinderUserToken');
          this.props.navigation.navigate('Welcome');
        } catch (e) {
          throw e;
        }
      } else {
        Alert.alert('Please Try Again');
      }
    } catch (error) {
      throw error;
    }
  };

  _openCheckOutModal = async () => {
    this.setState({checkOutModal: true});
    await this._GetSetUserProfile();
  };
  _closeCheckOutModal = async () => {
    this.setState({checkOutModal: false, couponCode: '', cartCouponPrice: ''});
  };

  _applyCouponAsync = async () => {
    this.setState({loadingCoupon: true});
    if (this.state.couponCode.trim() === '') {
      Alert.alert('Please Enter A Valid Coupon Code');
      return;
    }
    try {
      const response = await fetch(
        'https://alfinder.com/alfinder/public/api/cupons/apply',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: this.authToken,
          },
          body: JSON.stringify({
            coupon: this.state.couponCode.trim(),
            price: this.state.cartPrice,
          }),
        },
      );
      if (response.status === 200) {
        let responseJson = await response.json();
        if (responseJson.data.code === 7) {
          this.setState({
            cartCouponPrice: responseJson.data.message,
            loadingCoupon: false,
          });
        } else if (responseJson.data.code === 2) {
          Alert.alert(responseJson.data.message);
        } else {
          Alert.alert('Please Try Again');
        }
      } else {
        Alert.alert('Please Try Again');
      }
    } catch (error) {
      // throw error;
    }
  };

  _checkOutAsync = async () => {
    if (this.state.noPaymentMethods) {
      Alert.alert('Please Add Payment Method');
      return;
    }
    if (this.state.noAddresses) {
      Alert.alert('Please Add Shipping Address');
      return;
    }
    this.setState({loadingPayment: true, checkOutModal: false});

    try {
      let response = await fetch(
        'https://alfinder.com/alfinder/public/api/user/orders/create',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: this.authToken,
          },
          body: JSON.stringify({
            address_id: this.state.addresses[
              this.refs.addressCarousel.currentIndex
            ].customerAddressId,
            payment_id: this.state.paymentMethods[
              this.refs.paymentCarousel.currentIndex
            ].customerPaymentProfileId,
            count: this.state.count,
            price: this.state.cartPrice,
            total:
              this.state.cartCouponPrice !== ''
                ? this.state.cartCouponPrice
                : this.state.cartPrice,
            coupon: this.state.couponCode.trim(),
          }),
        },
      );
      if (response.status === 200) {
        const responseJson = await response.json();
        if (responseJson.data.code === 7) {
          this.setState({
            loadingPayment: false,
            checkOutModal: false,
            toasterText: 'Order Successfully Placed',
          });
          this._getcartAsync();
          this.displayToast();
        } else {
          this.setState({loadingPayment: false});
          Alert.alert(responseJson.data.message);
        }
      } else if (response.status === 401) {
        try {
          await AsyncStorage.removeItem('AlfinderUserToken');
          this.props.navigation.navigate('Welcome');
        } catch (e) {
          throw e;
        }
      } else {
        this.setState({checkOutModal: false, loadingPayment: false});
        Alert.alert('Please Try Again');
      }
    } catch (error) {
      this.setState({loadingPayment: false});
      // throw error;
    }
  };

  _renderPaymentCard({item, index}) {
    return (
      <View
        style={[styles.paymentCard, {backgroundColor: COLORS[index]}]}
        key={'{index}'}>
        <Text style={styles.cardName}>
          {item.payment.creditCard.cardNumber}
        </Text>
        <Text style={styles.cardNumber}>
          {item.payment.creditCard.cardType}
        </Text>
      </View>
    );
  }

  _renderAddress({item, index}) {
    return (
      <View key={'{index}'}>
        <View
          style={{flexDirection: 'column', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <View style={{width: '50%'}}>
              <Text style={{marginBottom: 4, fontSize: 15, fontWeight: '600'}}>
                First Name
              </Text>
              <Text style={{marginLeft: 4, textTransform: 'capitalize'}}>
                {item.firstName}
              </Text>
            </View>
            <View style={{width: '50%'}}>
              <Text style={{marginBottom: 4, fontSize: 15, fontWeight: '600'}}>
                Last Name
              </Text>
              <Text style={{marginLeft: 4}}>{item.lastName}</Text>
            </View>
          </View>
          <View style={{marginBottom: 10}}>
            <Text style={{marginBottom: 4, fontSize: 15, fontWeight: '600'}}>
              Street
            </Text>
            <Text style={{marginLeft: 4, textTransform: 'capitalize'}}>
              {item.address}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <View style={{width: '50%'}}>
              <Text style={{marginBottom: 4, fontSize: 15, fontWeight: '600'}}>
                City
              </Text>
              <Text style={{marginLeft: 4, textTransform: 'capitalize'}}>
                {item.city}
              </Text>
            </View>
            <View style={{width: '50%'}}>
              <Text style={{marginBottom: 4, fontSize: 15, fontWeight: '600'}}>
                Zipcode
              </Text>
              <Text style={{marginLeft: 4}}>{item.zip}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: '50%'}}>
              <Text style={{marginBottom: 4, fontSize: 15, fontWeight: '600'}}>
                State
              </Text>
              <Text style={{marginLeft: 4, textTransform: 'uppercase'}}>
                {item.state}
              </Text>
            </View>
            <View style={{width: '50%'}}>
              <Text
                style={{
                  marginBottom: 4,
                  fontSize: 15,
                  fontWeight: '600',
                  textTransform: 'capitalize',
                }}>
                Country
              </Text>
              <Text style={{marginLeft: 4, textTransform: 'uppercase'}}>
                {item.country}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  _renderCartItem({item, index}) {
    return (
      <View
        key={index + ''}
        style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            this.props.navigation.navigate('Product', {
              productId: item.product_id,
            })
          }>
          <View style={styles.itemContainer}>
            <View style={styles.image}>
              <FastImage
                style={styles.image}
                source={{
                  uri: item.product.data.image,
                  priority: FastImage.priority.low,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
            <View style={styles.detailsContainer}>
              <View style={styles.details}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={styles.name}>
                  {item.product.data.title}
                </Text>
                <View
                  style={{
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
                      fontSize: 11,
                      lineHeight: 17,
                      color: '#000',
                      fontWeight: '500',
                      textTransform: 'uppercase',
                      fontStyle: 'italic',
                    }}>
                    {item.product.data.brand_name}
                  </Text>
                </View>
              </View>
              <View>
                <View style={styles.optionContainer}>
                  {item.product.data.status === 'OUT OF STOCK' ? (
                    <Text
                      style={{fontSize: 11, fontStyle: 'italic', color: 'red'}}>
                      {item.product.data.status}
                    </Text>
                  ) : (
                    <>
                      <Text
                        style={{
                          color: 'gray',
                          fontWeight: '500',
                          fontSize: 11,
                        }}>
                        QTY.
                      </Text>
                      <Text style={styles.option}>{item.count}</Text>
                    </>
                  )}
                </View>
                <View style={styles.optionContainer}>
                  <Text style={{color: 'gray', fontSize: 12}}>OPT.</Text>
                  <Text style={styles.option}>{item.product.data.size}</Text>
                </View>
                <View
                  style={[
                    styles.optionContainer,
                    {justifyContent: 'space-between'},
                  ]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{color: 'gray', fontWeight: '500', fontSize: 11}}>
                      PRICE
                    </Text>
                    <Text style={styles.option}>
                      ${item.product.data.price}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{paddingRight: 5}}
                    onPress={() => this._removeFromCartAsync(item.product_id)}>
                    <Text style={{fontWeight: '300', color: 'red'}}>
                      remove
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  _openClearCartModal = () => {
    this.setState({emptyCartModal: true});
    this.animateModalOpacity();
  };
  _closeClearCartModal = () => {
    this.setState({emptyCartModal: false});
    this.reAnimateModalOpacity();
  };

  animateModalOpacity = () => {
    this.setState({modalDisplay: 'flex'});
    Animated.timing(this.state.modalOpacity, {
      toValue: 0.5,
      duration: 300,
      delay: 100,
      useNativeDriver: true,
    }).start();
  };
  reAnimateModalOpacity = () => {
    Animated.timing(this.state.modalOpacity, {
      toValue: 0,
      duration: 300,
      delay: 300,
      useNativeDriver: true,
    }).start();
    this.setState({modalDisplay: 'none'});
  };

  displayToast = () => {
    this.setState({toasterDisplay: 'flex'});
    Animated.sequence([
      Animated.timing(this.state.toasterOpacity, {
        toValue: 0.85,
        duration: 300,
        delay: 100,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.toasterOpacity, {
        toValue: 0,
        duration: 300,
        delay: 1200,
        useNativeDriver: true,
      }),
    ]).start();
    setInterval(() => {
      this.setState({toasterDisplay: 'none'});
    }, 1900);
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            height: 90,
            backgroundColor: '#fff',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 7,
              marginTop: 50,
              marginBottom: 5,
            }}>
            <Text style={{fontSize: 24, left: 20}}>Cart</Text>
            <TouchableOpacity
              activeOpacity={this.state.wishListIsEmpty ? 1 : 0.8}
              onPress={() => {
                !this.state.cartIsEmpty ? this._openClearCartModal() : null;
              }}>
              <Image
                source={require('./../../Assets/photos/icons/trash.png')}
                style={{width: 15, height: 30, marginRight: 10}}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{width: WIDTH, height: '100%'}}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />
            }>
            {this.state.loading ? (
              <View
                style={{
                  marginTop: '95%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>Loading ...</Text>
              </View>
            ) : this.state.cartIsEmpty ? (
              <View
                style={{
                  marginTop: '95%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>Your cart is Empty</Text>
              </View>
            ) : (
              <View
                style={{
                  marginVertical: 10,
                }}>
                <View
                  style={{
                    height: HEIGHT - 200,
                    alignItems: 'center',
                  }}>
                  {this.state.cartProducts.map((item, index) =>
                    this._renderCartItem({item, index}),
                  )}
                  {/* <FlatList
                    style={{flex: 1}}
                    data={this.state.cartProducts}
                    renderItem={(item, index) =>
                      this._renderCartItem(item, index)
                    }
                    keyExtractor={item => item.product_id}
                  /> */}
                </View>
              </View>
            )}
          </ScrollView>
          {!this.state.loading ? (
            !this.state.cartIsEmpty ? (
              <View
                style={{
                  position: 'absolute',
                  width: WIDTH,
                  bottom: 100,
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: 15,
                  borderColor: '#aaa',
                  borderTopWidth: 0.4,
                  backgroundColor: '#FFF',
                  zIndex: 99,
                }}>
                <View style={{width: '65%'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                      marginBottom: 10,
                    }}>
                    <Text style={{fontSize: 14, fontWeight: '600'}}>TOTAL</Text>
                    <Text style={{fontSize: 14, fontWeight: '600'}}>
                      ${this.state.cartPrice}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: '70%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={{width: '100%', marginBottom: 7}}
                    onPress={() => this._openCheckOutModal()}>
                    <View
                      style={{
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 30,
                        backgroundColor: '#181325',
                      }}>
                      <Text
                        style={{
                          fontWeight: '400',
                          fontSize: 14,
                          color: '#FFF',
                        }}>
                        CHECK OUT
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null
          ) : null}
        </View>

        {/* Empty Cart MODAL */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.emptyCartModal}>
          <TouchableOpacity onPress={() => this._closeClearCartModal()}>
            <View style={{width: WIDTH, height: HEIGHT - 150}} />
          </TouchableOpacity>
          <View>
            <View
              style={[
                styles.modalContent,
                {justifyContent: 'space-between', height: 150},
              ]}>
              <View>
                <Text
                  style={{textAlign: 'center', fontSize: 17, paddingTop: 20}}>
                  Are You Sure?
                </Text>
              </View>
              <View
                style={{
                  marginBottom: 40,
                  backgroundColor: '#000',
                  width: '80%',
                  padding: 4,
                }}>
                <TouchableOpacity onPress={() => this._emptyCartAsync()}>
                  <View style={{padding: 7}}>
                    <Text
                      style={{
                        fontWeight: '400',
                        fontSize: 14,
                        color: '#FFF',
                        textAlign: 'center',
                      }}>
                      EMPTY CART
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Check Out MODAL */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.checkOutModal}>
          <View>
            <View style={[styles.modalContent, {height: HEIGHT}]}>
              <View
                style={{
                  width: WIDTH,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 45,
                  paddingHorizontal: 15,
                  borderBottomWidth: 0.4,
                  borderColor: '#aaa',
                }}>
                <TouchableOpacity
                  style={{paddingRight: 5, paddingBottom: 7}}
                  onPress={() => this._closeCheckOutModal()}>
                  <Icon name="arrow-down" size={28} />
                </TouchableOpacity>
                <Text style={{fontSize: 22, paddingBottom: 7}}>Check Out</Text>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{flex: 1, paddingTop: 15}}>
                  <View>
                    <View style={{left: 15, marginBottom: 15}}>
                      <Text
                        style={{
                          fontSize: 17,
                          fontWeight: '400',
                          color: '#000',
                        }}>
                        Payment Method
                      </Text>
                    </View>
                    {!this.state.loadingPaymentMethods ? (
                      !this.state.noPaymentMethods ? (
                        <View style={styles.paymentMethodsContainer}>
                          <Carousel
                            layout="stack"
                            ref="paymentCarousel"
                            activeSlideAlignment={'start'}
                            data={this.state.paymentMethods}
                            renderItem={this._renderPaymentCard.bind(this)}
                            sliderWidth={350}
                            itemWidth={310}
                            inactiveSlideOpacity={1}
                            inactiveSlideScale={1}
                          />
                        </View>
                      ) : (
                        <View
                          style={{
                            marginTop: 25,
                            width: WIDTH,
                            height: 180,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Button
                            title="Add Payment Method to Your Acount"
                            onPress={() => {
                              this.setState({checkOutModal: false});
                              this.props.navigation.navigate('Profile');
                            }}
                          />
                        </View>
                      )
                    ) : (
                      <View
                        style={{
                          marginTop: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: 200,
                        }}>
                        <Text>Loading...</Text>
                      </View>
                    )}
                  </View>
                  <View style={{}}>
                    <View style={{left: 15, marginBottom: 15}}>
                      <Text
                        style={{
                          fontSize: 17,
                          fontWeight: '400',
                          color: '#000',
                        }}>
                        Shipping Address
                      </Text>
                    </View>
                    {!this.state.loadingAddresses ? (
                      !this.state.noAddresses ? (
                        <View style={styles.paymentMethodsContainer}>
                          <Carousel
                            ref="addressCarousel"
                            activeSlideAlignment={'start'}
                            data={this.state.addresses}
                            renderItem={this._renderAddress.bind(this)}
                            sliderWidth={330}
                            itemWidth={330}
                            inactiveSlideScale={1}
                          />
                        </View>
                      ) : (
                        <View
                          style={{
                            marginTop: 25,
                            width: WIDTH,
                            height: 180,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Button
                            title="Add Shipping Address to Your Acount"
                            onPress={() => {
                              this.setState({checkOutModal: false});
                              this.props.navigation.navigate('Profile');
                            }}
                          />
                        </View>
                      )
                    ) : (
                      <View
                        style={{
                          marginTop: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: 180,
                        }}>
                        <Text>Loading...</Text>
                      </View>
                    )}
                  </View>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{width: WIDTH - 25}}>
                      <View style={{left: 5, marginBottom: 15}}>
                        <Text
                          style={{
                            fontSize: 17,
                            fontWeight: '400',
                            color: '#000',
                          }}>
                          Order Summary
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'column',
                          justifyContent: 'center',
                          marginHorizontal: 10,
                          marginBottom: 40,
                        }}>
                        {this.state.cartProducts.map((item, index) => (
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginBottom: 5,
                            }}>
                            <Text
                              style={{
                                marginLeft: 7,
                                fontSize: 13,
                                fontWeight: '400',
                              }}>
                              {item.product.data.title}
                            </Text>
                            <Text style={{fontSize: 15.5, fontWeight: '600'}}>
                              ${item.product.data.price}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </View>

                    <View style={{marginBottom: 25, width: WIDTH - 25}}>
                      <View style={{left: 5, marginBottom: 15}}>
                        <Text
                          style={{
                            fontSize: 17,
                            fontWeight: '400',
                            color: '#000',
                          }}>
                          Review & Place Order
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'column',
                          justifyContent: 'center',
                          marginHorizontal: 10,
                          marginBottom: 40,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 5,
                          }}>
                          <Text
                            style={{
                              marginLeft: 7,
                              fontSize: 13,
                              fontWeight: '400',
                            }}>
                            NUMBER OF PRODUCTS
                          </Text>
                          <Text style={{fontSize: 15.5, fontWeight: '600'}}>
                            {this.state.cartCount}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 5,
                          }}>
                          <Text
                            style={{
                              marginLeft: 7,
                              fontSize: 13,
                              fontWeight: '400',
                            }}>
                            ORDER TOTAL
                          </Text>
                          <View style={{flexDirection: 'row'}}>
                            {this.state.cartCouponPrice !== '' ? (
                              <Text style={{fontSize: 15.5, fontWeight: '600'}}>
                                ${this.state.cartCouponPrice}
                              </Text>
                            ) : (
                              <Text style={{fontSize: 15.5, fontWeight: '600'}}>
                                ${this.state.cartPrice}
                              </Text>
                            )}
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 5,
                          }}>
                          <Text
                            style={{
                              marginLeft: 7,
                              fontSize: 13,
                              fontWeight: '400',
                            }}>
                            TAX
                          </Text>
                          <Text style={{fontSize: 15.5, fontWeight: '600'}}>
                            $0
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text
                            style={{
                              marginLeft: 7,
                              fontSize: 13,
                              fontWeight: '400',
                            }}>
                            SHIPPING
                          </Text>
                          <Text style={{fontWeight: '600'}}>FREE</Text>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        marginHorizontal: 15,
                        marginBottom: 25,
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '300',
                          marginBottom: 7,
                        }}>
                        A Note From Alfinder Inc.
                      </Text>
                      <View style={{marginLeft: 5}}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '300',
                            marginBottom: 5,
                          }}>
                          Your purchase is insured by Alfinder Inc.
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '300',
                            marginBottom: 5,
                          }}>
                          You may return unused products within 21 days of
                          purchase.
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '300',
                            marginBottom: 5,
                          }}>
                          If the product is different from what was described,
                          you will recieve a full refund.
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '300',
                            marginBottom: 5,
                          }}>
                          If a product becomes unavailable at the time of your
                          purchase you will not be charged.
                        </Text>
                      </View>
                    </View>
                  </View>
                  {/* </View> */}
                </View>
              </ScrollView>
              <View style={{alignItems: 'center'}}>
                <View
                  style={{width: WIDTH - 80, marginBottom: 20, marginTop: 5}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TextInput
                      maxLength={17}
                      style={{
                        width: WIDTH - 120,
                        height: 37,
                        backgroundColor: '#eee',
                        borderRadius: 2,
                        paddingLeft: 12,
                      }}
                      placeholder="Alfinder Promo Code"
                      onChangeText={text => this.setState({couponCode: text})}
                    />
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => this._applyCouponAsync()}>
                      <View
                        style={{
                          width: 80,
                          height: 36,
                          left: -40,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderTopLeftRadius: 20,
                          borderBottomLeftRadius: 20,
                          backgroundColor: '#6755A4',
                        }}>
                        <Text
                          style={{
                            fontWeight: '400',
                            fontSize: 14,
                            color: '#fff',
                          }}>
                          APPLY
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    marginBottom: 40,
                    width: WIDTH - 80,
                    padding: 4,
                    backgroundColor: '#201A32',
                  }}>
                  <TouchableOpacity
                    disabled={this.state.loadingPayment}
                    onPress={() => this._checkOutAsync()}>
                    <View style={{padding: 7}}>
                      <Text
                        style={{
                          fontWeight: '400',
                          fontSize: 14,
                          color: '#FFF',
                          textAlign: 'center',
                        }}>
                        PLACE ORDER
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        <Animated.View
          style={{
            position: 'absolute',
            display: this.state.modalDisplay,
            width: WIDTH,
            height: HEIGHT,
            top: 0,
            left: 0,
            backgroundColor: '#000',
            opacity: this.state.modalOpacity,
            zIndex: 99,
          }}
        />

        <View
          style={{
            display: this.state.loadingPayment ? 'flex' : 'none',
            position: 'absolute',
            zIndex: 9999,
            backgroundColor: '#333',
            width: 150,
            height: 150,
            left: (WIDTH - 150) / 2,
            top: (HEIGHT - 150) / 2,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 4,
            opacity: 0.5,
          }}>
          <ActivityIndicator size="small" color="#fff" />
        </View>

        <Animated.View
          style={{
            display: this.state.toasterDisplay,
            position: 'absolute',
            zIndex: 9999,
            backgroundColor: '#37265c',
            width: 150,
            height: 150,
            left: (WIDTH - 150) / 2,
            top: (HEIGHT - 150) / 2,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 4,
            opacity: this.state.toasterOpacity,
          }}>
          <Icon name="checkmark" color="#fff" size={60} />
          <Text
            style={{
              fontSize: 16,
              color: '#fff',
              fontWeight: '600',
              textAlign: 'center',
              paddingHorizontal: 7,
            }}>
            {this.state.toasterText}
          </Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
    height: 110,
    marginTop: 40,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    paddingHorizontal: 4,
    marginHorizontal: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    borderBottomWidth: 0.5,
    borderColor: '#000',
  },
  headerTitle: {
    paddingLeft: 10,
    paddingBottom: 10,
  },
  checkOutButton: {
    backgroundColor: '#000',
    paddingVertical: 7,
    paddingHorizontal: 20,
  },
  checkOut: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  brandContainerTitle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
    marginBottom: 15,
  },
  itemContainer: {
    width: WIDTH - 18,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 7,
    backgroundColor: '#fff',
    shadowColor: '#333',
    shadowOffset: {width: 0, height: 0.5},
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  image: {
    width: 120,
    height: 135,
    marginRight: 20,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  details: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
    paddingBottom: 7,
  },
  price: {
    fontSize: 14,
  },
  option: {
    fontSize: 13,
    paddingHorizontal: 9,
  },
  roundedButtonSmall: {
    width: 33,
    height: 33,
    padding: 5,
    borderRadius: 4,
    backgroundColor: '#FFF',
    shadowColor: '#aaa',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.7,
    shadowRadius: 2,
  },
  modalContent: {
    flexDirection: 'column',
    alignItems: 'center',
    borderTopLeftRadius: 25,
    backgroundColor: '#FFF',
    zIndex: 999,
  },
  emptyCartModal: {
    height: '18%',
  },
  checkOutModalContent: {
    height: '100%',
  },
  paymentMethodsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35,
  },
  paymentCard: {
    width: 300,
    height: 176,
    justifyContent: 'flex-end',
    borderRadius: 15,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  cardName: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 17,
    fontWeight: '300',
  },
  cardNumber: {
    textAlign: 'right',
    fontSize: 15,
    color: '#fff',
  },
});

export default Cart;
