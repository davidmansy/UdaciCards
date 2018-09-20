import { RECEIVE_DECKS, ADD_DECK } from '../actions';

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case ADD_DECK:
      return {
        ...state,
        [title]: {
          title,
          questions: [],
          user: {
            score: 0,
            nextQuestionIndex: 0
          }
        }
      };
    default:
      return state;
  }
}

export default decks;