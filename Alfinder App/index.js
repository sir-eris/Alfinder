/**
 * @format
 */

import App from './App';
import {name as appName} from './app.json';
import {AppRegistry, Platform} from 'react-native';

AppRegistry.registerComponent(appName, () => App);


  // _pairItemsCarousel(items) {
  //   let arr = [];
  //   let j = 0;
  //   for (let i = 0; i < items.length - 1; i += 2) {
  //     let item1 = items[i];
  //     let item2 = items[i + 1];
  //     arr[j] = [item1, item2];
  //     j++;
  //   }
  //   return arr;
  // }

  // _renderRelatedProducts(item, index) {
  //   return (
  //     <View key={index}>
  //       <LongItem
  //         containerStyle={{borderColor: '#FFF'}}
  //         key={item.product_id}
  //         navigation={this.props.navigation}
  //         details={item[0]}
  //       />
  //       <LongItem
  //         containerStyle={{paddingTop: 5}}
  //         key={item.product_id}
  //         navigation={this.props.navigation}
  //         details={item[1]}
  //       />
  //     </View>
  //   );
  // }
