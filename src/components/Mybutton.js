
/*Custom Button*/
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
const Mybutton = props => {
  // return (
  //   <TouchableOpacity style={styles.button} onPress={props.customClick}>
  //     <Text style={styles.text}>{props.title}</Text>
  //   </TouchableOpacity>
  // );
  return (
    <TouchableOpacity onPress={props.customClick} style={[styles.button, props.style]}>
      <Text style={[styles.text, props.textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#40a4ff',
    color: '#ffffff',
    padding: 10,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
  },
  text: {
    color: '#ffffff',
  },
});
export default Mybutton;