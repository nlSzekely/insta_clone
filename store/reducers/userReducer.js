import actionTypes from '../actionTypes';

const initialState = {
  currentUser: null,
};

const user = (state = initialState, actions) => {
  switch (actions.type) {
    case actionTypes.SET_CURRENT_USER:
      return {...state, currentUser: actions.payload};
    default:
      return state;
  }
};

export default user;
