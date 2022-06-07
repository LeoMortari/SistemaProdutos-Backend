import bodyParser from "body-parser";
import consign from "consign";
import cors from "cors";
import express from "express";

//      CORS config, caso necessário utilizar:
// const corsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200
// }

export default () => {
  const app = express();

  //Configuração da API
  // Ao usar o Postman, use o x-www-form-urlencoded como opção da request
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  //Habilitando o uso do CORS para a API
  app.use(cors());

  //Mapeando a Controller
  consign().include("src/controller").into(app);

  return app;
};
