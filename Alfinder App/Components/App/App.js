import AsyncStorage from '@react-native-community/async-storage';
import VersionNumber from 'react-native-version-number';
import {API} from './Config';

class App {
  constructor(props) {
    this.props = props;
    this.configurations;
  }

  init = async () => {
    // this.props.navigation.navigate('Auth');

    // API.post('configurations')
    //   .then(response => {
    //     this.configurations = response.data.data;
    //   })
    //   .catch(error => {
    //     if (error.response) {
    //       this.configurations = null;
    //     }
    //   });

    // if (this.configurations !== null) {
    //   const config = await AsyncStorage.getItem('AlfinderConfiguration');
    //   const confogJS = config !== null ? JSON.parse(config) : null;

    //   if (confogJS === null) {
    //     // configuration is not present
    //     const conf = JSON.stringify({
    //       version: VersionNumber.appVersion,
    //       has_new_version:
    //         this.configurations.version !== VersionNumber.appVersion,
    //     });
    //     await AsyncStorage.setItem('AlfinderConfiguration', conf);
    //   } else {
    //     // update configuration
    //     const conf = JSON.stringify({
    //       version: VersionNumber.appVersion,
    //       has_new_version:
    //         this.configurations.version !== VersionNumber.appVersion,
    //     });
    //     await AsyncStorage.setItem('AlfinderConfiguration', conf);
    //   }
    // }
  };

  authorize = async () => {
    try {
      const val = await AsyncStorage.getItem('AlfinderUserToken');
      const value = await JSON.parse(val);
      if (value === null || value === '') {
        return null;
      } else {
        if (value.token === null || value.token === '') {
          return null;
        } else {
          return value.token;
        }
      }
    } catch (e) {
      // throw e;
      return null;
    }
  };
}

export default App;
