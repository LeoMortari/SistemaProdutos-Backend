import vendas from "../../tables/vendas";
const rota = '/vendas';
//cadastrar venda
module.exports = (app) =>{
    app.post(`${rota}/adicionar`,(req, res) => {
      let {
        body: {id_usuario_fk, id_pedido_fk},
      } = req;

      try {
        if (!id_usuario_fk || !id_pedido_fk) {
          throw new Error("Todos os campos devem ser preenchidos");
        }
          } 
      catch (e) {
        return res.status(400).send(e.message);
      }
      let obj = {id_usuario_fk, id_pedido_fk};
      console.log(req.body);
      vendas.CadastrarVenda(res,obj);
    })

    app.get(`${rota}`, (req, res) => {
      vendas.ConsultaGeralVendas(res);
    })

    app.get(`${rota}/:id`, (req, res) => {
      let id = parseInt(req.params.id);
      vendas.BuscaVendaPorId(res,id)
    })

    app.patch(`${rota}/:id`, (req, res) => {
      let valores = req.body;
      let id = parseInt(req.params.id);
      vendas.EditarVenda(id,valores,res);
    })
};