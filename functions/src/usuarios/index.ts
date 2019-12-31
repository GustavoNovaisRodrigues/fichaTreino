import * as functions from 'firebase-functions';
import { CAMINHO_USUARIOS } from "../constants"
import { adicionarNovoUsuarioAListaDeUsuarios } from './adicionarNovoUsuarioAListaDeUsuarios';
import { atualizarListaDeUsuarios } from './atualizarListaDeUsuarios';
import * as admin from 'firebase-admin';
import { servico } from '../config';
import { Usuario } from '../../../src/app/interfaces/usuario';
import { removerUsuarioDaListaDeUsuarios } from './removerUsuarioDaListaDeUsuarios';

admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(JSON.stringify(servico))),
    databaseURL: "https://fichadetreino-dev.firebaseio.com"
});


export const deleteUsuario = functions.firestore
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


export const createUsuario = functions.firestore
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

export const updateUsuario = functions.firestore
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



