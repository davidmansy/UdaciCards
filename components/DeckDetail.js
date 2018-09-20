import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getDeck } from '../utils/api';

export default class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { id } = navigation.state.params;
    return {
      title: id
    };
  };

  state = {
    deck: null
  };

  componentDidMount() {
    const { id } = this.props.navigation.state.params;

    getDeck(id).then(deck => {
      this.setState(() => ({ deck }));
    });
  }

  render() {
    const { deck } = this.state;

    if (deck === null) {
      return null;
    }
    return (
      <View style={styles.container}>
        <Text>Name: {deck.title}</Text>
        <Text># of questions: {deck.questions.length}</Text>
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
