const SET_ARTICLE = 'SET_ARTICLE';
const CLEAR_ARTICLE = 'CLEAR_ARTICLE';

function reducer(state = null, action) {
  switch (action.type) {
    case SET_ARTICLE:
      return {
        ...state,
        ...action.payload,
      };
    case CLEAR_ARTICLE:
      return null;
    default:
      return state;
  }
}

module.exports = reducer;
