import { MensagemRetorno } from './../interfaces/mensagem-retorno';
import { Usuario } from './../interfaces/usuario';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from "firebase/app";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MensagemService } from './mensagem.service';


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
    private ms: MensagemService
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
  async logarUsuarioSenha(email: string, senha: string) {
    try {
      // cadastro no authentication
      const credetial: auth.UserCredential = await this.afAuth.auth.signInWithEmailAndPassword(email, senha)
      if (!credetial) throw this.ms.mensagem(false, '❌ Desculpe, houve um problema com nossos serviços. Por favor tente novamente mais tarde.')
      return this.ms.mensagem(true, '✅ Login realizado com sucesso!')
    } catch (error) {
      return this._erroLogarUsuarioSenha(error)
    }
  }
  /**
   * Faz o cadastro do novo usuario com email e senha
   * retorna promise<boolean>
   */
  async cadastrarUsuarioSenha(novoUsuario: Usuario, senha: string): Promise<MensagemRetorno> {
    try {
      // cadastro no authentication
      const credetial: auth.UserCredential = await this.afAuth.auth.createUserWithEmailAndPassword(novoUsuario.email, senha)
      if (!credetial) throw this.ms.mensagem(false, '❌ Desculpe, houve um problema com nossos serviços. Por favor tente novamente mais tarde.')
      //merge dados da credential no usuario novo     
      let mergedUsuario: Usuario = this._mergeNovoUsuarioCredential(novoUsuario, credetial)
      // cadastro no firestore
      await this._atualizarDadosDoUsuario(mergedUsuario, credetial.user.uid)
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
   * recebe novoUsuario e Credential e retorna um MERGE dos dois objetos Usuario
   * @param novoUsuario 
   * @param credential 
   */
  private _mergeNovoUsuarioCredential(novoUsuario: Usuario, credential: auth.UserCredential): Usuario {
    const usuarioCredential: Usuario = {
      uid: credential.user.uid,
      email: credential.user.email,
      verificado: credential.user.emailVerified,
      nivel: 'cliente',
      get displayName() {
        return credential.user.displayName || novoUsuario.displayName || ''
      },
      get displayNameCaseSensitive() {
        return this.displayName.toLowerCase()
      },
      photoURL: credential.user.photoURL,
    }
    return { ...novoUsuario, ...usuarioCredential }
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
      verificado: false,
      nivel: 'cliente',
      displayName: dadosUsuario.displayName || '',
      photoURL: dadosUsuario.photoURL || ''
    }
    return await referencia.set(usuario, { merge: true })
  }
  /**
   * traduz o erro do this.afAuth.auth.signInWithEmailAndPassword ou retorna MensagemRetorno
   * @param error erro do autentication ou MensagemRetorno
   */
  private _erroLogarUsuarioSenha(error: any): MensagemRetorno {
    const traducaoMensagens = [{
      code: 'auth/invalid-email',
      message: '❌ Endereço de e-mail não é válido'
    }, {
      code: 'auth/user-disabled',
      message: '❌ Este usuário está desativado.'
    }, {
      code: 'auth/user-not-found',
      message: '❌ Este e-mail não está cadastrado.'
    }, {
      code: 'auth/wrong-password',
      message: '❌ Senha incorreta.'
    },]
    //verifica se tem o mesmo codigo para a tradução
    let mensagenErro = traducaoMensagens.filter(data => (data.code == error.code))
    if (mensagenErro.length < 1) return error //se n retorna o MensagemRetorno
    return this.ms.mensagem(false, mensagenErro[0].message)
  }
  /**
   * traduz o erro do this.afAuth.auth.createUserWithEmailAndPassword ou retorna MensagemRetorno
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
