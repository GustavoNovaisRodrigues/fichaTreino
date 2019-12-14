import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioSenhaPage } from './usuario-senha.page';

const routes: Routes = [
  {
    path: '',
    component: UsuarioSenhaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioSenhaPageRoutingModule {}
