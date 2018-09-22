import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { getDecks } from '../utils/api';
import { purple } from '../utils/colors';
import { AppLoading } from 'expo';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions';

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

  render() {
    const { ready } = this.state;
    const { decks } = this.props;

    if (ready === false) {
      return <AppLoading />;
    }

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={Object.values(decks)}
          keyExtractor={item => item.title}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('DeckDetail', { id: item.title })
              }
            >
              <View style={styles.deck}>
                <Text>{item.title}</Text>
                <Text># of cards: {item.questions.length}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  deck: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: purple
  }
});

function mapStateToProps(decks) {
  return {
    decks
  };
}

export default connect(mapStateToProps)(Decks);
