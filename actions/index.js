export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';
export const UPDATE_DECK = 'UPDATE_DECK';
export const DELETE_DECK = 'DELETE_DECK';

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  };
}

export function addDeck({ title }) {
  return {
    type: ADD_DECK,
    title
  };
}

export function addCard(title, card) {
  return {
    type: ADD_CARD,
    title,
    card
  };
}

export function updateDeck(title, user) {
  return {
    type: UPDATE_DECK,
    title,
    user
  };
}

export function deleteDeck(title) {
  return {
    type: DELETE_DECK,
    title
  };
}
