import React, { Component } from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import UCardTextInput from './UCardTextInput';
import { white } from '../utils/colors';
import UCardBtn from './UCardBtn';
import { addCardToDeck } from '../utils/api';
import { addCard } from '../actions';
import { NavigationActions } from 'react-navigation';

class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  };

  addCard = () => {
    const { question, answer } = this.state;
    const { dispatch, navigation } = this.props;
    const title = navigation.state.params.id;

    //Update local storage
    addCardToDeck(title, {
      question,
      answer
    }).then(() => {
      //Update redux
      dispatch(addCard(title, { question, answer }));
      //Reset state
      this.setState(() => ({ question: '', answer: '' }));
      //Navigate back
      this.props.navigation.navigate('DeckDetail', { id: title });
    });
  };

  render() {
    const { deck } = this.props;
    const { question, answer } = this.state;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <UCardTextInput
          text={question}
          onChangeText={question => {
            this.setState(() => ({ question }));
          }}
          placeholder="Question"
        />
        <UCardTextInput
          text={answer}
          onChangeText={answer => {
            this.setState(() => ({ answer }));
          }}
          placeholder="Answer"
        />
        <UCardBtn
          onPress={this.addCard}
          text={'Submit'}
          disabled={question === '' || answer === ''}
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
  }
});

export default connect()(AddCard);
