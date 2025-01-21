# Angular E-Commerce

Projeto de um E-commerce simples com Angular na versão 17.3.11. Neste projeto há uma integração com uma API que funciona com back-end.

Repositório da API do back-end: https://github.com/NascimentoFrancisco/api-e-commerce

Neste projeto há a implantação de diversos conceitos do framework Angular, como componetização, Input, Output, Memory Lakes, Guards entre outros. Há uma interação com a API do [ViaCEP](https://viacep.com.br) para lidar com endereços por meio de um CEP informdo

## Como usar

> Obter o projeto
~~~ bash
git clone https://github.com/NascimentoFrancisco/angular-e-commerce.git
cd angular-e-commerce
~~~
> Instalar todas as dependencias
~~~ bash
npm install
~~~

### Configurar o arquivo .env

Crie um arquivo `.env` e copie a estrutura do arquivo `EXAMPLE_ENV` para ele e insira a url de sua API no campo `BASE_URL`

> Inicializar o servidor
~~~ bash
ng s
~~~

E acessar a aplicação na url: `http://localhost:4200/`
