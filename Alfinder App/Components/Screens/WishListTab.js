/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {
  View,
  Text,
  Alert,
  Modal,
  Image,
  Animated,
  StyleSheet,
  Dimensions,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-ionicons';
import FastImage from 'react-native-fast-image';
import {FlatList} from 'react-native-gesture-handler';
import NetInfo from '@react-native-community/netinfo';
import SwipeableRating from 'react-native-swipeable-rating';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

class WishList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpacity: new Animated.Value(0),
      modalDisplay: 'none',
      emptyWishListModal: false,

      loading: true,
      refreshing: true,
      wishListIsEmpty: null,
      wishListData: [],
      wishListProducts: [],

      showAddToCartModal: false,
      options: '',
      id: null,
      option: 'select',
      count: 1,
    };
  }

  componentDidMount = async () => {
    await this._bootstrapAsync();
    await this._getAppKey();

    if (this.state.isConnected) {
      this._getWishListAsync();
    }
  };

  _bootstrapAsync = async () => {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        this.setState({isConnected: false});
      }
    });
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleConnectivityChange,
    );
  };

  _handleConnectivityChange = isConnected => {
    this.setState({isConnected: isConnected});
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
    setTimeout(() => this._getWishListAsync(), 800);
  }

  _getWishListAsync = async () => {
    try {
      let response = await fetch(
        'https://alfinder.com/alfinder/public/api/user/wishlist/get',
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
          wishListData: responseJson.data,
          wishListProducts: responseJson.data.products.data,
          wishListIsEmpty:
            responseJson.data.products.data.length > 0 ? false : true,
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

  _emptyWishListAsync = async () => {
    try {
      let response = await fetch(
        'https://alfinder.com/alfinder/public/api/user/wishlist/remove/all',
        {
          method: 'DELETE',
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
          wishListData: responseJson.data,
          wishListIsEmpty: true,
          loading: false,
          refreshing: false,
        });
        this._closeClearWishlistModal();
        this._getWishListAsync();
      } else if (response.status === 401) {
        try {
          await AsyncStorage.removeItem('AlfinderUserToken');
          this.props.navigation.navigate('Welcome');
        } catch (e) {
          throw e;
        }
      } else {
        Alert.alert(JSON.stringify(response.status));
      }
    } catch (error) {
      throw error;
    }
  };

  _removeFromWishListAsync = async id => {
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
          this.setState({
            wishlisted: false,
          });
          this._getWishListAsync();
        } else if (responseJson.data.code === 4) {
          this.setState({
            wishlisted: false,
          });
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
      Alert.alert(error);

      throw error;
    }
  };

  _openAddToCartModal = (id, options) => {
    this.setState({
      id: id,
      options: options,
      showAddToCartModal: true,
    });
  };

  _addToCartAsync = async () => {
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
            product_id: this.state.id,
            count: this.state.count,
            option: this.state.option,
          }),
        },
      );
      if (response.status === 200) {
        let responseJson = await response.json();

        if (responseJson.data.code === 7) {
          this.setState({showAddToCartModal: false});
          this._removeFromWishListAsync(this.state.id);
          this.setState({
            id: null,
            option: 'select',
            count: 1,
          });
          this._getWishListAsync();
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

  _openClearWishlistModal = () => {
    this.setState({emptyWishListModal: true});
    this.animateModalOpacity();
  };
  _closeClearWishlistModal = () => {
    this.setState({emptyWishListModal: false});
    this.reAnimateModalOpacity();
  };

  _renderWishListItem(item, index) {
    return (
      <TouchableOpacity
        key={index + ''}
        onPress={() =>
          this.props.navigation.navigate('Product', {
            productId: item.product_id,
          })
        }
        activeOpacity={1}>
        <View style={{width: WIDTH, alignItems: 'center'}}>
          <View style={styles.itemContainer}>
            <View style={styles.image}>
              <FastImage
                style={styles.image}
                source={{
                  uri: item.image,
                  priority: FastImage.priority.low,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
            <View style={styles.detailsContainer}>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text
                    numberOfLines={2}
                    ellipsizeMode={'tail'}
                    style={styles.name}>
                    {item.title}
                  </Text>
                  <Text style={styles.type}>{item.type}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 7,
                    }}
                  />
                  <View style={{marginBottom: 5}}>
                    <SwipeableRating
                      rating={parseFloat(item.rate)}
                      size={18}
                      gap={-1}
                      allowHalves={true}
                      color={'#f98f03'}
                      emptyColor={'#f98f03'}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: WIDTH - 180,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          marginRight: 10,
                          fontSize: 11,
                          fontWeight: '400',
                          color: 'gray',
                        }}>
                        PRICE
                      </Text>
                      <Text style={{fontSize: 13, fontWeight: '400'}}>
                        ${item.price}
                      </Text>
                    </View>

                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() =>
                        this._removeFromWishListAsync(item.product_id)
                      }>
                      <Text style={{color: 'red', fontWeight: '300'}}>
                        remove
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

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

  render() {
    if (!this.state.isConnected) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View>
            <Text>You Are Offline</Text>
          </View>
        </View>
      );
    } else {
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
              <Text style={{fontSize: 24, left: 20}}>WishList</Text>
              <TouchableOpacity
                activeOpacity={this.state.wishListIsEmpty ? 1 : 0.8}
                onPress={() => {
                  !this.state.wishListIsEmpty
                    ? this._openClearWishlistModal()
                    : null;
                }}>
                <Image
                  source={require('./../../Assets/photos/icons/trash.png')}
                  style={{width: 15, height: 30, marginRight: 10}}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{width: '100%', height: '100%'}}>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh.bind(this)}
                />
              }>
              {!this.state.loading ? (
                !this.state.wishListIsEmpty ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginVertical: 10,
                    }}>
                    {this.state.wishListProducts.map((item, index) =>
                      this._renderWishListItem(item, index),
                    )}
                    {/* <FlatList
                      data={this.state.wishListProducts}
                      renderItem={({item, index}) =>
                        this._renderWishListItem(item, index)
                      }
                    /> */}
                  </View>
                ) : (
                  <View
                    style={{
                      marginTop: '95%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text>Your WishList is Empty</Text>
                  </View>
                )
              ) : (
                <View
                  style={{
                    marginTop: '95%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text>Loading ...</Text>
                </View>
              )}
            </ScrollView>
          </View>

          {/* Empty WishList MODAL */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.emptyWishListModal}>
            <TouchableOpacity onPress={() => this._closeClearWishlistModal()}>
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
                  <TouchableOpacity onPress={() => this._emptyWishListAsync()}>
                    <View style={{padding: 7}}>
                      <Text
                        style={{
                          fontWeight: '400',
                          fontSize: 14,
                          color: '#FFF',
                          textAlign: 'center',
                        }}>
                        CLEAR WISHLIST
                      </Text>
                    </View>
                  </TouchableOpacity>
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
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
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
    alignContent: 'center',
    justifyContent: 'flex-start',
    marginBottom: 20,
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
    backgroundColor: '#FFF',
    borderRadius: 2,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  details: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
    paddingBottom: 7,
    minWidth: '70%',
  },
  price: {
    fontSize: 15,
    fontWeight: '300',
    marginBottom: 5,
  },
  type: {
    fontSize: 13,
    paddingBottom: 4,
    fontWeight: '300',
  },
  optionContainer: {
    backgroundColor: 'lightblue',
    borderRadius: 20,
  },
  option: {
    fontSize: 14.5,
    paddingVertical: 5,
    paddingHorizontal: 9,
  },
  modalContent: {
    flexDirection: 'column',
    alignItems: 'center',
    borderTopLeftRadius: 25,
    backgroundColor: '#FFF',
    zIndex: 999,
  },
});

export default WishList;
