//importo as funcionalidades do express
const express = require('express');
const cors = require('cors');
const routes = require('./routes')

//criando a aplicação
const app = express();
app.use(cors());
//faz com que toda requisição é convertida de json para um objeto em javascript
app.use(express.json());
app.use(routes);

//faço minha aplicação ficar nessa porta para acesse-la
app.listen(3333);