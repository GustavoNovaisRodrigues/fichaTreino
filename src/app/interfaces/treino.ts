import Grupo from "./grupo"
export default interface Treino {
    nome: string,
    grupos: Grupo[] | null;
}