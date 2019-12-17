import { Usuario } from './../interfaces/usuario';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from "firebase/app";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<Usuario>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    // Get the auth state, then fetch the Firestore user document or return null
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          return this.afs.doc<Usuario>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    )
  }

  async cadastrarUsuarioSenha(novoUsuario: Usuario, senha: string) {
    try {
      // cadastra do auth
      let credetial: auth.UserCredential = await this.afAuth.auth.createUserWithEmailAndPassword(novoUsuario.email, senha)
      if (!credetial) throw "erro credential";
      // cadastra no firestore
      let usuario: Usuario = {
        uid: credetial.user.uid,
        email: novoUsuario.email,
        displayName: novoUsuario.displayName || '',
        photoURL: novoUsuario.photoURL || ''
      }
      // verificar se usuario ja esta cadastrado
      await this.afs.doc<Usuario>(`users/${credetial.user.uid}`).set(usuario)

      //faz o login
      console.log('[success Usuario cadastrado com sucesso!]:', usuario)
    } catch (error) {
      console.log('[error Cadastrar Usuario e senha]:', error)
    }



  }


  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<Usuario> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }

    return userRef.set(data, { merge: true })

  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }
}
