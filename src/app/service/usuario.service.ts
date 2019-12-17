import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(public afAuth: AngularFireAuth) {
  }

  cadastrarEmailSenha(email, senha) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, senha)
      .then((go) => console.log('[Usuário cadastrado com sucesso !]', go))
      .catch((error) => console.log(error));
  }
  loginUsuarioSenha() {

  }
  loginGoogleAccont() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
