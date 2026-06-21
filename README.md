# Trabalho de Conclusão da Disciplina Integração Contínua para Automação de Testes

## Orientações

Este repositório possui uma pipeline de **Integração Contínua** com **GitHub Actions**, criada para automatizar a execução dos testes do projeto Serviço de Pagamento, elaborado na disciplina **Programação para Automação de Testes**.

A pipeline está no arquivo:

```bash
.github/workflows/continuous-integration-exec.yaml
```

### Objetivo

Desenvolver uma pipeline de integração contínua utilizando GitHub Actions para um projeto com testes automatizados, contemplando:
- Execução por push.
- Execução manual.
- Execução agendada (schedule).
- Geração de relatório de testes.
- Armazenamento/publicação do relatório na pipeline.
- Criação de um README explicando a solução e os conceitos utilizados.

Preferencialmente utilizar um projeto desenvolvido em outra disciplina da pós-graduação.

### Requisitos

- Trabalho individual.
- Utilizar GitHub Actions.
- Pipeline executando com sucesso.
- Testes automatizados executando com sucesso.
- Relatório de execução armazenado na pipeline.
- Aplicação correta dos conceitos estudados.
- Uso adequado das ferramentas escolhidas.
- Documentação completa no README.

---

## Pipeline de Integração Contínua

A pipeline contempla:

- Execução manual com workflow_dispatch.
- Execução agendada com schedule.
- Execução por push na branch development.
- Execução dos testes automatizados.
- Geração de relatório com Mochawesome.
- Publicação do relatório como artifact.
- Merge automático para production somente quando os testes passam com sucesso.

### Gatilhos Configurados

A pipeline possui três formas de execução:

- Execução manual

```yaml
workflow_dispatch:
```

- Execução agendada

```yaml
schedule:
  - cron: '0 * * * 6,0'
```

Referência do Cron:

```text
* * * * *
│ │ │ │ │
│ │ │ │ └── dia da semana
│ │ │ └──── mês
│ │ └────── dia do mês
│ └──────── hora
└────────── minuto
```

Para o nosso projeto:

```text
0 * * * 6,0
│ │ │ │ │
│ │ │ │ └── sábado e domingo
│ │ │ └──── qualquer mês
│ │ └────── qualquer dia do mês
│ └──────── qualquer hora
└────────── minuto 0
```

Portanto, a pipeline será executada a cada 1 hora aos sábados e domingos.

**Observação:** no GitHub Actions, os agendamentos com `schedule` utilizam o horário UTC.

- Execução quando houver alterações na branch `development`:

```yaml
push:
  branches:
    - development
```

### Fluxo da Pipeline via Push

```text
push na development
        ↓
execução dos testes
        ↓
geração do relatório
        ↓
publicação do artifact
        ↓
merge para production se os testes passarem
```
Caso algum teste falhe, o merge para `production` não é executado.

### Testes e Relatório

Os testes são executados com:

```bash
npm run test:report
```

O relatório é gerado na pasta:
```text
mochawesome-report/
```

Na pipeline, esse relatório é publicado como artifact com o nome:

```text
Relatório de Testes Mochawesome
```

O artifact fica disponível por 30 dias na página da execução da pipeline.

### Evidência da Execução

A evidência da execução pode ser consultada na aba Actions do GitHub, no workflow:

```text
CI - Validação do Serviço de Pagamento
```

A execução com sucesso deve apresentar:

- Job de testes executado com sucesso.
- Job de merge para production executado com sucesso.
- Artifact Relatório de Testes Mochawesome disponível para download.

---

# Trabalho de Conclusão da Disciplina Programação para Automação de Testes - Parte 1

## Orientações

O Trabalho de Conclusão da Disciplina será dividido em duas partes:

- Parte 1: exercício prático de Javascript;

Este repositório contém a implementação da **Parte 1**, referente ao exercício prático de Javascript. Nesta etapa, foi criada uma classe responsável por realizar pagamentos e consultar o último pagamento realizado.

---

## Pré-requisitos

Para executar este projeto, é necessário ter instalado:

- Node.js
- NPM
- Git
- Visual Studio Code ou outra IDE de sua preferência

---

## Parte 1 - Exercício prático de Javascript

A proposta da Parte 1 é criar uma classe Javascript responsável por controlar pagamentos.

A classe criada se chama `ServicoDePagamento` e possui dois métodos principais:

- `pagar`
- `consultarUltimoPagamento`

Os pagamentos são armazenados como objetos Javascript dentro de uma lista privada de pagamentos.

Cada pagamento possui as seguintes propriedades:

- `codigoBarras`
- `empresa`
- `valor`
- `categoria`

A categoria do pagamento é definida automaticamente de acordo com o valor informado:

- Se o valor for maior que `100.00`, a categoria será `"cara"`;
- Se o valor for menor ou igual a `100.00`, a categoria será `"padrão"`.

O método `consultarUltimoPagamento` retorna apenas o último pagamento realizado.

---

## Implementação

A classe `ServicoDePagamento` foi implementada utilizando um atributo privado chamado `#pagamentos`.

Esse atributo armazena internamente a lista de pagamentos realizados, impedindo que ela seja acessada diretamente fora da classe.

Arquivo:

```bash
src/servicoDePagamento.js
```

---

## Regras implementadas

### Pagamento com categoria "padrão"

Quando o valor do pagamento for maior que zero e menor ou igual a `100.00`, o pagamento será registrado com a categoria `"padrão"`.

Exemplo:

```javascript
const servicoDePagamento = new ServicoDePagamento();

servicoDePagamento.pagar('1111-1111-1111', 'Claro', 100);

console.log(servicoDePagamento.consultarUltimoPagamento());
```

Resultado esperado:

```javascript
{
  codigoBarras: '1111-1111-1111',
  empresa: 'Claro',
  valor: 100,
  categoria: 'padrão'
}
```

---

### Pagamento com categoria "cara"

Quando o valor do pagamento for maior que `100.00`, o pagamento será registrado com a categoria `"cara"`.

Exemplo:

```javascript
const servicoDePagamento = new ServicoDePagamento();

servicoDePagamento.pagar('1111-1111-1111', 'Claro', 100.01);

console.log(servicoDePagamento.consultarUltimoPagamento());
```

Resultado esperado:

```javascript
{
  codigoBarras: '1111-1111-1111',
  empresa: 'Claro',
  valor: 100.01,
  categoria: 'cara'
}
```

---

### Consulta do último pagamento

O método `consultarUltimoPagamento` retorna o último pagamento registrado na lista interna de pagamentos.

Exemplo:

```javascript
const servicoDePagamento = new ServicoDePagamento();

servicoDePagamento.pagar('1111-1111-1111', 'Claro', 100);
servicoDePagamento.pagar('2222-2222-2222', 'Tim', 53.79);

console.log(servicoDePagamento.consultarUltimoPagamento());
```

Resultado esperado:

```javascript
{
  codigoBarras: '2222-2222-2222',
  empresa: 'Tim',
  valor: 53.79,
  categoria: 'padrão'
}
```

---

## Validações implementadas

Além da regra principal de categoria, a classe também possui validações para impedir pagamentos inválidos.

### Campos obrigatórios

Os campos abaixo são obrigatórios:

- Código de barras
- Empresa
- Valor

Caso algum desses campos não seja informado, será lançado o seguinte erro:

```text
Código de barras, empresa e valor são obrigatórios.
```

Exemplo:

```javascript
const servicoDePagamento = new ServicoDePagamento();

servicoDePagamento.pagar('', 'Vivo', 53.79);
```

---

### Valor negativo ou zero

O valor do pagamento precisa ser maior que zero.

Caso seja informado um valor negativo ou igual a zero, será lançado o seguinte erro:

```text
O valor precisa ser numérico e positivo maior que zero.
```

Exemplo:

```javascript
const servicoDePagamento = new ServicoDePagamento();

servicoDePagamento.pagar('3333-3333-3333', 'Claro', -32.50);
```

---

## Testes

Os testes foram desenvolvidos utilizando:

- Mocha
- Node Assert

Arquivo de testes:

```bash
test/servicoDePagamento.test.js
```

---

## Cenários testados

Foram criados testes para validar os seguintes comportamentos:

- Validar que quando o valor do pagamento for maior que zero e menor ou igual a `100`, a propriedade `categoria` será `"padrão"`;
- Validar que quando o valor do pagamento for maior que `100`, a propriedade `categoria` será `"cara"`;
- Validar que a consulta do último pagamento retorna o último pagamento efetuado;
- Validar que ao não informar o código de barras, será apresentado erro de campos obrigatórios;
- Validar que ao não informar a empresa, será apresentado erro de campos obrigatórios;
- Validar que ao não informar o valor, será apresentado erro de campos obrigatórios;
- Validar que ao informar um valor negativo ou zero, será apresentado erro de valor inválido;

---

## Como Executar o Projeto

Para executar o projeto, siga os passos abaixo:

### 1) Clone o repositório

Clone o projeto para sua máquina utilizando o comando:

```bash
git clone <URL_DO_REPOSITORIO>
```

---

### 2) Abra o projeto em uma IDE

Abra o projeto utilizando uma IDE de sua preferência, como:

- Visual Studio Code

---

### 3) Instale as dependências

Execute o comando abaixo na raiz do projeto:

```bash
npm install
```

---

### 4) Execute os testes

Execute o comando abaixo para rodar os testes automatizados do projeto:

```bash
npm test
```

---

### 5) Gerar relatório dos testes

Execute o comando abaixo para gerar o relatório HTML dos testes:

```bash
npm run test:report
```

O relatório será gerado no diretório:

```bash
mochawesome-report/
```

Para visualizar o relatório, abra o arquivo:

```bash
mochawesome-report/mochawesome.html
```

---

## Estrutura do Projeto

```bash
TRABALHO-CONCLUSAO-DISCIPLINA-PARTE-1/
├── mochawesome-report/
│   ├── assets/
│   ├── mochawesome.html
│   └── mochawesome.json
├── node_modules/
├── src/
│   └── servicoDePagamento.js
├── test/
│   └── servicoDePagamento.test.js
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

---

## Observação sobre a implementação

Durante a implementação da Parte 1 do Trabalho de Conclusão da Disciplina, a regra de categoria foi aplicada diretamente no método `pagar`.

Conforme o enunciado, quando o valor do pagamento é maior que `100.00`, a categoria do pagamento deve ser `"cara"`. Caso contrário, a categoria deve ser `"padrão"`.

Também foram adicionadas validações para garantir que os dados obrigatórios sejam informados corretamente antes de registrar um pagamento. Dessa forma, a classe evita o cadastro de pagamentos sem código de barras, sem empresa ou sem valor válido.

A lista de pagamentos foi declarada como privada por meio do campo `#pagamentos`, permitindo que os pagamentos sejam manipulados apenas pelos métodos da própria classe.

O método `consultarUltimoPagamento` utiliza `.at(-1)` para retornar o último item da lista de pagamentos.

---

## Tecnologias utilizadas

- Javascript
- Node.js
- Mocha
- Node Assert
- Mochawesome
