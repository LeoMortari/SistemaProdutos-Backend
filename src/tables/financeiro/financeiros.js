
import  connection  from "../../database/connection";


class financeiro {
  adiciona(financeiro) {
    let sql = "INSERT INTO financeiro SET ?";
    query(sql, financeiro, (erro, resultado) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log(resultado);
      }
    });
  }

  adicionaNovoFinanceiro(req, res) {
    let sql = `INSERT INTO financeiro (Nome, ValorVenda, ValorPedido, ValorLucro) 
    VALUES ('${req.body.Nome}', ${parseInt(req.body.ValorVenda)}, ${parseInt(req.body.ValorPedido)}, ${req.body.ValorLucro})`;

    connection.query(sql, (err) => {

      if (err) {
        res.send('erro')
      }

      res.status(200).send();
    });
  }


  SelectFinsnceiro(res) {
    let sql = "SELECT * FROM financeiro";

    connection.query(sql, (err, result) => {
      if (err) {
       res.send('erro')
      }

    });
  }



}

export default new financeiro();
