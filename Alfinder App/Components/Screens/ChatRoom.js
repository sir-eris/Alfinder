/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

import Icon from 'react-native-ionicons';

class ChatRoomScreen extends React.Component {
  state = {};
  render() {
    return (
      <View style={{marginHorizontal: 10}}>
        <View style={{borderBottomWidth: 0.5}}>
          <View
            style={{
              flexDirection: 'row',
              alignContent: 'center',
              justifyContent: 'space-between',
              paddingBottom: 5,
              marginTop: 50,
              marginBottom: 5,
              marginHorizontal: 5,
            }}>
            <Icon name="add-circle-outline" size={28} color="#000" />
            <Text style={{fontSize: 22}}>Messages</Text>
            <Icon
              name="arrow-forward"
              size={28}
              color="#000"
              onPress={() => this.props.navigation.goBack()}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
    height: 110,
    marginTop: 40,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    paddingHorizontal: 4,
    marginHorizontal: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderColor: '#000',
  },
  headerTitle: {
    paddingLeft: 10,
    paddingBottom: 10,
  },
});

export default ChatRoomScreen;
