<h1 align='center'>Mercado Eletrocado - API Node</h1>

<div align='center'>

  [Descrição](#descrição)
  |
  [Iniciando](#iniciando)
  |
  [Dependências](#dependências)
  |
  [Rotas](#rotas)
  |
  [Licença](#licença)
</div>

<div align='center'>
  <img src='https://img.shields.io/github/license/matheus369k/mercado-eletrocado-api.svg'/>
</div>

## Descrição

O projeto é uma API para o projeto de e-commerce. Tendo como objetivo, armazenar as informações necessárias para o projeto. No momento so há um banco de dados mongo, para os produtos.

## Iniciando

E necessário ter instalado:
- docker
- git
- nodejs

Para iniciar o projeto, primeiro clone o repositório e instale as dependências...

```bash
git clone https://github.com/matheus369k/mercado-eletrocado-api.git
cd mercado-eletrocado-api
yarn
```

adicione o arquivo .env e insira as variáveis de ambiente baixo...

```bash
PORT=3000
HOST=0.0.0.0

DATABASE_URL=mongodb://localhost:27017/?authSource=admin
MONGO_DATABASE_NAME=ghome
MONGO_DATABASE_PASSWORD=ghome123

FRONT_END_URL=http://localhost:5173
```

Agora para criar o banco de dados do docker, digite o comando abaixo no terminal do projeto...

```bash
docker compose up -d
```

Após use o comando abaixo para inserir dados os banco de dados...
```bash
yarn seed
```
Por fim, inicie o projeto...
```bash
yarn dev
```
## Rotas
__Método HTTP GET__<br/>
Coletar todos produtos
```
/api/products
```
Coletar produtos por categoria
```
/api/products/:categoria
```
__Método HTTP POST__<br/>
Registar novo produtos
```
/api/products
```
```
{
  model: string;
  img: string;
  slide: {
    slide1: string;
    slide2: string;
    slide3: string;
  };
  screen: string;
  processor: string;
  memory: string;
  placeVideo: string;
  battery: string;
  price: number;
  category: string;
}
```
__Método HTTP DELETE__<br/>
Deletar produtos
```
/api/products/:id
```
## 📜Licença

Para o projeto fora usado a licença 🔗[MIT](/LICENSE.txt).