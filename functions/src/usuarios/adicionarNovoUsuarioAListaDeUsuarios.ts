import * as admin from 'firebase-admin';

export async function adicionarNovoUsuarioAListaDeUsuarios(dadosDoNovoUsuario: FirebaseFirestore.DocumentData, idDoNovoUsuario: string) {

    const refListas = await admin.firestore().collection('listas_de_usuarios')
    const batch = admin.firestore().batch();   
    
    let listasTemp: any = []
    await refListas.get().then((params) => {
        if (!params) return
        params.docs.map(r => {
            listasTemp.push(...r.data().lista)
        })
    })

    //adiciona o usuario cadastrado a listaTemp
    listasTemp.push({
        [idDoNovoUsuario]: {
            ...dadosDoNovoUsuario
        }
    })
    const limite = 2  //1500 Limite Safe para n ultrapassar 1 MiB
    const totalListas = listasTemp.length
    const listasParaSalvar = montarListasParaSalvar(listasTemp, limite, totalListas)

    //excluir listas antigas
    await refListas.get().then((params) => {
        console.log('===>deletando listas antigas')
        if (params.size === 0) return 0;
        params.docs.forEach((doc) => {
            batch.delete(doc.ref);
        });
        return params.size
    })

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

    return listasParaSalvar
}


function montarListasParaSalvar(listasTemp: any, limite: any, total: any) {
    const lista_usuarios = []
    let temp = []
    for (let i = 0; i < (total / limite); i++) {
        temp = [] //reset temp
        if (valorMinimo(i, limite) >= i) {
            temp = listasTemp.filter((valorAtual: any, indice: any, array: any) => {
                return valorMinimo(i, limite) <= indice && indice < valorMaximo(i, limite)
            })
            lista_usuarios.push(temp)
        }
    } //end for 
    return lista_usuarios

    function valorMinimo(indice: any, limiteDeclarado: any) {
        return ((indice + 1) * limiteDeclarado) - limiteDeclarado
    }
    function valorMaximo(indice: any, limiteDeclarado: any) {
        return (indice + 1) * limiteDeclarado
    }
}