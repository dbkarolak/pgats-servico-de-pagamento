class ServicoDePagamento{
    #pagamentos;
    constructor(){
        this.#pagamentos = [];
    }

    pagar(codigoDeBarras, empresa, valor){
        let categoria = 'padrao';
        if(valor > 100)
            categoria = 'cara';

        this.#pagamentos.push({
            codigoBarras: codigoDeBarras,
            empresa: empresa,
            valor: valor,
            categoria: categoria
        });
    }
    consultarUltimoPagamento(){
        return this.#pagamentos.at(-1);
    }
}
const servicoDePagamento = new ServicoDePagamento();
servicoDePagamento.pagar('0987-7656-3475', 'Samar', 156.87);
servicoDePagamento.pagar('0987-7656-3476', 'Samar', 90.87);

console.log(servicoDePagamento.consultarUltimoPagamento());