import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-usuario-senha',
  templateUrl: './usuario-senha.page.html',
  styleUrls: ['./usuario-senha.page.scss'],
})
export class UsuarioSenhaPage implements OnInit {
  formLogar: FormGroup

  mostrarSenha = false
  typeInput = 'password'
  nameIcon = 'eye-off'
  get email() {
    return this.formLogar.get('email')
  }
  get senha() {
    return this.formLogar.get('senha')
  }
  constructor(
    public authService: AuthService,
    public fb: FormBuilder,
    private ms: MensagemService,
    private router: Router) { }

  ngOnInit() {
    this._formInit()
  }
  async logar() {
    let load = await this.ms.apresentarLoading()

    if (this.formLogar.invalid) return console.error('[logar Cancelado!!]:')
    let resposta = await this.authService.logarUsuarioSenha(this.email.value, this.senha.value)
    load.dismiss()
    if (!resposta.sucesso) return this.ms.apresentarMensagem(resposta.mensagem)
    this.ms.apresentarMensagem(resposta.mensagem)
    this._redirecionar()
  }
  visualizarSenha() {
    this.mostrarSenha = !this.mostrarSenha;
    (this.mostrarSenha) ? this.typeInput = 'text' : this.typeInput = 'password';
    (this.mostrarSenha) ? this.nameIcon = 'eye' : this.nameIcon = 'eye-off';
  }
  /**
  * inicia o formulario
  */
  private _formInit() {
    this.formLogar = this.fb.group({
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
    //TODO verificar se é admin professor ou cliente e redirecionar para o lugar certo
    this.router.navigate(['/dashboard'])
  }
}
