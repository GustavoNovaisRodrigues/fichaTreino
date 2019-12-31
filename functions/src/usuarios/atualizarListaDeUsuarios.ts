import { LIMITE_DE_CADA_LISTA, NOME_BANCO_LISTA } from './../constants';
import { Usuario } from './../../../src/app/interfaces/usuario';
import { arrumarDadoDoUsuarioParaALista } from './helpers/arrumarDadoDoUsuarioParaALista';
import { juntarListasDeUsuariosEmUmaLista } from './helpers/juntarListasDeUsuariosEmUmaLista';
import ArrayListasDeUsuarios from '../interfaces/arrayListasDeUsuarios';
import { setNovaListaNaAntiga } from './helpers/setNovaListaNaAntiga';

export async function atualizarListaDeUsuarios(novoValor: Usuario, antigoValor: Usuario) {
    //verificar se houve um UPDATE relevante
    if (houveMudancasDoValorAntigoComNovo(novoValor, antigoValor)) throw 'Nao Houve alteráções relevantes para a lista'

    //junta todas as listas
    let listasTemp: ArrayListasDeUsuarios[] = await juntarListasDeUsuariosEmUmaLista(NOME_BANCO_LISTA)
    //busca indice do usuario que fez o update
    const indiceNovoUsuario: number = listasTemp.findIndex((val: any) => {
        if (!val) return false
        return val[novoValor.uid]
    })
    if (indiceNovoUsuario <= -1) throw "usuario cadastrado nao existe na lista de usuarios";
    //sobrepõe usuario que foi atualizado nos dados antigos deste na listasTemp
    listasTemp[indiceNovoUsuario] = {
        [novoValor.uid]: {
            ...arrumarDadoDoUsuarioParaALista(novoValor)
        }
    }
    const limite = LIMITE_DE_CADA_LISTA //1500 Limite Safe para n ultrapassar 1 MiB
    await setNovaListaNaAntiga(listasTemp, limite, NOME_BANCO_LISTA)
    return true
}

function houveMudancasDoValorAntigoComNovo(novoValor: any, antigoValor: any) {
    if (novoValor.displayName == antigoValor.displayName) return false
    if (novoValor.email == antigoValor.email) return false
    if (novoValor.nivel == antigoValor.nivel) return false
    if (novoValor.photoURL == antigoValor.photoURL) return false
    if (novoValor.uid == antigoValor.uid) return false
    if (novoValor.verificado == antigoValor.verificado) return false
    if (novoValor.dataModificacao == antigoValor.dataModificacao) return false
    if (novoValor.displayNameCaseSensitive == antigoValor.displayNameCaseSensitive) return false
    if (novoValor.genero == antigoValor.genero) return false
    if (novoValor.redesSociai == antigoValor.redesSociai) return false
    return true
}