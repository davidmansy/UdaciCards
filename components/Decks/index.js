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
          data={Object.values(decks)}
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
    backgroundColor: white
  }
});

function mapStateToProps(decks) {
  return {
    decks
  };
}

export default connect(mapStateToProps)(Decks);
