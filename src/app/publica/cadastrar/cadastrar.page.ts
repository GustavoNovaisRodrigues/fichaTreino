import { Usuario } from './../../interfaces/usuario';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {

  formCadastrar: FormGroup

  constructor(public authService: AuthService,
    public fb: FormBuilder,
    public loadingController: LoadingController,
    public toastController: ToastController, private router: Router) { }

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
    let load = await this._apresentarLoading()

    if (this.formCadastrar.invalid) return console.log('[Cadastrar Cancelado!!]:')
    let resposta = await this.authService.cadastrarUsuarioSenha(this.novoUsuario, this.senha.value)

    load.dismiss()
    if (!resposta.sucesso) return this._apresentarMensagem(resposta.mensagem)
    this._apresentarMensagem(resposta.mensagem)
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
   * apresenta a mensagem 
   * @param mensagem mensagem do toltip
   */
  private async _apresentarMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      position: 'top',
      duration: 3000
    });
    toast.present();
  }
  /**
   * apresenta o loaging
   */
  private async _apresentarLoading() {
    const loading = await this.loadingController.create({
      message: 'Um momento por favor...',
    });
    await loading.present();
    return loading
  }
  /**
   * redireciona o usuario cadastrado
   */
  private _redirecionar() {
    this.router.navigate(['/dashboard'])
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
      displayName: this.nome.value
    }
  }

}
