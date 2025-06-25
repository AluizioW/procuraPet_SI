
# ProcuraPet
**ProcuraPet** é um aplicativo móvel para Android criado para ajudar pessoas a encontrar animais desaparecidos e promover a adoção responsável. Com uma plataforma colaborativa, o app permite que usuários cadastrem pets perdidos ou disponíveis para adoção, compartilhem informações, interajam por meio de comentários e recebam alertas baseados em proximidade. Moderadores garantem a qualidade do conteúdo, revisando denúncias e postagens. Desenvolvido com foco em usabilidade e segurança, o Procura Pet visa unir a comunidade em torno da causa animal, oferecendo uma solução acessível e eficiente para reduzir o abandono e facilitar a reunião de pets com seus tutores.

## Descrição
Este repositório contém a proposta do trabalho final da disciplina de Segurança da Informação, que tem como objetivo analisar os aspectos de confidencialidade, integridade e disponibilidade no sistema **ProcuraPet**. Desenvolvido para auxiliar na divulgação de animais perdidos ou disponíveis para adoção, o sistema lida com dados sensíveis em situações emocionalmente delicadas. A análise visa identificar possíveis falhas de segurança, propor soluções adequadas e implementar melhorias, garantindo que o sistema esteja em conformidade com as normas de segurança da informação discutidas ao longo do curso.

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`DB_HOST` 

`DB_PORT` 

`DB_NAME` 

`DB_USER`

`DB_PASSWORD`

`JWT_SECRET`

`JWT_EXPIRES_IN`

## Rodar localmente

Clone o projeto

```bash
  git clone https://github.com/AluizioW/procuraPet_SI.git
```

Entre no diretório do projeto

```bash
  cd procura-pet/backend
```

Importe **bd_script_procura_pet.sql** presente no diretório **database**

Adicione ao menos um endereço à tabela **endereço**

Carregue as dependências

```bash
  npm add bcryptjs cors dotenv express jsonwebtoken mysql2
```

```bash
  npm add nodemon -D
```


Inicie o servidor

```bash
  npm run dev
```

## Documentação da API

#### Registrar Usuário

```http
  POST /api/usuarios/registrar
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `nome` | `string` | **Obrigatório**. Nome do usuário |
| `email` | `string` | **Obrigatório**. Email válido |
| `senha` | `string` | **Obrigatório**. Mínimo 6 caracteres |
| `username` | `string` | **Obrigatório**. Apelido Único |
| `telefone` | `string` | **Obrigatório**. Número de telefone |
| `idEndereco` | `int` | **Obrigatório**. Id de endereço existente |


#### Fazer Login

```http
  POST /api/usuarios/login
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`      | `string` | **Obrigatório**. Email cadastrado|
| `senha`      | `string` | **Obrigatório**. Senha do usuário|


#### Retorna dados do Usuário

```http
  GET /api/usuarios/meuperfil
```

| Cabeçalho   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Authorization`      | `string` | **Obrigatório**. Token JWT no formato "Bearer {token}" |

## Funcionalidades Atuais
- Cadastrar Usuário
- Fazer Login
- Verificar dados do usuário