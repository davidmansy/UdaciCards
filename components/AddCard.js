import React, { Component } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Switch,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import UCardTextInput from './UCardTextInput';
import { white } from '../utils/colors';
import UCardBtn from './UCardBtn';
import { addCardToDeck } from '../utils/api';
import { addCard } from '../actions';

class AddCard extends Component {
  state = {
    question: '',
    answer: '',
    correct: true
  };

  addCard = () => {
    const { question, answer, correct } = this.state;
    const { dispatch, navigation } = this.props;
    const title = navigation.state.params.id;

    //Update local storage
    addCardToDeck(title, {
      question,
      answer,
      correct
    }).then(() => {
      //Update redux
      dispatch(addCard(title, { question, answer, correct }));
      //Reset state
      this.setState(() => ({ question: '', answer: '', correct: true }));
      //Navigate back
      this.props.navigation.navigate('DeckDetail', { id: title });
    });
  };

  handleToggleSwitch = () => {
    this.setState(currentState => ({
      correct: !currentState.correct
    }));
  };

  disableControl = () => {
    const { question, answer } = this.state;
    return question === '' || answer === '';
  };

  render() {
    const { question, answer, correct } = this.state;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View>
          <UCardTextInput
            style={{ marginBottom: 10 }}
            text={question}
            onChangeText={question => {
              this.setState(() => ({ question }));
            }}
            placeholder="Question"
          />
          <UCardTextInput
            style={{ marginBottom: 10 }}
            text={answer}
            onChangeText={answer => {
              this.setState(() => ({ answer }));
            }}
            placeholder="Answer"
          />
        </View>
        <View style={styles.correctRow}>
          <Text style={{ fontSize: 22, marginRight: 10 }}>Correct?</Text>
          <Switch
            value={correct}
            onValueChange={this.handleToggleSwitch}
            disabled={this.disableControl()}
          />
        </View>
        <UCardBtn
          style={{ marginTop: 20 }}
          onPress={this.addCard}
          text={'Submit'}
          disabled={this.disableControl()}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  correctRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 40
  }
});

export default connect()(AddCard);
