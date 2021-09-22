import actionTypes from '../actionTypes';
import firebase from 'firebase';

export const setCurrentUser = (user) => {
  return {
    type: actionTypes.SET_CURRENT_USER,
    payload: user,
  };
};

export const setUserPosts = (posts) => {
  return {
    type: actionTypes.USER_POSTS_STATE_CHANGE,
    payload: posts,
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

export function fetchUserPosts() {
  return (dispatch) => {
    console.log(
      '🚀 ~ file: userActions.js ~ line 39 ~ return ~ dispatch',
      firebase.auth().currentUser.uid
    );
    firebase
      .firestore()
      .collection('posts')
      .doc(firebase.auth().currentUser.uid)
      .collection('userPosts')
      .orderBy('creationDate', 'asc')
      .get()
      .then((snapshot) => {
        console.log(
          '🚀 ~ file: userActions.js ~ line 47 ~ .then ~ snapshot',
          snapshot.docs
        );
        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return {id, ...data};
        });
        dispatch(setUserPosts(posts));

        // if (snapshot.exists) {
        //   dispatch(setUserPosts(snapshot.data()));
        // } else {
        //   console.log('user does not exist');
        // }
      });
  };
}
