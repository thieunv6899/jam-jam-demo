/*Home Screen With buttons to navigate to different options*/
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, ScrollView } from 'react-native';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', padding: 20, }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('SearchWord')} style={styles.boxStyle} >
            <View style={styles.item} >
              <View>
                <Image style={styles.imgStyle} source={require('../Data/images/xedap.png')} />
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.text}> Từ vựng </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewAll')} style={styles.boxStyle} >
            <View style={styles.item} >
              <View>
                <Image style={styles.imgStyle} source={require('../Data/images/xedap.png')} />
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.text}> Bộ từ </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  boxStyle: {
    width: '48%',
    alignItems: 'stretch',
  },
  item: {
    width: '100%',
    height: 150,
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 5,
    borderColor: 'lightgray',
    alignItems: 'center'
  },
  imgStyle: {
    width: 100,
    height: 100,
    alignItems: 'flex-start',
    resizeMode: 'contain'
  },
  itemInfo: {
    backgroundColor: '#FFF',
    width: '100%',
    alignItems: 'center',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingTop: 10,
  },
  text: {
    color: 'gray', fontSize: 19, alignItems: 'center'
  }
});