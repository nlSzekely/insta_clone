import actionTypes from '../actionTypes';

export const setLoading = status => {
  return {
    type: actionTypes.SET_LOADING,
    payload: status,
  };
};

export const setLoadingText = text => {
  return {
    type: actionTypes.SET_LOADING_TEXT,
    payload: text,
  };
};
