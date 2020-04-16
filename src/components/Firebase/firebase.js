import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

import firebaseConfig from "../../firebaseConfig.js";

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    /* Helper */
    this.serverValue = app.database.ServerValue;

    this.auth = app.auth();
    this.db = app.database();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once("value")
          .then(snapshot => {
            const dbUser = snapshot.val();

            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = [];
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref("users");

  // *** User Data API ***

  setTimelinePoints = (timelinePoints, timelinePoint) => {
    const uid = this.auth.currentUser.uid;
    const dbRef = this.db.ref(`users/${uid}/userData/timelineData`);
    dbRef.update({
      timelinePoints,
      timelinePoint
    });
  }

  setVariables = (variables) => {
    const uid = this.auth.currentUser.uid;
    const dbRef = this.db.ref(`users/${uid}/userData/variableData`);
    dbRef.update({
      variables
    });
  }

  setUserDataItems = (dataItems) => {
    const uid = this.auth.currentUser.uid;
    const dbRef = this.db.ref(`users/${uid}/userData/`);
    dbRef.update({
      dataItems: dataItems
    });
  }

  getUserData = () => this.db.ref(`users/${this.auth.currentUser.uid}/userData`);

  // *** Message API (template for other stuff later...) ***

  message = uid => this.db.ref(`messages/${uid}`);

  messages = () => this.db.ref('messages');

  // *** Data API (simply fetches all data for now...) ***

  allData = () => this.db.ref('data');
}

export default Firebase;
