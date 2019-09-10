import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import MainScreen from './src/screens/MainScreen';
import HomeScreen from './src/screens/HomeScreen';
import SearchWord from './src/screens/SearchWord';
import FlashCards from './src/screens/FlashCards';
import FlashCardDetail from './src/screens/vocabulary/detail';

const App = createStackNavigator({
  // audio: {
  //   screen: audio,
  //   navigationOptions: {
  //   },
  // },
  MainScreen: {
    screen: MainScreen,
    navigationOptions: {
    },
  },
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Home',
      headerStyle: { backgroundColor: '#40a4ff' },
      headerTintColor: '#ffffff',
    },
  },
  SearchWord: {
    screen: SearchWord,
    navigationOptions: {
      title: 'Search Word',
      headerStyle: { backgroundColor: '#40a4ff' },
      headerTintColor: '#ffffff',
    },
  },
  ViewAll: {
    screen: FlashCards,
    navigationOptions: {
      title: 'Bộ từ',
      headerStyle: { backgroundColor: '#40a4ff' },
      headerTintColor: '#ffffff',
    },
  },
  FlashCardDetail: {
    screen: FlashCardDetail,
    navigationOptions: {
      title: 'Bộ từ',
      headerStyle: { backgroundColor: '#40a4ff' },
      headerTintColor: '#ffffff',
    },
  },
  
});
export default createAppContainer(App);