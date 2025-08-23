/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import NotificationSetting from 'react-native-open-notification';

import {
  View,
  Text,
  Image,
  Alert,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

// import Icon from 'react-native-ionicons';

const WIDTH = Dimensions.get('screen').width;

class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  _openNotifications = () => {
    NotificationSetting.open();
  };

  _subscribeToNewsLetter = async () => {
    try {
      let response = await fetch('', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: this.authToken,
        },
        body: JSON.stringify({}),
      });

      if (response.status === 200) {
        const responseJson = await response.json();
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

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{height: 45}} />
        <View
          style={{
            height: 40,
            justifyContent: 'center',
            borderBottomWidth: 0.4,
            borderColor: '#aaa',
            marginBottom: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 5,
              marginHorizontal: 10,
            }}>
            <TouchableOpacity
              style={{position: 'absolute', left: 0}}
              onPress={() => this.props.navigation.goBack(null)}>
              <Image
                source={require('./../../../Assets/photos/icons/double-left.png')}
                style={{width: 25, height: 25}}
              />
            </TouchableOpacity>
            <Text style={{fontSize: 20}}>Settings</Text>
          </View>
        </View>

        <View style={{marginTop: 0}}>
          <View style={styles.linkContainer}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={this._openNotifications}>
              <View style={styles.linkContent}>
                <Text style={[styles.link, {color: '#3D87C7'}]}>Notifications Setting</Text>

              </View>
            </TouchableOpacity>
          </View>

          {/* <View style={{marginTop: 20, marginLeft: 12, marginBottom: 5}}>
            <Text style={{fontSize: 16}}>Emails</Text>
          </View>

          <View style={styles.linkContainer}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={this._subscribeToNewsLetter}>
              <View style={styles.linkContent}>
                <Text style={[styles.link, {paddingLeft: 3}]}>Subscribe to NewsLetter</Text>
              </View>
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  linkContainer: {
    borderColor: '#ccc',
    borderBottomWidth: 0.4,
    paddingHorizontal: 5,
  },
  linkContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: WIDTH - 40,
    height: 45,
    paddingLeft: 7,
  },
  link: {
    fontSize: 15,
    fontWeight: '300',
    color: '#333',
    paddingVertical: 5,
  },
});

export default Settings;
