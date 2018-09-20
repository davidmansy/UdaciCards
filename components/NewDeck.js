import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { white } from '../utils/colors';
import TextBtn from './TextBtn';
import { createDeck } from '../utils/api';
import { addDeck } from '../actions';
import { connect } from 'react-redux';

class NewDeck extends Component {
  state = {
    title: ''
  };

  submitDeck = () => {
    const { title } = this.state;
    const { dispatch } = this.props;
    createDeck(title).then(() => {
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
      <View style={styles.container}>
        <Text style={styles.title}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={title => {
            this.setState(() => ({ title }));
          }}
          placeholder="Deck Title"
        />
        <View style={{ marginTop: 20 }}>
          <TextBtn onPress={this.submitDeck} text={'Submit'} />
        </View>
      </View>
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
    fontSize: 50,
    textAlign: 'center'
  },
  input: {
    fontSize: 30,
    marginTop: 10,
    marginBottom: 10
  }
});

export default connect()(NewDeck);
