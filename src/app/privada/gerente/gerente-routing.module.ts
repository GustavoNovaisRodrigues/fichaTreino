import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GerentePage } from './gerente.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard'
  },
  {
    path: '',
    component: GerentePage,
    children: [{
      path: 'dashboard',
      loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
    },
    {
      path: 'usuarios',
      loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosPageModule)
    },
    {
      path: 'professores',
      loadChildren: () => import('./professores/professores.module').then(m => m.ProfessoresPageModule)
    },]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GerentePageRoutingModule { }
