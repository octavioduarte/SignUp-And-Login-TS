API com rotas para login e cadastro usando Node com Typescript, Jest, Typeorm, Docker e MySQL

> ## Detalhes do projeto

- Tipos de conta

```code  
   admin: 2,
   root: 3,
   simple: 1,
   system: 4
```

- Modelagem Conta

```code  

----------------------------------------------
|  Nome         |  Tipo                      |
| ------------- | -------------------------- |
|  id           |  inteiro (auto-increment)  |
|  name         |  texto                     |
|  password     |  texto                     |
|  type         |  inteiro                   |
|  email        |  texto                     |
|  status       |  booleano                  |
|  created_by   |  inteiro                   |
----------------------------------------------
```



> ## Inicialização

- Criação do banco
```bash
    # Vamos começar criando uma instância da imagem do mysql (ou em poucas palavras um container) utilizando docker 
    # !!! Não se esqueça de substituir os parâmetros !!! 
    # Neste exemplo foi usada a versão 5.7 , mas fique a vontade para usar a latest 

    $ docker run -e MYSQL_DATABASE=<digite_um_nome_para_o_banco> -e MYSQL_ROOT_PASSWORD=<digite_uma_senha_para_o_banco> --name <digite_um_nome_para_o_container> -d -p 3306:3306 mysql:5.7
```

- Visualizar host do banco

```bash 
    # Precisamos verificar onde o Docker vai alocar a instâcia do MySQL 
    # Para isso usamos o seguinte comando : 

    $ docker inspect <nome_do_container> | grep IPAddress

    # O retorno vai ser algo desse tipo : 

        "SecondaryIPAddresses": null,
        "IPAddress": "172.17.0.3",
        "IPAddress": "172.17.0.3",

    # Guarde o valor retornado pela instrução, pois é para ele que vamos apontar ao fazer a conexão
```

- Criação do .env


```code
    // As chaved do arquivo .env deve seguir os seguintes parâmetros : 

    
    # Database 

    DB_HOST=        // IP do servidor do banco (é aqui que você usa o retorno do comando inspect)
    DB_NAME=        // Nome do banco
    DB_PASS=        // Senha  do banco
    DB_PORT=        // Porta alocada pelo banco
    DB_TYPE=        // (FEAT do ORM) informar o nome do driver de conexão do banco 
    DB_USER=        // Usuário do banco
    DB_SYNCHRONIZE= // (FEAT do ORM) para que as ações realizadas no banco via código sejam refletidas de imediato (não recomendado em produção)


    # Typeorm

    PATH_ENTITIES =  // (FEAT do ORM) informando onde estão armazenadas as models




    # Server 

    HTTP_PORT=      // Porta a ser alocada pelo servidor
    SECRET_TOKEN=   // HASH para criação do token

```

- Criação de um usuário com as permissões necessárias para realizar as ações na API


```bash 
    # Há um arquivo no banco com um script necessário para incluir um usuário com as ações necessárias na API
    # É **FUNDAMENTAL** rodar esse script, pois sem ele a API fica obsoleta dado que não haverão usuários registrados
    # para realizar as ações

    yarn create:user

```

- Scripts de manipulação do projeto


```bash
    # Download das dependências
    $ yarn


    # Inicialização do projeto em ambiente de desenvolvimento
    $ yarn run:dev



    # Build
    $ yarn build


    # Inicialização do projeto builded
    $ yarn start


    # Testes
    $ yarn test
```



____________________________________________________________________________________________________________________
____________________________________________________________________________________________________________________
____________________________________________________________________________________________________________________
____________________________________________________________________________________________________________________
____________________________________________________________________________________________________________________
____________________________________________________________________________________________________________________
____________________________________________________________________________________________________________________

# Cadastro

> ## Caso de sucesso


1.  ✅  **Recebe** uma requisição do tipo **POST** na rota **/api/register-new-user**
2.  ✅  **Valida** dados obrigatórios **name**, **email**, **password** , **password_confirmation**, **type** e **status**
3.  ✅  **Valida** se o **name** informado contém nome e sobrenom e se é composto apenas por letras 
4.  ✅  **Valida** o token no header da requisição 
5.  ✅  **Valida** que **password** e **passwordConfirmation** são iguais e se contém ao menos 6 dígitos
6.  ✅  **Valida** que o campo **email** é um e-mail válido
7.  ✅  **Valida** se já existe um usuário com o email fornecido
8.  ✅  **Valida** se o tipo de conta do usuário responsável pelo cadastro é **root** ou **admin**
9.  ✅  **Gera** uma senha **criptografada** (essa senha não pode ser descriptografada)
10. ✅  **Cria** uma conta para o usuário com os dados informados, **substituindo** a senha pela senha criptorafada
11. ✅  **Gera** um **token** de acesso a partir do ID do usuário
12. ✅  **Retorna** **200** com o token de acesso e os dados do usuário

```code
   {
      "id": 2,                              // ID do usuário criado
      "name": "Janis Joplin",               // Nome do usuário
      "type": 1,                            // Tipo da conta do usuário
      "email": "janis@server.com",          // Email do usuáruo criado
      "status": true,                       // Status da criação do usuário 
      "created_by": 1                       // ID do responsável pela criação
   }
```

> ## Exceções - (Todas as validações retornam mensagens de erro customizadas para uma boa compreensão)

1. ✅  Retorna erro **401** se o token enviado for inválido
2. ✅  Retorna erro **400** se os campos obrigatórios não foram providos pelo client
3. ✅  Retorna erro **400** se a tipagem dos campos não forem respeitadas 

```code
   nome do campo: 'name'                  tipagem permitidas: ['string']
   nome do campo: 'email'                 tipagem permitidas: ['string']
   nome do campo: 'password'              tipagem permitidas: ['string']
   nome do campo: 'password_confirmation' tipagem permitidas: ['string']
   nome do campo: 'type'                  tipagem permitidas: ['number']
   nome do campo: 'status'                tipagem permitidas: ['boolean']
```

4.  ✅ Retorna erro **400** se password e password_confirmation não forem iguais
5.  ✅ Retorna erro **400** se name não tiver nome a sobrenome ou se tiver caractere numérico   
6.  ✅ Retorna erro **400** se o campo email for um e-mail inválido
7.  ✅ Retorna erro **403** se o email fornecido já estiver em uso
8.  ✅ Retorna erro **500** se der erro ao tentar gerar uma senha criptografada
9.  ✅ Retorna erro **500** se der erro ao tentar criar a conta do usuário
10. ✅ Retorna erro **500** se der erro ao tentar gerar o token de acesso

____________________________________________________________________________________________________________________
____________________________________________________________________________________________________________________
____________________________________________________________________________________________________________________
____________________________________________________________________________________________________________________
____________________________________________________________________________________________________________________
____________________________________________________________________________________________________________________
____________________________________________________________________________________________________________________

# Login

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **POST** na rota **/api/login**
2. ✅ Valida dados obrigatórios **email** e **password**
3. ✅ Valida se o **status** da conta do usuário esta ativo 
4. ✅ Valida que o campo **email** é um e-mail válido
5. ✅ **Busca** o usuário com o email e senha fornecidos
6. ✅ Gera um **token** de acesso a partir do ID do usuário
7. ✅ Retorna **200** com o token de acesso e os dados do 

```code

{
    "access_token": "secret.token.here",
    "user_data": {
        "id": 2,                                                    // ID do usuário   
        "name": "Ronnie James Dio",                                 // Nome do usuário
        "type": 3,                                                  // Tipo da conta
        "email": "ronnie@dio.com",                                  // Email do usuáruo
        "status": true,                                             // Status da criação
        "created_by": 3                                             // ID do responsável
    }
}

```

> ## Exceções

1. ✅ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **400** se email ou password não forem fornecidos pelo client
3. ✅ Retorna erro **400** se o campo email for um e-mail inválido
4. ✅ Retorna erro **401** se não encontrar um usuário com os dados fornecidos
5. ✅ Retorna erro **403** se a conta estiver com status **false**
5. ✅ Retorna erro **500** se der erro ao tentar gerar o token de acesso


