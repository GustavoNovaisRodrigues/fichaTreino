import { Usuario } from "../../../src/app/interfaces/usuario";
import ArrayListasDeUsuarios from "../interfaces/arrayListasDeUsuarios";
import { juntarListasDeUsuariosEmUmaLista } from "./helpers/juntarListasDeUsuariosEmUmaLista";
import { NOME_BANCO_LISTA, LIMITE_DE_CADA_LISTA } from "../constants";
import { setNovaListaNaAntiga } from "./helpers/setNovaListaNaAntiga";


export async function removerUsuarioDaListaDeUsuarios(valorDeletado: Usuario, id: string) {
    //junta todas as listas
    let listasTemp: ArrayListasDeUsuarios[] = await juntarListasDeUsuariosEmUmaLista(NOME_BANCO_LISTA)

    const indiceNovoUsuario: number = listasTemp.findIndex((val: any) => {
        if (!val) return false
        return val[valorDeletado.uid]
    })
    if (indiceNovoUsuario <= -1) throw "usuario Deletado nao existe na lista de usuarios";
    
    //sobrepõe nova lista com o usuario que foi Deletado nos dados antigos desta listasTemp
    listasTemp = listasTemp.splice(indiceNovoUsuario, 1)
    const limite = LIMITE_DE_CADA_LISTA //1500 Limite Safe para n ultrapassar 1 MiB
    await setNovaListaNaAntiga(listasTemp, limite, NOME_BANCO_LISTA)
    return true
}