import {StyleSheet} from 'react-native';

const productStyles = StyleSheet.create({
  title: {},
  price: {},
  rating: {},
});

const reviewStyle = StyleSheet.create({
  reviewContainer: {
    width: 265,
    maxHeight: 160,
    padding: 10,
    marginHorizontal: 4,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  reviewSubject: {
    fontWeight: '500',
  },
  date: {
    fontSize: 11,
    color: '#555',
    marginTop: 2,
    textAlign: 'right',
  },
  nickname: {
    fontSize: 13,
    color: '#222',
  },
  bodyText: {
    color: '#333',
  },
});

module.exports = {productStyles, reviewStyle};
