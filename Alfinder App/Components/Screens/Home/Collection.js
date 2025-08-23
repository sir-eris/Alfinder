/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {API, CONFIG} from './../../App/Config';

import {
  View,
  Text,
  Alert,
  Image,
  FlatList,
  Animated,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';

import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import {AlertMessage, ShareSheet} from '../../App/Utils';
import WebViewProgress from './../../Sections/WebViewProgress';
import ProductCollection from './../Product/ProductCollection.js';

const WIDTH = CONFIG.width;

class CollectionScreen extends React.Component {
  constructor(props) {
    super(props);

    this.width = WIDTH - 25;

    this.state = {
      ready: false,
      tryAgain: false,
      tryAgainCount: 0,

      scale: new Animated.Value(1),

      logLink: null,
      displayBlogModal: false,

      products: [],

      blogs: [],
      noBlogs: false,
    };

    const {params} = this.props.navigation.state;
    this.collection = params ? params.collection : null;
  }

  componentDidMount = async () => {
    this._getProducts();
    await this._getBlogs();
  };

  _getProducts = async () => {
    if (this.state.tryAgainCount > 3) {
      this.props.navigation.navigate('Home');
    }
    this.setState({tryAgainCount: this.state.tryAgainCount + 1});

    let that = this;
    await API.post('collections/collection', {
      collection: this.collection.name,
    })
      .then(function(response) {
        that.setState({
          ready: true,
          tryAgain: false,
          products: response.data.data,
        });
      })
      .catch(function(error) {
        if (error.response) {
          // console.log(error.response.data);
          // console.log(error.response.headers);
          that.setState({
            ready: false,
            tryAgain: true,
          });
        }
      });
  };

  _getBlogs = async () => {
    let that = this;
    await API.post('blogs/category', {
      category: this.collection.name,
    })
      .then(function(response) {
        that.setState({
          ready: true,
          tryAgain: false,
          blogs: response.data,
          noBlogs: response.data.length ? false : true,
        });
      })
      .catch(function(error) {
        if (error.response) {
          // console.log(error.response.data);
          // console.log(error.response.headers);
          that.setState({
            ready: false,
            tryAgain: true,
          });
        }
      });
  };

  _displayBlog = slug => {
    if (!this.state.displayBlogModal) {
      Animated.timing(this.state.scale, {
        toValue: 0.9,
        duration: 280,
        useNativeDriver: true,
      }).start();
      this.setState({
        blogLink: slug,
        displayBlogModal: true,
      });
    } else {
      Animated.timing(this.state.scale, {
        toValue: 1,
        duration: 230,
        useNativeDriver: true,
      }).start();
      this.setState({
        blogLink: null,
        displayBlogModal: false,
      });
    }
  };

  _renderProduct = (item, index) => {
    return (
      <ProductCollection
        navigation={this.props.navigation}
        item={item}
        width={WIDTH / 2 - 20}
      />
    );
  };

  renderBlofItem = item => {
    return (
      <View style={{paddingTop: 12, paddingBottom: 5, alignItems: 'center'}}>
        <TouchableHighlight
          onLongPress={() =>
            ShareSheet({
              title: 'Alfinder Blog',
              link: CONFIG.url.blog + item.item.slug,
              message: 'Alfinder Blog',
            })
          }
          activeOpacity={0.9}
          underlayColor="#fff"
          onPress={() => this._displayBlog(item.item.slug)}>
          <View
            style={{
              width: CONFIG.width - 25,
              height: CONFIG.width / 1.5,
              marginHorizontal: 20,
              borderRadius: 20,
              backgroundColor: '#fff',
              shadowColor: '#aaa',
              shadowOpacity: 0.5,
              shadowRadius: 10,
              shadowOffset: {width: 0, height: 1},
            }}>
            <View
              style={{
                height: '65%',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                backgroundColor: '#fff',
              }}>
              <Image
                source={{
                  uri: item.item.thumbnail,
                }}
                style={{
                  height: '100%',
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: 12,
                  right: 12,
                  borderRadius: 25,
                  width: 100,
                  height: 25,
                  backgroundColor: '#F7ECE1',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    textTransform: 'uppercase',
                    fontSize: 12,
                    fontStyle: 'italic',
                  }}>
                  {item.item.topic}
                </Text>
              </View>
            </View>
            <View
              style={{
                height: '35%',
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  height: '100%',
                  justifyContent: 'space-between',
                  paddingHorizontal: 14,
                  paddingTop: 10,
                  paddingBottom: 9,
                }}>
                <Text
                  numberOfLines={2}
                  style={{
                    fontSize: 17,
                    fontWeight: '500',
                    lineHeight: 23,
                    color: '#222',
                  }}>
                  {item.item.title}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{fontSize: 14, color: '#666'}}>
                    {item.item.read_time} min
                  </Text>
                  <Text style={{fontSize: 13, color: '#666'}}>May 25</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  };

  render() {
    if (!this.state.ready && !this.state.tryAgain) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="small" color="#333" />
        </View>
      );
    } else if (this.state.ready && !this.state.tryAgain) {
      return (
        <View style={{flex: 1, backgroundColor: '#000'}}>
          <Animated.View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              transform: [{scale: this.state.scale}],
            }}>
            <View style={{flex: 1}}>
              <ScrollableTabView
                initialPage={0}
                style={{marginTop: 40, paddingLeft: 0}}
                tabBarUnderlineStyle={{
                  height: 2,
                  borderRadius: 10,
                  borderBottomWidth: 3,
                  borderColor: '#3c2d64',
                }}
                tabBarTextStyle={{
                  textTransform: 'uppercase',
                  fontWeight: '500',
                }}
                tabBarActiveTextColor="#3c2d69"
                tabBarInactiveTextColor="#666"
                renderTabBar={() => (
                  <ScrollableTabBar style={{borderBottomWidth: 0.4}} />
                )}>
                <View
                  tabLabel="Products"
                  style={{flex: 1, backgroundColor: '#fff'}}>
                  <View style={{flex: 1, paddingTop: 7}}>
                    <FlatList
                      style={{paddingTop: 10}}
                      columnWrapperStyle={{justifyContent: 'space-evenly'}}
                      numColumns={2}
                      showsVerticalScrollIndicator={false}
                      data={this.state.products}
                      renderItem={({item, index}) =>
                        this._renderProduct(item, index)
                      }
                      keyExtractor={item => item.product_id}
                    />
                  </View>
                </View>

                {this.state.noBlogs ? null : (
                  <View
                    tabLabel="Blogs"
                    style={{flex: 1, backgroundColor: '#fff'}}>
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      data={this.state.blogs}
                      renderItem={item => this.renderBlofItem(item)}
                      keyExtractor={item => item.product_id}
                    />
                  </View>
                )}
              </ScrollableTabView>
            </View>
          </Animated.View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.displayBlogModal}>
            <TouchableHighlight
              underlayColor="transparent"
              activeOpacity={1}
              onPress={() => this._displayBlog()}>
              <View style={{width: CONFIG.width, height: 55}} />
            </TouchableHighlight>
            <View
              style={{
                height: 50,
                backgroundColor: '#fff',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                paddingHorizontal: 15,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 5},
                shadowOpacity: 0.3,
                shadowRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 17, fontWeight: '500'}}>
                Alfinder Blog
              </Text>
              <View style={{position: 'absolute', right: 10}}>
                <TouchableHighlight
                  underlayColor="transparent"
                  activeOpacity={0.5}
                  onPress={() =>
                    ShareSheet({
                      title: 'Alfinder Blog',
                      link: CONFIG.url.blog + this.state.blogLink,
                      message: 'Alfinder Blog',
                    })
                  }>
                  <View
                    style={{
                      paddingHorizontal: 7,
                    }}>
                    <Text style={{fontSize: 28, fontWeight: '500', top: -8}}>
                      ...
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
            <WebViewProgress
              style={{height: CONFIG.height - 60}}
              source={{uri: CONFIG.url.blog + this.state.blogLink}}
            />
            {/* <WebView
          style={{height: CONFIG.height - 60}}
          source={{uri: CONFIG.url.blog + this.state.blogLink}}
          ref={forwardedRef}
          onLoadStart={this._onLoadStart}
          onLoadEnd={this._onLoadEnd}
          onLoadProgress={this._onLoadProgress}
          onError={this._onError}
        /> */}
          </Modal>
        </View>
      );
    } else {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity onPress={this._getProducts}>
            <Text>Please Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

export default CollectionScreen;
