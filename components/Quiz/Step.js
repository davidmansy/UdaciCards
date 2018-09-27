import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { updateDeckUser } from '../../utils/api';
import { updateDeck } from '../../actions';
import UCardBtn from '../UCardBtn';
import {
  clearLocalNotification,
  setLocalNotification
} from '../../utils/helpers';

class Step extends Component {
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

    //Reset state
    this.setState(() => ({ questionShown: true }));

    //Update LocalStorage / Redux / Clear notifs
    updateDeckUser(deck.title, user).then(() => {
      dispatch(updateDeck(deck.title, user));
      if (user.nextQuestionIndex >= deck.questions.length) {
        clearLocalNotification().then(setLocalNotification);
      }
    });
  };

  render() {
    const { questionShown } = this.state;
    const { deck } = this.props;
    const card = deck.questions[deck.user.nextQuestionIndex];
    const counter = deck.user.nextQuestionIndex + 1;
    const total = deck.questions.length;

    return (
      <Fragment>
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
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
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

function mapStateToProps(state, { id }) {
  return {
    deck: state[id]
  };
}

export default connect(mapStateToProps)(Step);
