/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {
  View,
  Text,
  Alert,
  Modal,
  Image,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-ionicons';

const WIDTH = Dimensions.get('screen').width;

class PersonalInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nicknameModal: false,
      ageModal: false,
      genderModal: false,
    };

    const {params} = this.props.navigation.state;
    this.info = params ? params.info : null;
  }

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
            <Text style={{fontSize: 20}}>Information</Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{width: WIDTH - 30, flexDirection: 'column'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: 7,
                marginBottom: 12,
                paddingHorizontal: 5,
                borderBottomWidth: 0.4,
                borderColor: '#aaa',
              }}>
              <View style={{}}>
                <Text
                  style={{fontSize: 15, fontWeight: '600', marginBottom: 5}}>
                  Name
                </Text>
                <Text style={{marginLeft: 5, textTransform: 'capitalize'}}>
                  {this.info.first_name} {this.info.last_name}
                </Text>
              </View>
              {/* <View>
                <TouchableOpacity>
                  <Icon name="repeat" size={20} />
                </TouchableOpacity>
              </View> */}
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: 7,
                marginBottom: 12,
                paddingHorizontal: 5,
                borderBottomWidth: 0.4,
                borderColor: '#aaa',
              }}>
              <View style={{}}>
                <Text
                  style={{fontSize: 15, fontWeight: '600', marginBottom: 5}}>
                  Email
                </Text>
                <Text style={{marginLeft: 5, textTransform: 'lowercase'}}>
                  {this.info.email}
                </Text>
              </View>
              {/* <View>
                <TouchableOpacity>
                  <Icon name="repeat" size={20} />
                </TouchableOpacity>
              </View> */}
            </View>

            {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: 7,
                marginBottom: 12,
                paddingHorizontal: 5,
                borderBottomWidth: 0.4,
                borderColor: '#aaa',
              }}>
              <View style={{}}>
                <Text
                  style={{fontSize: 15, fontWeight: '600', marginBottom: 5}}>
                  Phone Number
                </Text>
                <Text style={{marginLeft: 5, textTransform: 'lowercase'}}>
                  {this.info.phone_number}
                </Text>
              </View>
            </View> */}

            {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: 7,
                marginBottom: 12,
                paddingHorizontal: 5,
                borderBottomWidth: 0.4,
                borderColor: '#aaa',
              }}>
              <View style={{}}>
                <Text
                  style={{fontSize: 15, fontWeight: '600', marginBottom: 5}}>
                  Nickname
                </Text>
                {this.info.nickname === null ? (
                  <TouchableOpacity
                    onPress={() => this.setState({nicknameModal: true})}>
                    <Text style={{marginLeft: 5, color: 'blue'}}>
                      add a nickname
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={{marginLeft: 5}}>{this.info.nickname}</Text>
                )}
              </View>
            </View> */}

            {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: 7,
                marginBottom: 12,
                paddingHorizontal: 5,
                borderBottomWidth: 0.4,
                borderColor: '#aaa',
              }}>
              <View style={{}}>
                <Text
                  style={{fontSize: 15, fontWeight: '600', marginBottom: 5}}>
                  Age
                </Text>
                {this.info.age === null ? (
                  <TouchableOpacity
                    onPress={() => this.setState({ageModal: true})}>
                    <Text style={{marginLeft: 5, color: 'blue'}}>
                      add your age
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={{marginLeft: 5}}>{this.info.age}</Text>
                )}
              </View>
            </View> */}

            {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: 7,
                marginBottom: 12,
                paddingHorizontal: 5,
                borderBottomWidth: 0.4,
                borderColor: '#aaa',
              }}>
              <View style={{}}>
                <Text
                  style={{fontSize: 15, fontWeight: '600', marginBottom: 5}}>
                  Gender
                </Text>
                {this.info.gender === null ? (
                  <TouchableOpacity
                    onPress={() => this.setState({genderModal: true})}>
                    <Text style={{marginLeft: 5, color: 'blue'}}>
                      add your gender
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={{marginLeft: 5}}>{this.info.gender}</Text>
                )}
              </View>
            </View> */}
          </View>
        </View>

        {/*  Add Nickname MODAL */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.nicknameModal}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <TouchableOpacity
              onPress={() => this.setState({nicknameModal: false})}>
              <View style={{width: '100%', height: '75%'}} />
            </TouchableOpacity>
            <View style={[styles.modalContent, {height: '25%'}]}>
              <View>
                <Text
                  style={{textAlign: 'center', fontSize: 17, paddingTop: 20}}>
                  Update Information
                </Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <View
                  style={{
                    width: '80%',
                    height: 40,
                    justifyContent: 'center',
                    borderBottomWidth: 0.4,
                    borderColor: '#aaa',
                  }}>
                  <TextInput
                    style={{paddingVertical: 5}}
                    placeholder={'nickname'}
                  />
                  <Icon
                    name="checkmark"
                    size={25}
                    style={{position: 'absolute', right: 5}}
                  />
                </View>
                <View
                  style={{alignSelf: 'flex-start', left: '11%', marginTop: 2}}>
                  <Text
                    style={{fontSize: 11.5, fontWeight: '500', color: '#888'}}>
                    may only include letters, numbers and spaces
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginBottom: 40,
                  backgroundColor: '#181325',
                  width: '80%',
                  left: '10%',
                  padding: 4,
                  borderRadius: 2,
                }}>
                <TouchableOpacity onPress={() => this._emptyCartAsync()}>
                  <View style={{padding: 7}}>
                    <Text
                      style={{
                        color: '#FFF',
                        textAlign: 'center',
                        fontSize: 18,
                        fontWeight: '300',
                      }}>
                      Add a Nickname
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/*  Add Age MODAL */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.ageModal}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <TouchableOpacity onPress={() => this.setState({ageModal: false})}>
              <View style={{width: '100%', height: '75%'}} />
            </TouchableOpacity>
            <View style={[styles.modalContent, {height: '25%'}]}>
              <View>
                <Text
                  style={{textAlign: 'center', fontSize: 17, paddingTop: 20}}>
                  Update Information
                </Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <View
                  style={{
                    width: '80%',
                    height: 40,
                    justifyContent: 'center',
                    borderBottomWidth: 0.4,
                    borderColor: '#aaa',
                  }}>
                  <TextInput style={{paddingVertical: 5}} placeholder={'age'} />
                  <Icon
                    name="checkmark"
                    size={25}
                    style={{position: 'absolute', right: 5}}
                  />
                </View>
              </View>
              <View
                style={{
                  marginBottom: 40,
                  backgroundColor: '#181325',
                  width: '80%',
                  left: '10%',
                  padding: 4,
                  borderRadius: 2,
                }}>
                <TouchableOpacity onPress={() => this._emptyCartAsync()}>
                  <View style={{padding: 7}}>
                    <Text
                      style={{
                        color: '#FFF',
                        textAlign: 'center',
                        fontSize: 18,
                        fontWeight: '300',
                      }}>
                      Add Your Age
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/*  Add Gender MODAL */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.genderModal}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <TouchableOpacity
              onPress={() => this.setState({genderModal: false})}>
              <View style={{width: '100%', height: '72%'}} />
            </TouchableOpacity>
            <View style={[styles.modalContent, {height: '28%'}]}>
              <View>
                <Text
                  style={{textAlign: 'center', fontSize: 17, paddingTop: 20}}>
                  Update Information
                </Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                <View style={{width: WIDTH / 3 - 30, height: WIDTH / 5, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f2ff', borderRadius: 10}}>
                  <Text style={{fontSize: 20, fontWeight: '300', color: '#000'}}>FEMALE</Text>
                </View>
                <View style={{width: WIDTH / 3 - 30, height: WIDTH / 5, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f2ff', borderRadius: 10}}>
                <Text style={{fontSize: 20, fontWeight: '300', color: '#000'}}>MALE</Text>
                </View>
                <View style={{width: WIDTH / 3 - 30, height: WIDTH / 5, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f2ff', borderRadius: 10}}>
                <Text style={{fontSize: 20, fontWeight: '300', color: '#000'}}>OTHER</Text>
                </View>
              </View>
              <View
                style={{
                  marginBottom: 40,
                  backgroundColor: '#181325',
                  width: '80%',
                  left: '10%',
                  padding: 4,
                  borderRadius: 2,
                }}>
                <TouchableOpacity activeOpacity={0.9} onPress={() => this._emptyCartAsync()}>
                  <View style={{padding: 7}}>
                    <Text
                      style={{
                        color: '#FFF',
                        textAlign: 'center',
                        fontSize: 18,
                        fontWeight: '300',
                      }}>
                      Add Your Gender
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'space-between',
    borderTopLeftRadius: 25,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 1,
    shadowRadius: 180,
  },
});

export default PersonalInfo;
