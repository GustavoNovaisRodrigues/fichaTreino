import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverOptionsPage } from '../popover-options/popover-options.page';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {
  }


  async openPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverOptionsPage,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
}
