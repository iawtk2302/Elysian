import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SharedElement} from 'react-navigation-shared-element';

const {width, height} = Dimensions.get('window');
const Banner = ({route}) => {
  const item = route.params.item;
  const [text, setText] = useState();
  useEffect(() => {
    setText(item.content.replace(/\\n/g, '\n'));
  });
  return (
    <View style={{flex: 1}}>
      <SharedElement id={`${item.image}`}>
        <Image
          source={{uri: item.image}}
          style={{height: width / 2 + 50, width: width, resizeMode: 'stretch'}}
        />
      </SharedElement>

      <View style={{paddingHorizontal: 16}}>
        <Text style={{color: 'black', fontSize: 15}}>{text}</Text>
      </View>
    </View>
  );
};

Banner.sharedElements = ({route}) => {
  const {item} = route.params;
  return [
    {
      id: `${item.image}`,
      animation: 'move',
      resize: 'clip',
    },
  ];
};

export default Banner;

const styles = StyleSheet.create({});
