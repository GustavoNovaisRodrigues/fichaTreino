import ExercicioDoGrupo from "./exercicioDoGrupo"
export default interface Grupo {
    nome: string,
    exerciciosDoGrupo: ExercicioDoGrupo[] | null;
}