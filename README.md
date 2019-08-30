

# OmniStack8

Participação do Projeto feito no evento da Semana OmniStack8 da Rocckeatseat 05/08 a 11/08/2019

O projeto trata-se da aplicação como uma versão do Tinder para desenvolvedores foi chamada de Tindev  utilizando a API do github, usuário vai se 
cadastrar com o usuário do gihub e encotrando outros devs para  fazer likes e dislikes com resultado de um Macth 
 a construção das aplicações foram ultilizadas  Node.JS , React.JS e React-native e banco de dados não relacional MongoDB Atlas

Utilizando padrão MVC, base da aplicação em  backend e versão Web e mobile no  frontend 
e também modelo cliente-servidor
*frameworks e módulos instalados do node.Js , modulo express , socket.io ,socket.client, gereciador de yarn (últimas versões atualizadas )*
 *react-app ,react-native-cli*
*yarn global add react-native-cli`*



##### Para rodar servidor do  Backend

no terminal ou bash dentro da pasta /OmniStack8/Tindev/backend 
ultilizar o comando:
`yarn dev`

##### Para rodar a aplicação frontend 

no terminal ou bash dentro da pasta /OmniStack8/Tindev/frontend
ultilizar o comando:
`yarn start`



##### Para testar a aplicação mobile

`xcode` no caso IOS

Para android

`Emulador  Genymotion`
`sdk para android`
*usando a configuração adequada para windows e linux ou utilizar um aparelho celular (recomendado por ter uma experiência mais rápida para teste)*
*emulando via usb (depuração usb)*

###### usar o comando na primeira vez instalar no emulador ou celular aplicação versão mobile

`yarn react-native run-android` (caso android) 
ou `yarn react-native run-ios` (caso IOS)

##### Para rodar a aplicação mobile 

no terminal ou bash dentro da pasta
/OmniStack8/Tindev/mobile
utilizar o comando:
`yarn start`
ou 
`yarn react-native start`



Obs://para fazer a configuração de ip local que será utilizado o emulador ou celular
caso precise configurar um ip local para versão mobile
no caso android apenas altere o ip adicionado o seu ip local ,
dentro da pasta services no arquivo api.js 
OmniStack8/Tindev/mobile/src/services

##### caso android:

`import axios from 'axios';`

`const api = axios.create({`
    `baseURL:'http://192.168.0.106:3333'`
`});`

export default api;

##### no caso do emulador ou celular ios pode usar o localhost 

import axios from 'axios';

const api = axios.create({
    baseURL:'http://localhost:3333'
});

export default api;
