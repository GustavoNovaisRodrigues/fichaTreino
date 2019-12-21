import { MensagemRetorno } from './../interfaces/mensagem-retorno';
import { Usuario } from './../interfaces/usuario';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from "firebase/app";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MensagenRetornoService } from './mensagen-retorno.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly _path = "usuarios/"
  private user$: Observable<Usuario>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private ms: MensagenRetornoService
  ) {
    this._checaUsuarioLogado()
  }

  /*
  *
  *
  *               METODOS PUBLICOS 
  *
  *
  */

  /**
   * Desloga o usuario logado e redireciona ele para pagina raiz
   */
  async deslogar() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }
  /**
   * Faz o cadastro do novo usuario com email e senha
   * retorna promise<boolean>
   */
  async cadastrarUsuarioSenha(novoUsuario: Usuario, senha: string): Promise<MensagemRetorno> {
    try {
      // cadastro no authentication
      const credetial: auth.UserCredential = await this.afAuth.auth.createUserWithEmailAndPassword(novoUsuario.email, senha)
      if (!credetial) throw this.ms.mensagem(false, '❌ Desculpe, houve um problema com o servidor. Por favor tente novamente mais tarde.')
      // cadastro no firestore
      await this._atualizarDadosDoUsuario(novoUsuario, credetial.user.uid)
      return this.ms.mensagem(true, '✅ Cadastrado realizado com sucesso!')
    } catch (error) {
      return this._erroCadastrarUsuarioSenha(error)
    }
  }


  /*
  *
  *
  *               METODOS PRIVADOS
  *
  *
  */


  /**
   * traduz o erro do firebase.auth.autentication ou retorna MensagemRetorno
   * @param error erro do autentication ou MensagemRetorno
   */
  private _erroCadastrarUsuarioSenha(error: any): MensagemRetorno {
    const traducaoMensagens = [{
      code: 'auth/email-already-in-use',
      message: '❌ Este e-mail já está cadastrado.'
    },
    {
      code: 'auth/invalid-email',
      message: '❌ Este e-mail não é válido '
    },
    {
      code: 'auth/operation-not-allowed',
      message: '❌ A conta não pode ser ativada.'
    },
    {
      code: 'auth/weak-password',
      message: '❌ A senha não é forte o suficiente. Mínimo de 6 caracteres'
    }]
    //verifica se tem o mesmo codigo para a tradução
    let mensagenErro = traducaoMensagens.filter(data => (data.code == error.code))
    if (mensagenErro.length < 1) return error //se n retorna o MensagemRetorno
    return this.ms.mensagem(false, mensagenErro[0].message)
  }

  /**
    * atualiza usuario existente ou cria um novo usuario
    * @param dadosUsuario 
    * @param idUsuario uid do usuario a ser atualizado ou criado
    */
  private async _atualizarDadosDoUsuario(dadosUsuario: Usuario, idUsuario?: string) {
    // cadastra no firestore
    const referencia: AngularFirestoreDocument<Usuario> = this.afs.doc<Usuario>(`${this._path}${idUsuario}`)
    const usuario: Usuario = {
      uid: idUsuario || dadosUsuario.uid,
      email: dadosUsuario.email,
      displayName: dadosUsuario.displayName || '',
      photoURL: dadosUsuario.photoURL || ''
    }
    return await referencia.set(usuario, { merge: true })
  }

  /**
   * Checa estado do usuario logado e seta observable user$
   * retorna observable de dados do usuario logado ou null
   */
  private _checaUsuarioLogado(): void {
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

  /*
  *
  *
  *               GETTERS
  * 
  *
  */
  get usuario$(): Observable<Usuario | null> {
    return this.user$
  }

  // async googleSignin() {
  //   const provider = new auth.GoogleAuthProvider();
  //   const credential = await this.afAuth.auth.signInWithPopup(provider);
  //   return this.updateUserData(credential.user);
  // }

}
