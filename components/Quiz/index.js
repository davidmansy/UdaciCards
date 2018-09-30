import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import LastStep from './LastStep';
import Step from './Step';
import { NavigationActions } from 'react-navigation';

class Quiz extends Component {
  backToDeck = () => {
    this.props.navigation.dispatch(
      NavigationActions.back({
        key: null
      })
    );
  };

  render() {
    const { deck } = this.props;

    if (deck.user.nextQuestionIndex === deck.questions.length) {
      return (
        <View style={styles.container}>
          <LastStep id={deck.title} backToDeck={this.backToDeck} />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Step id={deck.title} />
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
  }
});

function mapStateToProps(state, { navigation }) {
  return {
    deck: state[navigation.state.params.id]
  };
}

export default connect(mapStateToProps)(Quiz);
