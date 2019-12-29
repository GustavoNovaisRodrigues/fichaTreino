import { Usuario } from './../../interfaces/usuario';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {

  formCadastrar: FormGroup

  constructor(
    public authService: AuthService,
    public fb: FormBuilder,
    private ms: MensagemService,
    private router: Router) { }

  ngOnInit() {
    this._formInit()
  }
  /*
  *
  *
  *               METODOS PUBLICOS
  *
  *
  */

  /**
   * efetua o cadastro , apresenta mensagem e redireciona se cadastrado com sucesso!
   */
  async cadastrar() {
    let load = await this.ms.apresentarLoading()
    if (this.formCadastrar.invalid) return console.log('[Cadastrar Cancelado!!]:')
    let resposta = await this.authService.cadastrarUsuarioSenha(this.novoUsuario, this.senha.value)
    load.dismiss()
    if (!resposta.sucesso) return this.ms.apresentarMensagem(resposta.mensagem)
    this.ms.apresentarMensagem(resposta.mensagem)
    this._redirecionar()
  }

  /*
  *
  *
  *               METODOS PRIVADOS
  *
  *
  */

  /**
   * inicia o formulario
   */
  private _formInit() {
    this.formCadastrar = this.fb.group({
      nome: ['gustavo novais', [
        Validators.required,
        Validators.minLength(3)
      ]],
      email: ['1client@email.com', [
        Validators.required,
        Validators.email
      ]],
      senha: ['123456', [
        Validators.required,
        Validators.minLength(6)
      ]],
    })
  }

  /**
   * redireciona o usuario cadastrado
   */
  private _redirecionar() {
    this.router.navigate(['/cliente/dashboard'])
  }

  /*
  *
  *
  *               GETTERS
  *
  *
  */
  get email() {
    return this.formCadastrar.get('email')
  }
  get nome() {
    return this.formCadastrar.get('nome')
  }
  get senha() {
    return this.formCadastrar.get('senha')
  }
  get novoUsuario(): Usuario {
    return {
      uid: '',
      email: this.email.value,
      displayName: this.nome.value,
      nivel: 'cliente',
      verificado: false
    }
  }

}
