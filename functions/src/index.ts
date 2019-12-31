import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { servico } from './config';
import { CAMINHO_USUARIOS } from './constants';
import { Usuario } from '../../src/app/interfaces/usuario';
import { removerUsuarioDaListaDeUsuarios } from './usuarios/removerUsuarioDaListaDeUsuarios';
import { adicionarNovoUsuarioAListaDeUsuarios } from './usuarios/adicionarNovoUsuarioAListaDeUsuarios';
import { atualizarListaDeUsuarios } from './usuarios/atualizarListaDeUsuarios';

admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(JSON.stringify(servico))),
    databaseURL: "https://fichadetreino-dev.firebaseio.com"
});
exports.deleteUsuario = functions.firestore
    .document(CAMINHO_USUARIOS)
    .onDelete(async (snap, context) => {
        try {
            // Get an object representing the document prior to deletion
            // e.g. {'name': 'Marie', 'age': 66}
            const deletedValue = <Usuario>snap.data();
            const id = snap.id
            if (deletedValue && id) await removerUsuarioDaListaDeUsuarios(deletedValue, id)
            return true
        } catch (error) {
            console.error('error[deleteUsuarioTrigger]=', error)
            return false
        }
    });


exports.createUsuario = functions.firestore
    .document(CAMINHO_USUARIOS)
    .onCreate(async (snap, context) => {
        try {
            const valoresCadastrados = <Usuario>snap.data()
            const id = snap.id
            if (!valoresCadastrados) return;
            // adiciona novo usuario as listas de usuarios
            if (valoresCadastrados && id) await adicionarNovoUsuarioAListaDeUsuarios(valoresCadastrados, id)

            return true
        } catch (error) {
            console.error('error[createUsuarioTrigger]=', error)
            return false
        }
    });

exports.updateUsuario = functions.firestore
    .document(CAMINHO_USUARIOS)
    .onUpdate(async (change, context) => {
        try {
            const novoValor = <Usuario>change.after.data();
            const valorAntigo = <Usuario>change.before.data();
            if (novoValor && valorAntigo) await atualizarListaDeUsuarios(novoValor, valorAntigo)
            return true
        } catch (error) {
            console.error('error[updateUsuarioTrigger]=', error)
            return false
        }
    });














// export { deleteUsuario } from './usuarios';
// export { updateUsuario } from './usuarios';
// export { createUsuario } from './usuarios';
// import * as functions from 'firebase-functions';
// import { memorySizeOf } from "./helpers/calcularTamanhoObjeto";
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// Tamanho máximo de um documento Firestore	1 MiB (1.048.576 bytes)
//  bath() tutorial https://firebase.google.com/docs/firestore/manage-data/transactions?hl=pt-br
//  function tutorial https://firebase.google.com/docs/firestore/extend-with-functions
// Carimbo de data/hora do servidor   https://firebase.google.com/docs/firestore/manage-data/add-data?hl=pt-br

// quando cadastrar novo usuario adicionar na lista "usuarios-list"

/*
*
*
*               Atualizar "usuarios-list"
*
*
*/
// 
