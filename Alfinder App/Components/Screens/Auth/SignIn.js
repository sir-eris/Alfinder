/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {
  View,
  Text,
  Alert,
  Modal,
  useEffect,
  Platform,
  TextInput,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import KeyboardManager from 'react-native-keyboard-manager';
import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-ionicons';
import NetInfo from '@react-native-community/netinfo';

import appleAuth, {
  AppleButton,
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
  AppleAuthCredentialState,
  AppleAuthRealUserStatus,
} from '@invertase/react-native-apple-authentication';

const WIDTH = Dimensions.get('screen').width;

class SignInScreen extends React.Component {
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
      isConnected: true,

      email: '',
      password: '',
      info: '',
      emailHasError: false,
      passwordHasError: false,

      resetEmail: '',
      vcode: '',
      resetPassword: '',
      password_confirmation: '',
      stepMessage: '',

      hasVcode: false,
      resetEmailHasError: false,
      vcodeHasError: false,
      newPassHasError: false,
      passConfirmHasError: false,

      error: '',

      passwordModal: false,
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

  // _onAppleButtonPress = async () => {
  //   // performs login request
  //   try {
  //     const appleAuthRequestResponse = await appleAuth.performRequest({
  //       requestedOperation: AppleAuthRequestOperation.LOGIN,
  //       requestedScopes: [
  //         AppleAuthRequestScope.EMAIL,
  //         AppleAuthRequestScope.FULL_NAME,
  //       ],
  //     });
  //     // const {user, realUserStatus} = await appleAuth.performRequest(appleAuthRequestResponse);
  //     const {credentialState} = await appleAuth.getCredentialStateForUser(
  //       appleAuthRequestResponse.user,
  //     );

  //     if (
  //       appleAuthRequestResponse.realUserStatus ===
  //       AppleAuthRealUserStatus.LIKELY_REAL
  //     ) {
  //       if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
  //         Alert.alert('Authorized');
  //       } else {
  //         Alert.alert('Please Try Again');
  //       }
  //     } else {
  //       Alert.alert('Please Try Again');
  //     }
  //   } catch (e) {
  //     Alert.alert(JSON.stringify(e));
  //   }

  //   // if (realUserStatus === AppleAuthRealUserStatus.UNKNOWN) {}

  //   // if (realUserStatus === AppleAuthRealUserStatus.UNSUPPORTED) {}

  //   // if (credentialState === AppleAuthCredentialState.NOT_FOUND) {
  //   //   Alert.alert('Not Found');
  //   // }
  //   // if (credentialState === AppleAuthCredentialState.REVOKED) {
  //   //   Alert.alert('Revoked');
  //   // }
  //   // if (credentialState === AppleAuthCredentialState.TRANSFERRED) {
  //   //   Alert.alert('Transferred');
  //   // }
  // };

  _signInAsync = async () => {
    this.setState({error: ''});
    const {email, password} = this.state;

    if (email.trim() === '' && password.trim() === '') {
      this.setState({
        emailHasError: true,
        passwordHasError: true,
        error: 'Please Enter Your Credentials',
      });
      return;
    } else if (email.trim() === '' && password.trim() !== '') {
      this.setState({
        emailHasError: true,
        passwordHasError: false,
        error: 'Please Enter Your Email',
      });
      return;
    } else if (email.trim() !== '' && password.trim() === '') {
      this.setState({
        emailHasError: false,
        passwordHasError: true,
        error: 'Please Enter Your Password',
      });
      return;
    }

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
            email: email.trim(),
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
              this.props.navigation.navigate('Welcome');
            }
          } catch (e) {
            throw e;
          }
        } else if (responseJson.data.code === 8) {
          this.setState({
            emailHasError: false,
            passwordHasError: false,
            error: responseJson.data.message,
          });
        } else {
          Alert.alert('Please Try Again');
        }
      } else if (response.status === 401) {
        this.setState({
          email: '',
          password: '',
          emailHasError: false,
          passwordHasError: false,
          error: 'Please Check Your Cridentials And Try Again',
        });
      } else {
        this.setState({
          email: '',
          password: '',
          emailHasError: false,
          passwordHasError: false,
          error: 'Please Try Again',
        });
      }
    } catch (error) {
      throw error;
    }
  };

  _closeResetPasswordModal = () => {
    this.setState({
      info: '',
      emailHasError: false,
      passwordHasError: false,
      resetEmail: '',
      vcode: '',
      resetPassword: '',
      password_confirmation: '',
      stepMessage: '',
      hasVcode: false,
      resetEmailHasError: false,
      vcodeHasError: false,
      newPassHasError: false,
      passConfirmHasError: false,
      error: '',
      passwordModal: false,
    });
  };

  _reserPassword = async () => {
    this.setState({stepMessage: ''});

    const {
      resetEmail,
      vcode,
      resetPassword,
      password_confirmation,
    } = this.state;

    if (this.state.hasVcode) {
      if (resetPassword.trim() === '' || password_confirmation.trim() === '') {
        this.setState({stepMessage: "Passwords Can't Be Empty"});
        return;
      }

      if (resetPassword !== password_confirmation) {
        this.setState({stepMessage: 'Passwords Must Match'});
        return;
      }
    }

    try {
      let respons = await fetch(
        'https://alfinder.com/alfinder/public/api/user/password/reset',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: this.authToken,
          },
          body: JSON.stringify({
            logged: false,
            vcode: vcode.trim(),
            email: resetEmail.trim(),
            password: vcode.trim() !== '' ? resetPassword : null,
            password_confirmation:
              vcode.trim() !== '' ? password_confirmation : null,
          }),
        },
      );
      if (respons.status === 200) {
        const responseJ = await respons.json();
        if (responseJ.data.code === 2) {
          this.setState({stepMessage: responseJ.data.message, hasVcode: false});
          return;
        }
        if (responseJ.data.code === 3) {
          this.setState({stepMessage: responseJ.data.message, hasVcode: true});
          return;
        }
        if (responseJ.data.code === 7) {
          this.setState({stepMessage: responseJ.data.message, hasVcode: true});
          return;
        }
        if (responseJ.data.code === 9) {
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
                  email: resetEmail.trim(),
                  password: resetPassword,
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
                  }
                } catch (e) {
                  throw e;
                }
              } else if (responseJson.data.code === 8) {
                this.setState({
                  emailHasError: false,
                  passwordHasError: false,
                  error: responseJson.data.message,
                });
              } else {
                Alert.alert('Please Try Again');
              }
            }
          } catch (error) {
            throw error;
          }
        }
      }
    } catch (error) {
      throw error;
    }
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
              height: 100,
              backgroundColor: '#6755a4',
              borderBottomLeftRadius: 30,
            }}>
            <View style={styles.container}>
              <View style={{marginTop: 55, marginLeft: 20}}>
                <Text style={{fontSize: 24, fontWeight: '300', color: '#fff'}}>
                  Sign In
                </Text>
              </View>
            </View>
          </View>
          <View style={{width: WIDTH, marginTop: 50, alignItems: 'center'}}>
            <View style={{width: '80%'}}>
              <View
                style={{
                  marginBottom: 25,
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderRadius: 4,
                  borderColor: '#ddd',
                }}>
                <Text
                  style={{
                    color: this.state.emailHasError ? 'red' : '#000',
                    position: 'absolute',
                    top: -10,
                    left: 15,
                    paddingHorizontal: 5,
                    fontStyle: 'italic',
                    fontSize: 15,
                    backgroundColor: '#fff',
                  }}>
                  Email
                </Text>
                <TextInput
                  style={styles.input}
                  multiline={false}
                  placeholder="example@alfinder.com"
                  maxLength={100}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCompleteType="email"
                  placeholderTextColor="#888"
                  textContentType="emailAddress"
                  spellCheck={false}
                  value={this.state.email}
                  onChangeText={val => this.onChangeText('email', val)}
                />
              </View>
              <View
                style={{
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderRadius: 4,
                  borderColor: '#ddd',
                }}>
                <Text
                  style={{
                    color: this.state.passwordHasError ? 'red' : '#000',
                    position: 'absolute',
                    top: -10,
                    left: 15,
                    paddingHorizontal: 5,
                    fontStyle: 'italic',
                    fontSize: 15,
                    backgroundColor: '#fff',
                  }}>
                  Password
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  clearTextOnFocus={true}
                  maxLength={50}
                  spellCheck={false}
                  multiline={false}
                  autoCompleteType="password"
                  secureTextEntry={true}
                  autoCapitalize="none"
                  placeholderTextColor="#888"
                  value={this.state.password}
                  onChangeText={val => this.onChangeText('password', val)}
                />
              </View>
            </View>
          </View>
          <View style={{marginTop: 40, alignItems: 'center'}}>
            <View style={{marginBottom: 10, height: 20}}>
              <Text style={{fontSize: 13, fontWeight: '700', color: 'red'}}>
                {this.state.error}
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={this._signInAsync}>
                <View
                  style={{
                    width: 300,
                    height: 45,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#181325',
                    borderRadius: 30,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 16,
                      color: '#FFF',
                      fontWeight: '400',
                    }}>
                    SIGN IN
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* <View>
              <AppleButton
                buttonStyle={AppleButton.Style.WHITE}
                buttonType={AppleButton.Type.SIGN_IN}
                style={{
                  width: 160,
                  height: 45,
                }}
                onPress={() => this._onAppleButtonPress()}
              />
            </View> */}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 12,
                width: 280,
              }}>
              <View>
                <TouchableOpacity
                  onPress={() => this.setState({passwordModal: true})}>
                  <Text style={{fontSize: 12}}>Forgot Password</Text>
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

          {/* <View
            style={{
              position: 'absolute',
              width: '100%',
              bottom: 25,
              alignItems: 'center',
            }}>
            <TouchableOpacity>
              <Text style={{fontSize: 12.5, color: '#555'}}>
                Having Trouble Signing In
              </Text>
            </TouchableOpacity>
          </View> */}

          {/*  Reset Password MODAL */}
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.passwordModal}>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <View
                style={[
                  styles.modalContent,
                  {height: '100%', justifyContent: 'center'},
                ]}>
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingTop: 30,
                    width: WIDTH,
                  }}>
                  <View
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 45,
                      marginLeft: 20,
                    }}>
                    <Icon
                      name="close"
                      onPress={() => this._closeResetPasswordModal()}
                    />
                  </View>
                  <Text
                    style={{textAlign: 'center', fontSize: 17, paddingTop: 20}}>
                    Reset Password
                  </Text>
                </View>
                <View style={{width: WIDTH, flexDirection: 'column'}}>
                  <View
                    style={{
                      width: WIDTH,
                      textAlign: 'center',
                      alignItems: 'center',
                      marginBottom: 50,
                    }}>
                    <Text>{this.state.stepMessage}</Text>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <View
                      style={{
                        width: '80%',
                        justifyContent: 'center',
                        borderBottomWidth: 0.4,
                        borderColor: '#aaa',
                      }}>
                      <View
                        style={{
                          marginBottom: 15,
                          borderBottomWidth: 0.4,
                          borderColor: '#bbb',
                        }}>
                        <Text
                          style={{
                            color: this.state.resetEmailHasError
                              ? 'red'
                              : '#000',
                          }}>
                          Email
                        </Text>
                        <TextInput
                          style={styles.input}
                          multiline={false}
                          placeholder="example@alfinder.com"
                          maxLength={75}
                          autoCapitalize="none"
                          autoCompleteType="off"
                          placeholderTextColor="#888"
                          textContentType="emailAddress"
                          spellCheck={false}
                          defaultValue={this.state.email}
                          onChangeText={val =>
                            this.onChangeText('resetEmail', val)
                          }
                        />
                      </View>
                      <View
                        style={{
                          marginBottom: 15,
                          borderBottomWidth: 0.4,
                          borderColor: '#bbb',
                        }}>
                        <Text
                          style={{
                            color: this.state.vcodeHasError ? 'red' : '#000',
                          }}>
                          Verification Code
                        </Text>
                        <TextInput
                          style={[
                            styles.input,
                            {
                              backgroundColor: this.state.hasVcode
                                ? '#fff'
                                : '#eee',
                            },
                          ]}
                          editable={this.state.hasVcode}
                          multiline={false}
                          placeholder="code"
                          maxLength={20}
                          autoCapitalize="none"
                          autoCompleteType="off"
                          placeholderTextColor="#888"
                          textContentType="oneTimeCode"
                          spellCheck={false}
                          onChangeText={val => this.onChangeText('vcode', val)}
                        />
                      </View>
                      <View
                        style={{
                          marginBottom: 15,
                          borderBottomWidth: 0.4,
                          borderColor: '#bbb',
                        }}>
                        <Text
                          style={{
                            color: this.state.newPassHasError ? 'red' : '#000',
                          }}>
                          New Password
                        </Text>
                        <TextInput
                          style={[
                            styles.input,
                            {
                              backgroundColor: this.state.hasVcode
                                ? '#fff'
                                : '#eee',
                            },
                          ]}
                          editable={this.state.hasVcode}
                          multiline={false}
                          secureTextEntry
                          placeholder="password"
                          maxLength={50}
                          autoCapitalize="none"
                          autoCompleteType="off"
                          placeholderTextColor="#888"
                          textContentType="newPassword"
                          spellCheck={false}
                          onChangeText={val =>
                            this.onChangeText('resetPassword', val)
                          }
                        />
                      </View>
                      <View style={{marginBottom: 15}}>
                        <Text
                          style={{
                            color: this.state.passConfirmHasError
                              ? 'red'
                              : '#000',
                          }}>
                          Confirm Password
                        </Text>
                        <TextInput
                          style={[
                            styles.input,
                            {
                              backgroundColor: this.state.hasVcode
                                ? '#fff'
                                : '#eee',
                            },
                          ]}
                          editable={this.state.hasVcode}
                          multiline={false}
                          secureTextEntry
                          placeholder="password"
                          maxLength={50}
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
                      <View
                        style={{
                          height: 43,
                          backgroundColor: '#181325',
                          width: '100%',
                          justifyContent: 'center',
                          borderRadius: 2,
                        }}>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={this._reserPassword}>
                          <View style={{padding: 7}}>
                            <Text
                              style={{
                                color: '#FFF',
                                textAlign: 'center',
                                fontSize: 14,
                                fontWeight: '300',
                              }}>
                              {this.state.hasVcode
                                ? 'UPDATE PASSWORD'
                                : 'SEND VERIFICATION CODE'}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
  },
  title: {
    fontSize: 24,
  },
  container: {
    width: '100%',
    height: 110,
  },
  inputContainer: {
    marginTop: 50,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 45,
    marginVertical: 3,
    paddingLeft: 10,
    paddingHorizontal: 0,
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
  modalContent: {
    flexDirection: 'column',
    alignItems: 'center',
    borderTopLeftRadius: 25,
    backgroundColor: '#FFF',
    zIndex: 999,
  },
});

export default SignInScreen;
