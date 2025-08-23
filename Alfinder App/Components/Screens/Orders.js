/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {
  View,
  Text,
  Alert,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  // AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const WIDTH = Dimensions.get('screen').width;

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingOrders: true,
      noOrders: true,
      orders: [],
    };
  }

  componentDidMount = async () => {
    await this._getAppKey();
    this._getOrdersAsync();
  };

  _getAppKey = async () => {
    try {
      const val = await AsyncStorage.getItem('AlfinderUserToken');
      const value = await JSON.parse(val);
      if (value === null || value === '') {
        this.props.navigation.navigate('Welcome');
      } else {
        if (value.token === null || value.token === '') {
          this.props.navigation.navigate('Welcome');
        } else {
          this.authToken = value.token;
        }
      }
    } catch (e) {
      // throw e;
    }
  };

  _getOrdersAsync = async () => {
    try {
      let response = await fetch(
        'https://alfinder.com/alfinder/public/api/user/orders/get',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: this.authToken,
          },
        },
      );
      if (response.status === 200) {
        let responseJson = await response.json();
        if (responseJson.data.length === 0) {
          this.setState({
            loadingOrders: false,
            noOrders: true,
          });
        } else {
          this.setState({
            loadingOrders: false,
            noOrders: false,
            orders: responseJson.data,
          });
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

  _renderOrders = (order, index) => {
    // const address = JSON.parse(order.address);
    const address = order.address;
    const paymentMethod = order.payment.split(',');
    const products = order.products.data;

    return (
      <View key={order.order_id} style={styles.order}>
        <View style={styles.orderContent}>
          <View style={styles.orderHeader}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '600',
                textTransform: 'uppercase',
              }}>
              Order: {order.order_id.substring(2, 12)}
            </Text>
            <Text style={{fontWeight: '700'}}>{order.status}</Text>
          </View>
          <View style={{marginBottom: 10, maxWidth: 200}}>
            <Text style={{textTransform: 'capitalize', marginBottom: 4}}>
              {address}
            </Text>
          </View>
          <View style={styles.orderTop}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('OrderDetail', {
                  orderDetail: products,
                })
              }>
              <View style={styles.orderDetailButton}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '500',
                    color: '#222',
                  }}>
                  Details
                </Text>
                <Image
                  source={require('./../../Assets/photos/icons/double-right.png')}
                  style={{width: 20, height: 20}}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.orderBottom}>
            <View style={styles.orderContentDetail}>
              <Text style={{fontSize: 15, fontWeight: '500'}}>Products:</Text>
              <Text>{order.product_count} items</Text>
            </View>
            <View style={styles.orderContentDetail}>
              <Text style={{fontSize: 15, fontWeight: '500'}}>Total:</Text>
              <Text>${order.total_price}</Text>
            </View>
            <View style={styles.orderContentDetail}>
              <Text style={{fontSize: 15, fontWeight: '500'}}>Date:</Text>
              <Text>{order.date}</Text>
            </View>
            <View style={styles.orderContentDetail}>
              <Text style={{fontSize: 15, fontWeight: '500'}}>Payment:</Text>
              <Text>
                {paymentMethod[0]} ending in {paymentMethod[1].substr(-4)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
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
                source={require('./../../Assets/photos/icons/double-left.png')}
                style={{width: 25, height: 25}}
              />
            </TouchableOpacity>
            <Text style={{fontSize: 20}}>Orders</Text>
          </View>
        </View>

        {!this.state.loadingOrders ? (
          !this.state.noOrders ? (
            <ScrollView style={{paddingTop: 15}}>
              {this.state.orders.map((item, index) =>
                this._renderOrders(item, index),
              )}
            </ScrollView>
          ) : (
            <View
              style={{
                height: '95%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>No Orders</Text>
            </View>
          )
        ) : (
          <View
            style={{
              height: '95%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Loading...</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  order: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 7,
    paddingVertical: 10,
    marginBottom: 10,
    borderColor: '#aaa',
    borderWidth: 0,
    borderRadius: 7,
    backgroundColor: '#FFF',
    shadowColor: '#aaa',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },
  orderContent: {
    width: WIDTH - 30,
    flexDirection: 'column',
    borderRadius: 4,
    paddingHorizontal: 7,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderTop: {
    borderColor: '#aaa',
    borderBottomWidth: 0.7,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  orderDetailButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
  },
  orderBottom: {marginBottom: 5},
  orderContentDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
});

export default Orders;
