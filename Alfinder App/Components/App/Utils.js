/* eslint-disable no-lone-blocks */
import {Share, Alert} from 'react-native';
import Rate from 'react-native-rate';

export async function ShareSheet(params) {
  try {
    const result = await Share.share({
      message: params.message,
      url: params.link,
      title: params.title,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // activity type
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    // error
  }
}

export function RateApp() {
  const options = {
    AppleAppID: '1505168467',
    preferInApp: true,
    openAppStoreIfInAppFails: true,
  };
  Rate.rate(options);
}

export function AlertMessage(params) {
  let buttons;

  if (params.buttons) {
    buttons = params.buttons;
  }

  if (params.title && !params.message) {
    Alert.alert(params.title, null, buttons);
  } else if (params.message && !params.title) {
    Alert.alert(params.message, null, buttons);
  } else if (params.title && params.message) {
    Alert.alert(params.title, params.message, params.buttons);
  }
}

// export default {Alertt, ShareSheet};
