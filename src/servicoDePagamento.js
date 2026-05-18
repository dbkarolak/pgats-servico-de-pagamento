export default class ServicoDePagamento{
    #pagamentos;
    constructor(){
        this.#pagamentos = [];
    }

    pagar(codigoDeBarras, empresa, valor){
        //let categoria = 'padrão';
        //if(valor > 100)
        //    categoria = 'cara';

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