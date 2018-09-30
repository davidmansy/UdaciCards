import React, { Component, Fragment } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { updateDeckUser } from '../../utils/api';
import { updateDeck } from '../../actions';
import UCardBtn from '../UCardBtn';
import { orange, darkBrown, lightBrown, red } from '../../utils/colors';

class LastStep extends Component {
  reset = () => {
    const { deck, dispatch } = this.props;
    const title = deck.title;
    const user = {
      score: 0,
      nextQuestionIndex: 0
    };
    //Update LocalStorage / Redux
    updateDeckUser(title, user).then(() => {
      //Update redux
      dispatch(updateDeck(title, user));
    });
  };

  render() {
    const { deck, backToDeck } = this.props;

    return (
      <Fragment>
        <View style={styles.description}>
          <Text style={{ fontSize: 44, color: darkBrown, marginBottom: 20 }}>
            Quiz Completed
          </Text>
          <Text style={{ fontSize: 22, color: lightBrown, marginBottom: 20 }}>
            {`Thanks for playing this quiz, you gave ${
              deck.user.score
            } correct answer${deck.user.score > 1 ? 's' : ''} out of ${
              deck.questions.length
            } question${
              deck.questions.length > 1 ? 's' : ''
            }! Play every day to improve your knowledge!`}
          </Text>
        </View>
        <View>
          <UCardBtn text="Back to Deck" onPress={backToDeck} />
          <UCardBtn
            text="Reset Quiz"
            onPress={this.reset}
            style={{ backgroundColor: red, marginTop: 20 }}
          />
        </View>
      </Fragment>
    );
  }
}

function mapStateToProps(state, { id }) {
  return {
    deck: state[id]
  };
}

const styles = StyleSheet.create({
  description: {
    padding: 10,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: orange,
    width: 300
  }
});

export default connect(mapStateToProps)(LastStep);
