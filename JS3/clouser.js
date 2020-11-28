let incrementar = function () {
    variavel = 0;
    return {
        incrementa: function () {
            return variavel = variavel + 1;
        }
    }
}

let valor = incrementar();

console.log('Primeira chamada ' + valor.incrementa());
console.log('Segunda chamada ' + valor.incrementa());
console.log('Terceira chamada ' + valor.incrementa());