import Exercicio from "./exercicio"
import Serie from "./serie"
export default interface ExercicioDoGrupo {
    exercicios: Exercicio[] | null;
    series: Serie[] | null;
}