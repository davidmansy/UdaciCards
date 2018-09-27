import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import UCardBtn from './UCardBtn';
import { updateDeckUser } from '../utils/api';
import { updateDeck } from '../actions';
import { NavigationActions } from 'react-navigation';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

class Quiz extends Component {
  state = {
    questionShown: true
  };

  toggleShown = () => {
    this.setState(currentState => ({
      questionShown: !currentState.questionShown
    }));
  };

  submitUserAnswer = userCorrect => {
    const { deck, dispatch } = this.props;
    const user = {
      ...deck.user
    };
    const currentQuestion = deck.questions[deck.user.nextQuestionIndex];

    if (userCorrect === currentQuestion.correct) {
      user.score++;
    }
    user.nextQuestionIndex++;
    //Update API
    updateDeckUser(deck.title, user).then(() => {
      //Update redux
      dispatch(updateDeck(deck.title, user));
      //Reset state?
      this.setState(() => ({ questionShown: true }));
      //Clear local notification if quiz done
      if (user.nextQuestionIndex >= deck.questions.length) {
        clearLocalNotification().then(setLocalNotification);
      }
    });
  };

  reset = () => {
    const { deck, dispatch } = this.props;
    const title = deck.title;
    const user = {
      score: 0,
      nextQuestionIndex: 0
    };
    //Update API
    updateDeckUser(title, user).then(() => {
      //Update redux
      dispatch(updateDeck(title, user));
      //Reset state
      this.setState(() => ({ questionShown: true }));
    });
  };

  backToDeck = () => {
    this.props.navigation.dispatch(
      NavigationActions.back({
        key: null
      })
    );
  };

  render() {
    const { deck } = this.props;
    const { questionShown } = this.state;
    const card = deck.questions[deck.user.nextQuestionIndex];
    const counter = deck.user.nextQuestionIndex + 1;
    const total = deck.questions.length;

    if (counter > deck.questions.length) {
      return (
        <View style={styles.container}>
          <Text>Here is your score: {`${deck.user.score}/${total}`}</Text>
          <UCardBtn text="Reset Quiz" onPress={this.reset} />
          <UCardBtn text="Back to Deck" onPress={this.backToDeck} />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.counters}>
          <Text style={{ fontSize: 20 }}>{`${counter} / ${total}`}</Text>
        </View>
        <View>
          <Text style={styles.title}>
            {questionShown ? card.question : card.answer}
          </Text>
          <TouchableOpacity onPress={this.toggleShown}>
            <Text style={styles.switch}>
              {questionShown ? 'Answer' : 'Question'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 30 }}>
          <UCardBtn
            style={{ backgroundColor: 'green' }}
            text="Correct"
            onPress={() => {
              this.submitUserAnswer(true);
            }}
          />
          <UCardBtn
            style={{ marginTop: 10, backgroundColor: 'red' }}
            text="Incorrect"
            onPress={() => {
              this.submitUserAnswer(false);
            }}
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
    justifyContent: 'space-between'
  },
  counters: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: 10
  },
  title: {
    fontSize: 50,
    textAlign: 'center'
  },
  switch: {
    color: 'red',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 10,
    textAlign: 'center'
  }
});

function mapStateToProps(state, { navigation }) {
  return {
    deck: state[navigation.state.params.id]
  };
}

export default connect(mapStateToProps)(Quiz);
