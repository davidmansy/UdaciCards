import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import UCardBtn from './UCardBtn';

class Quiz extends Component {
  state = {
    questionShown: true
  };

  toggleShown = () => {
    this.setState(currentState => ({
      questionShown: !currentState.questionShown
    }));
  };

  submitUserAnswer = answer => {};

  render() {
    const { deck } = this.props;
    const { questionShown } = this.state;
    const card = deck.questions[deck.user.nextQuestionIndex];
    const counter = deck.user.nextQuestionIndex + 1;
    const total = deck.questions.length;

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
