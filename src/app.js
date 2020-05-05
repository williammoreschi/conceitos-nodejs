const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { url, techs, title} = request.body;
  const respository = {
    id: uuid(),
    likes:0,
    title,
    url,
    techs,
  }
  repositories.push(respository);
  response.json(respository);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {url, techs, title} = request.body;
  const respository = repositories.find(repo => repo.id === id);
  if(!respository){
    return response.status(400).send();
  }
  respository.url = url;
  respository.techs = techs;
  respository.title = title;
  return response.json(respository);
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const respository = repositories.findIndex(repo => repo.id === id);
  if(respository == -1){
    return response.status(400).send();
  }
  repositories.splice(respository,1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  const respository = repositories.find(repo => repo.id === id);
  if(!respository){
    return response.status(400).send();
  }
  respository.likes += 1;
  return response.json(respository);
});

module.exports = app;
