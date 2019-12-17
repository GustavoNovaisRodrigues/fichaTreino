import { Usuario } from './../../interfaces/usuario';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {

  formCadastrar: FormGroup
  
  constructor(public authService: AuthService, public fb: FormBuilder) { }

  ngOnInit() {
    this.formCadastrar = this.fb.group({
      nome: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      senha: ['', [
        Validators.required,
        Validators.minLength(4)
      ]],
    })
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
    if (this.formCadastrar.invalid) return console.log('[Cadastrar Cancelado!!]:')
    await this.authService.cadastrarUsuarioSenha(this.novoUsuario, this.senha.value)
    console.log('[Cadastrar finalizado]:')
  }



}
