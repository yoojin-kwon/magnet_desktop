import { firebaseAuth } from './firebase';

class AuthService {
  signIn(email, password) {
    return firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  signUp(email, password) {
    return firebaseAuth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    return firebaseAuth.signOut();
  }

  currentUser() {
    return firebaseAuth.currentUser;
  }

  authChange(userChange) {
    firebaseAuth.onAuthStateChanged((user) => {
      userChange(user);
    });
  }
}

export default AuthService;
