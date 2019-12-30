import ImagemExercicio from "./imagemExercicio";
import GrupoMuscular from "./grupoMuscular";

export default interface Exercicio {
    nome: string,
    nomeLowerCase: string,
    imagens: ImagemExercicio[] | null,
    grupoMuscular: GrupoMuscular[] | null,
    grupoMuscularSecundario?: GrupoMuscular[] | null,
}
