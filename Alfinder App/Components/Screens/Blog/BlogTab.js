/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {CONFIG, API} from '../../App/Config';

import {
  View,
  Text,
  Image,
  Modal,
  Animated,
  FlatList,
  TouchableHighlight,
} from 'react-native';

import Icon from 'react-native-ionicons';

import {AlertMessage, ShareSheet} from '../../App/Utils';
import WebViewProgress from './../../Sections/WebViewProgress';

const LIST = ['lorem', 'ipsum', 'lorem dolor', 'color red', 'eris verne'];

class Blog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      loading: true,
      blogs: [],
      tryAgain: false,
      tryAgainCount: 0,

      scale: new Animated.Value(1),

      blogLink: null,
      displayBlogModal: false,
    };
  }

  async componentDidMount() {
    this._getBlogs();

    // AlertMessage({
    //   title: 'title',
    //   message: 'message',
    //   buttons: [
    //     {
    //       text: 'Cancel',
    //       onPress: () => console.log('Cancel Pressed'),
    //       style: 'cancel',
    //     },
    //     {
    //       text: 'OK',
    //       onPress: () => console.log('OK Pressed'),
    //       style: 'default',
    //     },
    //   ],
    // });
  }

  _getBlogs = async () => {
    let that = this;
    await API.post('blogs')
      .then(function(response) {
        that.setState({
          ready: true,
          tryAgain: false,
          blogs: response.data,
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

  _onLoadProgress = syntheticEvent => {
    this.setState({percent: syntheticEvent.nativeEvent.progress});
    const {onLoadProgress} = this.props;
    onLoadProgress && onLoadProgress(syntheticEvent);
  };

  _onError = syntheticEvent => {
    this.setState({color: this.props.errorColor, percent: 1});
    const {onError} = this.props;
    onError && onError(syntheticEvent);
  };

  _onLoadStart = syntheticEvent => {
    this.setState({visible: true});
    const {onLoadStart} = this.props;
    onLoadStart && onLoadStart(syntheticEvent);
  };

  _onLoadEnd = syntheticEvent => {
    const {onLoadEnd, disappearDuration} = this.props;
    this.timer = setTimeout(() => {
      this.setState({visible: false});
    }, disappearDuration);
    onLoadEnd && onLoadEnd(syntheticEvent);
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  _displayBlog = link => {
    if (!this.state.displayBlogModal) {
      Animated.timing(this.state.scale, {
        toValue: 0.9,
        duration: 280,
        useNativeDriver: true,
      }).start();
      this.setState({
        blogLink: link,
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

  renderBlogItem = item => {
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
          onPress={() => this._displayBlog(item.item.link)}>
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
                  height: 25,
                  paddingHorizontal: 13,
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
                  <Text style={{fontSize: 13, color: '#666'}}>
                    {item.item.date}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  };

  render() {
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
          <View
            style={{
              height: 110,
              backgroundColor: '#fff',
              borderRadius: 10,
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                paddingBottom: 7,
                marginTop: 0,
                marginBottom: 5,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  left: 20,
                  color: '#333',
                  textTransform: 'uppercase',
                }}>
                {new Date().toDateString().substr(0, 10)}
              </Text>
              <Text
                style={{
                  fontSize: 27,
                  letterSpacing: 1.1,
                  fontWeight: '800',
                  left: 20,
                }}>
                Blog
              </Text>
            </View>
          </View>

          {/* <View>
            <View style={{flexDirection: 'row', paddingBottom: 5}}>
              <FlatList
                style={{paddingLeft: 12}}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={LIST}
                renderItem={(item, index) => (
                  <TouchableHighlight
                    activeOpacity={1}
                    underlayColor="#fff"
                    onPress={() =>
                      this.props.navigation.navigate('BlogList', {
                        keyword: item.item,
                      })
                    }>
                    <View
                      style={{
                        paddingHorizontal: 17,
                        marginVertical: 5,
                        paddingVertical: 10,
                        marginRight: 9,
                        borderRadius: 20,
                        backgroundColor: '#6755a4',
                        shadowOffset: {width: 0, height: 0},
                        shadowRadius: 2,
                        shadowColor: '#aaa',
                        shadowOpacity: 1,
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          textTransform: 'capitalize',
                          fontSize: 14,
                          fontWeight: '500',
                        }}>
                        {item.item}
                      </Text>
                    </View>
                  </TouchableHighlight>
                )}
                keyExtractor={index => index}
              />
            </View>
          </View> */}

          <View style={{flex: 1}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              renderItem={item => this.renderBlogItem(item)}
              data={this.state.blogs}
            />
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
            <View style={{position: 'absolute', left: 10, top: 10}}>
              <TouchableHighlight
                underlayColor="transparent"
                activeOpacity={0.5}
                onPress={() => this._displayBlog()}>
                <View
                  style={{
                    paddingHorizontal: 7,
                  }}>
                  <Icon name={'close'} size={32} />
                </View>
              </TouchableHighlight>
            </View>
            <Text style={{fontSize: 17, fontWeight: '500'}}>Alfinder Blog</Text>
            <View style={{position: 'absolute', right: 10}}>
              <TouchableHighlight
                underlayColor="transparent"
                activeOpacity={0.5}
                onPress={() =>
                  ShareSheet({
                    title: 'Alfinder Blog',
                    link: this.state.blogLink,
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
            source={{uri: this.state.blogLink}}
          />
        </Modal>
      </View>
    );
  }
}

export default Blog;
