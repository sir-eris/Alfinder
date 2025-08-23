/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {View, Text, Alert, FlatList} from 'react-native';

import Icon from 'react-native-ionicons';
import Item from '../Item.js';

class ViewAllScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      products: [],
    };
  }

  componentDidMount() {
    this._getProductsAsync();
  }

  _getProductsAsync = async () => {
    const {params} = this.props.navigation.state;
    const brandid = params ? params.brandid : 'null';
    try {
      const response = await fetch(
        'https://alfinder.com/alfinder/public/api/brand/get',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            brand_id: brandid,
          }),
        },
      );
      if (response.status === 200) {
        const responseJson = await response.json();

        this.setState({
          loading: false,
          products: [responseJson.data.products.data],
        });
        // return;
      } else {
        Alert.alert(JSON.stringify(response.status));
        // return;
      }
    } catch (error) {
      Alert.alert(error, error);
    }
  };

  render() {
    return (
      <View style={{flex: 1, marginHorizontal: 0}}>
        <View style={{height: 90, borderBottomWidth: 0.4, borderColor: '#aaa', marginBottom: 15}}>
          <View
            style={{
              flexDirection: 'row',
              alignContent: 'center',
              justifyContent: 'space-between',
              paddingBottom: 5,
              marginTop: 50,
              marginBottom: 5,
              marginHorizontal: 10,
            }}>
            <Icon
              name="arrow-back"
              size={30}
              color="#000"
              onPress={() => this.props.navigation.goBack()}
            />
            <Text style={{fontSize: 22}}>All Products</Text>
          </View>
        </View>

        <View style={{flexDirection: 'column'}}>
          {this.state.loading ? (
            <View
              style={{
                height: '95%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>Loading...</Text>
            </View>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              columnWrapperStyle={{justifyContent: 'space-evenly'}}
              numColumns={2}
              data={this.state.products[0]}
              renderItem={({item, index}) => (
                <Item
                  key={item.product_id}
                  navigation={this.props.navigation}
                  details={item}
                  index={index}
                />
              )}
              keyExtractor={item => item.product_id}
            />
          )}
        </View>
      </View>
    );
  }
}

export default ViewAllScreen;
