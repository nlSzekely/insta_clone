import actionTypes from '../actionTypes';
import firebase from 'firebase';

export const setCurrentUser = (user) => {
  return {
    type: actionTypes.SET_CURRENT_USER,
    payload: user,
  };
};

export function fetchUser() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          dispatch(setCurrentUser(snapshot.data()));
        } else {
          console.log('user does not exist');
        }
      });
  };
}
