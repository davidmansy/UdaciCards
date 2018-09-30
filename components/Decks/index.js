import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { getDecks } from '../../utils/api';
import { white } from '../../utils/colors';
import { AppLoading } from 'expo';
import { connect } from 'react-redux';
import { receiveDecks } from '../../actions';
import DeckItem from './DeckItem';
import EmptyDeck from './EmptyDecks';

class Decks extends Component {
  state = {
    ready: false
  };

  componentDidMount() {
    const { dispatch } = this.props;
    getDecks()
      .then(decks => {
        dispatch(receiveDecks(decks));
      })
      .then(() => this.setState(() => ({ ready: true })));
  }

  goToDeckDetail = item => {
    this.props.navigation.navigate('DeckDetail', { id: item.title });
  };

  goToNewDeck = () => {
    this.props.navigation.navigate('NewDeck');
  };

  deckAlphabetically = (deckA, deckB) => {
    const titleA = deckA.title.toUpperCase();
    const titleB = deckB.title.toUpperCase(); // ignore upper and lowercase
    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }

    return 0;
  };

  render() {
    const { ready } = this.state;
    const { decks } = this.props;

    if (ready === false) {
      return <AppLoading />;
    }

    //Workaround for ListEmptyComponent prop of FlatList not centering the content
    //Fix only available as-of rn 0.56
    if (!Object.values(decks).length) {
      return <EmptyDeck goToNewDeck={this.goToNewDeck} />;
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={Object.values(decks).sort(this.deckAlphabetically)}
          keyExtractor={item => item.title}
          renderItem={({ item }) => (
            <DeckItem goToDeckDetail={this.goToDeckDetail} item={item} />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    paddingTop: 10
  }
});

function mapStateToProps(decks) {
  return {
    decks
  };
}

export default connect(mapStateToProps)(Decks);
