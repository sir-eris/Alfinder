/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {View, Text, ScrollView, Alert, FlatList, TouchableOpacity, Dimensions} from 'react-native';

import Icon from 'react-native-ionicons';
import ReviewItem from '../Sections/Review.js';

const WIDTH = Dimensions.get('screen').width;

class ReviewsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      loadingReviews: true,
      noReviews: true,
      reviews: [],
    };

    const {params} = this.props.navigation.state;
    this.productId = params.id;
  }

  componentDidMount = async () => {
    await this._loadReviewsAsync();
  };

  _loadReviewsAsync = async () => {
    try {
      let response = await fetch(
        'https://alfinder.com/alfinder/public/api/products/reviews/' + this.state.page,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            product_id: this.productId,
          }),
        },
      );
      if (response.status === 200) {
        const responseJson = await response.json();

        if (responseJson.data.length > 0) {
          this.setState({
            loadingReviews: false,
            noReviews: false,
            reviews: responseJson.data,
          });
        } else {
          this.setState({
            loadingReviews: false,
            noReviews: true,
          });
        }
      } else {
        Alert.alert(JSON.stringify(response.status));
      }
    } catch (error) {
      throw error;
    }
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
              marginTop: 52,
              marginBottom: 0,
              marginHorizontal: 10,
            }}>
            <TouchableOpacity
              style={{padding: 10, paddingTop: 0, paddingLeft: 2}}
              onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" size={28} color="#000" />
            </TouchableOpacity>
            <Text style={{fontSize: 22}}>Reviews & Ratings</Text>
          </View>
        </View>

        <FlatList
          style={{paddingTop: 15, height: '100%'}}
          contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
          data={this.state.reviews}
          renderItem={({item, index}) => (
            <ReviewItem key={index} data={item} style={{width: WIDTH - 30, marginBottom: 10, marginLeft: 0, marginRight: 0}} />
          )}
          keyExtractor={item => item.title}
        />
      </View>
    );
  }
}

export default ReviewsScreen;
