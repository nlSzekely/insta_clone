import actionTypes from '../actionTypes';

const initialState = {
  darkMode: false,
  cameraSound: 'bip',
  cameraSounds: ['bip', 'bip2'],
  authCodes: false,
  carScan: false,
  printCopies: 1,
  vibrateOnScan: true,
  sounds: true,
  setShowScreenNames: false,
  skipAuth: false,
  loadDummyRoute: false,
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DARK_MODE:
      return {...state, darkMode: action.payload};
    case actionTypes.SET_CAMERA_SOUND:
      return {...state, cameraSound: action.payload};
    case actionTypes.SET_AUTH_CODES:
      return {...state, authCodes: action.payload};
    case actionTypes.SET_PRINT_COPIES:
      return {...state, printCopies: action.payload};
    case actionTypes.SET_VIBRATE_ON_SCAN:
      return {...state, vibrateOnScan: action.payload};
    case actionTypes.SET_SOUND:
      return {...state, sounds: action.payload};
    case actionTypes.SET_SHOW_SCREEN_NAMES:
      return {...state, setShowScreenNames: action.payload};
    case actionTypes.SET_SKIP_AUTH:
      return {...state, skipAuth: action.payload};
    default:
      return state;
  }
};

export default settingsReducer;
