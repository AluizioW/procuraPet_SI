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

### Frontend

`USE_LOCAL`
`API_LOCAL`
`API_IP`

## Rodar localmente

Clone o projeto

```bash
  git clone https://github.com/AluizioW/procuraPet_SI.git
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

#### Registrar Usuário

```bash
  POST /api/usuarios/registrar
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `nomeUsuario` | `string` | **Obrigatório**. Nome do usuário |
| `email` | `string` | **Obrigatório**. Email válido |
| `senha` | `string` | **Obrigatório**. Mínimo 6 caracteres |
| `username` | `string` | **Obrigatório**. Apelido Único |
| `telefone` | `string` | **Obrigatório**. Número de telefone |


#### Fazer Login

```bash
  POST /api/usuarios/login
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`      | `string` | **Obrigatório**. Email cadastrado|
| `senha`      | `string` | **Obrigatório**. Senha do usuário|


#### Retorna dados do Usuário

```bash
  GET /api/usuarios/meuperfil
```

| Cabeçalho   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Authorization`      | `string` | **Obrigatório**. Token JWT no formato "Bearer {token}" |

## Funcionalidades Atuais
- Cadastrar Usuário
- Fazer Login
- Verificar dados do usuário
- Fazer postagem
- Visualizar postagens

## **Desenvolvido por**: 
- [Aluizio Sousa](https://github.com/AluizioW)
- [Bianca Oliveira](https://github.com/biancakarla)
- [Kamille Santos](https://github.com/kamillecaetano)