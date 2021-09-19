import actionTypes from '../actionTypes';

const initialState = {
  loading: false,
  loadingText: 'Loading...',
};

const optionsReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case actionTypes.SET_LOADING:
      return {...state, loading: actions.payload};
    case actionTypes.SET_LOADING_TEXT:
      return {...state, loadingText: actions.payload};
    default:
      return state;
  }
};

export default optionsReducer;
