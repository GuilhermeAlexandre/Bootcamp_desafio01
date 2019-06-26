const express = require('express');

const server = express();

server.use(express.json());

const projects = [];
const numberOfRequest = 0;

function checkProjectExists(req, res, next) {
  const { id } = req.params;

  const project = projects.find(p => p.id === parseInt(id));

  if (!project) {
    return res.status(400).json({ error: 'Project not exists' });
  }
  return next();
}

function logRequests(req, res, next) {
  numberOfRequest++;
  console.log(`Número de Requisições ${numberOfRequest}`);
  return next();
}

server.post('/projects', (req, res) => {
  const { id, title } = req.body;
  const project = {
    id,
    title,
    tasks: []
  };
  projects.push(project);

  res.json(projects);
});

server.get('/projects', (req, res) => {
  res.json(projects);
});

server.put('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  var project = projects.find(p => p.id === parseInt(id));
  project.title = title;

  return res.json(project);
});

server.delete('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;

  const index = projects.findIndex(x => x.id === id);
  projects.splice(index, 1);

  return res.send();
});

server.post('/projects/:id/task', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id === parseInt(id));
  project.tasks.push(title);

  return res.json(project);
});

server.listen(3000);
