import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopoverOptionsPage } from './popover-options.page';

const routes: Routes = [
  {
    path: '',
    component: PopoverOptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopoverOptionsPageRoutingModule {}
