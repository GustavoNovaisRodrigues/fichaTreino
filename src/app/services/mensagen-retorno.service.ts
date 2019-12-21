import { Injectable } from '@angular/core';
import { MensagemRetorno } from './../interfaces/mensagem-retorno';

@Injectable({
  providedIn: 'root'
})
export class MensagenRetornoService {

  constructor() { }

  mensagem(sucesso: boolean, mensagem: string): MensagemRetorno {
    return {
      sucesso,
      mensagem
    }

  }
}
