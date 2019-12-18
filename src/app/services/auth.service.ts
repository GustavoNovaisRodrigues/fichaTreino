import { MensagemRetorno } from './../interfaces/mensagem-retorno';
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

  readonly _path = "usuarios/"
  user$: Observable<Usuario>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.checaUsuarioLogado()
  }


  /**
   * Faz o cadastro do novo usuario com email e senha
   * retorna promise<boolean>
   */
  async cadastrarUsuarioSenha(novoUsuario: Usuario, senha: string): Promise<MensagemRetorno> {
    try {
      // cadastro no authentication
      const credetial: auth.UserCredential = await this.afAuth.auth.createUserWithEmailAndPassword(novoUsuario.email, senha)
      if (!credetial) throw <MensagemRetorno>{
        sucesso: false,
        mensagem: 'Desculpe, houve um problema com o servidor. Por favor tente novamente mais tarde.'
      };;
      // cadastra no firestore
      const usuario: Usuario = {
        uid: credetial.user.uid,
        email: novoUsuario.email,
        displayName: novoUsuario.displayName || '',
        photoURL: novoUsuario.photoURL || ''
      }
      await this.afs.doc<Usuario>(`${this._path}${credetial.user.uid}`).set(usuario)
      return <MensagemRetorno>{
        sucesso: true,
        mensagem: 'Cadastrado realizado com sucesso!'
      }
    } catch (error) {
      let traducaoMensagens = [{
        code: 'auth/email-already-in-use',
        message: 'Já existe uma conta com esse e-mail.'
      },
      {
        code: 'auth/invalid-email',
        message: 'Este e-mail não é válido '
      },
      {
        code: 'auth/operation-not-allowed',
        message: 'A conta não pode ser ativada.'
      },
      {
        code: 'auth/weak-password',
        message: 'A senha não é forte o suficiente. Mínimo de 6 caracteres'
      }]
      let mensagenErro = traducaoMensagens.filter(data => (data.code == error.code))
      if (mensagenErro.length < 1) return error
      return <MensagemRetorno>{
        sucesso: false,
        mensagem: mensagenErro[0].message
      }
    }
  }



  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  /**
   * Checa estado do usuario logado e seta observable user$
   * retorna observable de dados do usuario logado ou null
   */
  private checaUsuarioLogado(): void {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => { // Logged in
        if (user) {
          return this.afs.doc<Usuario>(`${this._path}${user.uid}`).valueChanges();
        } else { // Logged out
          return of(null);
        }
      })
    )
  }

  private updateUserData(user) {
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
