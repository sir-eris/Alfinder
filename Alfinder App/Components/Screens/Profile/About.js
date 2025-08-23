/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  View,
  Image,
  Linking,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

class HowToUse extends React.Component {
  constructor(props) {
    super(props);
  }

  _openLink = link => {
    Linking.openURL('https://alfinder.com/' + link).catch(err =>
      console.error('An error occurred', err),
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
                source={require('./../../../Assets/photos/icons/double-left.png')}
                style={{width: 25, height: 25}}
              />
            </TouchableOpacity>
            <Text style={{fontSize: 20}}>About Us</Text>
          </View>
        </View>

        <ScrollView style={{flex: 1, paddingTop: 15}}>
          <View style={{alignItems: 'center', marginVertical: 40}}>
            <Image
              source={require('../../../Assets/photos/Alfinder_Logo-4.png')}
              resizeMode="cover"
            />
          </View>
          <View style={{marginHorizontal: 20}}>
            <View style={{marginBottom: 30}}>
              <Text style={{fontSize: 20, fontWeight: '300', marginBottom: 10}}>
                WHAT?
              </Text>
              <Text style={{fontWeight: '300', fontSize: 15, lineHeight: 20}}>
                SELF-CARE IS OUR PASSION AND OUR REASON FOR BEING. Alfinder was
                built with your wellness in mind. Think about us as your
                personal online shopping destination for the latest and best in
                personal care. We exist to help you live the life you want by
                connecting you with the best brands to take best care of
                yourself.
              </Text>
            </View>

            <View style={{marginBottom: 30}}>
              <Text style={{fontSize: 20, fontWeight: '300', marginBottom: 10}}>
                WHY?
              </Text>
              <Text style={{fontWeight: '300', fontSize: 15, lineHeight: 20}}>
                EACH PERSON IS UNIQUE. There's no one like you. No one has your
                eyes, your hair, your skin, your style. And because you are
                unique, you need to find what is right for you. Alfinder helps
                you make quality purchases to enhance your wellness and your
                life, and we make it easy for you. Moreover, when it comes to
                personal self-care, Alfinder makes it easy for you to stay on
                top of your game and ahead of the curve. From tried and trusted
                brands to the latest trends and technology, we bring it to you -
                All in the palm of your hand.
              </Text>
            </View>

            <View style={{marginBottom: 30}}>
              <Text style={{fontSize: 20, fontWeight: '300', marginBottom: 10}}>
                HOW?
              </Text>
              <Text style={{fontWeight: '300', fontSize: 15, lineHeight: 20}}>
                With so many products available today, how do you know what's
                right for you? Alfinder not only provides you access to the best
                products, but also makes it possible for you to make informed
                decisions based on reviews and recommendations from our
                community of self-care enthusiasts. It's in our DNA to connect
                you with the best brands for your best life. We believe finding
                what's right for you should be easier, faster and simpler.
                Alfinder provides the fastest and simplest way to find the best
                CBD products that's right for you.
              </Text>
            </View>
          </View>
          <View style={{marginBottom: 30}}>
            <View style={styles.linkContainer}>
              <TouchableOpacity
                onPress={() => this._openLink('privacy-policy')}>
                <View style={styles.linkContent}>
                  <Text style={styles.link}>Privacy Policy</Text>
                  <Image
                    source={require('./../../../Assets/photos/icons/double-right.png')}
                    style={{width: 25, height: 25}}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.linkContainer}>
              <TouchableOpacity onPress={() => this._openLink('terms')}>
                <View style={styles.linkContent}>
                  <Text style={styles.link}>Terms & Conditions</Text>
                  <Image
                    source={require('./../../../Assets/photos/icons/double-right.png')}
                    style={{width: 25, height: 25}}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginBottom: 20, alignItems: 'center'}}>
            <Text style={{fontSize: 10, color: '#999'}}>
              TM and &#169; 2020 Alfinder Inc. "Alfinder"
            </Text>
            <Text style={{fontSize: 10, color: '#999'}}>
              All Rights Reserved.
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  linkContainer: {
    borderColor: '#ccc',
    borderBottomWidth: 0.4,
    paddingHorizontal: 5,
  },
  linkContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 45,
  },
  link: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
    paddingVertical: 5,
  },
});

export default HowToUse;
