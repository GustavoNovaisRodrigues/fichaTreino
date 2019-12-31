import * as admin from 'firebase-admin';
import ArrayListasDeUsuarios from '../../interfaces/arrayListasDeUsuarios';

/**
 *  ele vai buscar o Array "lista" dentro do documento da lista (DB_lista)
 * @param DB_lista nome do banco de dados da lista
 */
export async function juntarListasDeUsuariosEmUmaLista(DB_lista: string): Promise<ArrayListasDeUsuarios[] | []> {
    let listasTemp: ArrayListasDeUsuarios[] = []
    //juntar listas_de_usuarios em uma lista só
    const refListas = admin.firestore().collection(DB_lista)
    await refListas.get().then((params) => {
        if (!params) return
        params.docs.map(r => {
            listasTemp.push(...r.data().lista)
        })
    })
    return listasTemp
}