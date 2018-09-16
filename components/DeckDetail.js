import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { id } = navigation.state.params;

    //Find deck record from Async Storage and use the title instead of id

    return {
      title: id
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Deck Detail View</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
