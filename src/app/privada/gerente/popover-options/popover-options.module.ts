import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopoverOptionsPageRoutingModule } from './popover-options-routing.module';

import { PopoverOptionsPage } from './popover-options.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopoverOptionsPageRoutingModule
  ],
  declarations: [PopoverOptionsPage]
})
export class PopoverOptionsPageModule {}
