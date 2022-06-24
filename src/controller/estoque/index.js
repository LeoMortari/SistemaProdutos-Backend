import * as StringFunctions from "../../utils/string";
import * as DoubleFunction from "../../utils/double";
import Estoque from "../../tables/estoque/index";

module.exports = (app) => {
    app.post("/estoque/adiciona", (req, res) => {
        let {
            body: { descricao, quantidade, valor },
        } = req;

        try {
            if (!descricao || !quantidade || !valor) {
                throw new Error("Todos os campos devem ser preenchidos");
            }

            descricao = StringFunctions.convertToString(descricao);
            valor = DoubleFunction.convertToDouble(valor);
        } catch (e) {
            return res.status(400).send(e.message);
        }

        let obj = { descricao, quantidade, valor };

        Estoque.adicionaNovoProdutoAoEstoque(res, obj);
    })

    app.get("/estoque/listar", (req, res) => {
        Estoque.selectProdutosEstoqueGeral(res);
    })

    app.get("/estoque/listar/:id", (req, res) => {
        let id = parseInt(req.params.id);
        Estoque.selectProdutoEstoquePorId(res, id)
    })
};
