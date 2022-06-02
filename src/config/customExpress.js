import app from "express";
import consign from "consign";
import bodyParser from "body-parser";

//Configuração do encoder
app().use(bodyParser.urlencoded({ extended: false }));
app().use(bodyParser.json());

//Listagem dos módulos
consign().include("controller").into(app);

export default app;
