import actionTypes from '../actionTypes';

export const setEndRoute = status => {
  return {
    type: actionTypes.SET_END_ROUTE,
    payload: status,
  };
};

export const setCurrentPersonnelToScan = authObj => {
  return {
    type: actionTypes.SET_CURRENT_PERSONNEL_TO_SCAN,
    payload: authObj,
  };
};

export const setOpenAuthScreen = status => {
  return {
    type: actionTypes.SET_OPEN_AUTH_SCREEN,
    payload: status,
  };
};
