import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-senha',
  templateUrl: './usuario-senha.page.html',
  styleUrls: ['./usuario-senha.page.scss'],
})
export class UsuarioSenhaPage implements OnInit {
  formLogar: FormGroup
  constructor(
    public authService: AuthService,
    public fb: FormBuilder,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private router: Router) { }

  ngOnInit() {
    this._formInit()
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

  logar() { }

}
