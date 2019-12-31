import { Usuario } from './../../../../src/app/interfaces/usuario';
import { DadosListasDeUsuarios } from '../../interfaces/arrayListasDeUsuarios';
export function arrumarDadoDoUsuarioParaALista(dadosUsuaio: Usuario) {
    const {
        displayName,
        email,
        nivel,
        photoURL,
        uid,
        verificado,
        dataModificacao,
        displayNameCaseSensitive,
        genero,
        redesSociais
    } = dadosUsuaio
    return <DadosListasDeUsuarios>{
        displayName: displayName || null,
        email: email || null,
        nivel: nivel || null,
        photoURL: photoURL || null,
        uid: uid || null,
        verificado: verificado || null,
        dataModificacao: dataModificacao || null,
        displayNameCaseSensitive: displayNameCaseSensitive || null,
        genero: genero || null,
        redesSociais: redesSociais || null,
    }
}