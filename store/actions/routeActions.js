import actionTypes from '../actionTypes';

export const setCurrentLocation = location => {
  return {
    type: actionTypes.SET_CURRENT_LOCATION,
    payload: location,
  };
};
export const setCurrentOperation = operation => {
  return {
    type: actionTypes.SET_CURRENT_OPERATION,
    payload: operation,
  };
};

export const replaceOutdatedOperation = (operationID, operation) => {
  return {
    type: actionTypes.REPLACE_OUTDATED_OPERATION,
    payload: {operationID, operation},
  };
};

export const replaceOutdatedLocation = (locationID, location) => {
  return {
    type: actionTypes.REPLACE_OUTDATED_LOCATION,
    payload: {locationID, location},
  };
};

