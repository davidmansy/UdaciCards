import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import UCardTextInput from './UCardTextInput';
import { white, darkBrown } from '../utils/colors';
import { saveDeckTitle } from '../utils/api';
import { addDeck } from '../actions';
import { connect } from 'react-redux';
import UCardBtn from './UCardBtn';

class NewDeck extends Component {
  state = {
    title: ''
  };

  submitDeck = () => {
    let { title } = this.state;
    title = title.trim();
    const { dispatch } = this.props;
    saveDeckTitle(title).then(() => {
      //Update Redux
      dispatch(
        addDeck({
          title
        })
      );
      this.setState(() => ({ title: '' }));
      this.props.navigation.navigate('Decks');
      this.props.navigation.navigate('DeckDetail', { id: title });
    });
  };

  render() {
    const { title } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.title}>What is the title of your new deck?</Text>
        <UCardTextInput
          text={title}
          onChangeText={title => {
            this.setState(() => ({ title }));
          }}
          placeholder="Deck Title"
        />
        <View style={{ marginTop: 20 }}>
          <UCardBtn
            onPress={this.submitDeck}
            text={'Submit'}
            disabled={title === ''}
          />
        </View>
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
  title: {
    marginBottom: 20,
    color: darkBrown,
    fontSize: 44,
    textAlign: 'center'
  }
});

export default connect()(NewDeck);
