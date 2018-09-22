import React, { Component } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import UCardTextInput from './UCardTextInput';
import { white } from '../utils/colors';
import UCardBtn from './UCardBtn';

class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  };

  render() {
    const { deck } = this.props;
    const { question, answer } = this.state;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <UCardTextInput
          value={question}
          onChangeText={question => {
            this.setState(() => ({ question }));
          }}
          placeholder="Question"
        />
        <UCardTextInput
          value={answer}
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

function mapStateToProps(state, { navigation }) {
  return {
    deck: state[navigation.state.params.id]
  };
}

export default connect(mapStateToProps)(AddCard);
