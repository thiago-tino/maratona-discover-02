const express = require('express');
const routes = express.Router();
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController')
const DashboardController = require('./controllers/DashboardController')

// Página inicial
routes.get('/', DashboardController.index)

// Página para cria um trabalho (get)
routes.get('/job', JobController.create)
// Cria um trabalho (post)
routes.post('/job', JobController.save)

// Página para editar um trabalho (get)
routes.get('/job/:id', JobController.show)
// Edita um trabalho (post)
routes.post('/job/:id', JobController.update)
// Deletar um trabalho (post)
routes.post('/job/delete/:id', JobController.delete)

// Página de dados pessoais (get)
routes.get('/profile', ProfileController.index)
// Alteração de dados pessoais (post)
routes.post('/profile', ProfileController.update)

module.exports = routes;