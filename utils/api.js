import { AsyncStorage } from 'react-native';

const DECK_STORAGE_KEY = 'UdaciCards:deck';

export function getDecks() {
  // AsyncStorage.removeItem(DECK_STORAGE_KEY);
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(results => {
    return results === null ? {} : JSON.parse(results);
  });
}

export function getDeck(id) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(results => {
    const data = JSON.parse(results);
    return data[id];
  });
}

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(
    DECK_STORAGE_KEY,
    JSON.stringify({
      [title]: {
        title,
        questions: [],
        user: {
          score: 0,
          nextQuestionIndex: 0
        }
      }
    })
  );
}

export function addCardToDeck(title, card) {
  return getDeck(title).then(deck => {
    return AsyncStorage.mergeItem(
      DECK_STORAGE_KEY,
      JSON.stringify({
        [title]: {
          ...deck,
          questions: deck.questions.concat([card])
        }
      })
    );
  });
}
