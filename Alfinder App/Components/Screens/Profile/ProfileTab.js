/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {
  View,
  Text,
  Alert,
  Modal,
  Image,
  Platform,
  Animated,
  TextInput,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import KeyboardManager, {PreviousNextView} from 'react-native-keyboard-manager';

import {CONFIG} from './../../App/Config';
import {RateApp} from './../../App/Utils';

import Icon from 'react-native-ionicons';
import Carousel from 'react-native-snap-carousel';
import NetInfo from '@react-native-community/netinfo';

const WIDTH = CONFIG.width;
const HEIGHT = CONFIG.height;
const COLORS = CONFIG.cardColors;

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);

    if (Platform.OS === 'ios') {
      KeyboardManager.setEnable(true);
      KeyboardManager.setEnableDebugging(false);
      KeyboardManager.setEnableAutoToolbar(true);
      KeyboardManager.resignFirstResponder();
      KeyboardManager.setToolbarManageBehaviour(0);
      KeyboardManager.setShouldResignOnTouchOutside(true);
      KeyboardManager.setOverrideKeyboardAppearance(false);
      KeyboardManager.setKeyboardDistanceFromTextField(30);
      KeyboardManager.setShouldShowToolbarPlaceholder(false);
      KeyboardManager.setPreventShowingBottomBlankSpace(true);
      KeyboardManager.setToolbarPreviousNextButtonEnable(true);
      KeyboardManager.setToolbarDoneBarButtonItemText('close');
      KeyboardManager.setShouldToolbarUsesTextFieldTintColor(false);
    }

    this.state = {
      modalOpacity: new Animated.Value(0),
      modalDisplay: 'none',
      addressModalHeight: new Animated.Value(450),
      addressModalComplementHeight: new Animated.Value(HEIGHT - 450),

      refreshing: false,

      userInfo: [],
      userProfile: [],

      loadingPaymentMethods: true,
      noPaymentMethods: true,
      paymentMethods: [],

      loadingAddresses: true,
      showAddressModal: false,
      showAddAddressPanel: false,
      noAddress: true,
      addresses: [],

      fname: '',
      lname: '',
      street: '',
      unit: '',
      city: '',
      state: '',
      zipcode: '',
      country: 'USA',
      phone: '',

      fnameError: false,
      lnameError: false,
      streetError: false,
      unitError: false,
      cityError: false,
      stateError: false,
      zipcodeError: false,
      countryError: false,
      phoneError: false,

      optionsModal: false,
      passwordModal: false,

      password: '',
      password_confirmation: '',
      passwordResetError: '',

      toasterDisplay: 'none',
      toasterOpacity: new Animated.Value(0),
      toasterText: '',
    };

    this.paymentCarousel = React.createRef();
    this.addressCarousel = React.createRef();
  }

  async componentDidMount() {
    this._bootstrapAsync();
    await this._getAppKey();

    if (this.state.isConnected) {
      await this._getUserInfoAsync();
    }
  }

  _bootstrapAsync = () => {
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
      // throw e;
    }
  };

  _onRefresh() {
    this.setState({refreshing: true});
    setTimeout(() => this._getUserInfoAsync(), 800);
  }

  onChangeText = (key, val) => {
    this.setState({[key]: val});
  };

  _getUserInfoAsync = async () => {
    try {
      let response = await fetch(
        'https://alfinder.com/alfinder/public/api/user/get',
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
          userInfo: responseJson.data,
          refreshing: false,
        });
        await this._GetSetUserProfileAsync();
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
    } catch (error) {
      // throw error;
    }
  };

  _GetSetUserProfileAsync = async () => {
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
          userProfile: responseJson.data,
          paymentMethods: responseJson.data.paymentProfiles,
          loadingPaymentMethods: false,
          noPaymentMethods: !responseJson.data.hasOwnProperty(
            'paymentProfiles',
          ),
          addresses: responseJson.data.shipToList,
          loadingAddresses: false,
          noAddress: !responseJson.data.hasOwnProperty('shipToList'),
        });
      } else if (response.status === 401) {
        // try {
        await AsyncStorage.removeItem('AlfinderUserToken');
        this.props.navigation.navigate('Welcome');
        // } catch (e) {
        //   // throw e;
        // }
      } else {
        Alert.alert('Please Try Again');
      }
    } catch (error) {
      // throw error;
    }
  };

  _signOutAsync = async () => {
    this.setState({optionsModal: false});
    try {
      let response = await fetch(
        'https://alfinder.com/alfinder/public/api/user/logout',
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
        // let responseJson = await response.json();
        try {
          await AsyncStorage.removeItem('AlfinderUserToken');
          this.props.navigation.navigate('Welcome');
        } catch (e) {
          // throw e;
        }
      } else {
        try {
          await AsyncStorage.removeItem('AlfinderUserToken');
          this.props.navigation.navigate('Welcome');
        } catch (e) {
          // throw e;
        }
      }
    } catch (error) {
      try {
        await AsyncStorage.removeItem('AlfinderUserToken');
        this.props.navigation.navigate('Welcome');
      } catch (e) {
        // throw e;
      }
    }
  };

  _resetPassword = async () => {
    this.setState({passwordResetError: ''});
    const {password, password_confirmation} = this.state;

    if (password.trim() === '' || password_confirmation.trim() === '') {
      // this.setState({password: '', password_confirmation: ''});
      this.setState({passwordResetError: "Passwords Can't Be Empty"});
      return;
    }

    if (password !== password_confirmation) {
      this.setState({passwordResetError: 'Passwords Must Match'});
      return;
    }

    try {
      let response = await fetch(
        'https://alfinder.com/alfinder/public/api/user/password/reset',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: this.authToken,
          },
          body: JSON.stringify({
            logged: true,
            email: this.state.userInfo.email,
            password: password,
            password_confirmation: password_confirmation,
          }),
        },
      );
      if (response.status === 200) {
        const responseJson = await response.json();
        if (responseJson.data.code === 0) {
          this.props.navigation.navigate('Welcome');
        } else if (responseJson.data.code === 2) {
          Alert.alert(responseJson.data.message);
        } else if (responseJson.data.code === 7) {
          // Alert.alert(responseJson.data.message);
          this.setState({passwordModal: false});
        } else {
          Alert.alert('Please Try Again');
        }
      }
    } catch (error) {
      try {
        await AsyncStorage.removeItem('AlfinderUserToken');
        this.props.navigation.navigate('Welcome');
      } catch (e) {
        throw e;
      }
    }
  };

  _redeamGiftAsync = async () => {
    Alert.alert('Stay Tuned For Great News!');
    // try {
    //   let response = await fetch(
    //     'https://alfinder.com/alfinder/public/api/points/user/redeem',
    //     {
    //       method: 'POST',
    //       headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //         Authorization: this.authToken,
    //       },
    //     },
    //   );
    //   if (response.status === 200) {
    //     const responseJson = await response.json();
    //     Alert.alert('responseJson');
    //   } else if (response.status === 401) {
    //   } else {
    //     Alert.alert('Please Try Again');
    //   }
    // } catch (error) {
    //   throw error;
    // }
  };

  _openAddressModal = () => {
    this.setState({showAddressModal: true, modalDisplay: 'flex'});
    this.animateModalOpacity();
  };
  _closeAddressModal = () => {
    this.setState({
      addressModalHeight: new Animated.Value(450),
      addressModalComplementHeight: new Animated.Value(HEIGHT - 450),
      showAddressModal: false,
      showAddAddressPanel: false,
      modalDisplay: 'none',
      fnameError: false,
      lnameError: false,
      streetError: false,
      unitError: false,
      cityError: false,
      stateError: false,
      zipcodeError: false,
      countryError: false,
      phoneError: false,
      numberError: false,
      exp_mError: false,
      exp_yError: false,
      codeError: false,
    });
    this._hideAddAddressPanel();
    // this.reAnimateAddressModalHeight();
    this.reAnimateModalOpacity();
  };

  _addAddressAsync = async () => {
    const {
      fname,
      lname,
      street,
      unit,
      city,
      state,
      zipcode,
      country,
      phone,
    } = this.state;

    if (fname.trim() === '') {
      this.setState({fnameError: true});
      return;
    }
    if (lname.trim() === '') {
      this.setState({lnameError: true});
      return;
    }
    if (street.trim() === '') {
      this.setState({streetError: true});
      return;
    }
    // if (unit.trim() === '') {
    //   this.setState({unitError: true});
    //   return;
    // }
    if (city.trim() === '') {
      this.setState({cityError: true});
      return;
    }
    if (zipcode.trim() === '') {
      this.setState({zipcodeError: true});
      return;
    }
    if (state.trim() === '') {
      this.setState({stateError: true});
      return;
    }
    // if (country.trim() === '') {
    //   this.setState({countryError: true});
    //   return;
    // }

    try {
      let response = await fetch(
        'https://alfinder.com/alfinder/public/api/user/addresses/create',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: this.authToken,
          },
          body: JSON.stringify({
            fname: fname.trim(),
            lname: lname.trim(),
            street:
              unit.trim() !== ''
                ? street.trim() + ', ' + unit.trim()
                : street.trim(),
            city: city.trim(),
            state: state.trim(),
            zipcode: zipcode.trim(),
            // country: country.trim(),
            country: 'USA',
            phone:
              phone.trim() === null
                ? this.state.userInfo.phone_number
                : phone.trim(),
          }),
        },
      );
      if (response.status === 200) {
        let responseJson = await response.json();
        if (responseJson.data.code === 7) {
          this._closeAddressModal();
          Alert.alert('Shipping Address Successfully Added');
          await this._GetSetUserProfileAsync();
        } else {
          Alert.alert('Please Try Again');
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

  _removeAddressAsync = async id => {
    try {
      let response = await fetch(
        'https://alfinder.com/alfinder/public/api/user/addresses/delete',
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: this.authToken,
          },
          body: JSON.stringify({
            address_id: id,
          }),
        },
      );
      if (response.status === 200) {
        let responseJson = await response.json();

        if (responseJson.data.code === 7) {
          await this._GetSetUserProfileAsync();
        } else {
          Alert.alert('Please Try Again');
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

  _displayAddAddressPanel() {
    if (this.state.showAddAddressPanel) {
      this._addAddressAsync();
    } else {
      this.setState({showAddAddressPanel: true});
      this.animateAddressModalHeight();
    }
  }
  _hideAddAddressPanel() {
    this.setState({
      fname: '',
      lname: '',
      street: '',
      unit: '',
      city: '',
      state: '',
      zipcode: '',
      country: '',
      phone: '',
      fnameError: false,
      lnameError: false,
      streetError: false,
      unitError: false,
      cityError: false,
      stateError: false,
      zipcodeError: false,
      countryError: false,
      phoneError: false,
      numberError: false,
      exp_mError: false,
      exp_yError: false,
      codeError: false,
      showAddAddressPanel: false,
    });
    this.reAnimateAddressModalHeight();
  }

  _renderPaymentCard({item, index}) {
    return (
      <View>
        <View
          style={[styles.paymentCard, {backgroundColor: COLORS[index]}]}
          key={'{index}'}>
          <View
            style={{
              justifyContent: 'flex-end',
              height: '80%',
              paddingHorizontal: 20,
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 17,
                fontWeight: '300',
                textAlign: 'center',
              }}>
              {item.payment.creditCard.cardNumber}
            </Text>
            <Text
              style={{
                color: '#fff',
                fontSize: 15,
                fontWeight: '300',
                textAlign: 'right',
              }}>
              {item.payment.creditCard.cardType}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <TouchableOpacity
            onPress={() =>
              this._removePaymentMethodAsync(item.customerPaymentProfileId)
            }>
            <Text style={{marginRight: 20, color: 'red', fontWeight: '600'}}>
              Remove Payment Method
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _renderAddress({item, index}) {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={{width: WIDTH - 50, height: '100%'}} key={'{index}'}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-evenly',
            }}>
            <View>
              <View style={{flexDirection: 'row', marginBottom: 17}}>
                <View style={{width: '50%'}}>
                  <Text
                    style={{marginBottom: 4, fontSize: 15, fontWeight: '600'}}>
                    First Name
                  </Text>
                  <Text style={{marginLeft: 4, textTransform: 'capitalize'}}>
                    {item.firstName}
                  </Text>
                </View>
                <View style={{width: '50%'}}>
                  <Text
                    style={{marginBottom: 4, fontSize: 15, fontWeight: '600'}}>
                    Last Name
                  </Text>
                  <Text style={{marginLeft: 4}}>{item.lastName}</Text>
                </View>
              </View>
              <View style={{marginBottom: 17}}>
                <Text
                  style={{marginBottom: 4, fontSize: 15, fontWeight: '600'}}>
                  Street
                </Text>
                <Text style={{marginLeft: 4, textTransform: 'capitalize'}}>
                  {item.address}
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginBottom: 17}}>
                <View style={{width: '50%'}}>
                  <Text
                    style={{marginBottom: 4, fontSize: 15, fontWeight: '600'}}>
                    City
                  </Text>
                  <Text style={{marginLeft: 4, textTransform: 'capitalize'}}>
                    {item.city}
                  </Text>
                </View>
                <View style={{width: '50%'}}>
                  <Text
                    style={{marginBottom: 4, fontSize: 15, fontWeight: '600'}}>
                    Zipcode
                  </Text>
                  <Text style={{marginLeft: 4}}>{item.zip}</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '50%'}}>
                  <Text
                    style={{
                      marginBottom: 4,
                      fontSize: 15,
                      fontWeight: '600',
                      textTransform: 'capitalize',
                    }}>
                    State
                  </Text>
                  <Text style={{marginLeft: 4, textTransform: 'uppercase'}}>
                    {item.state}
                  </Text>
                </View>
                <View style={{width: '50%'}}>
                  <Text
                    style={{marginBottom: 4, fontSize: 15, fontWeight: '600'}}>
                    Country
                  </Text>
                  <Text style={{marginLeft: 4}}>{item.country}</Text>
                </View>
              </View>
            </View>

            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() =>
                  this._removeAddressAsync(item.customerAddressId)
                }>
                <Text
                  style={{marginRight: 20, color: 'red', fontWeight: '600'}}>
                  Remove Shipping Address
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  _openOptionsModal = () => {
    this.setState({optionsModal: true});
    this.animateModalOpacity();
  };
  _closeOptionsModal = () => {
    this.setState({optionsModal: false});
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

  animateAddressModalHeight = () => {
    Animated.parallel([
      Animated.timing(this.state.addressModalHeight, {
        toValue: 520,
        duration: 300,
      }),
      Animated.timing(this.state.addressModalComplementHeight, {
        toValue: HEIGHT - 520,
        duration: 300,
      }),
    ]).start();
  };
  reAnimateAddressModalHeight = () => {
    Animated.parallel([
      Animated.timing(this.state.addressModalHeight, {
        toValue: 450,
        duration: 300,
      }),
      Animated.timing(this.state.addressModalComplementHeight, {
        toValue: HEIGHT - 450,
        duration: 300,
      }),
    ]).start();
  };

  animateAddPaymentodalHeight = () => {
    Animated.parallel([
      Animated.timing(this.state.PaymentModalHeight, {
        toValue: HEIGHT - 50,
        duration: 200,
      }),
      Animated.timing(this.state.PaymentModalComplementHeight, {
        toValue: 50,
        duration: 200,
      }),
    ]).start();
  };
  reAnimatePaymentModalHeight = () => {
    Animated.parallel([
      Animated.timing(this.state.PaymentModalHeight, {
        toValue: 450,
        duration: 280,
      }),
      Animated.timing(this.state.PaymentModalComplementHeight, {
        toValue: HEIGHT - 450,
        duration: 280,
      }),
    ]).start();
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
          <View style={{height: 90, backgroundColor: '#fff'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: 7,
                marginHorizontal: 10,
                marginTop: 50,
                marginBottom: 5,
              }}>
              <Text style={{fontSize: 24, left: 10}}>Profile</Text>
              <TouchableOpacity
                onPress={() => this._openOptionsModal()}
                activeOpacity={0.7}
                style={{
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  marginBottom: -5,
                  paddingVertical: 5,
                }}>
                <View style={{alignItems: 'flex-end'}}>
                  <View
                    style={{
                      width: 35,
                      borderBottomWidth: 1.5,
                      borderColor: '#333',
                      marginBottom: 5,
                    }}
                  />
                  <View
                    style={{
                      width: 25,
                      borderBottomWidth: 1,
                      borderColor: '#555',
                      marginBottom: 5,
                    }}
                  />
                  <View
                    style={{
                      width: 35,
                      borderBottomWidth: 1.2,
                      borderColor: '#333',
                      marginBottom: 0,
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />
            }>
            <View
              style={{flex: 1, flexDirection: 'column', marginHorizontal: 10}}>
              <View
                style={{
                  marginBottom: 15,
                  paddingTop: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 35,
                    borderRadius: 9,
                    backgroundColor: '#FFF',
                    shadowColor: '#261F3C',
                    shadowOffset: {width: 0, height: 1.5},
                    shadowOpacity: 0.25,
                    shadowRadius: 3,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                      paddingBottom: 20,
                    }}>
                    <View
                      style={{
                        width: WIDTH / 3,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 5,
                        opacity: 0.5,
                      }}>
                      <Text style={{fontSize: 50, fontWeight: '200'}}>
                        {this.state.userInfo.pending_points}
                      </Text>
                      <Text
                        style={{
                          fontStyle: 'italic',
                          fontSize: 18,
                          fontWeight: '300',
                        }}>
                        pending
                      </Text>
                    </View>

                    <View
                      style={{
                        width: 60,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={{fontSize: 50, fontWeight: '100'}}>+</Text>
                    </View>

                    <View
                      style={{
                        width: WIDTH / 3,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={{fontSize: 50, fontWeight: '200'}}>
                        {this.state.userInfo.points}
                      </Text>
                      <Text
                        style={{
                          fontStyle: 'italic',
                          fontSize: 18,
                          fontWeight: '300',
                        }}>
                        earned
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      style={{width: '50%'}}
                      activeOpacity={0.8}
                      onPress={this._redeamGiftAsync}>
                      <View
                        style={{
                          backgroundColor: '#FFF',
                          paddingVertical: 13,
                        }}>
                        <Text style={{textAlign: 'center', color: '#6755a4'}}>
                          Redeam My Gift
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{width: '50%'}}
                      activeOpacity={1}
                      onPress={() =>
                        this.props.navigation.navigate('PointSystem')
                      }>
                      <View
                        style={{
                          backgroundColor: '#FFF',
                          paddingVertical: 13,
                        }}>
                        <Text style={{textAlign: 'center', color: '#222'}}>
                          Alfinder Point System
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  marginBottom: 10,
                  paddingVertical: 10,
                }}>
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => this.props.navigation.navigate('Cart')}>
                  <View
                    style={{
                      width: WIDTH / 2 - 15,
                      height: WIDTH / 3 - 15,
                      padding: 5,
                      borderRadius: 4,
                      justifyContent: 'flex-end',
                      backgroundColor: '#000',
                    }}>
                    <View
                      style={{
                        marginHorizontal: 5,
                        marginBottom: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          fontSize: 19,
                          fontWeight: '300',
                          color: '#FFF',
                        }}>
                        CART
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => this.props.navigation.navigate('Orders')}>
                  <View
                    style={{
                      width: WIDTH / 2 - 15,
                      height: WIDTH / 3 - 15,
                      padding: 5,
                      borderRadius: 4,
                      justifyContent: 'flex-end',
                      backgroundColor: '#000',
                    }}>
                    <View style={{marginLeft: 5}}>
                      <Text
                        style={{
                          paddingBottom: 5,
                          fontSize: 19,
                          fontWeight: '300',
                          color: '#FFF',
                        }}>
                        ORDERS
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{marginTop: 30}}>
                <View style={styles.linkContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('PersonalInfo', {
                        info: this.state.userInfo,
                      })
                    }>
                    <View style={styles.linkContent}>
                      <Text style={styles.link}>Personal Information</Text>
                      <Image
                        source={require('./../../../Assets/photos/icons/double-right.png')}
                        style={{width: 25, height: 25}}
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={styles.linkContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('Wallet', {
                        info: this.state.paymentMethods,
                      })
                    }>
                    <View style={styles.linkContent}>
                      <Text style={styles.link}>Wallet</Text>
                      <Image
                        source={require('./../../../Assets/photos/icons/bank-cards.png')}
                        style={{width: 33, height: 30}}
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={styles.linkContainer}>
                  <TouchableOpacity onPress={() => this._openAddressModal()}>
                    <View style={styles.linkContent}>
                      <Text style={styles.link}>Shipping Address</Text>
                      <Image
                        source={require('./../../../Assets/photos/icons/home-address.png')}
                        style={{width: 35, height: 30}}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{marginTop: 40}}>
                <View style={styles.linkContainer}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Settings')}>
                    <View style={styles.linkContent}>
                      <Text style={styles.link}>Settings</Text>
                      <Image
                        source={require('./../../../Assets/photos/icons/double-right.png')}
                        style={{width: 25, height: 25}}
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={styles.linkContainer}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Help')}>
                    <View style={styles.linkContent}>
                      <Text style={styles.link}>Help</Text>
                      <Image
                        source={require('./../../../Assets/photos/icons/double-right.png')}
                        style={{width: 25, height: 25}}
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={styles.linkContainer}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('About')}>
                    <View style={styles.linkContent}>
                      <Text style={styles.link}>About</Text>
                      <Image
                        source={require('./../../../Assets/photos/icons/double-right.png')}
                        style={{width: 25, height: 25}}
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={styles.linkContainer}>
                  <TouchableOpacity onPress={() => RateApp()}>
                    <View style={styles.linkContent}>
                      <Text style={styles.link}>Rate</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 50,
                  marginBottom: 20,
                }}>
                <Image
                  source={require('./../../../Assets/photos/Alfinder_Logo-4.png')}
                  style={{width: 100, height: 20, marginBottom: 10}}
                />
                <Text style={{fontSize: 10, color: '#999'}}>
                  TM and &#169; 2020 Alfinder Inc. "Alfinder"
                </Text>
                <Text style={{fontSize: 10, color: '#999'}}>
                  All Rights Reserved.
                </Text>
              </View>
            </View>
          </ScrollView>

          {/*  Options MODAL */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.optionsModal}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => this._closeOptionsModal()}>
              <View style={{width: WIDTH, height: HEIGHT - 150}} />
            </TouchableOpacity>
            <View>
              <View style={[styles.modalContent, {height: 150}]}>
                <View style={{height: 20}} />
                <View style={{alignItems: 'center'}}>
                  <View
                    style={{
                      width: WIDTH - 20,
                      height: 45,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderBottomWidth: 0.4,
                      borderColor: '#ccc',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        this._closeOptionsModal();
                        this.setState({passwordModal: true});
                      }}>
                      <View style={{marginLeft: 7, alignItems: 'center'}}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '400',
                            color: '#222',
                            paddingBottom: 3,
                          }}>
                          Change Password
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{alignItems: 'center'}}>
                  <View
                    style={{
                      width: WIDTH - 20,
                      height: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderBottomWidth: 0.4,
                      borderColor: '#ccc',
                    }}>
                    <TouchableOpacity onPress={this._signOutAsync}>
                      <View style={{marginLeft: 7}}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '400',
                            color: 'red',
                          }}>
                          Sign Out
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>

          {/* Shipping Addresses Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.showAddressModal}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => this._closeAddressModal()}>
              <Animated.View
                style={{
                  width: WIDTH,
                  height: this.state.addressModalComplementHeight,
                }}
              />
            </TouchableOpacity>
            <View>
              <Animated.View
                style={[
                  styles.modalContent,
                  {
                    justifyContent: 'space-between',
                    height: this.state.addressModalHeight,
                  },
                ]}>
                <View>
                  <Text
                    style={{textAlign: 'center', fontSize: 17, paddingTop: 20}}>
                    Shipping Addresses
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {!this.state.showAddAddressPanel ? (
                    !this.state.loadingAddresses ? (
                      !this.state.noAddress ? (
                        <Carousel
                          ref={this.addressCarousel}
                          activeSlideAlignment={'start'}
                          data={this.state.addresses}
                          renderItem={this._renderAddress.bind(this)}
                          sliderWidth={WIDTH - 20}
                          itemWidth={WIDTH - 20}
                          inactiveSlideScale={1}
                        />
                      ) : (
                        <View style={{alignItems: 'center'}}>
                          <Text>No Addresses</Text>
                        </View>
                      )
                    ) : (
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text>Loading...</Text>
                      </View>
                    )
                  ) : (
                    <View>
                      <View
                        style={{
                          marginRight: 20,
                          marginBottom: 10,
                          alignItems: 'flex-end',
                        }}>
                        <TouchableOpacity
                          onPress={() => this._hideAddAddressPanel()}>
                          <Icon name="close-circle-outline" size={28} />
                        </TouchableOpacity>
                      </View>
                      <PreviousNextView>
                        <View style={[styles.inputContainer, {marginTop: 0}]}>
                          <View style={{flexDirection: 'row'}}>
                            <View style={[styles.inputContent, {width: '45%'}]}>
                              <Text
                                style={{
                                  color: this.state.fnameError ? 'red' : '#000',
                                }}>
                                First Name
                              </Text>
                              <TextInput
                                style={styles.input}
                                placeholder="first name"
                                autoCapitalize="words"
                                placeholderTextColor="#888"
                                onChangeText={val =>
                                  this.onChangeText('fname', val)
                                }
                              />
                            </View>
                            <View style={[styles.inputContent, {width: '55%'}]}>
                              <Text
                                style={{
                                  color: this.state.lnameError ? 'red' : '#000',
                                }}>
                                Last Name
                              </Text>
                              <TextInput
                                style={styles.input}
                                placeholder="last name"
                                autoCapitalize="words"
                                placeholderTextColor="#888"
                                onChangeText={val =>
                                  this.onChangeText('lname', val)
                                }
                              />
                            </View>
                          </View>

                          <View style={{flexDirection: 'row'}}>
                            <View style={[styles.inputContent, {width: '65%'}]}>
                              <Text
                                style={{
                                  color: this.state.streetError
                                    ? 'red'
                                    : '#000',
                                }}>
                                Street
                              </Text>
                              <TextInput
                                style={styles.input}
                                placeholder="1234 XXX St."
                                autoCapitalize="words"
                                placeholderTextColor="#888"
                                onChangeText={val =>
                                  this.onChangeText('street', val)
                                }
                              />
                            </View>
                            <View style={[styles.inputContent, {width: '35%'}]}>
                              <Text
                                style={{
                                  color: this.state.unitError ? 'red' : '#000',
                                }}>
                                Unit
                              </Text>
                              <TextInput
                                style={styles.input}
                                placeholder="Apt. 1234"
                                autoCapitalize="none"
                                placeholderTextColor="#888"
                                onChangeText={val =>
                                  this.onChangeText('unit', val)
                                }
                              />
                            </View>
                          </View>
                          <View style={{flexDirection: 'row'}}>
                            <View style={[styles.inputContent, {width: '65%'}]}>
                              <Text
                                style={{
                                  color: this.state.cityError ? 'red' : '#000',
                                }}>
                                City
                              </Text>
                              <TextInput
                                style={[styles.input]}
                                placeholder="Los Angeles"
                                autoCapitalize="words"
                                placeholderTextColor="#888"
                                onChangeText={val =>
                                  this.onChangeText('city', val)
                                }
                              />
                            </View>
                            <View style={[styles.inputContent, {width: '35%'}]}>
                              <Text
                                style={{
                                  color: this.state.zipcodeError
                                    ? 'red'
                                    : '#000',
                                }}>
                                Zipcode
                              </Text>
                              <TextInput
                                style={[styles.input]}
                                placeholder="99999"
                                autoCapitalize="none"
                                placeholderTextColor="#888"
                                onChangeText={val =>
                                  this.onChangeText('zipcode', val)
                                }
                              />
                            </View>
                          </View>
                          <View style={{flexDirection: 'row'}}>
                            <View style={[styles.inputContent, {width: '65%'}]}>
                              <Text
                                style={{
                                  color: this.state.stateError ? 'red' : '#000',
                                }}>
                                State
                              </Text>
                              <TextInput
                                style={[styles.input]}
                                placeholder="California"
                                autoCapitalize="characters"
                                placeholderTextColor="#888"
                                onChangeText={val =>
                                  this.onChangeText('state', val)
                                }
                              />
                            </View>
                            <View style={[styles.inputContent, {width: '35%'}]}>
                              <Text
                                style={{
                                  color: this.state.countryError
                                    ? 'red'
                                    : '#000',
                                }}>
                                Country
                              </Text>
                              <TextInput
                                style={[styles.input, {width: 110}]}
                                defaultValue="USA"
                                editable={false}
                                autoCapitalize="characters"
                                placeholderTextColor="#888"
                              />
                            </View>
                          </View>
                        </View>
                      </PreviousNextView>
                    </View>
                  )}
                </View>
                <View
                  style={{
                    marginBottom: 40,
                    backgroundColor: '#000',
                    width: 300,
                    padding: 4,
                  }}>
                  <TouchableOpacity
                    onPress={() => this._displayAddAddressPanel()}>
                    <View style={{padding: 7}}>
                      <Text
                        style={{
                          fontWeight: '400',
                          fontSize: 14,
                          color: '#FFF',
                          textAlign: 'center',
                        }}>
                        Add Shipping Address
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </View>
          </Modal>

          {/*  Reset Password MODAL */}
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.passwordModal}>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <View
                style={[
                  styles.modalContent,
                  {height: HEIGHT, justifyContent: 'space-between'},
                ]}>
                <View
                  style={{
                    // position: 'absolute',
                    width: WIDTH,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingTop: 30,
                  }}>
                  <View
                    style={{
                      position: 'absolute',
                      paddingHorizontal: 5,
                      top: 55,
                      left: 20,
                    }}>
                    <TouchableOpacity
                      style={{paddingVertical: 4, paddingHorizontal: 7}}
                      activeOpacity={0.5}
                      onPress={() => this.setState({passwordModal: false})}>
                      <Icon name="close" />
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{textAlign: 'center', fontSize: 17, paddingTop: 20}}>
                    Reset Password
                  </Text>
                </View>
                <View
                  style={{
                    width: WIDTH,
                    height: HEIGHT,
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: '80%',
                      marginTop: 100,
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        marginBottom: 15,
                        borderBottomWidth: 0.4,
                        borderColor: '#bbb',
                      }}>
                      <Text
                        style={{
                          color: this.state.emailHasError ? 'red' : '#000',
                        }}>
                        New Password
                      </Text>
                      <TextInput
                        style={styles.input}
                        multiline={false}
                        placeholder="password"
                        maxLength={50}
                        autoCapitalize="none"
                        autoCompleteType="off"
                        placeholderTextColor="#888"
                        textContentType="newPassword"
                        secureTextEntry={true}
                        spellCheck={false}
                        onChangeText={val => this.onChangeText('password', val)}
                      />
                    </View>
                    <View
                      style={{
                        marginBottom: 15,
                        borderBottomWidth: 0.4,
                        borderColor: '#aaa',
                      }}>
                      <Text
                        style={{
                          color: this.state.emailHasError ? 'red' : '#000',
                        }}>
                        Confirm Password
                      </Text>
                      <TextInput
                        style={styles.input}
                        multiline={false}
                        placeholder="password"
                        maxLength={50}
                        autoCapitalize="none"
                        autoCompleteType="off"
                        placeholderTextColor="#888"
                        textContentType="password"
                        spellCheck={false}
                        secureTextEntry={true}
                        onChangeText={val =>
                          this.onChangeText('password_confirmation', val)
                        }
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={{position: 'absolute', bottom: 10, left: 50}}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 13,
                    fontWeight: '700',
                    color: 'red',
                    marginBottom: 5,
                  }}>
                  {this.state.passwordResetError}
                </Text>
                <View
                  style={{
                    width: WIDTH - 100,
                    justifyContent: 'center',
                    marginBottom: 40,
                  }}>
                  <TouchableOpacity
                    style={{marginBottom: 5}}
                    activeOpacity={0.8}
                    onPress={this._resetPassword}>
                    <View
                      style={{
                        backgroundColor: '#181325',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 7,
                        height: 43,
                        borderRadius: 2,
                      }}>
                      <Text
                        style={{
                          color: '#FFF',
                          textAlign: 'center',
                          fontSize: 16,
                          fontWeight: '300',
                        }}>
                        Update Password
                      </Text>
                    </View>
                  </TouchableOpacity>
                  {/* <Text
                    style={{
                      fontSize: 11,
                      color: '#666',
                      textAlign: 'center',
                    }}>
                    you will be automatically logged out
                  </Text> */}
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
}

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 10,
  },
  container: {
    width: '100%',
    position: 'relative',
    height: 110,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
  },
  button: {
    width: 43,
    height: 50,
    marginRight: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headLine: {
    position: 'absolute',
    right: 15,
    width: 240,
  },
  modalContent: {
    flexDirection: 'column',
    alignItems: 'center',
    borderTopLeftRadius: 25,
    backgroundColor: '#FFF',
  },
  OrderModal: {
    height: '91%',
  },
  paymentModal: {
    height: '60%',
  },
  paymentMethodsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
  },
  paymentCard: {
    width: 340,
    height: 200,
    justifyContent: 'center',
    borderRadius: 15,
  },
  cardName: {
    marginLeft: 20,
    fontSize: 17,
    color: 'white',
  },
  cardNumber: {
    fontSize: 19,
    textAlign: 'center',
    marginBottom: '10%',
    paddingVertical: 10,
    color: 'white',
  },
  inputContainer: {
    // marginTop: 50,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    color: 'white',
  },
  inputContent: {
    marginBottom: 10,
    paddingLeft: 10,
    borderBottomWidth: 0.4,
    borderColor: '#bbb',
  },
  input: {
    width: 350,
    height: 40,
    backgroundColor: '#FFF',
    marginVertical: 3,
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
  linkContainer: {
    borderColor: '#ccc',
    borderBottomWidth: 0.4,
    paddingHorizontal: 5,
  },
  linkContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: WIDTH - 30,
    height: 45,
  },
  link: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
    paddingVertical: 5,
  },
});

export default ProfileScreen;
