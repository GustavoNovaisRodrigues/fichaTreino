import { arrumarDadoDoUsuarioParaALista } from './helpers/arrumarDadoDoUsuarioParaALista';
import { LIMITE_DE_CADA_LISTA, NOME_BANCO_LISTA } from '../constants';
import { Usuario } from '../../../src/app/interfaces/usuario';
import ArrayListasDeUsuarios from '../interfaces/arrayListasDeUsuarios';
import { juntarListasDeUsuariosEmUmaLista } from './helpers/juntarListasDeUsuariosEmUmaLista';
import { setNovaListaNaAntiga } from './helpers/setNovaListaNaAntiga';

export async function adicionarNovoUsuarioAListaDeUsuarios(dadosDoNovoUsuario: Usuario, idDoNovoUsuario: string) {
    //junta todas as listas
    const listasTemp: ArrayListasDeUsuarios[] = await juntarListasDeUsuariosEmUmaLista(NOME_BANCO_LISTA)

    //adiciona o usuario cadastrado a listaTemp
    listasTemp.push({
        [idDoNovoUsuario]: {
            ...arrumarDadoDoUsuarioParaALista(dadosDoNovoUsuario)
        }
    })
    const limite = LIMITE_DE_CADA_LISTA //1500 Limite Safe para n ultrapassar 1 MiB
    await setNovaListaNaAntiga(listasTemp, limite, NOME_BANCO_LISTA)


    // TODO  Remover lista se houver menos listasParaSalvar do que listas_de_usuarios// verificar se o problema acontece tbm no onDelete antes de qualquer coisa
    //atualizando as listas


    return true
}


