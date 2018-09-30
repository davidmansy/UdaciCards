import React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';
import Decks from './components/Decks';
import NewDeck from './components/NewDeck';
import DeckDetail from './components/DeckDetail';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';
import { Ionicons } from '@expo/vector-icons';
import { white, orange, gray } from './utils/colors';
import { Constants } from 'expo';
import middelware from './middleware';
import { setLocalNotification } from './utils/helpers';

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const Tabs = createBottomTabNavigator(
  {
    Decks: {
      screen: Decks,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'}
            size={30}
            color={tintColor}
          />
        )
      }
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: 'New Deck',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
            size={30}
            color={tintColor}
          />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? orange : white,
      activeBackgroundColor: Platform.OS === 'ios' ? white : orange,
      inactiveTintColor: gray,
      inactiveBackgroundColor: white,
      style: {
        height: 56,
        shadowColor: 'rgba(241,153,106,0.8)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
);

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: orange,
        paddingBottom: 15
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add Card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: orange,
        paddingBottom: 15
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: orange,
        paddingBottom: 15
      }
    }
  }
});

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer, middelware)}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar backgroundColor={orange} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
