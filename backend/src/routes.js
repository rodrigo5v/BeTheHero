const express = require('express');

//adiciono os dois controladores que são responsáveis pelas funcionalidades
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
 
const routes = express.Router();

//listagem de ongs
routes.get('/ongs', OngController.index);
//cadastro de ongs
routes.post('/ongs', OngController.create);

//inciar a sessão da ong
routes.post('/sessions',SessionController.create);

//listagem de incidentes
routes.get('/incidents', IncidentController.index);
//cadastro de incidentes
routes.post('/incidents', IncidentController.create);
//deletando o incidente
routes.delete('/incidents/:id', IncidentController.delete);

//listando todos os casos de uma ong
routes.get('/profile', ProfileController.index);
 
module.exports = routes; 