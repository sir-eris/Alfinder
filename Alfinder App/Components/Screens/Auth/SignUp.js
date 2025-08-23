/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {
  View,
  Text,
  Alert,
  Linking,
  Platform,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import KeyboardManager from 'react-native-keyboard-manager';
import AsyncStorage from '@react-native-community/async-storage';

import DeviceInfo from 'react-native-device-info';

class SignUpScreen extends React.Component {
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
      fname: '',
      lname: '',
      email: '',
      phone: '',
      password: '',
      password_confirmation: '',
      error: '',
    };

    this.uniqueId = DeviceInfo.getUniqueId();
  }

  onChangeText = (key, val) => {
    this.setState({[key]: val});
  };

  _openLink = link => {
    Linking.openURL('https://alfinder.com/' + link).catch(err =>
      console.error('An error occurred', err),
    );
  };

  _signUpAsync = async () => {
    const {
      fname,
      lname,
      email,
      phone,
      password,
      password_confirmation,
    } = this.state;
    const email_condition = new RegExp(
      '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]+$',
    );
    // const phone_condition = new RegExp('^[0-9]+$');

    if (fname.trim() === '' || fname === null) {
      this.setState({error: 'Please enter your first name'});
      return;
    }

    if (lname.trim() === '' || lname === null) {
      this.setState({error: 'Please enter your last name'});
      return;
    }

    if (email.trim() === '' || email === null) {
      this.setState({error: 'Please enter your email'});
      return;
    } else if (!email_condition.test(String(email.trim()).toLowerCase())) {
      this.setState({error: 'Please enter a valid email address'});
      return;
    }

    // if (phone.trim() === '' || phone === null) {
    //   this.setState({error: 'Please enter your phone number'});
    //   return;
    // } else if (!phone_condition.test(phone.trim())) {
    //   this.setState({error: 'Phone number can only contain numbers'});
    //   return;
    // }

    if (password.trim() === '' || password === null) {
      this.setState({error: 'Please choose a password'});
      return;
    }

    if (password_confirmation.trim() === '' || password_confirmation === null) {
      this.setState({error: 'Please confirm your password'});
      return;
    }

    try {
      let signUpResponse = await fetch(
        'https://alfinder.com/alfinder/public/api/user/register',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            first_name: String(fname.trim()).toLowerCase(),
            last_name: String(lname.trim()).toLowerCase(),
            email: String(email.trim()).toLowerCase(),
            // phone_number: phone.trim(),
            password: password.trim(),
            // os: ,
            deviceid: this.uniqueId,
          }),
        },
      );
      if (signUpResponse.status === 200) {
        const signUpResponseJson = await signUpResponse.json();
        // Alert.alert(JSON.stringify(signUpResponseJson));
        if (signUpResponseJson.data.code === 7) {
          await this._signInAsync(
            String(email.trim()).toLowerCase(),
            password.trim(),
          );
        } else if (signUpResponseJson.data.code === 8) {
          this.setState({error: signUpResponseJson.data.message});
        } else if (signUpResponseJson.data.code === 9) {
          this.setState({
            error: 'Thanks for signing up. Stay tuned for our launch.',
          });
        } else {
          Alert.alert('Please Try Again');
        }
      }
    } catch (error) {
      throw error;
    }
  };

  _signInAsync = async (email, password) => {
    try {
      let response = await fetch(
        'https://alfinder.com/alfinder/public/api/auth/login',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
            grant_type: 'password',
            client_id: '2',
            client_secret: 'nUgV9PAHYjQIubBprPuzjSvPIOlX4Yy3H8GhcOKC',
            provider: 'users',
            scope: '*',
          }),
        },
      );
      if (response.status === 200) {
        const responseJson = await response.json();
        if (responseJson.data.code === 7) {
          const authToken = 'Bearer ' + responseJson.data.access_token;
          try {
            const u = JSON.stringify({
              token: authToken,
              type: responseJson.data.type,
            });
            await AsyncStorage.setItem('AlfinderUserToken', u);

            if (responseJson.data.type === 'USER') {
              this.props.navigation.navigate('UserApp');
            } else {
              this.props.navigation.navigate('SingIn');
            }
          } catch (e) {
            // throw e;
            this.props.navigation.navigate('SingIn');
          }
        } else {
          this.props.navigation.navigate('SingIn');
        }
      } else {
        this.setState({
          error: 'Please Try Again',
        });
      }
    } catch (error) {
      // throw error;
      this.props.navigation.navigate('SingIn');
    }
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            width: '100%',
            height: 100,
            backgroundColor: '#6755a4',
            borderBottomLeftRadius: 30,
          }}>
          <View style={styles.container}>
            <View style={{marginTop: 55, marginLeft: 20, flexDirection: 'row'}}>
              <Text style={{fontSize: 24, fontWeight: '300', color: '#fff'}}>
                Welcome to Alfinder!
              </Text>
            </View>
          </View>
        </View>
        <View style={{marginHorizontal: 30, marginTop: 30}}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder="first name"
              autoCapitalize="none"
              placeholderTextColor="#888"
              onChangeText={val => this.onChangeText('fname', val)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder="last name"
              autoCapitalize="none"
              placeholderTextColor="#888"
              onChangeText={val => this.onChangeText('lname', val)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="example@alfinder.com"
              autoCapitalize="none"
              placeholderTextColor="#888"
              onChangeText={val => this.onChangeText('email', val)}
            />
          </View>
          {/* <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="888-888-8888"
              autoCapitalize="none"
              placeholderTextColor="#888"
              onChangeText={val => this.onChangeText('phone', val)}
            />
          </View> */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="password"
              secureTextEntry={true}
              autoCapitalize="none"
              placeholderTextColor="#888"
              onChangeText={val => this.onChangeText('password', val)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              placeholder="password"
              secureTextEntry={true}
              autoCapitalize="none"
              placeholderTextColor="#888"
              onChangeText={val =>
                this.onChangeText('password_confirmation', val)
              }
            />
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 11}}>
              By creating an account you agree to Alfinder Inc.'s
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => this._openLink('terms')}>
                <Text style={{fontSize: 11, color: '#44ABE0'}}>
                  Trems of Use
                </Text>
              </TouchableOpacity>
              <Text style={{fontSize: 11}}> and </Text>
              <TouchableOpacity
                onPress={() => this._openLink('privacy-policy')}>
                <Text style={{fontSize: 11, color: '#44ABE0'}}>
                  Privacy Policy
                </Text>
              </TouchableOpacity>
              <Text>.</Text>
            </View>
          </View>
        </View>
        <View style={{marginTop: 50}}>
          <View style={{alignItems: 'center'}}>
            <View style={{marginBottom: 10, height: 20}}>
              <Text style={{fontSize: 13, fontWeight: '700', color: 'red'}}>
                {this.state.error}
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => this._signUpAsync()}>
              <View
                style={{
                  width: 300,
                  height: 45,
                  borderRadius: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#181325',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 16,
                    color: '#FFF',
                    fontWeight: '400',
                  }}>
                  SUGN UP
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
            <View style={{}}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('SignIn')}>
                <Text style={{fontSize: 12}}>Already have an Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* </ScrollView> */}

        {/* <View
          style={{
            position: 'absolute',
            width: '100%',
            bottom: 25,
            alignItems: 'center',
          }}>
          <TouchableOpacity>
            <Text style={{fontSize: 12.5, color: '#555'}}>
              Having Trouble Signing Up
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
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
  inputTitle: {
    position: 'absolute',
    top: -10,
    left: 15,
    paddingHorizontal: 5,
    fontSize: 14,
    fontStyle: 'italic',
    backgroundColor: '#fff',
  },
  input: {
    // width: 350,
    minWidth: 120,
    height: 45,
    marginVertical: 3,
    paddingHorizontal: 0,
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
  inputContainer: {
    marginBottom: 25,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
});

export default SignUpScreen;
