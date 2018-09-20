import { AsyncStorage } from 'react-native';

const DECK_STORAGE_KEY = 'UdaciCards:deck';

export function getDecks() {
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
