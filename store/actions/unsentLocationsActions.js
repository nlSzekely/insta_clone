import actionTypes from '../actionTypes';

export const removeFromUnsentLocation = locId => {
  return {
    type: actionTypes.REMOVE_FROM_UNSENT_LOC,
    payload: locId,
  };
};

export const addToUnsentLocations = loc => {
  return {
    type: actionTypes.ADD_TO_UNSENT_LOCATIONS,
    payload: loc,
  };
};
