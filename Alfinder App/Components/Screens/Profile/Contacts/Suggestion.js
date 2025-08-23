/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {
  View,
  Text,
  Image,
  Alert,
  Animated,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-ionicons';
import NetInfo from '@react-native-community/netinfo';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

class ContactUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: true,

      subjectError: false,
      bodyError: false,

      subject: '',
      body: '',

      error: '',

      toasterDisplay: 'none',
      toasterOpacity: new Animated.Value(0),
      toasterText: '',
    };
  }

  componentDidMount = async () => {
    this._bootstrapAsync();
    await this._getAppKey();
  };

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
        this.props.navigation.navigate('Auth');
      } else {
        if (value.token === null || value.token === '') {
          this.props.navigation.navigate('Auth');
        } else {
          this.authToken = value.token;
        }
      }
    } catch (e) {
      throw e;
    }
  };

  onChangeText = (key, val) => {
    this.setState({[key]: val});
  };

  _sendMessage = async () => {
    if (this.state.subject.trim() === '') {
      this.setState({subjectError: true, bodyError: false});
      return;
    }
    if (this.state.body.trim() === '') {
      this.setState({bodyError: true, subjectError: false});
      return;
    }

    try {
      let response = await fetch(
        'https://alfinder.com/alfinder/public/api/messages/suggestion',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: this.authToken,
          },
          body: JSON.stringify({
            subject: this.state.subject,
            body: this.state.body,
          }),
        },
      );
      if (response.status === 200) {
        const responseJson = await response.json();
        if (responseJson.data.code === 7) {
          this.setState({
            subject: '',
            body: '',
            toasterText: responseJson.data.message,
          });
          this.displayToast();
        } else {
          this.setState({error: 'Please try again.'});
        }
      } else if (response.status === 401) {
        try {
          await AsyncStorage.removeItem('AlfinderUserToken');
          this.props.navigation.navigate('Auth');
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
      this.props.navigation.navigate('Help');
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
          <View
            style={{
              height: 90,
              borderBottomWidth: 0.4,
              borderColor: '#aaa',
              marginHorizontal: 0,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'space-between',
                paddingBottom: 5,
                marginTop: 52,
                marginBottom: 5,
                marginHorizontal: 10,
              }}>
              <TouchableOpacity
                style={{paddingRight: 7}}
                onPress={() => this.props.navigation.goBack(null)}>
                <Image
                  source={require('../../../../Assets/photos/icons/double-left.png')}
                  style={{width: 25, height: 25, top: 2}}
                />
              </TouchableOpacity>
              <Text style={{fontSize: 22}}>Suggestion</Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              marginHorizontal: 20,
              marginTop: 15,
            }}>
            <View>
              <View style={{marginBottom: 10}}>
                <Text
                  style={{marginBottom: 10, fontSize: 16, fontWeight: '300', color: this.state.subjectError ? 'red' : '#000'}}>
                  Subject
                </Text>
                <TextInput
                  multiline={false}
                  style={{
                    backgroundColor: '#f7f7f7',
                    paddingHorizontal: 10,
                    paddingVertical: 15,
                    fontSize: 16,
                  }}
                  maxLength={100}
                  autoCapitalize="sentences"
                  value={this.state.subject}
                  onChangeText={val => this.onChangeText('subject', val)}
                />
              </View>
              <View style={{marginBottom: 10}}>
                <Text
                  style={{marginBottom: 10, fontSize: 16, fontWeight: '300', color: this.state.bodyError? 'red' : '#000'}}>
                  Message
                </Text>
                <TextInput
                  multiline={true}
                  style={{
                    backgroundColor: '#f7f7f7',
                    height: 200,
                    paddingHorizontal: 10,
                    paddingVertical: 15,
                    fontSize: 16,
                  }}
                  maxLength={350}
                  autoCapitalize="sentences"
                  value={this.state.body}
                  onChangeText={val => this.onChangeText('body', val)}
                />
              </View>
            </View>
            <View
              style={{
                height: 125,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: '600', fontSize: 12.5, color: 'red', marginBottom: 7}}>{this.state.error}</Text>
              <TouchableOpacity activeOpacity={0.5} onPress={this._sendMessage}>
                <View
                  style={{
                    height: 50,
                    width: 170,
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontWeight: '400', fontSize: 15}}>SEND</Text>
                </View>
              </TouchableOpacity>
              <Text style={{fontSize: 12, color: '#999', marginTop: 10}}>
                If necessary we will get back to you within 72 hours.
              </Text>
            </View>
          </View>

          <Animated.View
            style={{
              display: this.state.toasterDisplay,
              position: 'absolute',
              zIndex: 9999,
              backgroundColor: '#63BC46',
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
                fontSize: 15,
                color: '#fff',
                fontWeight: '500',
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

export default ContactUs;
