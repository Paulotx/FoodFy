# foodfy
Projeto desenvolvido durante Bootcamp LauchBase - RocketSeat

#### Requisitos
1. NodeJS 
    * Windows e MacOs

      Bastar fazer o [download](https://nodejs.org/en/download/) dos instaladores e realizar o procedimento de instalação normalmente.

    * Linux ou algum Package Manager
    
      Seguir os passos a passos deste [tutorial](https://github.com/nodejs/node).
      
2. [PostgreSQL](https://www.postgresqltutorial.com/install-postgresql/)
    
    Recomendamos a instalação do [Postbird](https://www.electronjs.org/apps/postbird) para o gerenciamento da Base de Dados.
    
3. [Visual Studio Code](https://code.visualstudio.com/) (Opcional)

&nbsp;
#### Criação da Base de Dados
1. No PostBird podemos criar uma Base de Dados de duas formas.
   - Na aba QUERY digitar o comando: ``` CREATE DATABASE foodfy; ``` e clicar em RUN QUERY (Recomendamos foodfy para o nome)
   
   	   ![Criação da Base de Dados](https://i.imgur.com/g78kG61l.png)
      
      &nbsp;
   - Clicar em Create DataBase, informar o nome para a base de dados e clicar novamente em Create Database (Recomendamos foodfy para o nome)
   
      ![Criação da Base de Dados](https://i.imgur.com/JFvvWpwl.png)
      ![Criação da Base de Dados](https://i.imgur.com/YvFl3HZl.png)
   
      &nbsp;
2. Na raiz do projeto existe em arquivo chamado database.sql, copiar todos os comandos nele contido e colar na aba QUERY. (Você deve estar dentro da Base de Dados Criada). Clicar em Run Query.

      ![Criação da Base de Dados](https://i.imgur.com/UMELcYwl.png)
      
      &nbsp;
#### Configuração da Base de Dados com o Projeto
1. Editar o Arquivo config/db.js
```
const { Pool } = require("pg");

module.exports = new Pool({
    user: "user",      // Usuário do Banco
    password: "password", // Senha do Usuário
    host: "localhost",
    port: 5432,
    database: "foodfy" // Nome da Base de Dados
});
```

&nbsp;
#### Instalação
1. Abrir a pasta do projeto no terminal e executar o comando:
   ```
   npm install
   ```
