/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {View, Text, Image, TouchableOpacity} from 'react-native';

class Help extends React.Component {
  state = {};
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
            <Text style={{fontSize: 20}}>Help</Text>
          </View>
        </View>

        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10, paddingVertical: 10, borderColor: '#ccc', borderBottomWidth: 0.4}}>
            <Text style={{fontWeight: '300', fontSize: 14}}>Have a question or concern</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate('ContactUs')}>
              <View style={{height: 35, borderWidth: 0.5, paddingHorizontal: 10, borderColor: '#181325', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{textTransform: 'uppercase', fontSize: 12}}>message now</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10, paddingVertical: 10, borderColor: '#ccc', borderBottomWidth: 0.4}}>
            <Text style={{fontWeight: '300', fontSize: 14}}>Have a suggestion for us</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate('Suggestion')}>
              <View style={{height: 35, borderWidth: 0.5, paddingHorizontal: 10, borderColor: '#181325', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{textTransform: 'uppercase', fontSize: 12}}>message now</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10, paddingVertical: 10, borderColor: '#ccc', borderBottomWidth: 0.4}}>
            <Text style={{fontWeight: '300', fontSize: 14}}>Having technical difficulties</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate('Support')}>
              <View style={{height: 35, borderWidth: 0.5, paddingHorizontal: 10, borderColor: '#181325', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{textTransform: 'uppercase', fontSize: 12}}>message now</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Help;
