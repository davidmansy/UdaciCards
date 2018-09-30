import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { white, orange } from '../../utils/colors';

export default function EmptyDeck({ goToNewDeck }) {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyListText}>
        To start using this app, please create a new
      </Text>
      <TouchableOpacity onPress={goToNewDeck}>
        <Text
          style={{
            fontSize: 22,
            color: orange,
            fontWeight: '700'
          }}
        >
          Deck!
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyListText: {
    fontSize: 22,
    margin: 20,
    marginBottom: 5,
    textAlign: 'center'
  }
});
