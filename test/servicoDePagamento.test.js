import ServicoDePagamento from '../src/servicoDePagamento.js';
import assert from 'node:assert';

describe('Classe de serviço de pagamento', () => {
    it('Validar que quando o valor do pagamento for maior que zero e menor ou igual a 100, a propriedade categoria é "padrão".', () => {
        //Arrange
        const servicoDePagamento = new ServicoDePagamento();
        const valorAserPago = 100;
    
        //Act
        servicoDePagamento.pagar('1111-1111-1111', 'Claro', valorAserPago);
        const resultado = servicoDePagamento.consultarUltimoPagamento();

        //Assert
        assert.equal(resultado.categoria,'padrão');

    });
    it('Validar que quando o valor do pagamento for maior que 100, a propriedade categoria é "cara".', () => {
        //Arrange
        const servicoDePagamento = new ServicoDePagamento();
        const valorAserPago = 100.01;
    
        //Act
        servicoDePagamento.pagar('1111-1111-1111', 'Claro', valorAserPago);
        const resultado = servicoDePagamento.consultarUltimoPagamento();

        //Assert
        assert.equal(resultado.categoria,'cara');

    });
    it('Validar que a consulta do último pagamento retorna o último pagamento efetuado.', () => {
        //Arrange
        const servicoDePagamento = new ServicoDePagamento();
        const objetoAserPago = {
            codigoBarras: '2222-2222-2222',
            empresa: 'Tim',
            valor: 53.79 
        }
    
        //Act
        servicoDePagamento.pagar(objetoAserPago.codigoBarras, objetoAserPago.empresa, objetoAserPago.valor);
        const resultadoConsultaUltimoPagamento = servicoDePagamento.consultarUltimoPagamento();
        
        //Assert
        assert.equal(objetoAserPago.codigoBarras, resultadoConsultaUltimoPagamento.codigoBarras);
        assert.equal(objetoAserPago.empresa, resultadoConsultaUltimoPagamento.empresa);
        assert.equal(objetoAserPago.valor, resultadoConsultaUltimoPagamento.valor);

    });
    it('Validar que ao não informar o código de barras, o erro "Código de barras, empresa e valor são obrigatórios." será apresentado.', () => {
        //Arrange
        const servicoDePagamento = new ServicoDePagamento();
        const objetoAserPago = {
            codigoBarras: '',
            empresa: 'Vivo',
            valor: 53.79 
        }
        //Act & Assert
        assert.throws(
            function(){
                servicoDePagamento.pagar(objetoAserPago.codigoBarras, objetoAserPago.empresa, objetoAserPago.valor)},
                { message: 'Código de barras, empresa e valor são obrigatórios.' }
        );
        
    });
    it('Validar que ao não informar a empresa, o erro "Código de barras, empresa e valor são obrigatórios." será apresentado.', () => {
        //Arrange
        const servicoDePagamento = new ServicoDePagamento();
        const objetoAserPago = {
            codigoBarras: '3333-3333-3333',
            empresa: '',
            valor: 53.79 
        }
        //Act & Assert
        assert.throws(
            function(){
                servicoDePagamento.pagar(objetoAserPago.codigoBarras, objetoAserPago.empresa, objetoAserPago.valor)},
                { message: 'Código de barras, empresa e valor são obrigatórios.' }
        );
        
    });
    it('Validar que ao não informar o valor, o erro "Código de barras, empresa e valor são obrigatórios." será apresentado.', () => {
        //Arrange
        const servicoDePagamento = new ServicoDePagamento();
        const objetoAserPago = {
            codigoBarras: '3333-3333-3333',
            empresa: 'Claro',
            valor: '' 
        }
        //Act & Assert
        assert.throws(
            function(){
                servicoDePagamento.pagar(objetoAserPago.codigoBarras, objetoAserPago.empresa, objetoAserPago.valor)},
                { message: 'Código de barras, empresa e valor são obrigatórios.' }
        );
    });
    it('Validar que ao informar um valor negativo ou zero, o erro "O valor precisa ser numérico e positivo maior que zero." será apresentado.', () => {
        //Arrange
        const servicoDePagamento = new ServicoDePagamento();
        const objetoAserPago = {
            codigoBarras: '3333-3333-3333',
            empresa: 'Claro',
            valor: -32.50
        }
        //Act & Assert
        assert.throws(
            function(){
                servicoDePagamento.pagar(objetoAserPago.codigoBarras, objetoAserPago.empresa, objetoAserPago.valor);},
                { message: 'O valor precisa ser numérico e positivo maior que zero.' }
        );
    });
});