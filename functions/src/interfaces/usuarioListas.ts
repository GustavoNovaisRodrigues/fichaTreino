import { DataUsuarioLista } from "./dataUsuarioLista"

export interface UsuarioListas {
    id: {
        lista: [DataUsuarioLista],
        quantidade: number, //maxSize 1500
        //bytes = 882000
        dataModificacao: Date
    }
}