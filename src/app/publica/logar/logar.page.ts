import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logar',
  templateUrl: './logar.page.html',
  styleUrls: ['./logar.page.scss'],
})
export class LogarPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }


  irUsuarioSenha() {
    this.router.navigate(['/usuario-senha'])
  }
  irCadastrar() {
    this.router.navigate(['/cadastrar'])
  }
}
