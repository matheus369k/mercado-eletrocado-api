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

O projeto é uma API para o projeto de e-commerce. Tendo como objetivo, armazenar as informações necessárias para o projeto e salvar os dados do usuários registrados na aplicação.

Funcionalidades:
- rotas para registo, login e remoção de usuários
- autenticação JWT(json web token), para auto login do usuário
- rotas para cadastro, leitura e remoção de produtos
- armazenamento e compactação de aquivos de imagem, para uso de avatars
- rotas para cadastro e leitura deliveries products, vinculados a uma conta
- rotas para cadastro ,leitura e remoção de favorites products, vinculados a uma conta

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

MONGO_DATABASE_URL=mongodb://localhost:27017/?authSource=admin
MONGO_DATABASE_NAME=ghome
MONGO_DATABASE_PASSWORD=ghome123

POSTGRES_DATABASE_URL=postgresql://root:root@localhost:5432/eletrocado-api

REDIS_DATABASE_URL=redis://localhost:6379

FRONT_END_URL=http://localhost:5173

JWT_ACCESS_SECRET_KEY=e34ee940-750c-4dc1-984b-671fbd4dc2af
JWT_REFRESH_SECRET_KEY=e34ee940-750c-4dc1-984b-671fbd4dc2af
```

Agora para criar os bancos de dados no docker, digite o comando abaixo no terminal:

```bash
docker compose up -d
```

Agora crie as migration, logo após as tabela:
```bash
yarn db:generate
yarn db:migrate
```

Após use o comando abaixo para inserir dados os banco de dados:
```bash
yarn seed
```
Por fim, inicie o projeto...
```bash
yarn dev
```
## Rotas
Para aprender ou testar as rotas da aplicação, acesse o arquivo __[client.http](/client.http)__. 

## 📜Licença

Para o projeto fora usado a licença 🔗[MIT](/LICENSE.txt).