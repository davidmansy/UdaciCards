import React, { Component, Fragment } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { updateDeckUser } from '../../utils/api';
import { updateDeck } from '../../actions';
import { NavigationActions } from 'react-navigation';
import UCardBtn from '../UCardBtn';

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
        <Text>
          Here is your score: {`${deck.user.score}/${deck.questions.length}`}
        </Text>
        <UCardBtn text="Reset Quiz" onPress={this.reset} />
        <UCardBtn text="Back to Deck" onPress={backToDeck} />
      </Fragment>
    );
  }
}

function mapStateToProps(state, { id }) {
  return {
    deck: state[id]
  };
}

export default connect(mapStateToProps)(LastStep);
