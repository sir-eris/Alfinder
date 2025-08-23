/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Alert, Image, Linking, Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
// import App from './Components/App/App';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import NetInfo from '@react-native-community/netinfo';
import {fromBottom} from 'react-navigation-transitions';
// Auth
import SignInScreen from './Components/Screens/Auth/SignIn.js';
import SignUpScreen from './Components/Screens/Auth/SignUp.js';
import WelcomeScreen from './Components/Screens/Auth/Welcome.js';
import PasswordScreen from './Components/Screens/Auth/Password.js';

// Customer
import CartScreen from './Components/Screens/Cart.js';
import OrdersScreen from './Components/Screens/Orders.js';
import ProductScreen from './Components/Screens/Product/Product.js';
import ReviewsScreen from './Components/Screens/Reviews.js';
import ViewMoreScreen from './Components/Screens/ViewMore.js';
import CollectionScreen from './Components/Screens/Home/Collection.js';
import OrderDetailsScreen from './Components/Screens/OrderDetails.js';
// import BrandScreen from './Components/Screens/Brand.js';
// import ViewAllScreen from './Components/Screens/ViewAll.js';

// Profile
import WalletScreen from './Components/Screens/Profile/Wallet.js';
import HelpScreen from './Components/Screens/Profile/Help.js';
import AboutScreen from './Components/Screens/Profile/About.js';
import SettingsScreen from './Components/Screens/Profile/Settings.js';
import ContactUsScreen from './Components/Screens/Profile/Contacts/ContactUs.js';
import SuggestionScreen from './Components/Screens/Profile/Contacts/Suggestion';
import SupportScreen from './Components/Screens/Profile/Contacts/Support.js';
import PersonalInfoScreen from './Components/Screens/Profile/PersonalInfo.js';
// import ChatRoomScreen from './Components/Screens/ChatRoom.js';
// import PointSystemScreen from './Components/Screens/Profile/PointSystem.js';

import BlogListScreen from './Components/Screens/Blog/BlogList.js';

// import SearchTab from './Components/Screens/Search/Search.js';
import BlogTab from './Components/Screens/Blog/BlogTab.js';
import HomeTab from './Components/Screens/Home/HomeTab.js';
import WishListTab from './Components/Screens/WishListTab.js';
import ProfileTab from './Components/Screens/Profile/ProfileTab.js';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    setInterval(() => {
      this._getAppKey();
    }, 300);
  }

  componentDidMount = () => {
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
          if (value.type === 'USER') {
            this.props.navigation.navigate('UserApp');
          } else {
            this.props.navigation.navigate('Auth');
          }
        }
      }
    } catch (e) {
      // throw e;
      this.props.navigation.navigate('Auth');
    }
  };

  // Loading Content
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={require('./Assets/photos/Icon-App.png')}
          resizeMethod="auto"
        />
      </View>
    );
  }
}

const handleCustomTransition = ({scenes}) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];

  // if (
  //   prevScene &&
  //   prevScene.route.routeName === 'Home' &&
  //   nextScene.route.routeName === 'ChatRoom'
  // ) {
  //   return fromLeft(500);
  // }

  if (
    prevScene &&
    prevScene.route.routeName === 'Home' &&
    nextScene.route.routeName === 'Collection'
  ) {
    return fromBottom(480);
  }
  // return fromLeft();
};

const ProductStack = createStackNavigator(
  {
    Product: ProductScreen,
    Reviews: ReviewsScreen,
  },
  {
    headerShown: false,
    headerMode: 'none',
  },
);

const WishListStack = createStackNavigator(
  {
    WishList: WishListTab,
    Product: ProductStack,
  },
  {
    headerShown: false,
    headerMode: 'none',
  },
);

const OrderStack = createStackNavigator(
  {
    Orders: OrdersScreen,
    OrderDetail: OrderDetailsScreen,
  },
  {
    headerShown: false,
    headerMode: 'none',
  },
);

const CartStack = createStackNavigator(
  {
    Cart: CartScreen,
    Product: ProductStack,
  },
  {
    headerShown: false,
    headerMode: 'none',
  },
);

const HomeStack = createStackNavigator(
  {
    Home: HomeTab,
    Collection: CollectionScreen,
    Product: ProductStack,
    Cart: CartStack,
    ViewMore: ViewMoreScreen,
    Wecome: WelcomeScreen,
    // ChatRoom: ChatRoomScreen,
  },
  {
    headerShown: false,
    headerMode: 'none',
    transitionConfig: nav => handleCustomTransition(nav),
  },
);

const BlogStack = createStackNavigator(
  {
    BlogTab,
    BlogList: BlogListScreen,
    Product: ProductStack,
    Cart: CartScreen,
    Reviews: ReviewsScreen,
  },
  {
    headerShown: false,
    headerMode: 'none',
  },
  {
    headerShown: false,
    headerMode: 'none',
  },
);

const AboutStack = createStackNavigator(
  {
    About: AboutScreen,
    ContactUs: ContactUsScreen,
    Suggestion: SuggestionScreen,
    Support: SupportScreen,
  },
  {
    headerShown: false,
    headerMode: 'none',
  },
);

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileTab,
    Cart: CartScreen,
    Orders: OrderStack,
    Product: ProductStack,
    PersonalInfo: PersonalInfoScreen,
    Wallet: WalletScreen,
    Settings: SettingsScreen,
    Help: HelpScreen,
    About: AboutStack,
    ContactUs: ContactUsScreen,
    Suggestion: SuggestionScreen,
    Support: SupportScreen,
    // PointSystem: PointSystemScreen,
  },
  {
    headerShown: false,
    headerMode: 'none',
  },
);

const UserBottomTab = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: <Text style={{fontSize: 10, color: '#000'}}>Home</Text>,
        tabBarIcon: ({focused}) => (
          <View>
            <Text
              style={{
                marginTop: 25,
                fontSize: 11,
                fontWeight: focused ? '400' : '300',
              }}>
              Home
            </Text>
          </View>
        ),
      },
    },
    Blog: {
      screen: BlogStack,
      navigationOptions: {
        tabBarLabel: <Text style={{fontSize: 10, color: '#000'}}>Blog</Text>,
        tabBarIcon: ({focused}) => (
          <View>
            <Text
              style={{
                marginTop: 25,
                fontSize: 11,
                fontWeight: focused ? '400' : '300',
              }}>
              Blog
            </Text>
          </View>
        ),
      },
    },
    Cart: {
      screen: CartStack,
      navigationOptions: {
        tabBarLabel: <Text style={{fontSize: 10, color: '#000'}}>Cart</Text>,
        tabBarIcon: ({focused}) => (
          <View>
            <Text
              style={{
                marginTop: 25,
                fontSize: 11,
                fontWeight: focused ? '400' : '300',
              }}>
              Cart
            </Text>
          </View>
        ),
      },
    },
    WishList: {
      screen: WishListStack,
      navigationOptions: {
        tabBarLabel: (
          <Text style={{fontSize: 10, color: '#000'}}>WishList</Text>
        ),
        tabBarIcon: ({focused}) => (
          <View>
            <Text
              style={{
                marginTop: 25,
                fontSize: 11,
                fontWeight: focused ? '400' : '300',
              }}>
              WhishList
            </Text>
          </View>
        ),
      },
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarLabel: <Text style={{fontSize: 10, color: '#000'}}>You</Text>,
        tabBarIcon: ({focused}) => (
          <View
            style={{
              width: 40,
              height: 40,
              marginTop: 25,
              borderRadius: 20,
              backgroundColor: focused ? '#6755a4' : '#fff',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                marginTop: 0,
                fontSize: 11,
                color: focused ? '#FFF' : '#000',
              }}>
              You
            </Text>
          </View>
        ),
      },
    },
  },
  {
    lazy: true,
    tabBarOptions: {
      showLabel: false,
      activeTintColor: '#3c2d63',
      inactiveTintColor: '#000',
      style: {
        backgroundColor: '#fff',
        height: 40,
        margin: 0,
        padding: 0,
      },
    },
  },
);

const WelcomeStack = createStackNavigator(
  {
    Welcome: WelcomeScreen,
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
    UserApp: UserBottomTab,
  },
  {
    headerShown: false,
    headerMode: 'none',
  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: WelcomeStack,
      UserApp: UserBottomTab,
      Password: PasswordScreen,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
