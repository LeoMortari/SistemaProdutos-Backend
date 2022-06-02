import connection from "../../database/connection";

module.exports = (app) => {
  app.get("/pedidos", (req, res) => {
    res.status(200).send("Router ok!");
  });
};
