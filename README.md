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

### Ordem de desenvolvimento:

- [X] API Usando GoLang
- [ ] API Usando Nest.js
- [ ] Frontend com Next.js
- [ ] Integração do Frontend com Backend
- [ ] Processamento de pagamento - GoLang

### Comandos principais:

### GoLang

- go mod init github.com/SantosVicente/full-cycle/goapi -> inicializar repo
- go mod tidy -> equivalente a npm i, deve ser acionado após adicionar um package com import
- cd goapi/cmd/catalog -> navegar até a pasta catalog
- go run main.go -> para rodar a API em GoLang (faça após realizar o passo anterior)

### Docker

- docker rm -f $(docker ps -a -q) -> Limpar os containers do dockers rodando atualmente na máquina
- docker-compose up -d -> Subir o container do projeto com
- docker-compose logs mysql -> para ver os logs caso os arquivos nao sejam criados

### MySQL

- docker-compose exec mysql bash -> entrar na máquina do MYSQL
- mysql -uroot -p fullcycle -> após isso coloque a senha para acessar o DB e modificá-lo
