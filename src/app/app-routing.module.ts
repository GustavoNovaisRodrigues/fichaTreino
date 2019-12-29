import { ClienteGuardGuard } from './guards/cliente-guard.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'logar', pathMatch: 'full' },
  {
    path: 'logar',
    loadChildren: () => import('./publica/logar/logar.module').then(m => m.LogarPageModule)
  },
  {
    path: 'usuario-senha',
    loadChildren: () => import('./publica/usuario-senha/usuario-senha.module').then(m => m.UsuarioSenhaPageModule)
  },
  {
    path: 'cadastrar',
    loadChildren: () => import('./publica/cadastrar/cadastrar.module').then(m => m.CadastrarPageModule)
  },
  {
    path: 'cliente',
    loadChildren: () => import('./privada/cliente/cliente.module').then(m => m.ClientePageModule),
    canActivate:[ClienteGuardGuard]
  },
  {
    path: 'gerente',
    loadChildren: () => import('./privada/gerente/gerente.module').then( m => m.GerentePageModule)
  },
// TODO add guarda de gerente canActivate:[GerenteGuard]


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
