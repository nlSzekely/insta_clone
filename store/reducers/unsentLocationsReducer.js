import actionTypes from '../actionTypes';

const unsentLocationsReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_UNSENT_LOCATIONS:
      return [...state, action.payload];
    case actionTypes.REMOVE_FROM_UNSENT_LOC: {
      return state.filter(item => item?.location?.locationIDField !== action.payload);
    }
    default:
      return state;
  }
};

export default unsentLocationsReducer;
