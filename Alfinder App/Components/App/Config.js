import {Dimensions} from 'react-native';
import axios from 'axios';

export const CONFIG = {
  cardColors: [
    '#0A2463',
    '#261447',
    '#291720',
    '#1B2D2A',
    '#262525',
    '#44220E',
    '#56110C',
  ],
  url: {
    blog: 'https://blog.alfinder.com/blog/',
    api: 'https://alfinder.com/alfinder/public/api/',
  },
  width: Dimensions.get('screen').width,
  height: Dimensions.get('screen').height,
};

export const API = axios.create({
  baseURL: CONFIG.url.api,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
