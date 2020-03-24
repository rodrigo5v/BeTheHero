const express = require('express');

//adiciono os dois controladores que são responsáveis pelas funcionalidades
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const connection = require('./database/connection');
 
const routes = express.Router();

routes.post('/sessions',SessionController.create);
//listagem de ongs
routes.get('/ongs', OngController.index);
//cadastro de ongs
routes.post('/ongs', OngController.create);

//cadastro de incidentes
routes.post('/incidents', IncidentController.create);
//listagem de incidentes
routes.get('/incidents', IncidentController.index);
//deletando o incidente
routes.delete('/incidents/:id', IncidentController.delete);

//listando todos os incidentes de uma ong
routes.get('/incidents', ProfileController.index);
 
module.exports = routes; 