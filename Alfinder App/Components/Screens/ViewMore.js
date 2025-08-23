/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {
  View,
  Text,
  Alert,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

// import Icon from 'react-native-ionicons';
import RelatedProduct from './Product/ProductCard.js';

const WIDTH = Dimensions.get('screen').width;

class ViewMoreScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      page: 1,
    };

    const {params} = this.props.navigation.state;
    this.title = params ? params.title : null;
    this.link = params ? params.link : '';

    this.randSeed = Math.floor(Math.random(1111, 9999) * 1000);
  }

  componentDidMount = async () => {
    await this._appendData();
  };

  _appendData = async () => {
    let data = await this._getProductsAsync();
    this.setState({data: [...data]});
    this.setState({loading: false, ready: true});
  };

  _getProductsAsync = async () => {
    if (this.link !== '') {
      try {
        const response = await fetch(
          this.link + this.randSeed + '/' + this.state.page,
          {
            method: 'POST',
          },
        );
        if (response.status === 200) {
          const responseJson = await response.json();
          this.setState({page: this.state.page + 1});

          return responseJson.data;
        } else {
          Alert.alert('Try Again');
        }
      } catch (error) {
        throw error;
      }
    }
  };

  _renderRelatedProducts = ({item, index}) => {
    return <RelatedProduct navigation={this.props.navigation} item={item} width={WIDTH / 2 - 20} />;
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{height: 90, borderBottomWidth: 0.4, borderColor: '#aaa'}}>
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
            <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
              <Image
                source={require('./../../Assets/photos/icons/double-left.png')}
                style={{width: 25, height: 25, top: 2}}
              />
            </TouchableOpacity>
            <Text style={{fontSize: 22}}>{this.title}</Text>
          </View>
        </View>

        <View style={{flex: 1, flexDirection: 'column'}}>
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
            <View style={{flex: 1}}>
              <FlatList
                columnWrapperStyle={{justifyContent: 'center'}}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={this.state.data}
                renderItem={(item, index) =>
                  this._renderRelatedProducts(item, index)
                }
                keyExtractor={item => item.product_id}
              />
            </View>
          )}
        </View>
      </View>
    );
  }
}

export default ViewMoreScreen;
