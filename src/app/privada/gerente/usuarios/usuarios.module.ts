import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuariosPageRoutingModule } from './usuarios-routing.module';

import { UsuariosPage } from './usuarios.page';
import { PopoverOptionsPageModule } from '../popover-options/popover-options.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuariosPageRoutingModule,
    PopoverOptionsPageModule
  ],
  declarations: [
    UsuariosPage,
  ]
})
export class UsuariosPageModule { }
