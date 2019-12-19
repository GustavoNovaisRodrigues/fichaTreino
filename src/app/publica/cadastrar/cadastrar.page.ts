import { Usuario } from './../../interfaces/usuario';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, LoadingController } from '@ionic/angular';

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
    public toastController: ToastController) { }

  ngOnInit() {
    this._formInit()
  }
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
  async cadastrar() {
    let load = await this.presentLoadingWithOptions()

    if (this.formCadastrar.invalid) return console.log('[Cadastrar Cancelado!!]:')
    let resposta = await this.authService.cadastrarUsuarioSenha(this.novoUsuario, this.senha.value)

    load.dismiss()
    if (!resposta.sucesso) return this._apresentarMensagem(resposta.mensagem)
    this._apresentarMensagem(resposta.mensagem, () => { console.log('Redireciona usuario'); })
  }
  private _formInit() {
    this.formCadastrar = this.fb.group({
      nome: ['gustavo novais', [
        Validators.required,
        Validators.minLength(3)
      ]],
      email: ['client6@email.com', [
        Validators.required,
        Validators.email
      ]],
      senha: ['123456', [
        Validators.required,
        Validators.minLength(6)
      ]],
    })
  }
  private async _apresentarMensagem(mensagem: string, callback?) {
    const toast = await this.toastController.create({
      message: mensagem,
      position: 'top',
      buttons: [{
        text: 'Done',
        handler: () => {
          if (callback) callback()
        }
      }]
    });
    toast.present();
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      message: 'Um momento por favor...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    await loading.present();
    return loading
  }


}
