# Procura Pet

**ProcuraPet** é um aplicativo móvel para Android criado para ajudar pessoas a encontrar animais desaparecidos e promover a adoção responsável. Com uma plataforma colaborativa, o app permite que usuários cadastrem pets perdidos ou disponíveis para adoção, compartilhem informações, interajam por meio de comentários e recebam alertas baseados em proximidade. Moderadores garantem a qualidade do conteúdo, revisando denúncias e postagens. Desenvolvido com foco em usabilidade e segurança, o Procura Pet visa unir a comunidade em torno da causa animal, oferecendo uma solução acessível e eficiente para reduzir o abandono e facilitar a reunião de pets com seus tutores.

## Variáveis de Ambiente

### Backend

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`DB_HOST` 

`DB_PORT` 

`DB_NAME` 

`DB_USER`

`DB_PASSWORD`

`JWT_SECRET`

`JWT_EXPIRES_IN`

`UPLOAD_PRESET`

`CLOUD_NAME`

### Frontend

`USE_LOCAL`

`API_LOCAL`

`API_IP`

## Rodar localmente

Clone o projeto

```bash
  git clone https://github.com/AluizioW/procuraPet_SI
```

Entre no diretório do projeto

### Backend

```bash
  cd procura-pet/backend
```

Importe **bd_script_procura_pet.sql** presente no diretório **docs/database**

Instale as dependências necessárias:

```bash
  npm i
```

Inicie o servidor

```bash
  npm start
```

### Frontend
```bash
  cd procura-pet/frontend
```

Instale as dependências necessárias:

```bash
  npm i
```

Execute:

```bash
  npx expo start --clear
```

### Certificado https no Ubuntu:
```bash
  cd backend
```

```bash
  chmod +x generate-cert.sh
```

```bash
  ./generate-cert.sh
```


## Documentação da API

### Registrar Usuário

```bash
  POST /api/usuarios/registrar
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `nomeUsuario` | `string` | **Obrigatório**. Nome do usuário |
| `email` | `string` | **Obrigatório**. Email válido |
| `senha` | `string` | **Obrigatório**. Mínimo 8 caracteres, incluindo letra maiúscula, minúscula, dígitos e símbolos|


### Fazer Login

```bash
  POST /api/usuarios/login
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`      | `string` | **Obrigatório**. Email cadastrado|
| `senha`      | `string` | **Obrigatório**. Senha do usuário|


### Retorna dados do Usuário

```bash
  GET /api/usuarios/meuperfil
```

| Cabeçalho   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Authorization`      | `string` | **Obrigatório**. Token JWT no formato "Bearer {token}" |

### Retorna postagens

```bash
  GET /api/feed/home
```

| Cabeçalho   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `-`      | `-` | 	Esta requisição não requer cabeçalhos ou parâmetros específicos. |


### Retorna dados da postagem

```bash
  GET /api/post/:id
```

| Cabeçalho   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `integer` | **Obrigatório**. Id da postagem" |


### Criar postagem

```bash
  POST /api/post/
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `descricaoPostagem`      | `string` | **Opcional**. Descrição da postagem |
| `statusPetPostagem`      | `string` | **Obrigatório**. Id da postagem |
| `recompensa`      | `string` | **Opcional**. Recompensa |
| `nome`      | `string` | **Opcional**. Nome do pet (se conhecido) |
| `fotoPet`      | `string` | **Obrigatório**. Foto do pet |
| `raca`      | `string` | **Opcional**. Raça do pet |
| `cor`      | `string` | **Obrigatório**. Cor do pet |
| `especie`      | `string` | **Obrigatório**. Espécie do pet |
| `sexo`      | `string` | **Obrigatório**. Sexo do pet |
| `idade`      | `string` | **Opcional**. Idade do pet" |


### Editar postagem

```bash
  PUT /api/post/:id
```

| Cabeçalho   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `integer` | **Obrigatório**. Id da postagem" |

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `descricaoPostagem`      | `string` | **Opcional**. Descrição da postagem |
| `statusPetPostagem`      | `string` | **Obrigatório**. Id da postagem |
| `recompensa`      | `string` | **Opcional**. Recompensa |
| `nome`      | `string` | **Opcional**. Nome do pet (se conhecido) |
| `fotoPet`      | `string` | **Obrigatório**. Foto do pet |
| `raca`      | `string` | **Opcional**. Raça do pet |
| `cor`      | `string` | **Obrigatório**. Cor do pet |
| `especie`      | `string` | **Obrigatório**. Espécie do pet |
| `sexo`      | `string` | **Obrigatório**. Sexo do pet |
| `idade`      | `string` | **Opcional**. Idade do pet" |


### Excluir postagem

```bash
  PUT /api/post/:id
```

| Cabeçalho   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `integer` | **Obrigatório**. Id da postagem" |


## Funcionalidades Atuais
- Cadastrar usuário
- Fazer login
- Verificar dados do usuário
- Fazer postagem
- Visualizar postagens
- Formulário com validação
- Logout
- Excluir conta (backend)
- Ativar conta (backend)

## **Discente**: 
- [Aluizio Sousa](https://github.com/AluizioW)
- [Vídeo](https://drive.google.com/file/d/1BOIGPo3HBGSAD9tVtNmK1A_hQeqmRMLi/view?usp=sharing)