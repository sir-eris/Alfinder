/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {
  View,
  Text,
  Alert,
  Image,
  Linking,
  Animated,
  FlatList,
  Keyboard,
  Platform,
  TextInput,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import ProductCard from '../Product/ProductCard.js';

import PropTypes from 'prop-types';
import algoliasearch from 'algoliasearch/lite';
import {
  connectSearchBox,
  connectInfiniteHits,
  connectHits,
  connectRefinementList,
  InstantSearch,
  Configure,
  Index,
} from 'react-instantsearch-native';
import {omit} from 'lodash';

import FastImage from 'react-native-fast-image';
import NetInfo from '@react-native-community/netinfo';
import KeyboardManager from 'react-native-keyboard-manager';
import SwipeableRating from 'react-native-swipeable-rating';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const searchClient = algoliasearch(
  '3IOB6P0PEU',
  'ed3ab1b9439ae9fa21325fbe1c787ca5',
);

class HomeScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    if (Platform.OS === 'ios') {
      KeyboardManager.setEnable(false);
      KeyboardManager.resignFirstResponder();
      KeyboardManager.setEnableDebugging(false);
      KeyboardManager.setEnableAutoToolbar(false);
      KeyboardManager.setToolbarManageBehaviour(0);
      KeyboardManager.setShouldResignOnTouchOutside(false);
      KeyboardManager.setOverrideKeyboardAppearance(false);
      KeyboardManager.setKeyboardDistanceFromTextField(10);
      KeyboardManager.setPreventShowingBottomBlankSpace(true);
      KeyboardManager.setToolbarDoneBarButtonItemText('close');
      KeyboardManager.setToolbarPreviousNextButtonEnable(false);
      KeyboardManager.setShouldToolbarUsesTextFieldTintColor(false);
    }

    this.state = {
      isConnected: true,
      loading: true,
      viewRef: null,

      isSearching: false,
      displaySearchBox: false,
      logoOpacity: new Animated.Value(1),
      searchBoxWidth: new Animated.Value(40),

      searchState: {},

      loadingCollections: true,
      collections: [],

      loadingTypes: true,
      types: [],
    };

    this.width = 150;
    this.rand = Math.floor(Math.random(1111, 9999) * 1000);
    this.navigateToProduct = this.navigateToProduct.bind(this);

    this.displaySuggestions = this.displaySuggestions.bind(this);
    this.removeSuggestions = this.removeSuggestions.bind(this);
    this.setQuery = this.setQuery.bind(this);
    this.onSearchStateChange = this.onSearchStateChange.bind(this);
    this.firstKeystroke = this.firstKeystroke.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
    this.navigateToProduct = this.navigateToProduct.bind(this);
  }

  componentDidMount = async () => {
    await this._bootstrapAsync();

    Linking.addEventListener('url', this.handleOpenURL);
  };

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL = event => {
    const route = event.url.replace(/.*?:\/\//g, '');
    const id = route.match(/\/([^\/]+)\/?$/)[1];
    const routeName = route.split('/')[0];

    if (routeName === 'product') {
      this.props.navigation.navigate('Product', {productId: id});
    }
  };

  _bootstrapAsync = async () => {
    await NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        this.setState({isConnected: false});
      }
    });
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleConnectivityChange,
    );
  };

  _handleConnectivityChange = async isConnected => {
    this.setState({isConnected: isConnected});

    if (this.state.isConnected) {
      await this._getCollections();
      await this._getTypes();
      this.setState({loading: false});
    }
  };

  firstKeystroke() {
    this.setState({isFirstKeystroke: false});
  }

  displaySuggestions() {
    this.setState({displaySuggestions: true});
  }

  removeSuggestions() {
    this.setState({displaySuggestions: false, isFirstKeystroke: true});
  }

  setQuery(item) {
    const searchState = omit(this.state.searchState, ['query', 'page']);
    if (searchState.indices && searchState.indices.instant_search) {
      searchState.indices.instant_search.page = 0;
    }
    this.setState({
      query: item.title,
      searchState: searchState,
      category: item.category,
      displaySuggestions: false,
    });
    this.props.navigation.navigate('Product', {product: item});
  }

  clearFilter() {
    this.setState({
      category: null,
      query: '',
    });
  }

  onSearchStateChange(searchState) {
    this.setState({searchState});
  }

  navigateToProduct(item) {
    this.props.navigation.navigate('Product', {product: item});
  }

  _getCollections = async () => {
    try {
      let response = await fetch(
        'https://alfinder.com/alfinder/public/api/collections',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      let responseJson = await response.json();
      if (response.status === 200) {
        this.setState({
          loadingCollections: false,
          collections: responseJson.data,
        });
      } else {
        this.setState({loadingCollections: true});
      }
    } catch (error) {
      // throw error;
    }
  };

  _getTypes = async () => {
    try {
      let response = await fetch(
        'https://alfinder.com/alfinder/public/api/types',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      let responseJson = await response.json();
      if (response.status === 200) {
        this.setState({
          loadingTypes: false,
          types: responseJson,
        });
      } else {
        this.setState({loadingTypes: true});
      }
    } catch (error) {
      // throw error;
    }
  };

  _renderCollection = (item, index) => {
    return (
      <View>
        <TouchableHighlight
          onPress={() =>
            this.props.navigation.navigate('Collection', {
              collection: item,
            })
          }
          underlayColor="#fff">
          <View
            style={[
              styles.collectionContainer,
              {marginLeft: index === 0 ? 10 : 0},
            ]}>
            <View style={styles.collection}>
              <FastImage
                source={{
                  uri: item.image,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
                style={[styles.collection, {position: 'absolute'}]}
              />
              <View style={{position: 'absolute', width: WIDTH - 21}} />
              <Text style={styles.collectionTitle}>{item.title}</Text>
              <Text style={styles.collectionSubTitle}>{item.subtitle}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  };

  _renderTypes = item => {
    return (
      <View>
        <Text style={[styles.sectionHeadLineTitle, {left: 15, marginBottom: 5, textTransform: 'capitalize'}]}>Trending {item[0]}</Text>
        <FlatList
          style={{marginBottom: 20}}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={item[1].data}
          renderItem={({item, index}) => (
            <ProductCard navigation={this.props.navigation} index={index} item={item} />
          )}
        />
      </View>
    );
  };

  animateSearchBox = () => {
    if (!this.state.isSearching) {
      Animated.sequence([
        Animated.timing(this.state.logoOpacity, {
          toValue: 0,
          duration: 150,
          delay: 0,
          useNativeDriver: true,
        }).start(),
        Animated.timing(this.state.searchBoxWidth, {
          toValue: WIDTH - 75,
          duration: 280,
          delay: 0,
          useNativeDriver: false,
        }).start(),
      ]);
      this.setState({isSearching: true, displaySearchBox: true});
    } else {
      Keyboard.dismiss();
      Animated.sequence([
        Animated.timing(this.state.logoOpacity, {
          toValue: 1,
          duration: 150,
          delay: 50,
          useNativeDriver: true,
        }).start(),
        Animated.timing(this.state.searchBoxWidth, {
          toValue: 40,
          duration: 280,
          delay: 0,
          useNativeDriver: false,
        }).start(),
      ]);
      this.setState({
        isSearching: false,
        displaySearchBox: false,
        displaySuggestions: false,
      });
    }
  };

  render() {
    if (!this.state.isConnected) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View>
            <Text>You Are Offline</Text>
          </View>
        </View>
      );
    } else {
      const results = (
        <ResultsInfiniteHits
          onPressItem={this.navigateToProduct}
          removeSuggestions={this.removeSuggestions}
        />
      );
      const suggestions = this.state.displaySuggestions ? (
        <SuggestionsHits onPressItem={this.navigateToProduct} />
      ) : null;
      return (
        <View style={{flex: 1}}>
          <InstantSearch
            searchClient={searchClient}
            indexName="products"
            onSearchStateChange={this.onSearchStateChange}
            searchState={this.state.searchState}>
            <View
              style={{
                height: 90,
                backgroundColor: '#fff',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: 7,
                  marginTop: 45,
                  marginBottom: 5,
                }}>
                <Animated.View
                  style={{
                    marginLeft: 12,
                    marginTop: 10,
                    width: 150,
                    height: 30,
                    opacity: this.state.logoOpacity,
                  }}>
                  <FastImage
                    source={require('../../../Assets/photos/Alfinder_Logo.png')}
                    resizeMode={FastImage.resizeMode.contain}
                    style={{width: 120, height: 24}}
                  />
                </Animated.View>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <Animated.View
                    style={{
                      position: 'absolute',
                      right: 60,
                      width: this.state.searchBoxWidth,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: '#fff',
                      justifyContent: 'center',
                    }}>
                    <View style={{position: 'absolute'}}>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => this.animateSearchBox()}>
                        <Image
                          source={require('../../../Assets/photos/icons/search.png')}
                          style={{
                            width: 29,
                            height: 29,
                            marginLeft: 6,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                    <ConnectedSearchBox
                      isFocus={this.state.displaySearchBox}
                      style={{
                        display: this.state.displaySearchBox ? 'flex' : 'none',
                      }}
                      displaySuggestions={this.displaySuggestions}
                      removeSuggestions={this.removeSuggestions}
                      firstKeystroke={this.firstKeystroke}
                      isFirstKeystroke={this.state.isFirstKeystroke}
                      defaultRefinement={this.state.query}
                      clearFilter={this.clearFilter}
                    />
                  </Animated.View>
                  <View style={{width: 50}}>
                    <TouchableOpacity
                      style={{
                        display: this.state.displaySearchBox ? 'none' : 'flex',
                      }}
                      activeOpacity={0.8}
                      onPress={() => this.props.navigation.navigate('Cart')}>
                      <Image
                        source={require('../../../Assets/photos/icons/shopping-bag.png')}
                        style={{width: 40, height: 40, marginRight: 5}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        display: this.state.displaySearchBox ? 'flex' : 'none',
                      }}
                      activeOpacity={0.8}
                      onPress={() => this.animateSearchBox()}>
                      <View
                        style={{
                          width: 40,
                          height: 40,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={{fontSize: 12}}>cancel</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            <View
              style={{
                display: this.state.isSearching ? 'flex' : 'none',
                width: WIDTH,
                height: HEIGHT - 165,
                bottom: 0,
                position: 'absolute',
                backgroundColor: 'red',
                zIndex: 999,
              }}>
              <Index indexName="products">
                <Configure hitsPerPage={20} />
                <View
                  style={{
                    position: 'absolute',
                    width: WIDTH,
                    height: '100%',
                    left: 0,
                    bottom: 0,
                    marginTop: 55,
                    zIndex: 9,
                    backgroundColor: '#fff',
                  }}>
                  {suggestions}
                </View>
              </Index>
            </View>
          </InstantSearch>

          <View style={{flex: 1}}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={16}>
              <View style={{marginBottom: 20}} />

              <View style={{marginBottom: 7}}>
                <TouchableHighlight
                  onPress={() =>
                    this.props.navigation.navigate('Collection', {
                      collection: {name: 'recommended', title: 'Recommended'},
                    })
                  }
                  underlayColor="#fff">
                  <View style={styles.collectionContainer}>
                    <View style={[styles.collection, {width: WIDTH - 21}]}>
                      <FastImage
                        source={require('../../../Assets/photos/11.jpg')}
                        resizeMode="cover"
                        style={[
                          styles.collection,
                          {position: 'absolute', width: WIDTH - 21},
                        ]}
                      />
                      <Text style={styles.collectionTitle}>RECOMMENDED</Text>
                      <Text style={styles.collectionSubTitle}>
                        Products that better define you
                      </Text>
                    </View>
                  </View>
                </TouchableHighlight>
              </View>

              <InstantSearch searchClient={searchClient} indexName="products">
                <View
                  style={{
                    marginBottom: 20,
                  }}>
                  <View style={styles.sectionHeadLine}>
                    <Text style={styles.sectionHeadLineTitle}>
                      Best Sellers
                    </Text>
                  </View>
                  {this.state.loading ? (
                    <View>
                      <View style={styles.loadingContainer}>
                        <ActivityIndicator size="small" color="#333" />
                      </View>
                    </View>
                  ) : (
                    <Index searchClient={searchClient} indexName="products">
                      <Configure hitsPerPage={25} />
                      <View>{results}</View>
                    </Index>
                  )}
                </View>

                <View
                  style={{
                    marginBottom: 20,
                  }}>
                  <View style={styles.sectionHeadLine}>
                    <Text style={styles.sectionHeadLineTitle}>Great Value</Text>
                  </View>
                  {this.state.loading ? (
                    <View>
                      <View style={styles.loadingContainer}>
                        <ActivityIndicator size="small" color="#333" />
                      </View>
                    </View>
                  ) : (
                    <Index indexName="products">
                      <Configure hitsPerPage={25} />
                      <View>{results}</View>
                    </Index>
                  )}
                </View>

                <View style={{marginBottom: 10}}>
                  <View style={{marginBottom: 20, left: 15}}>
                    <Text style={styles.collectionSubHeadLine}>
                      COLLECTIONS
                    </Text>
                    <Text style={styles.collectionHeadLine}>
                      Everything Unique To You
                    </Text>
                  </View>

                  {!this.state.loadingCollections ? (
                    <FlatList
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      data={this.state.collections}
                      renderItem={({item, index}) =>
                        this._renderCollection(item, index)
                      }
                    />
                  ) : (
                    <View style={styles.loadingContainer}>
                      <ActivityIndicator size="small" color="#333" />
                    </View>
                  )}
                </View>

                <View
                  style={{
                    marginBottom: 30,
                  }}>
                  <View style={styles.sectionHeadLine}>
                    <Text style={styles.sectionHeadLineTitle}>Top Rated</Text>
                  </View>
                  {this.state.loading ? (
                    <View>
                      <View style={styles.loadingContainer}>
                        <ActivityIndicator size="small" color="#333" />
                      </View>
                    </View>
                  ) : (
                    <Index indexName="products">
                      <Configure hitsPerPage={25} />
                      <VirtualRefinementList
                        attribute="price"
                        defaultRefinement={[]}
                      />
                      <View>{results}</View>
                    </Index>
                  )}
                </View>
              </InstantSearch>

              <View style={{marginBottom: 5, left: 15}}>
                <Text style={styles.collectionSubHeadLine}>EXCLUSIVE BY TYPE</Text>
                {/* <Text style={styles.collectionHeadLine}>Exclusive By Type</Text> */}
              </View>

              <View style={{marginBottom: 20}}>
                {!this.state.loadingTypes
                  ? this.state.types.map(items =>
                      this._renderTypes(items),
                    )
                  : null}
              </View>
            </ScrollView>
          </View>
        </View>
      );
    }
  }
}

import {connectStateResults} from 'react-instantsearch-dom';

const StateResults = ({searchResults}) => {
  const hasResults = searchResults && searchResults.nbHits !== 0;
  // const results = hasResults ? searchResults._rawResults[0] : false;

  return (
    <View>
      {hasResults
        ? searchResults.hits.map((item, index) => (
            <Item index={index} item={item} />
          ))
        : null}
    </View>
  );
};

const CustomStateResults = connectStateResults(StateResults);

class SearchBox extends React.Component {
  render() {
    return (
      <View style={this.props.style}>
        <TextInput
          style={{
            backgroundColor: '#eee',
            width: this.props.width,
            height: 40,
            paddingLeft: 15,
            paddingRight: 10,
            borderRadius: 25,
          }}
          onChangeText={text => {
            if (text === '') {
              this.props.clearFilter();
            }
            this.props.refine(text);
          }}
          focus={this.props.isFocus}
          value={this.props.currentRefinement}
          placeholder={'Search Less. Live More.'}
          placeholderTextColor={'#aaa'}
          clearButtonMode={'always'}
          underlineColorAndroid={'white'}
          spellCheck={false}
          autoCorrect={false}
          autoCapitalize={'none'}
          onFocus={this.props.displaySuggestions}
          onChange={() => {
            if (this.props.isFirstKeystroke) {
              this.props.displaySuggestions();
              this.props.firstKeystroke();
            }
          }}
        />
      </View>
    );
  }
}
const ConnectedSearchBox = connectSearchBox(SearchBox);
SearchBox.propTypes = {
  currentRefinement: PropTypes.string,
  displaySuggestions: PropTypes.func,
  firstKeystroke: PropTypes.func,
  refine: PropTypes.func,
  isFirstKeystroke: PropTypes.bool,
  clearFilter: PropTypes.func,
  isFocus: PropTypes.bool,
  style: PropTypes.object,
};

const SuggestionsHits = connectHits(({hits, onPressItem}) => (
  <FlatList
    style={{paddingTop: 10}}
    renderItem={({item, index}) => {
      return (
        <View>
          <SearchItem index={index} item={item} onPressItem={onPressItem} />
        </View>
      );
    }}
    keyboardDismissMode="on-drag"
    keyExtractor={(item, index) => item.objectID + index}
    data={hits.reduce((acc, hit, index) => {
      if (hit.status !== 'REMOVED' && hit.dosage !== '0') {
        acc.push(hit);
      }

      let i = acc.length - 1;
      for (; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = acc[i];
        acc[i] = acc[j];
        acc[j] = temp;
      }

      return acc;
    }, [])}
    keyboardShouldPersistTaps="always"
  />
));

const SearchItem = ({item, onPressItem, index}) => {
  return (
    <TouchableHighlight
      onPress={() => {
        Keyboard.dismiss();
        onPressItem(item);
      }}
      underlayColor="white">
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          width: WIDTH,
          paddingVertical: 10,
          backgroundColor: '#FFF',
          borderBottomWidth: 0.4,
          borderColor: '#ccc',
        }}>
        <FastImage
          source={{
            uri: item.images.split(',,')[0],
            priority: FastImage.priority.normal,
          }}
          style={{width: 50, height: 60, marginLeft: 4, marginRight: 7}}
        />
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: WIDTH - 75,
          }}>
          <Text numberOfLines={1}>{item.title}</Text>
          <View
            style={{
              position: 'absolute',
              top: 22,
              height: 15,
              paddingHorizontal: 5,
              borderRadius: 20,
              backgroundColor: '#F7ECE1',
            }}>
            <Text
              style={{
                marginBottom: 3,
                fontSize: 9,
                lineHeight: 15,
                color: '#000',
                fontWeight: '500',
                textTransform: 'uppercase',
                fontStyle: 'italic',
              }}>
              {item.brand_name}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 11}}>{item.type}</Text>
            <View>
              <SwipeableRating
                rating={parseFloat(item.rate)}
                allowHalves={true}
                color="#f98f03"
                emptyColor="#f98f03"
                gap={-1.5}
                size={16}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};
SearchItem.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  category: PropTypes.string,
  onPressItem: PropTypes.func,
};

const HitsList = ({hits, onPressItem, removeSuggestions, onEndReached}) => (
  <View>
    <FlatList
      style={{paddingLeft: 6}}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={hits.reduce((acc, hit, index) => {
        if (hit.status !== 'REMOVED' && hit.dosage !== '0') {
          acc.push(hit);
        }

        let i = acc.length - 1;
        for (; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = acc[i];
          acc[i] = acc[j];
          acc[j] = temp;
        }

        return acc;
      }, [])}
      renderItem={({item, index}) => (
        // <ProductCard navigation={onPressItem} item={item} />
        <Item index={index} item={item} onPressItem={onPressItem} />
      )}
      keyExtractor={item => item.product_id}
    />
  </View>
);
HitsList.propTypes = {
  hits: PropTypes.array,
  removeSuggestions: PropTypes.func,
  onEndReached: PropTypes.func,
  onPressItem: PropTypes.func,
};

const ResultsInfiniteHits = connectInfiniteHits(
  ({hits, hasMore, refine, onPressItem, removeSuggestions}) => (
    <HitsList
      removeSuggestions={removeSuggestions}
      hits={hits}
      onPressItem={onPressItem}
    />
  ),
);

const Item = ({item, onPressItem, index}) => {
  // let text = null;
  // if (index === 0) {
  //   text = buildSuggestionItem(item, 'All our categories');
  // }
  // if (item.category) {
  //   text = buildSuggestionItem(item);
  // }
  return (
    <TouchableHighlight underlayColor="#fff" onPress={() => onPressItem(item)}>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: this.width,
          height: 220,
          marginBottom: 10,
          marginTop: 4,
          marginRight: 6,
          marginLeft: 6,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          backgroundColor: '#fff',
          shadowColor: '#555',
          shadowOffset: {width: 0, height: 1.5},
          shadowOpacity: 0.23,
          shadowRadius: 3.5,
        }}>
        <View style={{width: 150, height: 150 + 10}}>
          <FastImage
            source={{
              uri: item.images,
              priority: FastImage.priority.normal,
            }}
            // this.state.width < 800
            //     ? FastImage.resizeMode.contain
            //     :
            resizeMode={FastImage.resizeMode.cover}
            style={{
              width: 150,
              height: 150 + 20,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          />

          <View
            style={{
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              bottom: 12,
              right: 5,
            }}>
            {item.vegan ? (
              <View
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 20,
                  marginRight: 5,
                  marginBottom: 2,
                }}>
                <Image
                  source={require('./../../../Assets/photos/icons/checked-green.png')}
                  style={{width: 20, height: 20}}
                />
              </View>
            ) : null}
            {item.cruelty ? (
              <View
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 20,
                  marginRight: 5,
                  marginBottom: 2,
                }}>
                <Image
                  source={require('./../../../Assets/photos/icons/checked-blue.png')}
                  style={{width: 20, height: 20}}
                />
              </View>
            ) : null}
            {item.gluten ? (
              <View
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 20,
                  marginRight: 5,
                  marginBottom: 2,
                }}>
                <Image
                  source={require('./../../../Assets/photos/icons/checked.png')}
                  style={{width: 20, height: 20}}
                />
              </View>
            ) : null}
          </View>

          <View
            style={{
              position: 'absolute',
              bottom: 12,
              left: 12,
              height: 17,
              paddingHorizontal: 5,
              borderRadius: 20,
              backgroundColor: '#F7ECE1',
            }}>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={{
                marginBottom: 4,
                fontSize: 10,
                lineHeight: 17,
                color: '#000',
                fontWeight: '500',
                textTransform: 'uppercase',
                fontStyle: 'italic',
              }}>
              {item.brand_name}
            </Text>
          </View>
        </View>

        <View
          style={{
            width: 150,
            height: 60,
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            backgroundColor: '#fff',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            paddingTop: 5,
          }}>
          <Text
            numberOfLines={2}
            ellipsizeMode={'tail'}
            style={{
              fontSize: 12.5,
              fontWeight: '400',
              marginBottom: 5,
              textTransform: 'capitalize',
              color: '#000',
            }}>
            {item.title}
          </Text>
          {/* {item.dosage !== '0' ? (
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={{
                fontSize: 11,
                fontWeight: '400',
                marginBottom: 5,
                fontStyle: 'italic',
                color: '#000',
              }}>
              {item.dosage} CBD
            </Text>
          ) : null} */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 5,
            }}>
            <View>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={{
                  fontSize: 13,
                  fontWeight: '300',
                  textTransform: 'capitalize',
                  color: '#000',
                }}>
                ${item.price}
              </Text>
            </View>
            <View>
              <SwipeableRating
                rating={parseFloat(item.rate)}
                allowHalves={true}
                color="#f98f03"
                emptyColor="#f98f03"
                gap={-1.5}
                size={16}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

Item.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  category: PropTypes.string,
  onPressItem: PropTypes.func,
};

const VirtualRefinementList = connectRefinementList(() => null);

const styles = StyleSheet.create({
  loadingContainer: {
    height: WIDTH / 1.7 - 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    position: 'relative',
    height: 78,
    backgroundColor: '#FFF',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
  },
  button: {
    marginRight: 15,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headLine: {
    position: 'absolute',
    right: 15,
  },
  collectionSubHeadLine: {color: '#777', fontSize: 12, fontWeight: '400'},
  collectionHeadLine: {fontSize: 17, fontWeight: '500', letterSpacing: 0.1},
  collection: {
    width: 230,
    height: 230,
    borderRadius: 12,
    marginBottom: 20,
    justifyContent: 'flex-end',
    backgroundColor: '#FFF',
    shadowColor: '#261F3C',
    shadowOffset: {width: 0.2, height: 0.5},
    shadowOpacity: 0.3,
    shadowRadius: 2.5,
  },
  collectionContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 9,
  },
  collectionTitle: {
    marginBottom: 3,
    marginLeft: 15,
    fontSize: 16,
    fontWeight: '500',
    color: '#FFF',
  },
  collectionSubTitle: {
    marginBottom: 10,
    marginLeft: 15,
    fontSize: 15,
    fontWeight: '400',
    color: '#fff',
  },
  collectionProductBrandTitle: {
    bottom: 15,
    width: WIDTH / 2 - 40,
    left: 18,
    fontSize: 14.5,
    fontWeight: '400',
    color: '#000',
  },
  collectionProductTitle: {
    bottom: 15,
    width: WIDTH / 2 - 50,
    marginBottom: 4,
    left: 15,
    fontSize: 15.5,
    fontWeight: '500',
    color: '#000',
  },
  sectionHeadLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 10,
  },
  sectionHeadLineTitle: {
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.1,
  },
  sectionHeadLineMore: {
    fontSize: 13,
    fontWeight: '400',
    color: '#69559a',
    fontStyle: 'italic',
  },
});

export default HomeScreen;
