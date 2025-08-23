import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  Keyboard,
  TouchableHighlight,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import algoliasearch from 'algoliasearch/lite';
import {
  connectSearchBox,
  connectInfiniteHits,
  connectHits,
  connectRefinementList,
} from 'react-instantsearch-native';
import {InstantSearch, Configure, Index} from 'react-instantsearch-native';
import Highlight from '../Algolia/Highlight.js';
import {omit} from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import FastImage from 'react-native-fast-image';

const searchClient = algoliasearch(
  '3IOB6P0PEU',
  'ed3ab1b9439ae9fa21325fbe1c787ca5',
);

// const searchClient = algoliasearch(
//   'latency',
//   '6be0576ff61c053d5f9a3225e2a90f76',
// );

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
  },
  suggestionsContainer: {
    flex: 1,
    backgroundColor: '#6755a4',
  },
  searchBoxContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  bestResults: {
    backgroundColor: 'lightgrey',
    height: 40,
    justifyContent: 'center',
    padding: 10,
  },
  searchBox: {
    color: 'black',
    height: 50,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
  hitsContainer: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#eee',
  },
  suggestions: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  suggestionsIcon: {
    marginRight: 10,
  },
  hitsPicture: {width: 40, height: 40},
  hitsText: {
    alignSelf: 'center',
    paddingLeft: 5,
    flex: 1,
    flexWrap: 'wrap',
    color: '#000',
    backgroundColor: 'red',
  },
  hitsSeparator: {
    height: 1,
    backgroundColor: 'lightgrey',
    marginTop: 10,
    marginBottom: 10,
  },
  categoryTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryTextIn: {fontStyle: 'italic'},
  categoryText: {color: '#cc8008'},
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySuggestions: false,
      isFirstKeystroke: true,
      searchState: {},
      query: '',
      category: null,
    };
    this.displaySuggestions = this.displaySuggestions.bind(this);
    this.removeSuggestions = this.removeSuggestions.bind(this);
    this.setQuery = this.setQuery.bind(this);
    this.onSearchStateChange = this.onSearchStateChange.bind(this);
    this.firstKeystroke = this.firstKeystroke.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
  }

  firstKeystroke() {
    this.setState({isFirstKeystroke: false});
  }

  displaySuggestions() {
    this.setState({displaySuggestions: true});
  }

  removeSuggestions() {
    this.setState({displaySuggestions: false, isFirstKeystroke: true});
  }

  setQuery(query, category) {
    const searchState = omit(this.state.searchState, ['query', 'page']);
    if (searchState.indices && searchState.indices.instant_search) {
      searchState.indices.instant_search.page = 0;
    }
    this.setState({
      query,
      searchState,
      category,
      displaySuggestions: false,
    });
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

  render() {
    const suggestions = this.state.displaySuggestions ? (
      <SuggestionsHits onPressItem={this.setQuery} />
    ) : null;

    const results = this.state.displaySuggestions ? (
      <ResultsHits removeSuggestions={this.removeSuggestions} />
    ) : (
      <ResultsInfiniteHits removeSuggestions={this.removeSuggestions} />
    );
    return (
      <View style={styles.container}>
        <InstantSearch
          searchClient={searchClient}
          indexName="products"
          onSearchStateChange={this.onSearchStateChange}
          searchState={this.state.searchState}>
          <ConnectedSearchBox
            displaySuggestions={this.displaySuggestions}
            firstKeystroke={this.firstKeystroke}
            isFirstKeystroke={this.state.isFirstKeystroke}
            defaultRefinement={this.state.query}
            clearFilter={this.clearFilter}
          />
          <Index indexName="products">
            <Configure hitsPerPage={7} />
            {suggestions}
          </Index>
        </InstantSearch>
        {/* <InstantSearch
          searchClient={searchClient}
          indexName="products"
          onSearchStateChange={this.onSearchStateChange}
          searchState={this.state.searchState}>
          <Index indexName="products">
            <Configure hitsPerPage={15} />
            <VirtualRefinementList
              attribute="category"
              defaultRefinement={
                this.state.category ? [this.state.category] : []
              }
            />
            <Text style={styles.bestResults}>
              Best results
              {this.state.category ? ` in ${this.state.category}` : null}
            </Text>
            <View style={styles.suggestionsContainer}>{results}</View>
          </Index>
        </InstantSearch> */}
      </View>
    );
  }
}

class SearchBox extends Component {
  render() {
    return (
      <View style={styles.searchBoxContainer}>
        <TextInput
          style={styles.searchBox}
          onChangeText={text => {
            if (text === '') {
              this.props.clearFilter();
            }
            this.props.refine(text);
          }}
          value={this.props.currentRefinement}
          placeholder={'Search a product...'}
          placeholderTextColor={'black'}
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

const HitsList = ({hits, removeSuggestions, onEndReached}) => (
  <FlatList
    renderItem={({item}) => (
      <View style={styles.hitsContainer}>
        <Text style={styles.hitsText}>
          <Highlight
            attribute="title"
            hit={item}
            highlightProperty="_highlightResult"
          />
        </Text>
{/* <Text>{item.title}</Text> */}
      </View>
    )}
    data={hits}
    keyExtractor={(item, index) => item.objectID + index}
    onEndReached={onEndReached}
    onScroll={() => {
      Keyboard.dismiss();
      removeSuggestions();
    }}
    ItemSeparatorComponent={() => <View style={hits.hitsSeparator} />}
  />
);

HitsList.propTypes = {
  hits: PropTypes.array,
  removeSuggestions: PropTypes.func,
  onEndReached: PropTypes.func,
};

const ResultsInfiniteHits = connectInfiniteHits(
  ({hits, hasMore, refine, removeSuggestions}) => (
    <HitsList
      removeSuggestions={removeSuggestions}
      hits={hits}
      onEndReached={() => {
        if (hasMore) {
          refine();
        }
      }}
    />
  ),
);

const ResultsHits = connectHits(({hits, removeSuggestions}) => (
  <HitsList removeSuggestions={removeSuggestions} hits={hits} />
));

const SuggestionsHits = connectHits(({hits, onPressItem}) => (
  <FlatList
    renderItem={({item, index}) => {
      const category =
        index === 1
          // ? item.instant_search.facets.exact_matches.category.value
          ? item.category
          : null;
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
    keyExtractor={(item, index) => item.objectID + index}
    data={hits.reduce((acc, hit, index) => {
      // if (index === 0) {
      //   acc.push(hit); // we duplicate first hit to allow a refinement under or not category
      // }
      acc.push(hit);
      return acc;
    }, [])}
    keyboardShouldPersistTaps="always"
  />
));

const buildSuggestionItem = (item, categoryText) => (
  <View style={styles.categoryTextContainer}>
    <Text style={styles.categoryTextIn}>{item} in</Text>
    <Text style={styles.categoryText}> {categoryText}</Text>
  </View>
);

const Item = ({item, onPressItem, index}) => {
  let text = null;
  if (index === 0) {
    text = buildSuggestionItem(item.title, 'All our categories');
  }
  if (item.category) {
    text = buildSuggestionItem(item.title, item.category);
  }
  return (
    <TouchableHighlight
      onPress={() => {
        Keyboard.dismiss();
        onPressItem(item.title, item.category);
      }}
      underlayColor="white">
      <View style={styles.suggestions}>
        <Icon
          size={13}
          name="search"
          color="#000"
          style={styles.suggestionsIcon}
        />
        <Highlight
          attribute="query"
          hit={item}
          highlightProperty="_highlightResult"
          inverted
        />
        {text}
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
