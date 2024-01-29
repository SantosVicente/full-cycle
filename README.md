# E-Commerce

- Stack Backend: Node.js, Nest.js, Docker, RabbitMQ, GoLang
- Stack Frontend Web: Next.js, Shadcn UI, Tailwind CSS

## Requisitos

### Requisitos Funcionais (RFs):

- [ ] Deve ser possível ver um catálogo de produtos;
- [ ] Deve ser possível adicionar os produtos a um carrinho;
- [ ] Deve ser possível finalizar a compra;
- [ ] Deve ser possível processar o pagamento;

### Regras de Negócio (RNs):

- [ ] Ao adicionar um produto no carrinho, um sistema de checkout deve ser chamado
      para efetuar o pagamento;
- [ ] O checkout deve enviar os dados para o RabbitMQ (broker) para guardar a transação
      até tudo ser finalizado;

### Requisitos Não Funcionais (RNFs):

- [ ] O checkout da compra e a confirmação de pagamento devem ser feitos com um
      microsserviço;
- [ ] A API deve ser feita usando GoLang;

## Anotações importantes

## Ordem de desenvolvimento:

- [ ] Microsserviço API de Produtos - GoLang
- [ ] API das ordens de compra - Nest.js
- [ ] Frontend com Next.js
- [ ] Integração do Frontend com Backend
- [ ] Processamento de pagamento - GoLang

### Comandos principais:

- go mod init github.com/SantosVicente/full-cycle/goapi -> inicializar repo
- go mod tidy -> equivalente a npm i, deve ser acionado após adicionar um package com import
