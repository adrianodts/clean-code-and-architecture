Criação do ambiente de desenvolvimento
 
  
Instalação do Node.js

Vamos começar inicializando o nosso projeto no Node.js com o comando npm init.

Caso você não tenha o Node.js instalado, basta entrar em https://nodejs.org, baixar e instalar a versão LTS.

Eu sempre recomendo que você utilize a última versão estável. Fique atento caso esteja utilizando uma versão muito antiga.


Inicialização do Projeto

Após inicializar o projeto, o arquivo package.json será criado. Lá vão ficar as dependências e também os scripts de execução tanto do TypeScript quanto dos testes.


Instalação e Inicialização do TypeScript

Instale o TypeScript utilizando o comando abaixo:

npm install typescript --save

Depois disso, inclua no package.json esta linha em "scripts":

"tsc:init": "tsc --init"

Agora rode no terminal o seguinte comando:

npm run tsc:init

Com isso, o arquivo tsconfig.js deve ter sido criado e estamos prontos para começar.


Instalação do Jest

Instale o Jest utilizando o comando abaixo:

npm install jest --save-dev
npm install @types/jest --save-dev


Configuração do TypeScript

O TypeScript tem um compilador que faz a conversão do código para JavaScript. Por conta disso, precisamos definir alguns poucos parâmetros:

tsconfig.json


{
    "compilerOptions": {
    "incremental": true,
    "target": "es6",
    "module": "commonjs",
    "outDir": "./dist",
    "strict": true, // depende do seu nível de conhecimento em TypeScript, recomendo começar com false
    "esModuleInterop": true
    },
    "include": [
        "./src"
    ],
    "exclude": [
        "./node_modules"
    ]
}


Fique totalmente à vontade para configurar de forma diferente.


Criação dos scripts

Vamos criar mais alguns scripts para rodar o TypeScript e também o Jest:

"build": "tsc"
"test": "tsc && jest dist/"


Testando se tudo deu certo

Pronto, agora crie uma pasta chamada src e dentro dela crie dois arquivos:

Circle.test.ts


import Circle from "./Circle";

test("Should calculate the area of circle", function () {
    const circle = new Circle(2);
    expect(circle.getArea()).toBe(12.566370614359172);
});

Circle.ts


export default class Circle {
    radius: number;

   constructor (radius: number) {
       this.radius = radius;
   }

    getArea() : number {
        return 2 * Math.PI * this.radius;
    }
}

Agora basta executar:

npm run test

Se os testes tiverem sido executados com sucesso está tudo pronto!