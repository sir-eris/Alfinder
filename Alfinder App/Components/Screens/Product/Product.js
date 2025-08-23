/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Alert,
  Modal,
  Image,
  Button,
  FlatList,
  Animated,
  TextInput,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {CONFIG} from './../../App/Config';

import RelatedProduct from './ProductCard.js';
import ProductOption from './ProductOption.js';
import ReviewItem from '../../Sections/Review.js';

import Icon from 'react-native-ionicons';
import FastImage from 'react-native-fast-image';
import Carousel from 'react-native-snap-carousel';
import Accordion from 'react-native-collapsible/Accordion';
import SwipeableRating from 'react-native-swipeable-rating';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;
// const COUNT = ['NONE', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN'];
const COLORS = CONFIG.cardColors;

class ProductScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isSignedIn: null,

      scrollY: new Animated.Value(0),

      modalOpacity: new Animated.Value(0),
      modalDisplay: 'none',
      addToCartModal: false,
      addReviewModal: false,
      checkOutModal: false,

      ready: false,

      productInfo: {},

      activeSections: [],

      relatedProducts: [],
      productOptions: [],

      suggestionsProducts: [],
      suggestionsProductsLoading: true,

      refreshing: false,
      wishlisted: false,
      rating: 0,
      activeImage: 0,

      hasOptions: false,
      count: 1,
      couponCode: '',
      // cuponPrice: '',
      price: '',

      loadingPayment: false,

      loadingReviews: false,
      noReviews: true,
      reviews: [],

      loadingPaymentMethods: true,
      noPaymentMethods: true,
      paymentMethods: [],

      loadingAddresses: true,
      noAddresses: true,
      addresses: [],

      rate: 5,
      reviewTitle: null,
      reviewBody: null,

      toasterDisplay: 'none',
      toasterOpacity: new Animated.Value(0),
      toasterText: '',
    };

    const {params} = this.props.navigation.state;
    if (params) {
      this.productId = params.productId ? params.productId : null;
      this.product = params.product ? params.product : null;
    } else {
      this.props.navigation.navigate.goBack(null);
    }
  }

  componentDidMount = async () => {
    await this._getAppKey();
    if (this.product !== null) {
      this.setState({
        productInfo: this.product,
        images: this.product.images.split(','),
        hasOptions: this.product.options !== null,
        ready: true,
      });
      await this._isWisListedAsync(this.product.product_id);
      await this._getRelatedProducts(this.product.product_id);
      await this._loadReviewsAsync(this.product.product_id);
    } else {
      await this._getProductInfo(this.productId);
      await this._isWisListedAsync(this.productId);
      await this._getRelatedProducts(this.productId);
      this.setState({ready: true});
    }
  };

  _getAppKey = async () => {
    try {
      const val = await AsyncStorage.getItem('AlfinderUserToken');
      const value = await JSON.parse(val);
      if (value === null || value === '') {
        // this.props.navigation.navigate('Welcome');
        this.setState({isSignedIn: false});
      } else {
        if (value.token === null || value.token === '') {
          // this.props.navigation.navigate('Welcome');
          this.setState({isSignedIn: false});
        } else {
          this.setState({isSignedIn: true});
          this.authToken = value.token;
        }
      }
    } catch (e) {
      // throw e;
    }
  };

  _onRefresh = () => {
    this.setState({refreshing: true});
    setTimeout(() => this.setState({refreshing: false}), 800);
  };

  _GetSetUserProfile = async () => {
    if (this.state.isSignedIn !== true) {
      this.props.navigation.navigate('Welcome');
      return;
    }
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
        let responseJson = await response.json();
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
          // throw e;
        }
      } else {
        Alert.alert('Please Try Again');
      }
    } catch (e) {
      // throw e;
    }
  };

  _getProductInfo = async id => {
    if (this.product !== null) {
      this.setState({
        productInfo: this.product,
        images: this.product.images.split(','),
        hasOptions: this.product.options !== null,
        ready: true,
      });
      await this._loadReviewsAsync(this.state.productInfo.product_id);
    } else {
      try {
        let response = await fetch(
          'https://alfinder.com/alfinder/public/api/products/get',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              product_id: id,
            }),
          },
        );
        const responseJson = await response.json();
        if (response.status === 200) {
          this.setState({
            productInfo: responseJson.data,
            images: responseJson.data.images,
            hasOptions: responseJson.data.options !== null,
          });
          Image.getSize(responseJson.data.images[0], (width, height) => {
            this.setState({
              width: width,
              height: height,
            });
          });
          await this._loadReviewsAsync(this.state.productInfo.product_id);
        } else {
          this.props.navigation.navigate.goBack(null);
        }
      } catch (e) {
        // throw e;
      }

      if (this.state.hasOptions) {
        await this._getProductOptions(id);
      }
    }
  };

  _getProductOptions = async id => {
    try {
      let response = await fetch(
        'https://alfinder.com/alfinder/public/api/products/options',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            product_id: id,
          }),
        },
      );
      if (response.status === 200) {
        const responseJson = await response.json();
        this.setState({
          productOptions: responseJson.data,
        });
      } else {
        // Alert.alert('Please Try Again');
      }
    } catch (e) {
      // throw e;
    }
  };

  _getRelatedProducts = async id => {
    try {
      let response = await fetch(
        'https://alfinder.com/alfinder/public/api/products/related',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productid: id,
            category: this.state.productInfo.category,
          }),
        },
      );
      if (response.status === 200) {
        const responseJson = await response.json();
        this.setState({
          relatedProducts: responseJson.data,
        });
      } else {
        // Alert.alert('Please Try Again');
      }
    } catch (e) {
      // throw e;
    }
  };

  _getSuggestiosProducts = async () => {
    try {
      let response = await fetch(
        'https://alfinder.com/alfinder/public/api/products/suggestions',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status === 200) {
        const responseJson = await response.json();
        this.setState({
          suggestionsProductsLoading: false,
          suggestionsProducts: responseJson.data,
        });
      } else {
        // Alert.alert('Please Try Again');
      }
    } catch (e) {
      // throw e;
    }
  };

  _isWisListedAsync = async id => {
    if (this.state.isSignedIn === true) {
      try {
        let response = await fetch(
          'https://alfinder.com/alfinder/public/api/user/wishlist/check',
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
          const responseJson = await response.json();

          if (responseJson.data.code === 7) {
            this.setState({
              wishlisted: responseJson.data.message,
            });
          }
        } else if (response.status === 401) {
          try {
            await AsyncStorage.removeItem('AlfinderUserToken');
            this.props.navigation.navigate('Welcome');
          } catch (e) {
            // throw e;
          }
        }
      } catch (e) {
        // throw e;
      }
    }
  };

  _addToWishListAsync = async id => {
    if (this.state.isSignedIn !== true) {
      this.props.navigation.navigate('Welcome');
      return;
    }
    this.setState({
      wishlisted: !this.state.wishlisted,
    });
    try {
      let response = await fetch(
        'https://alfinder.com/alfinder/public/api/user/wishlist/add',
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
        const responseJson = await response.json();

        if (responseJson.data.code === 7) {
          // this._displayToaster();
          // this.setState({
          //   wishlisted: true,
          // });
        } else if (responseJson.data.code === 4) {
          this._removeFromWishListAsync(id);
        }
      } else if (response.status === 401) {
        try {
          await AsyncStorage.removeItem('AlfinderUserToken');
          this.props.navigation.navigate('Welcome');
        } catch (e) {
          // throw e;
        }
      } else {
        Alert.alert('Please Try Again');
      }
    } catch (e) {
      // throw e;
    }
  };

  _removeFromWishListAsync = async id => {
    if (this.state.isSignedIn !== true) {
      this.props.navigation.navigate('Welcome');
      return;
    }
    try {
      let response = await fetch(
        'https://alfinder.com/alfinder/public/api/user/wishlist/remove',
        {
          method: 'DELETE',
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
        if (responseJson.data.code === 7) {
          // this.setState({
          //   wishlisted: false,
          // });
        } else if (responseJson.data.code === 4) {
          // this.setState({
          //   wishlisted: false,
          // });
        }
      } else if (response.status === 401) {
        try {
          await AsyncStorage.removeItem('AlfinderUserToken');
          this.props.navigation.navigate('Welcome');
        } catch (e) {
          // throw e;
        }
      } else {
        Alert.alert('Please Try Again');
      }
    } catch (e) {
      // throw e;
    }
  };

  _loadReviewsAsync = async id => {
    try {
      let response = await fetch(
        'https://alfinder.com/alfinder/public/api/products/reviews',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            product_id: id,
          }),
        },
      );
      if (response.status === 200) {
        const responseJson = await response.json();
        if (responseJson.data.length > 0) {
          this.setState({
            loadingReviews: false,
            noReviews: false,
            reviews: responseJson.data,
          });
        } else {
          this.setState({
            loadingReviews: false,
            noReviews: true,
          });
        }
      }
    } catch (e) {
      // throw e;
    }
  };

  _applyCuponAsync = async () => {
    if (this.state.couponCode === '') {
      Alert.alert('Please Enter A Valid Cupon Code');
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
            price: this.state.productInfo.price * this.state.count,
          }),
        },
      );
      if (response.status === 200) {
        let responseJson = await response.json();
        if (responseJson.data.code === 7) {
          this.setState({price: responseJson.data.message});
        } else if (responseJson.data.code === 2) {
          Alert.alert(responseJson.data.message);
        } else {
          Alert.alert('Please Try Again');
        }
      } else {
        Alert.alert('Please Try Again');
      }
    } catch (e) {
      // throw e;
    }
  };

  _checkOutAsync = async () => {
    if (this.state.isSignedIn !== true) {
      this.props.navigation.navigate('Welcome');
      return;
    }
    if (this.state.productInfo.status === 'OUT OF STOCK') {
      Alert.alert('This Product Is Out Of Stock');
      return;
    }
    if (this.state.productInfo.status === 'AWAITING STOCK') {
      Alert.alert('This Product Is Coming Soon');
      return;
    }
    if (this.state.noPaymentMethods) {
      Alert.alert('Please Add Payment Method');
    } else if (this.state.noAddresses) {
      Alert.alert('Please Add Shipping Address');
    } else {
      this.setState({loadingPayment: true});
      try {
        let response = await fetch(
          'https://alfinder.com/alfinder/public/api/user/orders/make',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: this.authToken,
            },
            body: JSON.stringify({
              product_id: this.state.productInfo.product_id,
              payment_id: this.state.paymentMethods[
                this.refs.paymentCarousel.currentIndex
              ].customerPaymentProfileId,
              address_id: this.state.addresses[
                this.refs.addressCarousel.currentIndex
              ].customerAddressId,
              count: this.state.count,
              price: this.state.productInfo.price * this.state.count,
              // total:
              //   this.state.cuponPrice !== ''
              //     ? this.state.cuponPrice
              //     : this.state.productInfo.price * this.state.count,
              coupon: this.state.couponCode,
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
            this._closeCheckOutModal();
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
            // throw e;
          }
        } else {
          this.setState({loadingPayment: false});
          Alert.alert('Please Try Again');
        }
      } catch (e) {
        // throw e;
      }
    }
  };

  _addToCartAsync = async () => {
    if (this.state.isSignedIn !== true) {
      this.props.navigation.navigate('Welcome');
      return;
    }
    try {
      let response = await fetch(
        'https://alfinder.com/alfinder/public/api/user/cart/add',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: this.authToken,
          },
          body: JSON.stringify({
            product_id: this.state.productInfo.product_id,
            // count: this.state.count,
            count: 1,
          }),
        },
      );
      const responseJson = await response.json();
      if (response.status === 200) {
        if (responseJson.data.code === 7) {
          this.setState({toasterText: 'Added To Cart'});
          this.displayToast();
        }
      } else if (response.status === 401) {
        try {
          await AsyncStorage.removeItem('AlfinderUserToken');
          this.props.navigation.navigate('Welcome');
        } catch (e) {
          // throw e;
        }
      } else {
        Alert.alert('Please Try Again');
      }
    } catch (e) {
      // throw e;
    }
  };

  _handleRating = rating => {
    this.setState({rating: rating});
  };

  _addReviewAsync = async () => {
    if (this.state.isSignedIn !== true) {
      this.props.navigation.navigate('Welcome');
      return;
    }
    if (this.state.reviewTitle === null || this.state.reviewBody === null) {
      Alert.alert('Please Complete Your Review');
      return;
    }
    try {
      let response = await fetch(
        'https://alfinder.com/alfinder/public/api/user/review/add',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: this.authToken,
          },
          body: JSON.stringify({
            productid: this.productId,
            rate: this.state.rate,
            title: this.state.reviewTitle,
            body: this.state.reviewBody,
          }),
        },
      );

      if (response.status === 200) {
        const responseJson = await response.json();
        if (responseJson.data.code === 7) {
          this._closeReviewModal();
          this.setState({toasterText: responseJson.data.message});
          this.displayToast();
          await this._loadReviewsAsync(this.productId);
        } else {
          Alert.alert(responseJson.data.message);
        }
      } else if (response.status === 401) {
        try {
          await AsyncStorage.removeItem('AlfinderUserToken');
          this.props.navigation.navigate('Welcome');
        } catch (e) {
          // throw e;
        }
      } else {
        Alert.alert('Please Try Again');
      }
    } catch (e) {
      // throw e;
    }
  };

  _renderImages = ({item, index}) => {
    return (
      <FastImage
        key={index + ''}
        style={{
          width: WIDTH,
          height: this.state.width < 800 ? WIDTH * 1 - 50 : WIDTH,
          marginTop: this.state.width < 800 ? 30 : 0,
          backgroundColor: '#FFF',
        }}
        source={{
          uri: item,
          priority: FastImage.priority.normal,
        }}
        resizeMode={
          this.state.width < 800
            ? FastImage.resizeMode.contain
            : FastImage.resizeMode.cover
        }
      />
    );
  };

  _openAddToCartModal = async () => {
    if (this.state.isSignedIn !== true) {
      this.props.navigation.navigate('Welcome');
      return;
    }
    this.setState({addToCartModal: true});
    this._addToCartAsync();
    await this._getSuggestiosProducts();
    this.animateModalOpacity();
  };
  _closeAddToCartModal = () => {
    this.setState({addToCartModal: false});
    this.reAnimateModalOpacity();
  };

  _openReviewModal = () => {
    this.setState({addReviewModal: true});
    this.animateModalOpacity();
  };
  _closeReviewModal = () => {
    this.setState({addReviewModal: false});
    this.reAnimateModalOpacity();
  };

  _openCheckOutModal = async () => {
    if (this.state.isSignedIn !== true) {
      this.props.navigation.navigate('Welcome');
      return;
    }
    this.setState({checkOutModal: true});
    await this._GetSetUserProfile();
  };
  _closeCheckOutModal = () => {
    this.setState({checkOutModal: false, price: ''});
  };

  _renderRelatedProducts = ({item}) => {
    return <RelatedProduct navigation={this.props.navigation} item={item} />;
  };

  _renderPaymentCard({item, index}) {
    return (
      <View
        style={[styles.paymentCard, {backgroundColor: COLORS[index]}]}
        key={index + ''}>
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
      <View key={index + ''}>
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

  _renderAccordionHeader = section => {
    return (
      <View
        style={{
          width: WIDTH - 10,
          paddingLeft: 15,
          paddingTop: 10,
          paddingBottom: 5,
          borderColor: '#000',
          borderBottomWidth: 0.7,
          borderLeftWidth: 0.7,
          borderBottomLeftRadius: 15,
        }}>
        <Text style={styles.sectionTitle}>{section.title}</Text>
      </View>
    );
  };

  _renderAccordionContent = section => {
    return (
      <View style={{width: WIDTH - 20, marginTop: 12, marginBottom: 20}}>
        <Text
          style={{
            paddingHorizontal: 15,
            fontSize: 13.5,
            fontWeight: '300',
          }}>
          {section.body}
        </Text>
      </View>
    );
  };

  _updateAccordionSections = activeSections => {
    this.setState({activeSections});
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
    const statusbarOpacity = this.state.scrollY.interpolate({
      inputRange: [0, 300, 400],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });

    return (
      <View style={{flex: 1}}>
        <Animated.View
          style={[styles.navigationHeader, {opacity: statusbarOpacity}]}
        />

        {this.state.ready ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            // refreshControl={
            //   <RefreshControl
            //     refreshing={this.state.refreshing}
            //     onRefresh={this._onRefresh.bind(this)}
            //   />
            // }
            onScroll={Animated.event([
              {nativeEvent: {contentOffset: {y: this.state.scrollY}}},
            ])}>
            <View
              style={{
                width: '100%',
                height: WIDTH,
              }}>
              <View
                style={{
                  width: WIDTH,
                  position: 'absolute',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  zIndex: 9,
                  marginTop: 40,
                }}>
                <TouchableOpacity
                  style={{paddingLeft: 10, paddingRight: 5}}
                  onPress={() => this.props.navigation.goBack(null)}>
                  <Image
                    source={require('./../../../Assets/photos/icons/double-left.png')}
                    style={{width: 28, height: 28}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{padding: 5, marginTop: 5, marginRight: 10}}
                  onPress={() => this._addToWishListAsync(this.productId)}>
                  {this.state.wishlisted ? (
                    <Image
                      source={require('./../../../Assets/photos/icons/heart_filled.png')}
                      style={{width: 33, height: 30}}
                    />
                  ) : (
                    <Image
                      source={require('./../../../Assets/photos/icons/heart.png')}
                      style={{width: 33, height: 30}}
                    />
                  )}
                </TouchableOpacity>
              </View>

              {/* <View
              style={{
                position: 'absolute',
                top: 80,
                right: 10,
                zIndex: 99,
                display: 'none',
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: 50,
                  borderRadius: 50,
                }}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    marginBottom: 4,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fff',
                    borderRadius: 50,
                    shadowColor: '#3C2D69',
                    shadowOffset: {width: 0.2, height: 1},
                    shadowOpacity: 0.3,
                    shadowRadius: 2.5,
                  }}>
                  <TouchableOpacity
                    style={{padding: 5}}
                    onPress={() => this._addToWishListAsync(this.productId)}>
                    {this.state.wishlisted ? (
                      <Image
                        source={require('./../../../Assets/photos/icons/heart_filled.png')}
                        style={{width: 33, height: 30}}
                      />
                    ) : (
                      <Image
                        source={require('./../../../Assets/photos/icons/heart.png')}
                        style={{width: 33, height: 30}}
                      />
                    )}
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    width: 50,
                    height: 50,
                    marginBottom: 4,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'red',
                    borderRadius: 50,
                    shadowColor: '#3C2D69',
                    shadowOffset: {width: 0.2, height: 1},
                    shadowOpacity: 0.3,
                    shadowRadius: 2.5,
                  }}
                />

                <View
                  style={{
                    width: 50,
                    height: 50,
                    marginBottom: 4,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'orange',
                    borderRadius: 50,
                    shadowColor: '#3C2D69',
                    shadowOffset: {width: 0.2, height: 1},
                    shadowOpacity: 0.3,
                    shadowRadius: 2.5,
                  }}
                />

                <View
                  style={{
                    width: 50,
                    height: 50,
                    marginBottom: 4,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'brown',
                    borderRadius: 50,
                    shadowColor: '#3C2D69',
                    shadowOffset: {width: 0.2, height: 1},
                    shadowOpacity: 0.3,
                    shadowRadius: 2.5,
                  }}
                />
              </View>
            </View> */}

              <View style={{backgroundColor: '#fff'}}>
                {this.state.ready ? (
                  <Carousel
                    // useScrollView
                    ref={c => {
                      this.imageCarousel = c;
                    }}
                    loop
                    activeSlideAlignment={'start'}
                    data={this.state.images}
                    renderItem={this._renderImages}
                    sliderWidth={WIDTH}
                    itemWidth={WIDTH}
                    onSnapToItem={index => this.setState({activeImage: index})}
                    inactiveSlideScale={1}
                    inactiveSlideOpacity={1}
                  />
                ) : null}
                {this.state.ready ? (
                  <View
                    style={{
                      position: 'absolute',
                      flexDirection: 'row',
                      zIndex: 999,
                      bottom: 7,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: WIDTH,
                        justifyContent: 'center',
                      }}>
                      {this.state.images.map((i, index) => (
                        <View
                          key={index}
                          style={{
                            borderRadius: 2,
                            marginHorizontal: 2,
                            width: 10,
                            height: 2,
                            marginBottom: 4,
                            backgroundColor:
                              this.state.activeImage === index
                                ? '#FFF'
                                : 'gray',
                          }}
                        />
                      ))}
                    </View>
                  </View>
                ) : null}
              </View>
            </View>

            <View style={{backgroundColor: '#FFF'}}>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    paddingHorizontal: 5,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginLeft: 10,
                    marginBottom: 12,
                    marginTop: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '500',
                      lineHeight: 25,
                      maxWidth: '95%',
                    }}>
                    {this.state.productInfo.title}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginHorizontal: 15,
                    marginBottom: 5,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        paddingLeft: 3,
                        marginRight: 10,
                      }}>
                      <Text style={{fontSize: 18, fontWeight: '300'}}>
                        ${this.state.productInfo.price}
                      </Text>
                    </View>
                    {this.state.ready ? (
                      this.state.hasOptions ? (
                        this.state.hasOptions ? (
                          <View style={{alignItems: 'center'}}>
                            <View
                              style={{
                                paddingVertical: 3,
                                paddingHorizontal: 10,
                                borderRadius: 20,
                                backgroundColor: '#eee',
                              }}>
                              <Text
                                style={{
                                  fontWeight: '300',
                                  fontSize: 12,
                                  color: '#000',
                                }}>
                                Has Options
                              </Text>
                            </View>
                          </View>
                        ) : null
                      ) : null
                    ) : null}
                  </View>
                  <View
                    style={{
                      width: '35%',
                      alignItems: 'flex-end',
                      flexDirection: 'column',
                    }}>
                    <Text
                      style={{
                        fontSize: 13,
                        marginRight: 5,
                        textAlign: 'right',
                        color: '#333',
                      }}>
                      {this.state.productInfo.rate} / 5.0
                    </Text>
                    <SwipeableRating
                      rating={parseFloat(this.state.productInfo.rate)}
                      size={21}
                      gap={-1}
                      swipeable={false}
                      allowHalves={true}
                      color={'#f98f03'}
                      emptyColor={'#f98f03'}
                    />
                  </View>
                </View>
              </View>

              <View
                style={{
                  width: WIDTH - 35,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 20,
                  marginLeft: 17,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '500',
                      color: '#333',
                      paddingLeft: 3,
                    }}>
                    {this.state.productInfo.size}
                  </Text>
                  <Text
                    style={{
                      fontWeight: '900',
                      fontSize: 20,
                      paddingBottom: 10,
                    }}>
                    {' '}
                    .{' '}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: '400',
                      color: '#444',
                      textTransform: 'uppercase',
                    }}>
                    {this.state.productInfo.type}
                  </Text>
                </View>
                <View
                  style={{
                    height: 17,
                    paddingHorizontal: 6,
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
                    {this.state.productInfo.brand_name}
                  </Text>
                </View>
              </View>

              {this.state.productInfo.status === 'HOLD' ? null : (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    marginBottom: 25,
                  }}>
                  {this.state.productInfo.status === 'OUT OF STOCK' ? (
                    <Text style={{color: 'red'}}>OUT OF STOCK</Text>
                  ) : this.state.productInfo.status === 'AWAITING STOCK' ? (
                    <View
                      style={{
                        width: WIDTH - 40,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                        backgroundColor: '#fff',
                        shadowColor: '#3C2D69',
                        shadowOffset: {width: 0.2, height: 1},
                        shadowOpacity: 0.3,
                        shadowRadius: 2.5,
                      }}>
                      <Text style={{color: '#4A8A38'}}>COMING SOON!</Text>
                    </View>
                  ) : this.state.productInfo.status === 'OK' ||
                    this.state.productInfo.status === 'LOW STOCK' ? (
                    <View
                      style={{
                        width: WIDTH,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        activeOpacity={0.95}
                        onPress={() => this._openAddToCartModal()}>
                        <View
                          style={{
                            width: WIDTH * 0.6,
                            height: 42,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 30,
                            backgroundColor: '#3c2d69',
                            shadowColor: '#555',
                            shadowOffset: {width: 0, height: 0.5},
                            shadowOpacity: 0.7,
                            shadowRadius: 2,
                          }}>
                          <Text
                            style={{
                              fontWeight: '400',
                              fontSize: 14,
                              color: '#FFF',
                            }}>
                            ADD TO CART
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => this._openCheckOutModal()}>
                        <View
                          style={{
                            width: WIDTH * 0.3,
                            height: 42,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 30,
                            backgroundColor: '#201A32',
                            shadowColor: '#333',
                            shadowOffset: {width: 0, height: 1},
                            shadowOpacity: 0.7,
                            shadowRadius: 1,
                          }}>
                          <Text
                            style={{
                              fontWeight: '400',
                              fontSize: 14,
                              color: '#FFF',
                            }}>
                            QUICK BUY
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View
                      style={{
                        width: WIDTH - 40,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                        backgroundColor: '#fff',
                        shadowColor: '#3C2D69',
                        shadowOffset: {width: 0.2, height: 1},
                        shadowOpacity: 0.3,
                        shadowRadius: 2.5,
                      }}>
                      <Text style={{color: '#F98F03'}}>
                        CURRENTLY UNAVAILABLE
                      </Text>
                    </View>
                  )}
                </View>
              )}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                {this.state.productInfo.vegan ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      width: WIDTH / 3 - 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 10,
                    }}>
                    <Image
                      source={require('./../../../Assets/photos/icons/checked-green.png')}
                      style={{width: 30, height: 30}}
                    />
                    <Text style={{color: '#4A8A38', fontSize: 13}}>Vegan</Text>
                  </View>
                ) : null}
                {this.state.productInfo.gluten ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      width: WIDTH / 3 - 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 10,
                    }}>
                    <Image
                      source={require('./../../../Assets/photos/icons/checked.png')}
                      style={{width: 30, height: 30}}
                    />
                    <Text style={{color: '#000', fontSize: 13}}>
                      Gluten Free
                    </Text>
                  </View>
                ) : null}
                {this.state.productInfo.cruelty ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      width: WIDTH / 3 - 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 10,
                    }}>
                    <Image
                      source={require('./../../../Assets/photos/icons/checked-blue.png')}
                      style={{width: 30, height: 30}}
                    />
                    <Text style={{color: '#3D87C7', fontSize: 13}}>
                      Cruelty Free
                    </Text>
                  </View>
                ) : null}
              </View>

              <View
                style={{
                  marginHorizontal: 15,
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  marginBottom: 20,
                }}>
                <Text style={[styles.sectionTitle, {fontSize: 16}]}>
                  Description
                </Text>
                <Text
                  style={{
                    paddingHorizontal: 5,
                    fontSize: 14,
                    fontWeight: '400',
                    lineHeight: 20.5,
                    letterSpacing: 0.1,
                    color: '#222',
                  }}>
                  {this.state.productInfo.description}
                </Text>
              </View>
              <View
                style={{
                  marginHorizontal: 15,
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  marginBottom: 20,
                }}>
                <Text style={[styles.sectionTitle, {fontSize: 16}]}>
                  Directions (suggested)
                </Text>
                <Text
                  style={{
                    paddingHorizontal: 5,
                    fontSize: 14,
                    fontWeight: '400',
                    lineHeight: 20.5,
                    letterSpacing: 0.1,
                    color: '#222',
                  }}>
                  {this.state.productInfo.directions}
                </Text>
              </View>

              <View
                style={{
                  alignItems: 'flex-end',
                  marginTop: 5,
                  marginBottom: 25,
                }}>
                <Accordion
                  useNativeDriver={true}
                  align={'bottom'}
                  touchableComponent={TouchableOpacity}
                  touchableProps={{activeOpacity: 0.7}}
                  sections={[
                    {
                      title: 'Additional Notes',
                      body:
                        this.state.productInfo.dosage !== '0'
                          ? this.state.productInfo.note +
                            '\n\nContains ' +
                            this.state.productInfo.dosage +
                            ' CBD'
                          : this.state.productInfo.note,
                    },
                    {
                      title: 'Ingredients',
                      body: this.state.productInfo.ingredients,
                    },
                  ]}
                  activeSections={this.state.activeSections}
                  renderHeader={this._renderAccordionHeader}
                  renderContent={this._renderAccordionContent}
                  onChange={this._updateAccordionSections}
                />
              </View>

              <View style={{marginBottom: 15, paddingVertical: 15}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginHorizontal: 15,
                    marginBottom: 12,
                  }}>
                  <TouchableOpacity
                    activeOpacity={1}
                    // onPress={() =>
                    //   this.props.navigation.navigate('Reviews', {
                    //     id: this.state.productInfo.product_id,
                    //   })
                    // }
                  >
                    <Text style={[styles.sectionTitle, {fontSize: 16}]}>Reviews</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this._openReviewModal()}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '400',
                        color: '#555',
                      }}>
                      + review
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* <View>
                <Text>12,09 rates</Text>
              </View> */}
                {!this.state.loadingReviews ? (
                  !this.state.noReviews ? (
                    <FlatList
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      data={this.state.reviews}
                      renderItem={({item, index}) => <ReviewItem data={item} />}
                      keyExtractor={item => item.rate}
                    />
                  ) : (
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 10,
                        marginTop: 15,
                      }}>
                      <TouchableOpacity onPress={() => this._openReviewModal()}>
                        <Text
                          style={{
                            color: 'blue',
                            fontSize: 15,
                            textTransform: 'capitalize',
                          }}>
                          write a review
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )
                ) : (
                  <View>
                    <Text>Loading...</Text>
                  </View>
                )}
              </View>

              {this.state.hasOptions ? (
                <View
                  style={{
                    marginHorizontal: 15,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    marginBottom: 20,
                  }}>
                  <Text style={styles.sectionTitle}>Options</Text>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={this.state.productOptions}
                    renderItem={({item}) => (
                      <ProductOption
                        navigation={this.props.navigation}
                        item={item}
                      />
                    )}
                    keyExtractor={item => item.product_id}
                  />
                </View>
              ) : null}

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginHorizontal: 15,
                  marginBottom: 30,
                  paddingVertical: 10,
                  paddingHorizontal: 5,
                  backgroundColor: '#fff',
                  borderRadius: 10,
                  shadowColor: '#aaa',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.5,
                  shadowRadius: 5,
                }}>
                <View style={{paddingLeft: 5, width: '50%'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 7,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'gray',
                        fontWeight: '400',
                        marginBottom: 2,
                        marginRight: 7,
                      }}>
                      Shipping:
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: '300',
                        marginBottom: 2,
                      }}>
                      Two-Day Free
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 7,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'gray',
                        fontWeight: '400',
                        marginBottom: 2,
                        marginRight: 7,
                      }}>
                      Return Policy:
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: '300',
                        marginBottom: 2,
                      }}>
                      21 Days Free
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    paddingRight: 15,
                    width: '50%',
                    alignItems: 'flex-end',
                  }}>
                  <FastImage
                    source={require('./../../../Assets/photos/Alfinder_Logo.png')}
                    resizeMode={FastImage.resizeMode.contain}
                    style={{width: 100, height: 32}}
                  />
                </View>
              </View>

              <View
                style={{
                  width: WIDTH,
                  marginHorizontal: 15,
                  marginBottom: 10,
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '300',
                    paddingLeft: 10,
                    color: '#000',
                    marginBottom: 12,
                  }}>
                  You Might Also Like
                </Text>
                {this.state.ready ? (
                  <View style={{marginBottom: 10}}>
                    <View style={{}}>
                      <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={this.state.relatedProducts}
                        renderItem={item => this._renderRelatedProducts(item)}
                        keyExtractor={item => item.product_id}
                      />
                    </View>
                  </View>
                ) : (
                  <View />
                )}
              </View>
              <View
                style={{
                  width: WIDTH,
                  marginHorizontal: 15,
                  marginBottom: 10,
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                <Text style={{width: WIDTH - 30, fontSize: 11, color: '#ccc'}}>
                  This product is not for use by or sale to persons under the
                  age of 18. This product should be used only as directed on the
                  label. It should not be used if you are pregnant or nursing.
                  Consult with a physician before use if you have a serious
                  medical condition or use prescription medications. These
                  statements have not been evaluated by the FDA. This product is
                  not intended to diagnose, treat, cure or prevent any disease.
                  Void Where Prohibited By Law.
                </Text>
              </View>
            </View>
          </ScrollView>
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="small" color="#333" />
          </View>
        )}
        {/*  Add To Cart MODAL */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.addToCartModal}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this._closeAddToCartModal()}>
            <View style={{width: WIDTH, height: HEIGHT - 330}} />
          </TouchableOpacity>
          <View>
            <View
              style={[
                styles.modalContent,
                {justifyContent: 'flex-start', height: 330},
              ]}>
              <View style={{marginBottom: 17}}>
                <Text
                  style={{textAlign: 'center', fontSize: 17, paddingTop: 20}}>
                  Added To Cart
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: '#FFF',
                }}>
                <View style={{width: WIDTH - 30}}>
                  {this.state.suggestionsProductsLoading ? (
                    <View
                      style={{
                        width: WIDTH,
                        height: 250,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text>Loading...</Text>
                    </View>
                  ) : (
                    <FlatList
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      data={this.state.suggestionsProducts}
                      renderItem={item => this._renderRelatedProducts(item)}
                      keyExtractor={item => item.product_id}
                    />
                  )}
                </View>
                {/* <View
                  style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: WIDTH,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                    }}>
                    <View>
                      <Text>{COUNT[this.state.count]}</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <TouchableOpacity
                        style={{padding: 5}}
                        onPress={() =>
                          this.state.count > 1
                            ? this.setState({count: this.state.count - 1})
                            : null
                        }>
                        <Icon name="remove" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                          marginLeft: 7,
                        }}
                        onPress={() =>
                          this.state.count < 7
                            ? this.setState({count: this.state.count + 1})
                            : null
                        }>
                        <Icon name="add" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => this._addToCartAsync()}>
                    <View
                      style={{
                        width: WIDTH - 30,
                        height: 40,
                        borderRadius: 2,
                        backgroundColor: '#000',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontWeight: '400',
                          fontSize: 14,
                          color: '#FFF',
                        }}>
                        ADD TO CART
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
               */}
              </View>
            </View>
          </View>
        </Modal>

        {/* Write Review MODAL */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.addReviewModal}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this._closeReviewModal()}>
            <View style={{width: WIDTH, height: HEIGHT / 2}} />
          </TouchableOpacity>
          <View>
            <View
              style={[
                styles.modalContent,
                {justifyContent: 'space-between', height: HEIGHT / 2},
              ]}>
              <View style={{}}>
                <Text
                  style={{textAlign: 'center', fontSize: 17, paddingTop: 20}}>
                  Write A Review
                </Text>
              </View>
              <View style={{backgroundColor: '#FFF', marginBottom: 20}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginHorizontal: 10,
                    marginBottom: 20,
                  }}>
                  <Text
                    style={{fontSize: 18, fontWeight: '300', marginLeft: 5}}>
                    Rate
                  </Text>
                  <View style={{height: 29}}>
                    <SwipeableRating
                      swipeable={true}
                      rating={parseFloat(this.state.rate)}
                      allowHalves={false}
                      onPress={rating => this.setState({rate: rating})}
                      xOffset={230}
                      size={29}
                      emptyColor="#F98F03"
                      color="#F98F03"
                    />
                  </View>
                </View>

                <View style={{marginHorizontal: 10, marginBottom: 20}}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '300',
                      marginLeft: 5,
                      marginBottom: 10,
                    }}>
                    Subject
                  </Text>
                  <TextInput
                    placeholder={'Great Product!'}
                    onChangeText={text => this.setState({reviewTitle: text})}
                    style={{
                      paddingHorizontal: 7,
                      paddingVertical: 10,
                      fontSize: 15,
                      color: '#000',
                      borderWidth: 0.5,
                    }}
                  />
                </View>
                <View style={{marginHorizontal: 10, marginBottom: 20}}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '300',
                      marginLeft: 5,
                      marginBottom: 10,
                    }}>
                    Body
                  </Text>
                  <TextInput
                    multiline={true}
                    placeholder={'review...'}
                    onChangeText={text => this.setState({reviewBody: text})}
                    style={{
                      padding: 7,
                      height: 100,
                      fontSize: 15,
                      color: '#000',
                      borderWidth: 0.5,
                    }}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 20,
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.79}
                    onPress={() => this._addReviewAsync()}>
                    <View
                      style={{
                        width: 350,
                        height: 42,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#181325',
                        borderRadius: 25,
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: '300',
                          color: '#FFF',
                        }}>
                        POST REVIEW
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
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
                          fontSize: 18,
                          fontWeight: '400',
                          color: '#000',
                        }}>
                        Chose Payment Method
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
                            inactiveSlideScale={1}
                            inactiveSlideOpacity={1}
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
                          fontSize: 18,
                          fontWeight: '400',
                          color: '#000',
                        }}>
                        Chose Shipping Address
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

                  {/* <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{marginBottom: 25, width: WIDTH - 25}}>
                      <View style={{left: 5, marginBottom: 15}}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: '400',
                            color: '#000',
                          }}>
                          Set Quantity
                        </Text>
                      </View>
                      <View
                        style={{
                          width: WIDTH,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingHorizontal: 15,
                          paddingVertical: 10,
                        }}>
                        <View>
                          <Text>{COUNT[this.state.count]}</Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginRight: 10,
                          }}>
                          <TouchableOpacity
                            style={{padding: 5}}
                            onPress={() =>
                              this.state.count > 1
                                ? this.setState({count: this.state.count - 1})
                                : null
                            }>
                            <Icon name="remove" />
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{
                              paddingHorizontal: 10,
                              paddingVertical: 5,
                              marginLeft: 7,
                            }}
                            onPress={() =>
                              this.state.count < 7
                                ? this.setState({count: this.state.count + 1})
                                : null
                            }>
                            <Icon name="add" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View> */}

                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{marginBottom: 25, width: WIDTH - 25}}>
                      <View style={{left: 5, marginBottom: 15}}>
                        <Text
                          style={{
                            fontSize: 18,
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
                            {this.state.productInfo.title}
                          </Text>
                          <Text style={{fontSize: 15.5, fontWeight: '600'}}>
                            ${this.state.productInfo.price}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: 25,
                    }}>
                    <View style={{marginBottom: 25, width: WIDTH - 25}}>
                      <View style={{left: 5, marginBottom: 15}}>
                        <Text
                          style={{
                            fontSize: 18,
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
                            {this.state.count}
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
                          <Text style={{fontSize: 15.5, fontWeight: '600'}}>
                            $
                            {this.state.price === ''
                              ? this.state.productInfo.price
                              : this.state.price}
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
                        If the product is different from what was described, you
                        will recieve a full refund.
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
              </ScrollView>
              <View style={{alignItems: 'center', marginTop: 5}}>
                <View style={{width: WIDTH - 80, marginBottom: 20}}>
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
                      onPress={() => this._applyCuponAsync()}>
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
  navigationHeader: {
    position: 'absolute',
    height: 40,
    width: WIDTH,
    backgroundColor: '#FFF',
    overflow: 'hidden',
    zIndex: 9,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  modalContent: {
    flexDirection: 'column',
    alignItems: 'center',
    borderTopLeftRadius: 25,
    backgroundColor: '#FFF',
    zIndex: 999,
  },
  container: {
    width: '100%',
    position: 'absolute',
    height: 110,
    zIndex: 99,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  button: {
    paddingHorizontal: 4,
    marginHorizontal: 17,
  },
  headLine: {
    position: 'absolute',
    right: 15,
    width: 240,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '300',
    // paddingLeft: 10,
    color: '#000',
    marginBottom: 7,
  },
  reviewContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  addToCarSheet: {
    height: '30%',
  },
  paymentMethodsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
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

export default ProductScreen;
