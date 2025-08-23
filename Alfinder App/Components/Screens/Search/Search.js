/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {
  View,
  Text,
  Image,
  Platform,
  Animated,
  Keyboard,
  FlatList,
  TextInput,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import KeyboardManager from 'react-native-keyboard-manager';
import AsyncStorage from '@react-native-community/async-storage';

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
import SwipeableRating from 'react-native-swipeable-rating';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;
const searchClient = algoliasearch(
  '3IOB6P0PEU',
  'ed3ab1b9439ae9fa21325fbe1c787ca5',
);

class SearchScreen extends React.PureComponent {
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

    this._getAppKey();

    this.state = {
      displaySuggestions: false,
      isFirstKeystroke: true,
      searchState: {},
      query: '',
      category: null,

      modalOpacity: new Animated.Value(0),
      modalDisplay: 'none',
      addToCartModal: false,
      addReviewModal: false,

      ready: false,
      loading: true,
      showResults: 'none',
      currentProductIndex: 0,

      activeSections: [],

      data: [],
      page: 1,

      hasOptions: null,
      optionSelected: '',
      optionIndex: '',
      count: 1,

      loadingAddresses: true,
      noAddresses: null,
      addresses: [],

      loadingPaymentMethods: true,
      noPaymentMethods: null,
      paymentMethods: [],

      rate: 5,
      reviewTitle: null,
      reviewBody: null,

      checkOutModal: false,
    };

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
  };

  _bootstrapAsync = async () => {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        this.setState({isConnected: false});
      }
    });
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleConnectivityChange,
    );
  };

  _handleConnectivityChange = isConnected => {
    this.setState({isConnected: isConnected});
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

  _getAppKey = async () => {
    try {
      const val = await AsyncStorage.getItem('AlfinderUserToken');
      const value = await JSON.parse(val);
      if (value === null || value === '') {
        this.props.navigation.navigate('Auth');
      } else {
        if (value.token === null || value.token === '') {
          this.props.navigation.navigate('Auth');
        } else {
          this.authToken = value.token;
        }
      }
    } catch (e) {
      // throw e;
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
      // const suggestions = this.state.displaySuggestions ? (
      //   <SuggestionsHits onPressItem={this.navigateToProduct} />
      // ) : null;

      const suggestions = (
        <SuggestionsHits onPressItem={this.navigateToProduct} />
      );

      // const results = (
      //   <ResultsInfiniteHits
      //     onPressItem={this.navigateToProduct}
      //     removeSuggestions={this.removeSuggestions}
      //   />
      // );

      return (
        <View style={{flex: 1}}>
          <View style={{backgroundColor: 'transparent', zIndex: 999}}>
            <View
              style={{
                marginTop: 45,
              }}>
              <InstantSearch
                searchClient={searchClient}
                indexName="products"
                onSearchStateChange={this.onSearchStateChange}
                searchState={this.state.searchState}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderBottomWidth: 0.4,
                    borderColor: '#cce',
                  }}>
                  <ConnectedSearchBox
                    displaySuggestions={this.displaySuggestions}
                    removeSuggestions={this.removeSuggestions}
                    firstKeystroke={this.firstKeystroke}
                    isFirstKeystroke={this.state.isFirstKeystroke}
                    defaultRefinement={this.state.query}
                    clearFilter={this.clearFilter}
                  />
                  <View
                    style={{
                      width: 50,
                      marginBottom: 7,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => this.props.navigation.navigate('Cart')}
                      style={{paddingLeft: 5}}>
                      <Image
                        source={require('./../../../Assets/photos/icons/shopping-bag.png')}
                        style={{
                          width: 40,
                          height: 40,
                          marginRight: 6,
                          marginBottom: 6,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <Index indexName="products">
                  <Configure hitsPerPage={20} />
                  <View
                    style={{
                      position: 'absolute',
                      height: HEIGHT - 180,
                      marginTop: 55,
                      zIndex: 9,
                      backgroundColor: '#fff',
                    }}>
                    {suggestions}
                  </View>
                </Index>

                {/* <Index indexName="products">
                  <Configure hitsPerPage={15} />
                  <VirtualRefinementList
                    attribute="category"
                    defaultRefinement={
                      this.state.category ? [this.state.category] : []
                    }
                  />
                  <View style={{}}>{results}</View>
                </Index> */}
              </InstantSearch>
            </View>
          </View>
        </View>
      );
    }
  }
}

class SearchBox extends React.Component {
  render() {
    return (
      <View>
        <TextInput
          style={{
            backgroundColor: '#eee',
            width: WIDTH - 60,
            height: 43,
            paddingLeft: 15,
            paddingRight: 10,
            marginLeft: 10,
            marginBottom: 10,
            borderRadius: 25,
          }}
          onChangeText={text => {
            if (text === '') {
              this.props.clearFilter();
            }
            this.props.refine(text);
          }}
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
};

// const HitsList = ({hits, onPressItem, removeSuggestions, onEndReached}) => (
//   <View
//     style={{
//       height: HEIGHT - 180,
//       width: WIDTH,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: '#FFF',
//     }}>
//     <FlatList
//       style={{paddingTop: 10, width: WIDTH, height: HEIGHT}}
//       contentContainerStyle={{alignItems: 'center'}}
//       showsVerticalScrollIndicator={false}
//       renderItem={({item, index}) => (
//         <View
//           key={index + ''}
//           style={{
//             justifyContent: 'center',
//             alignItems: 'center',
//             marginBottom: 25,
//             paddingBottom: 15,
//             // paddingTop: 10,
//             borderRadius: 10,
//             width: WIDTH - 25,
//             backgroundColor: '#fff',
//             shadowColor: '#261F3C',
//             shadowOffset: {width: 0, height: 0.5},
//             shadowOpacity: 0.3,
//             shadowRadius: 1,
//           }}>
//           <View style={{width: WIDTH - 25}}>
//             <View
//               style={{
//                 width: '100%',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 marginBottom: 10,
//               }}>
//               <Carousel
//                 // useScrollView
//                 ref={c => {
//                   this.imageCarousel = c;
//                 }}
//                 activeSlideAlignment={'center'}
//                 data={item.images.split(',,')}
//                 renderItem={({item}) => (
//                   <View
//                     style={{justifyContent: 'center', alignItems: 'center'}}>
//                     <FastImage
//                       style={{
//                         width: WIDTH - 25,
//                         height: 300,
//                         borderTopLeftRadius: 10,
//                         borderTopRightRadius: 10,
//                       }}
//                       source={{
//                         uri: item,
//                         priority: FastImage.priority.normal,
//                       }}
//                       resizeMode={FastImage.resizeMode.cover}
//                     />
//                   </View>
//                 )}
//                 sliderWidth={WIDTH - 25}
//                 itemWidth={WIDTH - 25}
//                 // onSnapToItem={index => this.setState({activeImage: index})}
//                 inactiveSlideScale={1}
//                 inactiveSlideOpacity={1}
//               />
//               <View
//                 style={{
//                   position: 'absolute',
//                   bottom: 15,
//                   left: 20,
//                   height: 17,
//                   paddingHorizontal: 5,
//                   borderRadius: 20,
//                   backgroundColor: '#F7ECE1',
//                 }}>
//                 <Text
//                   numberOfLines={1}
//                   ellipsizeMode={'tail'}
//                   style={{
//                     marginBottom: 4,
//                     fontSize: 11,
//                     lineHeight: 17,
//                     color: '#000',
//                     fontWeight: '500',
//                     textTransform: 'uppercase',
//                     fontStyle: 'italic',
//                   }}>
//                   {item.brand_name}
//                 </Text>
//               </View>
//             </View>
//             <View style={{alignItems: 'center'}}>
//               <View
//                 style={{
//                   width: WIDTH - 25,
//                   marginBottom: 12,
//                 }}>
//                 <View
//                   style={{
//                     paddingTop: 4,
//                     marginHorizontal: 8,
//                     marginBottom: 7,
//                   }}>
//                   <Text
//                     style={{
//                       fontSize: 16,
//                       fontWeight: '500',
//                       color: '#000',
//                     }}>
//                     {item.title}
//                   </Text>
//                 </View>
//                 <View style={{marginLeft: 9, marginBottom: 7}}>
//                   <Text
//                     style={{
//                       fontSize: 13,
//                       fontWeight: '300',
//                       textTransform: 'uppercase',
//                       color: '#333',
//                     }}>
//                     {item.type}
//                   </Text>
//                 </View>
//                 <View style={{alignItems: 'center'}}>
//                   <View
//                     style={{
//                       width: WIDTH - 45,
//                       flexDirection: 'row',
//                       justifyContent: 'space-between',
//                       alignItems: 'center',
//                     }}>
//                     <View>
//                       <Text
//                         style={{
//                           left: 2,
//                           fontSize: 15,
//                           fontWeight: '300',
//                           color: '#000',
//                           textTransform: 'uppercase',
//                         }}>
//                         ${item.price}
//                       </Text>
//                     </View>
//                     <View>
//                       <SwipeableRating
//                         rating={parseFloat(item.rate)}
//                         size={19}
//                         gap={-1}
//                         swipeable={false}
//                         allowHalves={true}
//                         color={'#f98f03'}
//                         emptyColor={'#f98f03'}
//                       />
//                     </View>
//                   </View>
//                 </View>
//               </View>
//             </View>
//           </View>

//           <View style={{width: '100%', marginBottom: 23}}>
//             <View style={{marginHorizontal: 10}}>
//               <Text
//                 style={{
//                   left: 2,
//                   marginBottom: 7,
//                   fontSize: 14,
//                   fontWeight: '400',
//                 }}>
//                 Description
//               </Text>
//               <Text
//                 numberOfLines={2}
//                 style={{fontSize: 14, fontWeight: '300', lineHeight: 19}}>
//                 {item.description}
//               </Text>
//             </View>
//           </View>

//           <View style={{justifyContent: 'center', alignItems: 'center'}}>
//             <TouchableOpacity
//               activeOpacity={0.8}
//               onPress={() => onPressItem(item)}>
//               <View
//                 style={{
//                   width: WIDTH - 120,
//                   height: 37,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   borderRadius: 20,
//                   backgroundColor: '#261F3C',
//                 }}>
//                 <Text style={{color: '#fff', fontSize: 14, fontWeight: '500'}}>
//                   VIEW PRODUCT
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           </View>
//         </View>
//       )}
//       data={hits}
//       keyExtractor={(item, index) => item.objectID + index}
//       onEndReached={onEndReached}
//       onScroll={() => {
//         Keyboard.dismiss();
//         removeSuggestions();
//       }}
//       ItemSeparatorComponent={() => <View style={hits.hitsSeparator} />}
//     />
//   </View>
// );
// HitsList.propTypes = {
//   hits: PropTypes.array,
//   removeSuggestions: PropTypes.func,
//   onEndReached: PropTypes.func,
//   onPressItem: PropTypes.func,
// };

// const ResultsInfiniteHits = connectInfiniteHits(
//   ({hits, hasMore, refine, onPressItem, removeSuggestions}) => (
//     <HitsList
//       removeSuggestions={removeSuggestions}
//       hits={hits}
//       onPressItem={onPressItem}
//       onEndReached={() => {
//         if (hasMore) {
//           // Alert.alert('h');
//           refine();
//         }
//       }}
//     />
//   ),
// );

const SuggestionsHits = connectHits(({hits, onPressItem}) => (
  <FlatList
    style={{paddingTop: 10}}
    renderItem={({item, index}) => {
      // const category =
      //   index === 1
      //     ? // ? item.instant_search.facets.exact_matches.category.value
      //       item.category
      //     : null;
      return (
        <View>
          <Item
            index={index}
            // category={category}
            item={item}
            onPressItem={onPressItem}
          />
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

const buildSuggestionItem = item => (
  <View
    style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between'}}>
    <Text numberOfLines={1}>{item.title}</Text>
  </View>
);

const Item = ({item, onPressItem, index}) => {
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

Item.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  category: PropTypes.string,
  onPressItem: PropTypes.func,
};

const VirtualRefinementList = connectRefinementList(() => null);

export default SearchScreen;
