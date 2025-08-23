/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import {CONFIG} from './../../App/Config';

class BlogList extends Component {
  constructor(props) {
    super(props);

    const {params} = this.props.navigation.state;
    this.keyword = params ? params.keyword : null;
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{height: 90, borderBottomWidth: 0.4, borderColor: '#aaa'}}>
          <View
            style={{
              flexDirection: 'row',
              alignContent: 'center',
              justifyContent: 'space-between',
              marginTop: 52,
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
            <Text style={{fontSize: 22, textTransform: 'capitalize'}}>{this.keyword}</Text>
          </View>
        </View>

        <View>
            <ScrollView></ScrollView>
        </View>
      </View>
    );
  }
}

export default BlogList;
