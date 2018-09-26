import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import UCardBtn from './UCardBtn';

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { id } = navigation.state.params;
    return {
      title: id
    };
  };

  render() {
    const { deck } = this.props;

    if (deck === null) {
      return null;
    }
    return (
      <View style={styles.container}>
        <Text>Name: {deck.title}</Text>
        <Text># of cards: {deck.questions.length}</Text>
        <UCardBtn
          text="Add Card"
          onPress={() => {
            this.props.navigation.navigate('AddCard', { id: deck.title });
          }}
        />
        <UCardBtn
          style={{ marginTop: 10 }}
          text="Start Quiz"
          onPress={() => {
            this.props.navigation.navigate('Quiz', { id: deck.title });
          }}
          disabled={deck.questions.length === 0}
        />
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

function mapStateToProps(state, { navigation }) {
  return {
    deck: state[navigation.state.params.id]
  };
}

export default connect(mapStateToProps)(DeckDetail);
