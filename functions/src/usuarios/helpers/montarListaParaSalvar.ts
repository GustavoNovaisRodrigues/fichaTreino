
export function montarListasParaSalvar(listasTemp: any, limite: any, total: any) {
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