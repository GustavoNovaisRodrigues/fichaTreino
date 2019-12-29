import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MensagemService } from 'src/app/services/mensagem.service';
import { take } from 'rxjs/operators';

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
    this.formLogar = this.fb.group({
      email: ['gerente@email.com', [
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
  * redireciona o login do usuario para o local correto 
  */
  private _redirecionar() {
    this.authService.usuario$
      .pipe(take(1))
      .subscribe((usuario) => {
        if (!usuario) return console.log('== usuario nao encontrado==>>');
        if (usuario.nivel == 'cliente') return this.router.navigate(['/cliente/dashboard']);
        if (usuario.nivel == 'professor') return console.log('==Redireciona professor==>>');
        if (usuario.nivel == 'gerente') return this.router.navigate(['/gerente/dashboard']);
      }, null, () => console.log('==> completo!'))
  }
  /*
  *
  *
  *               GETTERS
  *
  *
  */
  get email() {
    return this.formLogar.get('email')
  }
  get senha() {
    return this.formLogar.get('senha')
  }
}
