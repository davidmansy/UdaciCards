import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import UCardBtn from './UCardBtn';
import { red, orange, darkBrown, lightBrown } from '../utils/colors';
import { deleteDeck as deleteDeckStorage } from '../utils/api';
import { deleteDeck } from '../actions';

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.id
    };
  };

  deleteDeck = () => {
    const { deck, dispatch, navigation } = this.props;
    const title = deck.title;
    //Update LocalStorage / Redux
    deleteDeckStorage(title)
      .then(() => {
        //Update redux
        return dispatch(deleteDeck(title));
      })
      .then(() => {
        navigation.navigate('Decks');
      });
  };

  render() {
    const { deck } = this.props;

    if (!deck) {
      return null;
    }
    return (
      <View style={styles.container}>
        <View style={styles.description}>
          <Text style={{ fontSize: 44, color: darkBrown, marginBottom: 20 }}>
            {deck.title} Deck
          </Text>
          <Text style={{ fontSize: 22, color: lightBrown, marginBottom: 10 }}>
            {deck.questions.length
              ? `This deck has ${deck.questions.length} card${
                  deck.questions.length > 1 ? 's' : ''
                } available to play a quiz!`
              : `Please start by adding at least one card to be able to play a quiz!`}
          </Text>
        </View>
        <View>
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
          <UCardBtn
            style={{ marginTop: 40, backgroundColor: red }}
            text="Delete Deck"
            onPress={this.deleteDeck}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  description: {
    padding: 10,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: orange,
    width: 300
  }
});

function mapStateToProps(state, { navigation }) {
  return {
    deck: state[navigation.state.params.id]
  };
}

export default connect(mapStateToProps)(DeckDetail);
