import actionTypes from '../actionTypes';

const initialState = {
  currentUser: null,
  posts: [],
};

const user = (state = initialState, actions) => {
  switch (actions.type) {
    case actionTypes.SET_CURRENT_USER:
      return {...state, currentUser: actions.payload};
    case actionTypes.USER_POSTS_STATE_CHANGE:
      return {...state, posts: actions.payload};
    default:
      return state;
  }
};

export default user;
