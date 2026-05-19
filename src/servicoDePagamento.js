export default class ServicoDePagamento{
    #pagamentos;
    constructor(){
        this.#pagamentos = [];
    }

    pagar(codigoDeBarras, empresa, valor){
        //let categoria = 'padrão';
        //if(valor > 100)
        //    categoria = 'cara';
        if(!codigoDeBarras || !empresa || !valor)
            throw(new Error("Código de barras, empresa e valor são obrigatórios."));

        if(valor <= 0)
            throw(new Error("O valor precisa ser numérico e positivo maior que zero."));

        this.#pagamentos.push({
            codigoBarras: codigoDeBarras,
            empresa: empresa,
            valor: valor,
            categoria: valor > 100 ? 'cara' : 'padrão'
        });
    }

    consultarUltimoPagamento(){
        return this.#pagamentos.at(-1);
    }
}