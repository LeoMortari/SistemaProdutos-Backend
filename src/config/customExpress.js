import express from "express";
import consign from "consign";
import bodyParser from "body-parser";

export default () => {
  const app = express();

  //Configuração da API
  // Ao usar o Potman, use o x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  //Mapeando a Controller
  consign().include("src/controller").into(app);

  return app;
};
