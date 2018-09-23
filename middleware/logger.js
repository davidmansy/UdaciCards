import { AsyncStorage } from 'react-native';

const DECK_STORAGE_KEY = 'UdaciCards:deck';

function retrieveDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(results => {
    console.log('local storage ', JSON.parse(results));
    console.groupEnd();
  });
}

const logger = store => next => action => {
  console.group(action.type);
  console.log('The action: ', action);
  const returnValue = next(action);
  console.log('The new state: ', store.getState());
  retrieveDecks();
  return returnValue;
};

export default logger;
