import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { white } from '../utils/colors';
import TextBtn from './TextBtn';

export default class NewDeck extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>New Deck View</Text>
        <TextBtn
          onPress={() =>
            this.props.navigation.navigate('DeckDetail', { id: 'Fake Title' })
          }
          text={'Deck Detail'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
