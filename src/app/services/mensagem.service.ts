import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { MensagemRetorno } from '../interfaces/mensagem-retorno';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  constructor(
    public loadingController: LoadingController,
    public toastController: ToastController,
  ) { }

  /**
   * padrão da mensagem a ser passada para o usuario
   * @param sucesso 
   * @param mensagem 
   */
  mensagem(sucesso: boolean, mensagem: string): MensagemRetorno {
    return {
      sucesso,
      mensagem
    }
  }
  /**
   * apresenta a mensagem 
   * @param mensagem mensagem do toltip
   */
  async apresentarMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      position: 'top',
      duration: 3000
    });
    return toast.present();
  }
  /**
   * apresenta o loaging
   */
  async apresentarLoading() {
    const loading = await this.loadingController.create({
      message: 'Um momento por favor...',
    });
    await loading.present();
    return loading
  }
}
