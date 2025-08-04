import { auth } from '../firebaseConfig';
import { AuthCredentials } from '../../domain/models/AuthCredentials';

export class AuthService {
  static async signUp({ email, password }: AuthCredentials) {
    // The compat syntax is auth.createUserWithEmailAndPassword(...)
    return auth.createUserWithEmailAndPassword(email, password);
  }

  static async signIn({ email, password }: AuthCredentials) {
    // The compat syntax is auth.signInWithEmailAndPassword(...)
    return auth.signInWithEmailAndPassword(email, password);
  }

  static async signOut() {
    // The compat syntax is auth.signOut()
    return auth.signOut();
  }
}