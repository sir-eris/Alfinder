// import React from 'react';
// import {ActivityIndicator, View, Dimensions} from 'react-native';
// import {connectStateResults} from 'react-instantsearch-native';

// const {width, height} = Dimensions.get('window');

// export default connectStateResults(({searching, props}) => {
//   const left = props.left ? props.left : 0;
//   const bottom = props.bottom ? props.bottom : height - 20;

//   return (
//     <View
//       style={{
//         position: 'absolute',
//         left: width - left,
//         bottom: height - bottom,
//         zIndex: 2,
//       }}>
//       <ActivityIndicator animating={searching} />
//     </View>
//   );
// });

import React from 'react';
import {Text} from 'react-native';
import {connectHighlight} from 'react-instantsearch-native';

export default connectHighlight(
  ({highlight, attribute, hit, highlightProperty, inverted}) => {
    const parsedHit = highlight({attribute, hit, highlightProperty});
    const styles = inverted ? {} : {backgroundColor: '#ffff99'};
    const highligtedHit = parsedHit.map((part, idx) => {
      if (part.isHighlighted) {
        return (
          <Text key={idx} style={styles}>
            {part.value}
          </Text>
        );
      }
      return (
        <Text key={idx} style={{fontWeight: inverted ? 'bold' : 'normal'}}>
          {part.value}
        </Text>
      );
    });
    return <Text>{highligtedHit}</Text>;
  },
);
