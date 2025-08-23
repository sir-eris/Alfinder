/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {View, Text, TouchableHighlight, Dimensions} from 'react-native';

import FastImage from 'react-native-fast-image';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

class WelcomeScreen extends React.Component {
  state = {};
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View
          style={{
            backgroundColor: '#3C2D64',
            width: WIDTH / 2,
            height: HEIGHT,
            left: WIDTH / 2,
          }}>
          <View
            style={{
              height: HEIGHT - 200,
              width: WIDTH / 2,
              top: 100,
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <Text
              style={{
                width: (HEIGHT - 200) / 3,
                marginBottom: 4,
                fontSize: 32,
                fontWeight: '400',
                textTransform: 'uppercase',
                color: '#fff',
                transform: [{rotate: '90deg'}],
                // textDecorationLine: 'underline',
                // textDecorationStyle: 'solid',
                // textDecorationColor: '#fff',
              }}>
              FREE SHIPPING.
            </Text>
            {/* <Text
              style={{
                width: (HEIGHT - 200) / 3,
                marginBottom: 4,
                fontSize: 44,
                fontWeight: '700',
                textTransform: 'uppercase',
                color: '#fff',
                transform: [{rotate: '90deg'}],
              }}>
              UNIQUE.
            </Text> */}
            <Text
              style={{
                width: (HEIGHT - 200) / 3,
                fontSize: 32,
                fontWeight: '400',
                textTransform: 'uppercase',
                color: '#fff',
                transform: [{rotate: '90deg'}],
              }}>
              FREE RETURN.
            </Text>
          </View>
        </View>

        <View
          style={{
            position: 'absolute',
            height: HEIGHT,
            width: WIDTH / 2,
            left: 0,
            top: 0,
          }}>
          <View style={{position: 'absolute'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
                top: 60,
                width: WIDTH,
              }}>
              <FastImage
                source={require('./../../../Assets/photos/Alfinder_Logo-4.png')}
                resizeMode={FastImage.resizeMode.contain}
                style={{height: 30, width: 100}}
              />
              <TouchableHighlight
                style={{paddingVertical: 7}}
                underlayColor="transparent"
                activeOpacity={0.95}
                onPress={() => this.props.navigation.navigate('Home')}>
                <Text style={{fontSize: 13, color: '#fff', fontWeight: '600'}}>
                  Continue as guest
                </Text>
              </TouchableHighlight>
            </View>
          </View>

          <View
            style={{
              height: HEIGHT - 200,
              width: WIDTH / 2,
              top: 100,
              justifyContent: 'space-around',
            }}>
            <Text
              style={{
                alignSelf: 'flex-start',
                top: 15,
                right: 9,
                fontSize: 28,
                fontWeight: '400',
                textTransform: 'uppercase',
                color: '#3c2d64',
                textAlign: 'center',
                transform: [{rotate: '90deg'}],
              }}>
              EVERYTHING.
            </Text>
            <Text
              style={{
                alignSelf: 'flex-start',
                fontSize: 40,
                fontWeight: '700',
                textTransform: 'uppercase',
                color: '#3c2d64',
                textAlign: 'center',
                transform: [{rotate: '90deg'}],
              }}>
              UNIQUE.
            </Text>
            <Text
              style={{
                alignSelf: 'flex-start',
                bottom: 25,
                fontSize: 28,
                fontWeight: '400',
                textTransform: 'uppercase',
                color: '#3c2d64',
                textAlign: 'center',
                transform: [{rotate: '90deg'}],
              }}>
              SELF-CARE.
            </Text>
          </View>
        </View>

        <View
          style={{
            position: 'absolute',
            bottom: 50,
            width: 300,
            left: (WIDTH - 300) / 2,
            alignItems: 'flex-end',
          }}>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => this.props.navigation.navigate('SignUp')}>
            <View style={{marginBottom: 7, right: 15}}>
              <Text style={{color: '#fff', fontWeight: '500', fontSize: 13}}>
                New Here? Sign Up
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            activeOpacity={0.95}
            underlayColor="transparent"
            onPress={() => this.props.navigation.navigate('SignIn')}>
            <View
              style={{
                width: 300,
                height: 50,
                backgroundColor: '#f1f2ff',
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOpacity: 0.3,
                shadowOffset: {width: 1, height: 1},
                shadowRadius: 3,
              }}>
              <Text style={{fontSize: 16, fontWeight: '400', color: '#181325'}}>
                SIGN IN
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default WelcomeScreen;
