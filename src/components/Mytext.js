/*Custom Text*/
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
const Mytext = props => {
  return (
  //   <TouchableOpacity onPress={props.textClick}>
  //     <Text style={[styles.text, props.textStyle]}>{props.text}</Text>
  //   </TouchableOpacity>
  // );
  <Text style={styles.text}>{props.text}</Text>);
};
const styles = StyleSheet.create({
  text: {
    color: '#111825',
    fontSize: 18,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
  },
});
export default Mytext;