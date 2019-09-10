
import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import Database from '../Connection/FlashCardDA';
const db = new Database();


export default class ViewFlashCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FlashListItems: [],
    };

  }

  componentDidMount() {
    this.getFlashCards()
  }

  getFlashCards() {
    db.flashCard().then((data) => {
      this.setState({
        FlashListItems: data,
      });
    }).catch((err) => {
      console.log(err);
      this.setState = {
      }
    })
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.listcategory}>
          <TouchableOpacity >
            <Header style={{ margin: 12, fontSize: 16 }}>Xem chủ đề khác</Header>
          </TouchableOpacity>
        </View>
        <View style={styles.infocategory}>
          <View style={styles.namecategory} >
            <Header style={{ margin: 5, fontSize: 20, }}>Chủ đề</Header>
          </View>
          <View style={styles.searchcategory}>
            <TextInput style={{ marginTop: 5, fontSize: 15, borderColor: 'gray', borderWidth: 1, borderRadius: 5, backgroundColor: '#FFF' }} placeholder='Tìm kiếm'></TextInput>
          </View>
          <View style={{ backgroundColor: 'lightgray' }}>
            {this.state.FlashListItems.map((item, i) => {
              return (
                <Feature key={i} title={item.Title} onPress={() => {
                  this.props.navigation.navigate('FlashCardDetail', {
                    Id: `${item.Id}`,
                  });
                }} imgUrl={'../Data/images/xedap.png'}
                />
              );
            }
            )
            }
          </View>
        </View>

      </View>

    );
  }
}

const Header = ({ children, style }) => <Text style={[styles.header, style]}>{children}</Text>;

const Feature = ({ title, onPress, imgUrl }) => (
  <TouchableOpacity onPress={onPress} style={styles.listViewItemContainer}>
    <Image style={styles.avatar} source={require('../Data/images/xedap.png')} />
    <View style={styles.info}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{title}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  listViewItemContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    borderBottomWidth: 1
  },
  info: {
    justifyContent: 'center',
    marginLeft: 20
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 10,
    resizeMode: 'contain'
  },
  subtitle: {
    fontSize: 10
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  mainContainer:
  {
    flex: 1,
    backgroundColor: 'lightgray',
    paddingTop: (Platform.OS === 'ios') ? 20 : 0
  },
  listcategory: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 10,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#FFF',
  },
  infocategory: {

  },
  namecategory: {
    marginLeft: 20,
    marginRight: 20,
    height: 50,
    marginBottom: 5,
    borderBottomColor: 'orange',
    borderBottomWidth: 2
  },
  searchcategory: {
    marginLeft: 20,
    marginRight: 20,
    height: 55,
    marginBottom: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 30,
    padding: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(240,240,240,1)',
  },
  imgThumbnail: {
    width: 140,
    height: 120,
    alignItems: 'flex-start',
    resizeMode: 'contain'
  },
  imgStyle: {
    width: 140,
    height: 120,
    alignItems: 'flex-start',
    resizeMode: 'contain'
  },
});