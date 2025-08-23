/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  Modal,
  Animated,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import KeyboardManager, {PreviousNextView} from 'react-native-keyboard-manager';

import Icon from 'react-native-ionicons';
import NetInfo from '@react-native-community/netinfo';

import {CONFIG} from './../../App/Config';

const WIDTH = CONFIG.width;
const HEIGHT = CONFIG.height;
const COLORS = CONFIG.cardColors;

class Wallet extends Component {
  constructor(props) {
    super(props);

    const {params} = this.props.navigation.state;
    this.info = params ? params.info : null;

    this.state = {
      isConnected: true,

      modalDisplay: 'none',
      modalOpacity: new Animated.Value(0),

      showAddPaymentPanel: false,

      noPaymentMethods: true,
      paymentMethods: this.info,
      loadingPaymentMethods: false,

      cardFname: '',
      cardLname: '',
      number: '',
      exp_m: '',
      exp_y: '',
      code: '',

      cardFnameError: false,
      cardLnameError: false,
      numberError: false,
      exp_mError: false,
      exp_yError: false,
      codeError: false,

      toasterDisplay: 'none',
      toasterOpacity: new Animated.Value(0),
      toasterText: '',
    };
  }

  async componentDidMount() {
    this._bootstrapAsync();
    await this._getAppKey();
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

  onChangeText = (key, val) => {
    this.setState({[key]: val});
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
          // userProfile: responseJson.data,
          paymentMethods: responseJson.data.paymentProfiles,
          loadingPaymentMethods: false,
          noPaymentMethods: !responseJson.data.hasOwnProperty(
            'paymentProfiles',
          ),
          // addresses: responseJson.data.shipToList,
          // loadingAddresses: false,
          // noAddress: !responseJson.data.hasOwnProperty('shipToList'),
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

  _addPaymentMethodAsync = async () => {
    const {
      cardFname,
      cardLname,
      number,
      exp_m,
      exp_y,
      code,
      // phone,
    } = this.state;

    if (cardFname.trim() === '') {
      this.setState({cardFnameError: true});
      return;
    }
    if (cardLname.trim() === '') {
      this.setState({cardLnameError: true});
      return;
    }
    if (number.trim() === '') {
      this.setState({numberError: true});
      return;
    }
    if (exp_m.trim() === '') {
      this.setState({exp_mError: true});
      return;
    }
    if (exp_y.trim() === '') {
      this.setState({exp_yError: true});
      return;
    }
    if (code.trim() === '') {
      this.setState({codeError: true});
      return;
    }

    try {
      let response = await fetch(
        'https://alfinder.com/alfinder/public/api/user/payments/create',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: this.authToken,
          },
          body: JSON.stringify({
            country: 'USA',
            // phone: phone.trim(),
            number: number.trim(),
            exp_m: exp_m.trim(),
            exp_y: exp_y.trim(),
            code: code.trim(),
            create_address: false,
          }),
        },
      );
      if (response.status === 200) {
        let responseJson = await response.json();
        if (responseJson.data.code === 7) {
          this.setState({toasterText: responseJson.data.message});
          this._hideAddPaymentPanel();
          this.displayToast();
          await this._GetSetUserProfileAsync();
        } else {
          if (
            responseJson.data.message.text ===
            'This transaction has been declined.'
          ) {
            Alert.alert('Please Check Your Information And Try Again.');
          } else if (
            responseJson.data.message.text ===
            'A duplicate transaction has been submitted.'
          ) {
            Alert.alert('Please Try Again Later.');
          } else {
            Alert.alert('Please Check Your Card Information And Try Again.');
          }
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
    } catch (error) {
      // throw error;
    }
  };

  _removePaymentMethodAsync = async id => {
    try {
      let response = await fetch(
        'https://alfinder.com/alfinder/public/api/user/payments/delete',
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: this.authToken,
          },
          body: JSON.stringify({
            payment_id: id,
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
          // throw e;
        }
      } else {
        Alert.alert('Please Try Again');
      }
    } catch (error) {
      // throw error;
    }
  };

  _displayAddPaymentPanel() {
    if (this.state.showAddPaymentPanel) {
      this._addPaymentMethodAsync();
    } else {
      this.animateModalOpacity();
      this.setState({showAddPaymentPanel: true});
    }
  }
  _hideAddPaymentPanel() {
    this.setState({
      cardFname: '',
      cardLname: '',
      // phone: '',
      number: '',
      exp_m: '',
      exp_y: '',
      code: '',
      cardFnameError: false,
      cardLnameError: false,
      numberError: false,
      exp_mError: false,
      exp_yError: false,
      codeError: false,
      showAddPaymentPanel: false,
    });
    this.reAnimateModalOpacity();
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

  renderPaymentCard(item, index) {
    return (
      <View style={{width: WIDTH - 25}}>
        <View
          style={{
            height: 70,
            backgroundColor: COLORS[index],
            marginBottom: 10,
            borderRadius: 7,
          }}
          key={index}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: '100%',
              paddingHorizontal: 20,
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 17,
                fontWeight: '300',
                textAlign: 'center',
              }}>
              {item.payment.creditCard.cardType} ending in{' '}
              {item.payment.creditCard.cardNumber.slice(
                item.payment.creditCard.cardNumber.length - 4,
              )}
            </Text>
            <TouchableOpacity
              onPress={() =>
                this._removePaymentMethodAsync(item.customerPaymentProfileId)
              }>
              <Text style={{marginRight: 20, color: 'red', fontWeight: '600'}}>
                Remove
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

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
        <View style={{height: 45}} />
        <View
          style={{
            height: 40,
            borderBottomWidth: 0.4,
            borderColor: '#aaa',
            marginBottom: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 5,
              marginHorizontal: 10,
            }}>
            <TouchableOpacity
              style={{paddingRight: 10}}
              onPress={() => this.props.navigation.goBack(null)}>
              <Image
                source={require('./../../../Assets/photos/icons/double-left.png')}
                style={{width: 25, height: 25, top: 2}}
              />
            </TouchableOpacity>
            <Text style={{fontSize: 20}}>Wallet</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                activeOpacity={this.state.cartIsEmpty ? 1 : 0.8}
                style={{paddingLeft: 10}}
                onPress={() => this._displayAddPaymentPanel()}>
                <Icon name={'add'} size={34} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{flex: 1}}>
          {this.state.loadingPaymentMethods ? (
            <Text>Loading...</Text>
          ) : (
            <View style={{alignItems: 'center'}}>
              {this.state.paymentMethods.map((item, index) =>
                this.renderPaymentCard(item, index),
              )}
            </View>
          )}
        </View>

        {/* PaymentMethods Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.showAddPaymentPanel}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this._hideAddPaymentPanel()}>
            <View
              style={{
                width: WIDTH,
                height: HEIGHT - 450,
              }}
            />
          </TouchableOpacity>
          <View>
            <View
              style={[
                styles.modalContent,
                {
                  justifyContent: 'space-between',
                  height: 450,
                },
              ]}>
              <View style={{}}>
                <Text
                  style={{textAlign: 'center', fontSize: 17, marginTop: 20}}>
                  Add Payment Method
                </Text>
              </View>
              <View>
                <PreviousNextView>
                  <View
                    style={{
                      justifyContent: 'space-between',
                    }}>
                    <View style={{marginHorizontal: 20, marginTop: 20}}>
                      <View style={{flexDirection: 'row'}}>
                        <View style={[styles.inputContent, {width: '50%'}]}>
                          <Text
                            style={{
                              color: this.state.cardFnameError ? 'red' : '#000',
                            }}>
                            First Name
                          </Text>
                          <TextInput
                            style={styles.input}
                            placeholder="first name"
                            autoCapitalize="words"
                            placeholderTextColor="#888"
                            onChangeText={val =>
                              this.onChangeText('cardFname', val)
                            }
                          />
                        </View>
                        <View style={[styles.inputContent, {width: '50%'}]}>
                          <Text
                            style={{
                              color: this.state.cardLnameError ? 'red' : '#000',
                            }}>
                            Last Name
                          </Text>
                          <TextInput
                            style={styles.input}
                            placeholder="last name"
                            autoCapitalize="words"
                            placeholderTextColor="#888"
                            onChangeText={val =>
                              this.onChangeText('cardLname', val)
                            }
                          />
                        </View>
                      </View>
                      <View style={[styles.inputContent]}>
                        <Text
                          style={{
                            color: this.state.numberError ? 'red' : '#000',
                          }}>
                          Card Number
                        </Text>
                        <TextInput
                          style={styles.input}
                          placeholder="xxxx-xxxx-xxxx-xxxx"
                          autoCapitalize="none"
                          placeholderTextColor="#888"
                          keyboardType="number-pad"
                          onChangeText={val => this.onChangeText('number', val)}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        <View style={styles.inputContent}>
                          <Text
                            style={{
                              color: this.state.exp_mError ? 'red' : '#000',
                            }}>
                            Exp. Month
                          </Text>
                          <TextInput
                            style={[styles.input, {width: 110}]}
                            placeholder="01"
                            keyboardType="number-pad"
                            autoCapitalize="none"
                            placeholderTextColor="#888"
                            onChangeText={val =>
                              this.onChangeText('exp_m', val)
                            }
                          />
                        </View>
                        <View style={styles.inputContent}>
                          <Text
                            style={{
                              color: this.state.exp_yError ? 'red' : '#000',
                            }}>
                            Exp. Year
                          </Text>
                          <TextInput
                            style={[styles.input, {width: 110}]}
                            placeholder="2030"
                            autoCapitalize="none"
                            keyboardType="number-pad"
                            placeholderTextColor="#888"
                            onChangeText={val =>
                              this.onChangeText('exp_y', val)
                            }
                          />
                        </View>
                        <View style={styles.inputContent}>
                          <Text
                            style={{
                              color: this.state.codeError ? 'red' : '#000',
                            }}>
                            Card Code
                          </Text>
                          <TextInput
                            style={[styles.input, {width: 110}]}
                            placeholder="1234"
                            secureTextEntry={true}
                            autoCapitalize="none"
                            placeholderTextColor="#888"
                            onChangeText={val => this.onChangeText('code', val)}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </PreviousNextView>
              </View>
              <View
                style={{
                  backgroundColor: '#000',
                  width: WIDTH - 30,
                  paddingVertical: 7,
                  marginBottom: 40,
                }}>
                <TouchableOpacity
                  onPress={() => this._displayAddPaymentPanel()}>
                  <View style={{padding: 7}}>
                    <Text
                      style={{
                        fontWeight: '400',
                        fontSize: 14,
                        color: '#FFF',
                        textAlign: 'center',
                      }}>
                      Add Payment Method
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
    justifyContent: 'center',
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

export default Wallet;
