import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import TextBtn from './TextBtn';

export default class Decks extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>List of decks view</Text>
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
    alignItems: 'center',
    justifyContent: 'center'
  }
});
