# Fila App

## Para rodar o projeto local

É necessário ter instalado localmente os seguintes componentes:

- Node
- Docker

Para rodar o projeto localmente, executar o passo a passo:

#### 1-  clonar repositorio na maquina 

#### 2- instalar os dependencias

```

npm install

```

#### 3- configurar o postgresql para rodar localmente via docker

```

cd ./fila-app/utils
docker build -t my-postgres .
docker run -d --name postgres-container -p 5432:5432 my-postgres

```

* caso necessite de massa para testes, dentro da pasta utils existe o script *massa_teste.sql* que possui massa de testes inicial 

#### 4- rodar a aplicação

utilizaremos a lib da vercel para simular o ambiente da vercel em produção. Rode o comando

```

vercel dev

```

* provavelmente, na primeira vez que rodar este comando, ele vai pedir o login da vercel. So criar usando a conta no github que provalvelmente já irá liberar para rodar localmente

*  Caso aconteça algum erro de permissão so mandar mensagem que adiciono o 

