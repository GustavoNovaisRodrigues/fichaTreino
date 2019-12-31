export default interface ArrayListasDeUsuarios {
    [indice: string]: DadosListasDeUsuarios

}
export interface DadosListasDeUsuarios {
    displayName: string,
    email: string,
    nivel: string,
    photoURL?: string | null,
    uid: string,
    verificado: boolean | null,
    dataModificacao?: number | null,
    displayNameCaseSensitive: string,
    genero?: string,
    redesSociais?: {} | null
}