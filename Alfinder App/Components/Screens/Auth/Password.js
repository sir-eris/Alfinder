/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Alert,
  Animated,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-ionicons';

import NetInfo from '@react-native-community/netinfo';

const WIDTH = Dimensions.get('screen').width;
// const HEIGHT = Dimensions.get('screen').height;

class Password extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isConnected: true,

      inputContainer1Left: new Animated.Value(0),
      inputContainer2Left: new Animated.Value(WIDTH),

      step: 1,
      email: '',
      phone: '',
      password: '',
      password_confirmation: '',

      emailError: false,
      phoneError: false,
    };
  }

  componentDidMount() {
    this._bootstrapAsync();
  }

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

  onChangeText = (key, val) => {
    this.setState({[key]: val});
  };

  _resetPassword = () => {
    if (this.state.step === 1) {
      if (this.state.email !== '' && this.state.phone !== '') {
        this.setState({emailError: false, phoneError: false, step: 2});
        this.animateResetPassword();
      } else if (this.state.email === '' && this.state.phone === '') {
        this.setState({emailError: true, phoneError: true});
      } else if (this.state.email === '') {
        this.setState({emailError: true, phoneError: false});
      } else if (this.state.phone === '') {
        this.setState({phoneError: true, emailError: false});
      }
    } else if (this.state.step === 2) {
      if (this.state.password !== '' && this.state.password_confirmation !== '') {
        this._resetPasswordAsync();
      }
    }
  };

  _resetPasswordAsync = async () => {
    try {
      let response = await fetch(
        'https://alfinder.com/alfinder/public/api/user/password/reset',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.state.email,
            phone: this.state.phone,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
          }),
        },
      );
      if (response.status === 200) {
        let responseJson = await response.json();
        if (responseJson.data.code === 2) {
          this.reAnimateResetPassword();
        } else if (responseJson.data.code === 7) {
          this.props.navigation.navigate('SignIn');
        } else {
          Alert.alert(responseJson.data.message);
        }
      } else {
        this.setState({
          email: '',
          phone: '',
          password: '',
          password_confirmation: '',
          emailError: false,
          phoneError: false,
        });
        Alert.alert('Please Try Again');
      }
    } catch (error) {
      throw error;
    }
  };

  animateResetPassword = () => {
    Animated.timing(this.state.inputContainer1Left, {
      toValue: -WIDTH,
      duration: 250,
    }).start();
  };
  reAnimateResetPassword = () => {
    Animated.timing(this.state.inputContainer1Left, {
      toValue: 0,
      duration: 250,
    }).start();
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
              width: '100%',
              height: 300,
              backgroundColor: '#ccc',
              borderBottomLeftRadius: 40,
              marginBottom: 50,
            }}>
            <View style={{height: 110}}>
              <View style={{marginTop: 50, marginLeft: 20}}>
                <Text style={{fontSize: 26}}>Reset Password</Text>
              </View>
            </View>
          </View>

          <Animated.View style={{flexDirection: 'row', width: 2 * WIDTH, alignItems: 'center', justifyContent: 'flex-start', left: this.state.inputContainer1Left}}>
            <View style={{width: WIDTH}}>
              <View
                style={{
                  marginTop: 40,
                  marginBottom: 15,
                  marginHorizontal: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    borderBottomWidth: 0.4,
                    borderColor: '#bbb',
                  }}>
                  <Text style={{color: this.state.emailError ? 'red' : '#000'}}>
                    Email
                  </Text>
                  <TextInput
                    style={styles.input}
                    multiline={false}
                    placeholder="example@alfinder.com"
                    maxLength={150}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCompleteType="email"
                    placeholderTextColor="#888"
                    textContentType="emailAddress"
                    spellCheck={false}
                    onChangeText={val => this.onChangeText('email', val)}
                  />
                </View>
              </View>
              <View
                style={{
                  marginHorizontal: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View>
                  <Text style={{color: this.state.phoneError ? 'red' : '#000'}}>
                    Phone Number
                  </Text>
                  <TextInput
                    style={styles.input}
                    multiline={false}
                    placeholder="000-000-0000"
                    maxLength={150}
                    keyboardType="number-pad"
                    autoCapitalize="none"
                    autoCompleteType="tel"
                    placeholderTextColor="#888"
                    textContentType="telephoneNumber"
                    spellCheck={false}
                    onChangeText={val => this.onChangeText('phone', val)}
                  />
                </View>
              </View>
            </View>

            <View style={{width: WIDTH}}>
              <View>
                <TouchableOpacity activeOpacity={0.8} onPress={this.reAnimateResetPassword}>
                  <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginLeft: 15, marginBottom: 17}}>
                    <Icon name="arrow-back" size={20} />
                    <Text style={{fontSize: 12, marginBottom: 2, marginLeft: 7}}>back</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginBottom: 15,
                  marginHorizontal: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    borderBottomWidth: 0.4,
                    borderColor: '#bbb',
                  }}>
                  <Text
                    style={{color: this.state.emailHasError ? 'red' : '#000'}}>
                    New Password
                  </Text>
                  <TextInput
                    style={styles.input}
                    multiline={false}
                    placeholder="password"
                    maxLength={150}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCompleteType="off"
                    placeholderTextColor="#888"
                    textContentType="password"
                    spellCheck={false}
                    onChangeText={val => this.onChangeText('password', val)}
                  />
                </View>
              </View>
              <View
                style={{
                  marginHorizontal: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View>
                  <Text
                    style={{color: this.state.emailHasError ? 'red' : '#000'}}>
                    Confirm Password
                  </Text>
                  <TextInput
                    style={styles.input}
                    multiline={false}
                    placeholder="password"
                    maxLength={150}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCompleteType="off"
                    placeholderTextColor="#888"
                    textContentType="password"
                    spellCheck={false}
                    onChangeText={val =>
                      this.onChangeText('password_confirmation', val)
                    }
                  />
                </View>
              </View>
            </View>
          </Animated.View>

          <View style={{marginTop: 30}}>
            <View style={{alignItems: 'center'}}>
              <View style={{marginBottom: 10, height: 20}}>
                <Text style={{fontSize: 13, fontWeight: '700', color: 'red'}}>
                  {this.state.error}
                </Text>
              </View>
              <TouchableOpacity onPress={this._resetPassword}>
                <View
                  style={{
                    width: 300,
                    height: 45,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#000',
                    borderRadius: 2,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 16,
                      color: '#FFF',
                      fontWeight: '600',
                    }}>
                    Continue
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                marginTop: 12,
              }}>
              <View>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('SignIn')}>
                  <Text style={{fontSize: 12}}>Back to log in</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('SignUp')}>
                  <Text style={{fontSize: 12}}>Don't have an Account</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View
            style={{
              position: 'absolute',
              width: '100%',
              bottom: 25,
              alignItems: 'center',
            }}>
            <TouchableOpacity>
              <Text style={{fontSize: 12.5, color: '#555'}}>
                Having Trouble Reseting Your Password
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 48,
    backgroundColor: '#FFF',
    marginVertical: 3,
    paddingHorizontal: 0,
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default Password;
