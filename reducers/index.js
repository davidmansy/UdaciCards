import {
  RECEIVE_DECKS,
  ADD_DECK,
  ADD_CARD,
  UPDATE_DECK,
  DELETE_DECK
} from '../actions';

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
        [action.title]: {
          title: action.title,
          questions: [],
          user: {
            score: 0,
            nextQuestionIndex: 0
          }
        }
      };
    case ADD_CARD:
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
          questions: state[action.title].questions.concat([action.card])
        }
      };
    case UPDATE_DECK:
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
          user: { ...action.user }
        }
      };
    case DELETE_DECK:
      state[action.title] = undefined;
      delete state[action.title];
      return {
        ...state
      };
    default:
      return state;
  }
}

export default decks;
