import { montarListasParaSalvar } from "./montarListaParaSalvar"
import * as admin from 'firebase-admin';
import ArrayListasDeUsuarios from "../../interfaces/arrayListasDeUsuarios";

export async function setNovaListaNaAntiga(ListaNova: ArrayListasDeUsuarios[], limite: number, DB_lista: string, deletarLista?: boolean) {
    const batch = admin.firestore().batch();
    const refListas = admin.firestore().collection(DB_lista)


    //  excluir listas antigas  ==>> nao precisa excluir antes ja que o comando .set() sobresescreve a anterior 
    if (deletarLista) await refListas.get().then((params) => {
        console.log('===>deletando listas antigas')
        if (params.size === 0) return 0;
        params.docs.forEach((doc) => {
            batch.delete(doc.ref);
        });
        return params.size
    })


    /// atualizar os cados
    const totalListas = ListaNova.length
    const listasParaSalvar = montarListasParaSalvar(ListaNova, limite, totalListas)

    //atualizando as listas
    const update = listasParaSalvar.map(async (elemento, indice) => {
        console.log('===>update com das listas nova')
        const gravarReferencia = refListas.doc((indice).toString())
        batch.set(gravarReferencia, {
            lista: elemento,
            quantidade: elemento.length,
            max: limite
        })
    })
    await Promise.all(update)
    //executar o comit das transações em lote
    await batch.commit()
        .then(() => {
            console.log(':::::gravações em lote comcluida')
            return true
        })
        .catch((er) => {
            console.error(':::::falha da gravação em lote', er)
            return false
        })
}