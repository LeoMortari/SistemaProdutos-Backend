import * as StringFunctions from "../../utils/string";
import * as DoubleFunction from "../../utils/double";
import Cardapio from "../../tables/cardapio/index";

module.exports = (app) => {
    //cadastrar cardápio
    app.post("/cardapio/adiciona", (req, res) => {
        let {
            body: {descricao, nome, preco },
        } = req;
        try {
            if (!descricao || !nome || !preco) {
                throw new Error("Todos os campos devem ser preenchidos");
            }
            descricao = StringFunctions.convertToString(descricao);
            nome = StringFunctions.convertToString(nome);
            preco = DoubleFunction.convertToDouble(preco);
        } catch (e) {
            return res.status(400).send(e.message);
        }

        let obj = { descricao, nome, preco };


            Cardapio.adicionaNovoProdutoAoCardapio(res, obj);
        
    })

    //request para listar cardapio geral
    app.get("/cardapio/listar", (req, res) => {
        Cardapio.selectProdutosCardapioGeral(res);
    })

    //request para listar cardapio por id
    app.get("/cardapio/listar/:id", (req, res) => {
        let id = parseInt(req.params.id);
        Cardapio.selectProdutoCardapioPorId(res, id)
    })

    //request para editar por id
    app.patch('/cardapio/editar/:id', (req, res) =>{
        let id = parseInt(req.params.id);

        let {
            body: {descricao, nome, preco },
        } = req;
        try {
            if (!descricao || !nome || !preco) {
                throw new Error("Todos os campos devem ser preenchidos");
            }
            preco = DoubleFunction.convertToDouble(preco);
        } catch (e) {
            return res.status(400).send(e.message);
        }

        let obj = { descricao, nome, preco };

        Cardapio.editarCardapio(res,obj, id)
    })
};
