import  Treino from "./treino"

export default interface ProgramaTreino {
    nome: string,
    ultimoTreino: number | null,
    treinos: Treino[] | null;
}