import actionTypes from '../actionTypes';

export const setDarkMode = status => {
  return {
    type: actionTypes.SET_DARK_MODE,
    payload: status,
  };
};

export const setCameraSound = soundName => {
  return {
    type: actionTypes.SET_CAMERA_SOUND,
    payload: soundName,
  };
};

export const setAuthCodes = status => {
  return {
    type: actionTypes.SET_AUTH_CODES,
    payload: status,
  };
};

export const setPrintCopies = nrOfCopies => {
  return {
    type: actionTypes.SET_PRINT_COPIES,
    payload: nrOfCopies,
  };
};

export const setVibrateOnScan = status => {
  return {
    type: actionTypes.SET_VIBRATE_ON_SCAN,
    payload: status,
  };
};

export const setSound = status => {
  return {
    type: actionTypes.SET_SOUND,
    payload: status,
  };
};

export const setShowScreenNames = status => {
  return {
    type: actionTypes.SET_SHOW_SCREEN_NAMES,
    payload: status,
  };
};

export const setSkipAuth = status => {
  return {
    type: actionTypes.SET_SKIP_AUTH,
    payload: status,
  };
};
